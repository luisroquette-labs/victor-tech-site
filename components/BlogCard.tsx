import Link from "next/link";
import PostCover from "./PostCover";
import type { Post } from "../app/posts";

export default function BlogCard({ post }: { post: Post }) {
  return (
    <Link href={`/blog/${post.slug}`} className="post-card">
      <PostCover slug={post.slug} />
      <div className="pc-body">
        <span className="pc-cat">{post.category}</span>
        <h3>{post.title}</h3>
        <p className="pc-ex">{post.excerpt}</p>
        <span className="pc-meta">
          {new Date(post.date + "T00:00:00").toLocaleDateString("pt-BR", { day: "2-digit", month: "short", year: "numeric" })} · {post.readMin} min
        </span>
      </div>
    </Link>
  );
}
