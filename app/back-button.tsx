import ContentfulImage from "../lib/contentful-image";
import BackButtonSVG from "./assets/BackButton.svg"
import Link from "next/link";

function cn(...classes: any[]) {
  return classes.filter(Boolean).join(" ");
}

export default function BackButton({
src,
  slug,
}: {
  src: any;
  url: string;
  slug?: string;
}) {
  const image = (
    <ContentfulImage
    src={BackButtonSVG}
    height="100"
    alt="Back Button"
    />
  );

  return (
    <div className="image">
      {slug ? (
        <Link href={`/`} aria-label="Back Button">
          {image}
        </Link>
      ) : (
        image
      )}
    </div>
  );
}
