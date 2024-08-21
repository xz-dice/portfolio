import { draftMode } from "next/headers";

import Projects from "./projects";


import { getAllPosts, getHeroSection, getAboutSection } from "@/lib/api";

export default async function Page() {
  const { isEnabled } = draftMode();
  const allPosts = await getAllPosts(isEnabled);
  const morePosts = allPosts;
  const hero = await getHeroSection(isEnabled);
  const heroItem = hero[0];
  const about = await getAboutSection(isEnabled);
  const aboutItem = about[0];

  return (
    <section className="homepage-content">
      <section className="navigation">
        <div className="logo">
          <p>💙</p>
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
            <p>{aboutItem.aboutDescription}</p>
          </section>
        </section>
        <section className="page-right">
          <Projects morePosts={morePosts} />
        </section>
      </div>
    </section>
  );
}
