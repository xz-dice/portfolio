import { draftMode } from "next/headers";
import { Markdown } from "@/lib/markdown";

import Projects from "./projects";
import Laptop from "./assets/laptop.png"
import ContentfulImage from "../lib/contentful-image";

import { getAllPosts, getHeroSection, getAboutSection } from "@/lib/api";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allProjects = await getAllPosts(isEnabled);
  const hero = await getHeroSection(isEnabled);
  const heroItem = hero[0];
  const about = await getAboutSection(isEnabled);
  const aboutItem = about[0];

  return (
    <section className="homepage-content">
      <section className="navigation">
        <div className="logo">
        <ContentfulImage
          src={Laptop}
          height="60"
          className="rounded-full"
          alt="github logo"
        />
        </div>
        <div className="nav-links">
          <a href="#">GitHub</a>
          <a href="#">Resume</a>
        </div>
      </section>
      <div className="homepage-sections">
        <section className="page-left">
          <section className="hero-section">
            <h1>{heroItem.title}</h1>
            <p className="subtitle">{heroItem.subtitle}</p>
          </section>
          <hr/>
          <section className="about-section" id="about">
            <h2>{aboutItem.title}</h2>
            <div className="about-content">
              <Markdown content={aboutItem.description} />
            </div>
          </section>
        </section>
        <section className="page-right">
          <Projects morePosts={allProjects} />
        </section>
      </div>
    </section>
  );
}
