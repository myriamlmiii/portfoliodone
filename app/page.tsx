import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Highlights } from "@/components/Highlights";
import { About } from "@/components/About";
import { Skills } from "@/components/Skills";
import { Work } from "@/components/Work";
import { Experience } from "@/components/Experience";
import { Education } from "@/components/Education";
import { Record } from "@/components/Record";
import { Causes } from "@/components/Causes";
import { Places } from "@/components/Places";
import { Life } from "@/components/Life";
import { Vision } from "@/components/Vision";
import { Contact } from "@/components/Contact";
import { CreditsOutro } from "@/components/CreditsOutro";

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <Highlights />
      <About />
      <Skills />
      <Work />
      <Experience />
      <Education />
      <Record />
      <Places />
      <Life />
      <Vision />
      <Causes />
      <Contact />
      <CreditsOutro />
    </main>
  );
}
