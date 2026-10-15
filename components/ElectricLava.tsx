"use client";

import { useEffect, useRef } from "react";

// Shader portado do "Electric Mist" (chamaac, 21st.dev) — turbulência fbm + divisão
// para veios brilhantes. Reescrito em WebGL cru (sem three.js) e recolorido para
// lava laranja no preto, no espírito do hero da referência (Hotmart Launchpad).
const VERT = `
attribute vec2 a_pos;
varying vec2 vUv;
void main(){ vUv = a_pos * 0.5 + 0.5; gl_Position = vec4(a_pos, 0.0, 1.0); }
`;

const FRAG = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform vec3 uColor;
uniform float uDetail;
uniform float uDistortion;
uniform float uBrightness;
varying vec2 vUv;

#define time uTime * 0.2

mat2 makem2(in float theta){ float c = cos(theta); float s = sin(theta); return mat2(c,-s,s,c); }
float hash(vec2 p){ return fract(sin(dot(p, vec2(12.9898,78.233))) * 43758.5453); }
float noise(in vec2 x, float detail){
  x *= detail;
  vec2 p = floor(x); vec2 f = fract(x);
  f = f*f*(3.0-2.0*f);
  float a = hash(p+vec2(0.0,0.0)), b = hash(p+vec2(1.0,0.0)), c = hash(p+vec2(0.0,1.0)), d = hash(p+vec2(1.0,1.0));
  return mix(mix(a,b,f.x), mix(c,d,f.x), f.y);
}
mat2 m2 = mat2(0.80,0.60,-0.60,0.80);
float fbm(in vec2 p, float detail, int octaves){
  float z = 2.0; float rz = 0.0;
  for(int i=0;i<7;i++){
    if(i>=octaves) break;
    rz += abs((noise(p, detail)-0.5)*4.0)/z;
    z = z*2.0; p = p*2.0; p *= m2;
  }
  return rz;
}

void main(){
  vec2 p = vUv * 2.0 - 1.0;
  p.x *= uResolution.x / uResolution.y;
  vec2 bp = p;
  p += 5.0;
  p *= 0.5;

  float rb = fbm(p*0.5 + time*0.17, uDetail, 3) * 0.1;
  p *= makem2(rb*0.2 + atan(p.y, p.x) * uDistortion);

  float rz = fbm(p*0.9 - time*0.7, uDetail, 5);
  rz *= 12.0;
  // modulação ORIGINAL: mergulha a zero -> cria as bandas escuras (mantém o preto)
  rz *= abs(sin(bp.x*0.5 - time*4.0 - 2.0)) * 1.0;

  // fórmula original (com sqrt); uColor é dim -> fundo escuro, veios brilhantes
  vec3 col = uColor / (uBrightness - rz);
  col = sqrt(abs(col));
  // puxa o fundo pro preto e realça os veios
  col = max(col - 0.30, 0.0) * 1.5;
  // cap suave p/ não estourar em branco
  col = col / (1.0 + col * 0.3);
  // vinheta suave: afunda levemente o centro (onde fica o texto)
  float vig = smoothstep(0.05, 0.95, length(vUv - vec2(0.5, 0.5)));
  col *= mix(0.6, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`;

// Parâmetros ajustáveis do visual
const COLOR = [0.34, 0.11, 0.02]; // laranja dim — fundo escuro, veios laranja brilhantes
const DETAIL = 1.4;
const DISTORTION = 2.6;
const BRIGHTNESS = 1.0;
const SPEED = 0.42;

export default function ElectricLava() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "high-performance" });
    if (!gl) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const compile = (type: number, src: string) => {
      const s = gl.createShader(type)!;
      gl.shaderSource(s, src);
      gl.compileShader(s);
      return s;
    };
    const prog = gl.createProgram()!;
    gl.attachShader(prog, compile(gl.VERTEX_SHADER, VERT));
    gl.attachShader(prog, compile(gl.FRAGMENT_SHADER, FRAG));
    gl.linkProgram(prog);
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, "a_pos");
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(prog, "uTime");
    const uRes = gl.getUniformLocation(prog, "uResolution");
    gl.uniform3f(gl.getUniformLocation(prog, "uColor"), COLOR[0], COLOR[1], COLOR[2]);
    gl.uniform1f(gl.getUniformLocation(prog, "uDetail"), DETAIL);
    gl.uniform1f(gl.getUniformLocation(prog, "uDistortion"), DISTORTION);
    gl.uniform1f(gl.getUniformLocation(prog, "uBrightness"), BRIGHTNESS);

    const scale = 0.66;
    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = Math.max(1, Math.floor((rect?.width ?? window.innerWidth) * scale));
      const h = Math.max(1, Math.floor((rect?.height ?? 560) * scale));
      canvas.width = w; canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();
    window.addEventListener("resize", resize);

    let raf = 0, start = 0;
    const render = (ts: number) => {
      if (!start) start = ts;
      gl.uniform1f(uTime, ((ts - start) / 1000) * SPEED);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      if (!reduce) raf = requestAnimationFrame(render);
    };
    if (reduce) {
      gl.uniform1f(uTime, 3.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      raf = requestAnimationFrame(render);
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={ref} className="plasma-canvas" aria-hidden="true" />;
}
