import "./globals.css";
import { Inter } from "next/font/google";
import GitHubLogo from "./assets/github.svg";
import LinkedInLogo from "./assets/linkedin.svg"
import ContentfulImage from "../lib/contentful-image";

export const metadata = {
  title: `Portfolio Website`,
  description: `This is a portfolio built with Next.js and Contentful.`,
};

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

function Footer() {
  return (
    <footer>
      <div className="footer-container">
        <div className="social-links">
          <div className="link-container">
            <a href="https://github.com">
                <ContentfulImage
                src={GitHubLogo}
                height="100"
                className="rounded-full"
                alt="github logo"
              />
            </a>
          </div>
          <div className="link-container">
            <a href="https://linkedin.com">
                <ContentfulImage
                src={LinkedInLogo}
                height="100"
                className="rounded-full"
                alt="linkedin logo"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <section className="homepage">
          <main>{children}</main>
          <Footer />
        </section>
      </body>
    </html>
  );
}
