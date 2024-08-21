import Link from "next/link";
import CoverImage from "./cover-image";

function PostPreview({
  title,
  image,
  shortDescription,
  slug,
}: {
  title: string;
  image: any;
  shortDescription: string;
  slug: string;
}) {
  return (
    <div className="project">
      <div className="project-title">
        <CoverImage title={title} slug={slug} url={image.url} />
      </div>
      <div className="project-content">
        <h3 className="">
          <Link href={`/projects/${slug}`} className="project-link">
            {title}
          </Link>
        </h3>
        <p className="project-description">{shortDescription}</p>
        <Link href={`/projects/${slug}`} className="project-button">
          Learn More
        </Link>
      </div>
    </div>
  );
}

export default function Projects({ morePosts }: { morePosts: any[] }) {
  return (
    <section>
      <h2 className="project-header">
        Projects. 
      </h2>
      <div className="projects">
        {morePosts.map((post) => (
          <PostPreview
            key={post.slug}
            title={post.title}
            image={post.image}
            slug={post.slug}
            shortDescription={post.shortDescription}
          />
        ))}
      </div>
    </section>
  );
}
