"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { ArrowDownRight, ArrowUpRight, ChevronDown, Circle, Github, Linkedin, Menu, Sparkles } from "lucide-react";
import { useEffect, useState } from "react";

const projects = [
  { n: "01", type: "INTELLIGENT SYSTEMS", title: "Systems that turn complexity into clarity.", body: "A future case study for an AI-enabled product, automation, or data system. Frame the human problem first, then make the engineering visible.", tags: ["AI / Data", "Product"], color: "violet" },
  { n: "02", type: "FULL STACK PRODUCT", title: "Products built around real behaviour.", body: "A space for a complete product narrative: the users, the interface, the architecture, the iterations, and the evidence of value created.", tags: ["Engineering", "UX"], color: "blue" },
  { n: "03", type: "RESEARCH × IMPACT", title: "Questions worth building toward.", body: "Research is presented as a live practice: a question, a method, an experiment, a result, and the next frontier to investigate.", tags: ["Research", "Impact"], color: "amber" },
];

function MagneticLink({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const [xy, setXy] = useState({ x: 0, y: 0 });
  return <motion.a className={className} href="#build" onMouseMove={(e) => { const r = e.currentTarget.getBoundingClientRect(); setXy({ x: (e.clientX - r.left - r.width / 2) * .12, y: (e.clientY - r.top - r.height / 2) * .12 }); }} onMouseLeave={() => setXy({ x: 0, y: 0 })} animate={xy} transition={{ type: "spring", stiffness: 220, damping: 13 }}>{children}</motion.a>;
}

export default function Home() {
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const [menu, setMenu] = useState(false);
  useEffect(() => { document.documentElement.style.scrollBehavior = "smooth"; }, []);
  return <main>
    <motion.div className="progress" style={{ scaleX: progress }} />
    <nav className="nav"><a className="wordmark" href="#top">Meriem<span>.</span></a><div className={menu ? "navlinks open" : "navlinks"}><a href="#build">Build</a><a href="#think">Think</a><a href="#impact">Lead</a><a href="#vision">Vision</a></div><MagneticLink className="nav-cta">Let&apos;s connect <ArrowUpRight size={15}/></MagneticLink><button className="menu" onClick={() => setMenu(!menu)} aria-label="Toggle menu"><Menu size={21}/></button></nav>

    <section className="hero" id="top">
      <div className="hero-copy"><motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .7 }} className="eyebrow"><span className="live"/> DIGITAL HEADQUARTERS / MOROCCO</motion.p>
        <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .85, delay: .1 }}>Building the systems <em>behind</em> ambitious ideas.</motion.h1>
        <motion.div initial={{ opacity: 0, y: 22 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: .8, delay: .28 }} className="hero-bottom"><p>Engineering, artificial intelligence, research, and strategy—applied to problems worth solving.</p><MagneticLink className="button dark">Explore the work <ArrowDownRight size={18}/></MagneticLink></motion.div>
      </div>
      <div className="constellation" aria-hidden="true"><div className="orbit orbit-a"/><div className="orbit orbit-b"/><div className="orbit orbit-c"/><i className="node n1"><Sparkles size={15}/></i><i className="node n2"/><i className="node n3"/><i className="node n4"/><div className="core">M<br/>L</div><span className="label l1">ENGINEERING</span><span className="label l2">INTELLIGENCE</span><span className="label l3">RESEARCH</span><span className="label l4">IMPACT</span></div>
      <a className="scroll" href="#intro">SCROLL TO EXPLORE <ChevronDown size={16}/></a>
    </section>

    <section className="intro section" id="intro"><p className="index">01 — THE PREMISE</p><div><p className="overline">NOT A PORTFOLIO. A POINT OF VIEW.</p><h2>An engineer who understands that technology only matters when it <em>moves people forward.</em></h2></div><p className="intro-note">Meriem Lmoubariki works at the intersection of technical execution, intellectual curiosity, and entrepreneurial conviction. The goal is not simply to ship features—but to create systems, products, and ideas that compound into impact.</p></section>

    <section className="domains section" id="think"><div className="section-head"><p className="index">02 — THE OPERATING SYSTEM</p><h2>One builder.<br/><em>Five disciplines.</em></h2></div><div className="domain-grid">{[["01", "Engineering", "Designing dependable digital infrastructure—from interfaces and APIs to systems built to scale."], ["02", "Intelligence", "Applying AI, data, and automation with a bias toward useful, responsible outcomes."], ["03", "Research", "Turning curiosity into structured inquiry, evidence, and deeper technical questions."], ["04", "Strategy", "Seeing products as choices: users, markets, leverage, and opportunities worth pursuing."], ["05", "Leadership", "Bringing people, momentum, and direction to initiatives that need all three."]].map(([n,t,b]) => <article className="domain" key={n}><span>{n}</span><ArrowUpRight size={19}/><h3>{t}</h3><p>{b}</p></article>)}</div></section>

    <section className="work section" id="build"><div className="section-head"><p className="index">03 — SELECTED BUILDING</p><h2>Proof lives in the <em>process.</em></h2><p>Each project is a case study in how a difficult problem became a clearer system.</p></div><div className="project-list">{projects.map((p, i) => <motion.article className={`project ${p.color}`} key={p.n} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: .22 }} transition={{ delay: i * .08 }}><div className="project-visual"><span className="project-number">{p.n}</span><div className="wireframe"><i/><i/><i/><i/></div><span className="visual-caption">Replace with real project visual</span></div><div className="project-copy"><p className="overline">{p.type}</p><h3>{p.title}</h3><p>{p.body}</p><div className="tags">{p.tags.map(t => <span key={t}>{t}</span>)}</div><a href="#connect">Open case study <ArrowUpRight size={17}/></a></div></motion.article>)}</div></section>

    <section className="method section"><p className="index">04 — HOW I WORK</p><div className="method-main"><h2>From ambiguity<br/>to <em>momentum.</em></h2><div className="method-steps">{[["Listen", "Find the real problem beneath the initial request."], ["Frame", "Define success, constraints, people, and the decision that matters."], ["Build", "Create the smallest system capable of producing a meaningful signal."], ["Learn", "Measure what happened, improve the system, and raise the ambition."]].map(([n,b], i) => <div className="step" key={n}><span>0{i+1}</span><h3>{n}</h3><p>{b}</p></div>)}</div></div></section>

    <section className="impact section" id="impact"><div className="impact-copy"><p className="index">05 — LEADERSHIP & IMPACT</p><h2>Great work is rarely a <em>solo act.</em></h2><p>Technical capability gains force when it is paired with communication, initiative, and a commitment to the people affected by the work.</p><a className="text-link" href="#connect">Explore the impact record <ArrowUpRight size={17}/></a></div><div className="impact-stats"><div><strong>01</strong><span>Build initiatives that make opportunity more accessible.</span></div><div><strong>02</strong><span>Lead with clarity, momentum, and intellectual generosity.</span></div><div><strong>03</strong><span>Measure impact in outcomes—not activity.</span></div></div></section>

    <section className="vision section" id="vision"><div className="vision-star"><Circle size={15}/><Circle size={9}/><Circle size={12}/></div><p className="overline">THE LONG GAME</p><h2>Preparing to create<br/>the opportunities <em>next.</em></h2><p>The future Meriem is building toward combines rigorous research, intelligent products, entrepreneurial action, and global contribution. This is the beginning of a body of work—not a final statement.</p><MagneticLink className="button light">Read the vision <ArrowUpRight size={18}/></MagneticLink></section>

    <footer id="connect"><div><p className="overline">START A CONVERSATION</p><h2>Let&apos;s build<br/><em>what matters.</em></h2></div><div className="footer-actions"><a className="email" href="mailto:hello@meriemlmoubariki.com">hello@meriemlmoubariki.com <ArrowUpRight size={20}/></a><p>For recruiting, research, founding, and meaningful collaborations.</p><div className="socials"><a href="#" aria-label="LinkedIn"><Linkedin size={19}/></a><a href="#" aria-label="GitHub"><Github size={19}/></a></div></div><div className="footer-bottom"><span>© 2026 MERIEM LMOUBARIKI</span><span>BUILT WITH INTENTION</span></div></footer>
  </main>;
}
