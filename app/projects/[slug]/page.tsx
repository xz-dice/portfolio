import Link from "next/link";
import { draftMode } from "next/headers";
import CoverImage from "../../cover-image";
import { Markdown } from "@/lib/markdown";
import { getAllPosts, getPost } from "@/lib/api";

export async function generateStaticParams() {
  const allPosts = await getAllPosts(false);

  return allPosts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function PostPage({
  params,
}: {
  params: { slug: string };
}) {
  const { isEnabled } = draftMode();
  const { post } = await getPost(params.slug, isEnabled);

  return (
    <div className="project-page">
      <h2 className="project-heading">
        <span className="logo">⬅️</span>
        <Link href="/" className="">
          Home
        </Link>
        .
      </h2>
      <article>
      <div className="project-image">
        <CoverImage title={post.title} url={post.image.url} />
      </div>
        <h1 className="project-title">
          {post.title}
        </h1>
        <p className="subtitle">{post.shortDescription}</p>
        <div className="links">
        {post.gitHubLink && (
            <a href={post.gitHubLink} target="_blank">GitHub</a>
          )}
        </div>
        <div className="project-description">
          <div className="content">
            <Markdown content={post.longDescription} />
          </div>
        </div>
      </article>
    </div>
  );
}
