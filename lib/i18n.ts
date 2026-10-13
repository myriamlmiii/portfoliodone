export type Locale = "en" | "fr" | "ar";
export type Theme = "light" | "dark";

export const locales: readonly Locale[] = ["en", "fr", "ar"];

export const localeMeta: Record<Locale, { label: string; dir: "ltr" | "rtl"; htmlLang: string }> = {
  en: { label: "EN", dir: "ltr", htmlLang: "en" },
  fr: { label: "FR", dir: "ltr", htmlLang: "fr" },
  ar: { label: "ع", dir: "rtl", htmlLang: "ar" },
};

type Dict = {
  nav: Record<string, string>;
  life: { kicker: string; titleBefore: string; titleAccent: string; intro: string; items: { title: string; detail: string }[] };
  talk: string;
  menu: string;
  themeLight: string;
  themeDark: string;
  language: string;
  journeyKicker: string;
  journey: readonly string[];
  countries: Record<string, string>;
  hero: { kicker: string; title: string; body: string; cta: string; scroll: string; facts: { label: string; value: string }[]; stats: string[] };
  about: { kicker: string; title: string; lead: string; p1: string; p2: string; p3: string; p4: string; headed: string; facts: { label: string; value: string }[]; accreditation: string };
  causes: { kicker: string; titleBefore: string; titleAccent: string; intro: string; items: { title: string; body: string; link?: string }[] };
  places: { kicker: string; titleBefore: string; titleAccent: string; intro: string; home: string; items: Record<string, { name: string; note: string }> };
  authority: string;
  work: { kicker: string; titleBefore: string; titleAccent: string; also: string; caseStudy: string; filters: Record<"all" | "ai" | "research" | "fullstack" | "data", string> };
  education: {
    kicker: string;
    titleBefore: string;
    titleAccent: string;
    builtHere: string;
    campusRoles: string;
    entries: Record<string, { degree?: string; location?: string; dateRange?: string; highlights?: string[] }>;
  };
  projects: Record<string, { category: string; outcome: string }>;
  more: Record<string, string>;
  record: { kicker: string; titleBefore: string; titleAccent: string; intro: string; groups: Record<string, string>; status: Record<"published" | "presented" | "submitted" | "in-progress", string>; totalLabel: string; archiveLabel: string; entriesLabel: string; indexNote: string; paperNote: string };
  recordDetails: Record<string, string>;
  skills: { kicker: string; titleBefore: string; titleAccent: string; stack: string; stackGroups: Record<string, string>; items: { name: string; description: string }[] };
  method: { kicker: string; titleBefore: string; titleAccent: string; steps: { title: string; body: string }[] };
  experience: { kicker: string; titleBefore: string; titleAccent: string; groups: Record<"professional" | "campus" | "other", string>; current: string; roles: Record<string, { title: string; dateRange: string; location?: string; detail?: string; description: string }> };
  impact: { kicker: string; titleBefore: string; titleAccent: string; body: string; cta: string; stats: string[] };
  vision: { kicker: string; titleBefore: string; titleAccent: string; accepted: string; acceptedNames: string[]; acceptedDetails: string[] };
  contact: {
    kicker: string;
    intro: string;
    meeting: string;
    meetingNote: string;
    titleBefore: string;
    titleAccent: string;
    cv: string;
    cvNote: string;
    cvSubject: string;
    cvBody: string;
    references: string;
    referencesBody: string;
    referencesCta: string;
    referencesSubject: string;
    referencesEmailBody: string;
    footer: string;
    formName: string;
    formEmail: string;
    formMessage: string;
    formSend: string;
    formSending: string;
    formSent: string;
    formError: string;
    formHint: string;
    book: string;
    bookHint: string;
    bookDate: string;
    bookTime: string;
    bookTopic: string;
    bookSend: string;
    bookSending: string;
    bookSent: string;
    bookError: string;
    bookZone: string;
  };
};

const en: Dict = {
  nav: { About: "About", Work: "Work", Record: "Record", Life: "Life", Skills: "Skills", Experience: "Experience", Impact: "Impact", Contact: "Contact", Projects: "Projects", Education: "Education", Research: "Research", Causes: "Causes", Places: "Places" },
  talk: "Book a meeting",
  menu: "Menu",
  themeLight: "Light mode",
  themeDark: "Night mode",
  language: "Language",
  journeyKicker: "The journey so far",
  journey: [
    "Moroccan Student",
    "Scholarship Recipient",
    "First AUI (Morocco) exchange student at UFV",
    "Automation Intern in Portugal",
    "Cancer Drug Discovery Researcher in Thailand",
    "Tech Lead at U-Investors",
    "Founder & Builder",
  ],
  countries: { Morocco: "Morocco", Canada: "Canada", Portugal: "Portugal", Thailand: "Thailand" },
  hero: {
    kicker: "AI Engineer & Researcher",
    title: "I build AI systems that make complex operations less costly, more efficient, and more predictable.",
    body: "Final-year Computer Science student at Al Akhawayn University, concentrating in AI & Big Data. Recent work spans breast cancer drug discovery at KMUTT, a RAG system built as learning infrastructure for Al Akhawayn University, and an AI deal-flow CRM deployed as U-Investors' internal ERP.",
    cta: "View projects",
    scroll: "Scroll to explore",
    facts: [{"label":"Currently","value":"Tech Lead at U-Investors · Research Assistant and Teaching Assistant at AUI"},{"label":"Based in","value":"Morocco"}],
    stats: ["compounds screened in breast cancer medication testing research","retrieval pass rate on the RAG class assistant","orders delivered by delivery2dorms","Best Startup Award for Bliss Bites"],
  },
  about: {"kicker":"About","title":"Engineer, researcher, founder.","lead":"From Beni Tajjit in southeastern Morocco to research labs in Canada and Thailand, I build AI that does real work, and I bring my community with me.","p1":"I'm Meriem Lmoubariki, from Beni Tajjit in southeastern Morocco. I'm in my final year of a B.S. in Computer Science at Al Akhawayn University in Ifrane (2022 to December 2026), concentrating in AI and Big Data Analytics with a minor in Business Administration. I study on a 60% Merit Scholarship and made the Dean's List in Spring 2024 and Fall 2025.","p2":"In fall 2025 I spent a semester at the University of the Fraser Valley in British Columbia, Canada, through AUI's bilateral exchange, as the first exchange student from AUI (Morocco) to attend UFV. I studied machine learning, NLP, and finance, worked as an ML research assistant in the School of Computing under Dr. Russell Campbell and Dr. Mike Ivanof, and presented a paper at BC Cancer Research Day in Vancouver.","p3":"I measure my work in results. At KMUTT in Bangkok, I screened 51,837 compounds in breast cancer medication research (ROC-AUC 0.978 with Extra Trees) and narrowed them to 8 candidates; the strongest, NPA020664, docked at −8.96 kcal/mol. At U-Investors, I run AI across 247 live deals. My Calculus II RAG assistant reaches 88.9% retrieval accuracy. Before that, I worked on predictive maintenance at TAQA Morocco, which produces about 35% of the country's electricity, and on automation at Ravel Future in Lisbon, where decisions became 35% faster.","p4":"Leadership matters to me as much as code. I was accepted into the fully funded LeadGreen Fellowship (Cohort 4), a pan-African climate leadership program selected from 6,000 applicants. I founded Bliss Bites, an agrifood startup that won AUI's Best Startup Award two years in a row with full investor funding, and Phi Nu, AUI's first sorority, which 50 members have joined. At UFV, I initiated the Alpha Pi Phi Cygnet chapter. I also write (Future Young Writer Award at 16), DJ as DJ Mimi, play futsal, and swim.","headed":"See where I'm headed","facts":[{"label":"Hometown","value":"Beni Tajjit, Morocco"},{"label":"University","value":"Al Akhawayn University, Class of Dec 2026"},{"label":"Focus","value":"AI & Big Data Analytics, Business minor"},{"label":"Honors","value":"60% Merit Scholarship, Dean's List ×2"},{"label":"Exchange","value":"University of the Fraser Valley, Canada"},{"label":"Languages","value":"Arabic, French (C1), English (IELTS 7)"}],"accreditation":"About AUI: the first non-US university in Africa accredited by NECHE, the US accreditor of Harvard, MIT, and Yale (since 2017, renewed through 2032). Computer Science is ABET-accredited, the School of Business holds EFMD EPAS accreditation, and the university is recognized by Morocco's Ministry of Higher Education (MESRS)."},
  causes: {"kicker":"Causes","titleBefore":"What I stand for. ","titleAccent":"And who I build for.","intro":"Technology should widen the circle of who gets to lead, and whose knowledge counts.","items":[{"title":"Youth leadership","body":"I believe young people are ready to lead now, not someday. I founded Phi Nu, AUI's first sorority, to welcome women from different regions and backgrounds, especially those with fewer resources or access to campus networks. I also initiated a chapter at UFV, was elected to the Student Government Association, and keep opening doors for those who come after me."},{"title":"Indigenous knowledge","body":"Indigenous communities carry generations of ecological knowledge that is too easily lost. I built AgriVerse to help keep it alive: it pairs Indigenous land knowledge with machine learning so farms can make more sustainable decisions. It won 1st place at the UFV Community Ideation Jam 2025.","link":"/projects/agriverse"},{"title":"Community & network","body":"Through fellowships, research labs, startups, and volunteering, I've built a strong community across Morocco, Canada, Thailand, Portugal, and the pan-African climate network. I show up for it, and it shows up for me."}]},
  places: {"kicker":"Places","titleBefore":"Rooted in Morocco. ","titleAccent":"Shaped around the world.","intro":"Every place on this map changed how I work.","home":"Home","items":{"beniTajjit":{"name":"Beni Tajjit, Morocco","note":"Where I'm from"},"ifrane":{"name":"Ifrane, Morocco","note":"Al Akhawayn University, 2022 to 2026"},"abbotsford":{"name":"Abbotsford, Canada","note":"Exchange at the University of the Fraser Valley, Fall 2025"},"vancouver":{"name":"Vancouver, Canada","note":"Presented research at BC Cancer Research Day"},"bangkok":{"name":"Bangkok, Thailand","note":"Breast cancer research at KMUTT, 2026"},"lisbon":{"name":"Lisbon, Portugal","note":"AI & automation at Ravel Future"}}},
  authority: "Studied, worked, and built alongside",
  life: {
    kicker: "Beyond work",
    titleBefore: "From Beni Tajjit ",
    titleAccent: "to every room that asks more.",
    intro:
      "The lab and the product are only part of it. I write, DJ, volunteer, compete, and stay in rooms that make the work better.",
    items: [
      {
        title: "Writer",
        detail:
          "Future Young Writer Award, youngest recipient at 16 (2022), grant from Groupe Scolaire Lange Bleu. I organized a poetry reading at Dar El Ajaza retirement home with that grant. Unpublished French novel: Frénésie.",
      },
      {
        title: "DJ Mimi & campus life",
        detail:
          "First female DJ in AUI history (techno / schranz, Numark). Elected to the Student Government Association (2024). Guitar and piano in the AUI auditorium.",
      },
      {
        title: "Sororities",
        detail: "Founded Phi Nu, AUI's first sorority, from scratch in 2026; 50 members joined. Previously initiated the Alpha Pi Phi Cygnet Chapter chartering process at UFV (2025).",
      },
      {
        title: "Languages",
        detail:
          "Arabic (native). French: DALF C1 and DELF B2 (93/100). English: IELTS Band 7 and TOEFL (AUI). I work, teach, and write across all three.",
      },
      {
        title: "Volunteer",
        detail:
          "Lions Club medical campaigns in rural Morocco. Hands in Hands humanitarian caravans. ALCS HIV/AIDS and women-focused prevention. AUI graduation (1,250+ attendees). BC Cancer Research Day volunteer. Scholars of Sustenance food rescue in Bangkok. IOSN Ifrane.",
      },
      {
        title: "Sport",
        detail:
          "Futsal and swimming. Gold medal, Best Young Local Swimmer, Doukkala (2018). AUI women's futsal team, 3rd place at the Cubs Tournament (May 2023).",
      },
    ],
  },
  work: { kicker: "Projects", titleBefore: "Things I've built, ", titleAccent: "with the numbers behind them.", also: "More projects", caseStudy: "Case study", filters: {"all":"All","ai":"AI & ML","research":"Research","fullstack":"Full-stack","data":"Data"} },
  education: {
    kicker: "Education",
    titleBefore: "Where I ",
    titleAccent: "studied.",
    builtHere: "Built here:",
    campusRoles: "Explore all six campus roles",
    entries: {},
  },
  projects: {
    "ai-drug-discovery": {
      category: "Breast Cancer Research, KMUTT Bangkok",
      outcome: "Breast cancer drug discovery at KMUTT in Bangkok, Thailand (June to July 2026). 51,837 fungal compounds screened down to 8 candidates. ROC-AUC 0.978 (Extra Trees), top hit at −8.96 kcal/mol.",
    },
    "rag-class-assistant": {
      category: "Applied AI, AUI",
      outcome: "88.9% retrieval pass rate on Calculus II notes after hybrid search, rerank, and HyDE.",
    },
    "the-observer": {
      category: "Interactive Research",
      outcome: "Live at the-observer.pages.dev. A synthetic observer tests when a universe becomes compressible enough to admit a law.",
    },
    "safelens-ai": {
      category: "Computer Vision, GITEX",
      outcome: "YOLOv8 PPE and hazard detection, shown on the GITEX Africa 2024 floor.",
    },
  },
  more: {
    "Meeting Intelligence System": "Speaker diarization on the AMI corpus under Dr. Russell Campbell. Built for Teams.",
    "RAG Class Assistant": "88.9% retrieval pass rate on Calculus II notes. FAISS, BM25, rerank, HyDE.",
    "Internal CRM System: AI Screening and Sourcing": "Built at U-Investors and deployed as the company's internal ERP. 247 live startup records, from Airtable deal-flow to an investment dashboard.",
    "darija-gap": "Darija evaluation harness for GPT-5.6. OpenAI Build Week, 2025.",
    CryptoVault: "Azure-hosted FastAPI crypto dashboard with automated ReportLab PDFs.",
    "Spark Kafka Pipeline": "99% uptime. Dockerized Spark, Kafka, HDFS, Hive.",
    ClarityBot: "Document summarization chatbot. Next.js, HuggingFace Transformers, OpenRouter LLMs.",
    "Darija Word2Vec": "3 million Moroccan Arabic sentences. Gensim embeddings.",
    "Montreal AQI Forecasting": "79.9% error reduction versus the time-series baseline.",
    "Toxic Tweet Detection": "Multi-class hate-speech model. 4 architectures compared, best SimpleRNN at 86% accuracy.",
    Propify: "She Hacks × BCG X, 2025. Tax logic, AI maintenance, tenant score.",
    AgriVerse: "1st place, UFV jam ($500). Being implemented on Fraser Valley farms.",
    Delivery2Dorms: "500+ deliveries, solo on foot from the Ain gate, including snow.",
  },
  record: {
    kicker: "Research & honors",
    titleBefore: "Papers, rooms, and ",
    titleAccent: "honors.",
    intro: "A working record of the questions I pursue, the rooms where I share the work, and the recognition earned along the way.",
    groups: { research: "Research", rooms: "Rooms", honors: "Honors", credentials: "Credentials", Research: "Research", Rooms: "Rooms", Honors: "Honors", Credentials: "Credentials", Papers: "Papers", "Talks & conferences": "Talks & conferences", "Awards & honors": "Awards & honors", Certifications: "Certifications", "Hackathons & competitions": "Hackathons & competitions", "Programs & fellowships": "Programs & fellowships", "AI & machine learning": "AI & machine learning", Cybersecurity: "Cybersecurity", "Web development": "Web development", "Analytics & marketing": "Analytics & marketing", Education: "Education", Languages: "Languages" },
    status: { published: "Published", presented: "Presented", submitted: "Submitted", "in-progress": "In progress" },
    totalLabel: "selected records",
    archiveLabel: "Archive",
    entriesLabel: "entries",
    indexNote: "Indexed by subject. Each entry keeps its date, standing, and source together.",
    paperNote: "Open linked papers or the technical slide deck for the source material.",
  },
  recordDetails: {},
  skills: {
    kicker: "Skills",
    titleBefore: "One builder. ",
    titleAccent: "Four disciplines.",
    stack: "Stack",
    stackGroups: {},
    items: [
      { name: "Applied AI & Data", description: "Building machine learning and data systems that improve a real decision, not just automate a task." },
      { name: "Computational Research", description: "Turning curiosity into structured inquiry: a question, a method, evidence, and a sharper next question." },
      { name: "Product & Strategy", description: "Framing technical work around users, constraints, and the leverage worth pursuing." },
      { name: "Software Engineering", description: "Designing dependable full-stack systems, from interfaces and APIs to the infrastructure they run on." },
    ],
  },
  method: {
    kicker: "How I Work",
    titleBefore: "From ambiguity ",
    titleAccent: "to momentum.",
    steps: [
      { title: "Listen", body: "Find the real problem beneath the initial request." },
      { title: "Frame", body: "Define success, constraints, people, and the decision that matters." },
      { title: "Build", body: "Create the smallest system capable of producing a meaningful signal." },
      { title: "Learn", body: "Measure what happened, improve the system, and raise the ambition." },
    ],
  },
  experience: {
    kicker: "Experience",
    titleBefore: "Research, internships, ",
    titleAccent: "and work that shipped.",
    groups: {"professional":"Professional","campus":"Campus jobs","other":"Other jobs & leadership"},
    current: "Current",
    roles: {},
  },
  impact: {
    kicker: "Leadership & Impact",
    titleBefore: "The work is the ",
    titleAccent: "output.",
    body: "51,837 compounds screened. 88.9% retrieval. 247 live deals. 500+ deliveries. Those numbers are the work, not decoration.",
    cta: "Explore the record",
    stats: [
      "MeFSAT compounds screened for CYP19A1",
      "RAG retrieval pass rate, Calculus II",
      "Live VC deals in the U-Investors pipeline",
      "Campus deliveries on foot, Delivery2Dorms",
    ],
  },
  vision: {
    kicker: "What's next",
    titleBefore: "Preparing for the next ",
    titleAccent: "frontier.",
    accepted: "Accepted",
    acceptedNames: [
      "LeadGreen Fellowship, Cohort 4",
      "William Davidson Institute Climate Entrepreneurship Exchange",
      "Intra-Africa 2063 Competition",
    ],
    acceptedDetails: [
      "Accepted. Selected from 6,000 applicants. Fully funded pan-African climate leadership.",
      "Cohort 3, AUI × University of Michigan",
      "Accepted to represent AUI. Selected only from AUI. 5th edition, Pharos University, Alexandria, Egypt. AUI-sponsored.",
    ],
  },
  contact: {
    kicker: "Contact",
    intro: "The fastest way to reach me. Résumé and recommendation letters on request.",
    references: "6+ letters of recommendation",
    referencesBody: "Available on request. I'll send them by email together with my résumé.",
    referencesCta: "Request résumé & letters",
    referencesSubject: "Request: résumé and recommendation letters",
    referencesEmailBody: "Hi Meriem,\n\nCould you send me your résumé and recommendation letters?\n\n",
    meeting: "Book a 30-min meeting",
    meetingNote: "Weekday slots, Morocco time",
    titleBefore: "Let's build ",
    titleAccent: "what matters.",
    cv: "Request CV by email",
    cvNote: "The CV is private. Ask for it by email.",
    cvSubject: "CV request, Meriem Lmoubariki",
    cvBody: "Hi Meriem,\n\nI would like to request a copy of your CV.\n\n",
    footer: "AI Engineer · Researcher · Morocco",
    formName: "Name",
    formEmail: "Email",
    formMessage: "Message",
    formSend: "Send message",
    formSending: "Sending",
    formSent: "Thanks. Your email app will open so the message reaches me.",
    formError: "Please add a name, a valid email, and a short message.",
    formHint: "The server checks the form, then opens your email app so I actually receive it.",
    book: "Book a 30-min meeting",
    bookHint: "Pick a weekday slot in Morocco time. The request lands in my inbox so we can confirm.",
    bookDate: "Date",
    bookTime: "Time",
    bookTopic: "What should we talk about",
    bookSend: "Request this slot",
    bookSending: "Sending",
    bookSent: "Thanks. Your email app will open with the meeting request.",
    bookError: "Pick a name, email, date, and time.",
    bookZone: "Morocco time (Casablanca)",
  },
};

const fr: Dict = {
  nav: { About: "À propos", Work: "Projets", Record: "Parcours", Life: "Vie", Skills: "Compétences", Experience: "Expérience", Impact: "Impact", Contact: "Contact", Projects: "Projets", Education: "Formation", Research: "Recherche", Causes: "Engagements", Places: "Lieux" },
  talk: "Réserver",
  menu: "Menu",
  themeLight: "Mode clair",
  themeDark: "Mode nuit",
  language: "Langue",
  journeyKicker: "Le chemin jusqu'ici",
  journey: [
    "Étudiante marocaine",
    "Boursière au mérite",
    "Première personne en échange d'AUI (Maroc) à l'UFV",
    "Stagiaire automatisation au Portugal",
    "Chercheuse en découverte de médicaments en Thaïlande",
    "Tech Lead chez U-Investors",
    "Fondatrice et bâtisseuse",
  ],
  countries: { Morocco: "Maroc", Canada: "Canada", Portugal: "Portugal", Thailand: "Thaïlande" },
  hero: {
    kicker: "Ingénieure IA et chercheuse",
    title: "Je crée des systèmes d'IA qui rendent les opérations complexes moins coûteuses, plus efficaces et plus prévisibles.",
    body: "Étudiante en dernière année d'informatique à l'Université Al Akhawayn, concentration IA et Big Data. Travaux récents : découverte de médicaments contre le cancer du sein à KMUTT, un système RAG conçu comme infrastructure pédagogique pour l'Université Al Akhawayn, et un CRM IA de deal-flow déployé comme ERP interne chez U-Investors.",
    cta: "Voir les projets",
    scroll: "Défiler pour explorer",
    facts: [{"label":"Actuellement","value":"Tech Lead chez U-Investors · Assistante de recherche et d'enseignement à AUI"},{"label":"Basée à","value":"Maroc"}],
    stats: ["composés criblés dans la recherche sur les traitements du cancer du sein","de réussite en retrieval pour l'assistant RAG","commandes livrées par delivery2dorms","Best Startup Award pour Bliss Bites"],
  },
  about: {"kicker":"À propos","title":"Ingénieure, chercheuse, fondatrice.","lead":"De Beni Tajjit, dans le sud-est du Maroc, aux laboratoires de recherche au Canada et en Thaïlande, je construis une IA qui sert vraiment, et j'emmène ma communauté avec moi.","p1":"Je suis Meriem Lmoubariki, originaire de Beni Tajjit, dans le sud-est du Maroc. Je suis en dernière année de licence en informatique à l'Université Al Akhawayn d'Ifrane (2022 à décembre 2026), concentration IA et analyse du Big Data, mineure en administration des affaires. Boursière au mérite (60 %), inscrite au Dean's List au printemps 2024 et à l'automne 2025.","p2":"À l'automne 2025, j'ai passé un semestre à l'University of the Fraser Valley, en Colombie-Britannique (Canada), dans le cadre de l'échange bilatéral d'AUI, en tant que première étudiante d'AUI à y partir. J'y ai étudié le machine learning, le TAL et la finance, travaillé comme assistante de recherche en ML à l'École d'informatique auprès du Dr Russell Campbell et du Dr Mike Ivanof, et présenté un article au BC Cancer Research Day à Vancouver.","p3":"Je mesure mon travail en résultats. À KMUTT (Bangkok), j'ai criblé 51 837 composés dans le cadre d'une recherche sur les traitements du cancer du sein (ROC-AUC 0,898) pour aboutir à 8 candidats ; le meilleur, NPA020664, atteint −8,96 kcal/mol. Chez U-Investors, je pilote l'IA sur 247 dossiers actifs. Mon assistant RAG de Calcul II atteint 88,9 % de précision en retrieval. Auparavant : maintenance prédictive chez TAQA Morocco (environ 35 % de l'électricité nationale) et automatisation chez Ravel Future à Lisbonne (+35 % de vitesse de décision).","p4":"Le leadership compte autant que le code. J'ai été acceptée à la LeadGreen Fellowship (cohorte 4), programme panafricain de leadership climatique entièrement financé, sélectionné parmi 6 000 candidatures. J'ai fondé Bliss Bites, startup agroalimentaire lauréate du Best Startup Award d'AUI deux années de suite avec un financement intégral par des investisseurs, ainsi que Phi Nu, première sororité d'AUI (50 membres). À l'UFV, j'ai lancé le chapitre Alpha Pi Phi Cygnet. J'écris aussi (Future Young Writer Award à 16 ans), je mixe sous le nom de DJ Mimi, je joue au futsal et je nage.","headed":"Voir où je vais","facts":[{"label":"Origine","value":"Beni Tajjit, Maroc"},{"label":"Université","value":"Université Al Akhawayn, promotion déc. 2026"},{"label":"Spécialité","value":"IA et Big Data, mineure business"},{"label":"Distinctions","value":"Bourse au mérite 60 %, Dean's List ×2"},{"label":"Échange","value":"University of the Fraser Valley, Canada"},{"label":"Langues","value":"Arabe, français (C1), anglais (IELTS 7)"}],"accreditation":"À propos d'AUI : première université non américaine d'Afrique accréditée par NECHE, l'organisme qui accrédite Harvard, le MIT et Yale (depuis 2017, renouvelé jusqu'en 2032). L'informatique est accréditée ABET, l'école de commerce détient l'accréditation EFMD EPAS, et l'université est reconnue par le ministère marocain de l'Enseignement supérieur (MESRS)."},
  causes: {"kicker":"Engagements","titleBefore":"Ce que je défends. ","titleAccent":"Et pour qui je construis.","intro":"La technologie doit élargir le cercle de celles et ceux qui dirigent, et des savoirs qui comptent.","items":[{"title":"Le leadership des jeunes","body":"Je crois que les jeunes sont prêts à diriger maintenant, pas un jour. J'ai fondé Phi Nu, première sororité d'AUI, pour accueillir des femmes de régions et d'horizons différents, en particulier celles qui disposent de moins de ressources ou de réseaux sur le campus. J'ai aussi lancé un chapitre à l'UFV, été élue au gouvernement étudiant et continue d'ouvrir des portes aux étudiantes qui viennent après moi."},{"title":"Les savoirs autochtones","body":"Les communautés autochtones portent des générations de savoirs écologiques, trop facilement perdus. J'ai créé AgriVerse pour les préserver : la plateforme associe ces savoirs au machine learning pour aider les fermes à prendre des décisions plus durables. 1re place à l'UFV Community Ideation Jam 2025.","link":"/projects/agriverse"},{"title":"Communauté et réseau","body":"Grâce aux fellowships, aux laboratoires, aux startups et au bénévolat, j'ai bâti une communauté solide au Maroc, au Canada, en Thaïlande, au Portugal et dans le réseau climatique panafricain. Je suis là pour elle, et elle est là pour moi."}]},
  places: {"kicker":"Lieux","titleBefore":"Enracinée au Maroc. ","titleAccent":"Façonnée par le monde.","intro":"Chaque lieu de cette carte a changé ma façon de travailler.","home":"Chez moi","items":{"beniTajjit":{"name":"Beni Tajjit, Maroc","note":"Là d'où je viens"},"ifrane":{"name":"Ifrane, Maroc","note":"Université Al Akhawayn, 2022 à 2026"},"abbotsford":{"name":"Abbotsford, Canada","note":"Échange à l'University of the Fraser Valley, automne 2025"},"vancouver":{"name":"Vancouver, Canada","note":"Recherche présentée au BC Cancer Research Day"},"bangkok":{"name":"Bangkok, Thaïlande","note":"Recherche sur le cancer du sein à KMUTT, 2026"},"lisbon":{"name":"Lisbonne, Portugal","note":"IA et automatisation chez Ravel Future"}}},
  authority: "Études, recherche et collaborations",
  life: {
    kicker: "Au-delà du travail",
    titleBefore: "De Beni Tajjit ",
    titleAccent: "à chaque salle qui demande plus.",
    intro: "Le labo et le produit ne sont qu'une part. J'écris, je mixe, je suis bénévole, je compétitionne.",
    items: [
      { title: "Écriture", detail: "Future Young Writer Award, plus jeune lauréate à 16 ans (2022). Lecture de poésie à Dar El Ajaza. Roman inédit : Frénésie." },
      { title: "DJ Mimi et campus", detail: "Première DJ femme d'AUI (techno / schranz). Élue SGA (2024)." },
      { title: "Sororités", detail: "Fondatrice de Phi Nu, première sororité d'AUI, créée de zéro en 2026 (50 membres). Auparavant, lancement de la procédure de création du chapitre Alpha Pi Phi Cygnet à l'UFV (2025)." },
      { title: "Langues", detail: "Arabe natal. DALF C1, DELF B2 (93/100). IELTS Band 7 et TOEFL." },
      { title: "Bénévolat", detail: "Lions Club, Hands in Hands, ALCS, cérémonie AUI, BC Cancer Research Day, Scholars of Sustenance à Bangkok, IOSN." },
      { title: "Sport", detail: "Futsal et natation. Médaille d'or, meilleure jeune nageuse locale, Doukkala (2018). Équipe féminine de futsal d'AUI, 3e place au Cubs Tournament (mai 2023)." },
    ],
  },
  work: { kicker: "Projets", titleBefore: "Ce que j'ai construit, ", titleAccent: "chiffres à l'appui.", also: "Autres projets", caseStudy: "Étude de cas", filters: {"all":"Tous","ai":"IA et ML","research":"Recherche","fullstack":"Full-stack","data":"Données"} },
  education: {
    kicker: "Formation",
    titleBefore: "Là où j'ai ",
    titleAccent: "étudié.",
    builtHere: "Réalisé ici :",
    campusRoles: "Découvrir les six emplois sur le campus",
    entries: {
      "aui": {
        "degree": "Licence (B.Sc.) en informatique, concentration intelligence artificielle et big data",
        "location": "Ifrane, Maroc",
        "highlights": [
          "Bourse au mérite (60 %)",
          "Liste du doyen, printemps 2024 et automne 2025",
          "Six rôles sur le campus en recherche, enseignement, mentorat et services aux étudiants"
        ]
      },
      "ufv": {
        "degree": "Semestre d'échange bilatéral : machine learning, TAL et finance",
        "location": "Colombie-Britannique, Canada",
        "dateRange": "Sept. à déc. 2025",
        "highlights": [
          "Première personne en échange d'AUI (Maroc) à l'UFV",
          "1re place, UFV Community Ideation Jam 2025",
          "Recherche présentée au BC Cancer Research Day 2025, Vancouver"
        ]
      }
    },
  },
  projects: {
    "ai-drug-discovery": {
      category: "Recherche sur le cancer du sein, KMUTT Bangkok",
      outcome: "Découverte de médicaments contre le cancer du sein à KMUTT, Bangkok, Thaïlande (juin à juillet 2026). 51 837 composés fongiques réduits à 8 candidats. ROC-AUC 0,978 (Extra Trees), meilleur hit à −8,96 kcal/mol.",
    },
    "rag-class-assistant": {
      category: "IA appliquée, AUI",
      outcome: "88,9 % de réussite en retrieval sur les notes de Calcul II après recherche hybride, rerank et HyDE.",
    },
    "the-observer": {
      category: "Recherche interactive",
      outcome: "Instrument scientifique computationnel : un observateur synthétique étudie le mouvement, l'entropie, la prédiction et la causalité. En ligne sur the-observer.pages.dev.",
    },
    "safelens-ai": {
      category: "Vision par ordinateur, GITEX",
      outcome: "Système de sécurité sur chantier avec YOLOv8 pour la détection temps réel d'EPI et de dangers, présenté à GITEX Africa.",
    },
  },
  more: {
    "Meeting Intelligence System": "Diarisation sur le corpus AMI sous Dr. Russell Campbell. Conçu pour Teams.",
    "RAG Class Assistant": "88,9 % de réussite en retrieval sur Calcul II. FAISS, BM25, rerank, HyDE.",
    "Internal CRM System: AI Screening and Sourcing": "Conçu chez U-Investors et déployé comme ERP interne de l'entreprise. 247 dossiers de startups en direct, du deal-flow Airtable à un tableau d'investissement.",
    "darija-gap":     "Banc d'évaluation darija pour GPT-5.6. OpenAI Build Week, 2025.",
    CryptoVault: "Dashboard crypto FastAPI sur Azure, PDF ReportLab automatisés.",
    "Spark Kafka Pipeline": "99 % de disponibilité. Spark, Kafka, HDFS, Hive, Docker.",
    ClarityBot: "Chatbot de synthèse. Next.js, HuggingFace Transformers, LLM OpenRouter.",
    "Darija Word2Vec": "3 millions de phrases en darija. Plongements Gensim.",
    "Montreal AQI Forecasting": "79,9 % de réduction d'erreur vs baseline.",
    "Toxic Tweet Detection": "Classifieur multi-classes. 4 architectures comparées, meilleur SimpleRNN à 86 % de précision.",
    Propify: "She Hacks × BCG X, 2025. Fiscalité, maintenance IA, score locataire.",
    AgriVerse: "1re place UFV (500 $). En déploiement dans la Fraser Valley.",
    Delivery2Dorms: "Plus de 500 livraisons à pied depuis la porte Ain, y compris sous la neige.",
  },
  record: {
    kicker: "Recherche et distinctions",
    titleBefore: "Articles, scènes et ",
    titleAccent: "distinctions.",
    intro: "Un parcours vivant : les questions étudiées, les scènes où je partage le travail et les distinctions reçues en chemin.",
    groups: { research: "Recherche", rooms: "Scènes", honors: "Distinctions", credentials: "Certifications", Research: "Recherche", Rooms: "Scènes", Honors: "Distinctions", Credentials: "Certifications", Papers: "Publications", "Talks & conferences": "Conférences", "Awards & honors": "Prix et distinctions", Certifications: "Certifications", "Hackathons & competitions": "Hackathons et compétitions", "Programs & fellowships": "Programmes et bourses", "AI & machine learning": "IA et machine learning", "Cybersecurity": "Cybersécurité", "Web development": "Développement web", "Analytics & marketing": "Analytique et marketing", "Education": "Éducation", "Languages": "Langues" },
    status: { published: "Publié", presented: "Présenté", submitted: "Soumis", "in-progress": "En cours" },
    totalLabel: "éléments sélectionnés",
    archiveLabel: "Archives",
    entriesLabel: "éléments",
    indexNote: "Classé par thème. Chaque entrée rassemble sa date, son statut et sa source.",
    paperNote: "Consultez les articles liés ou les diapositives techniques pour accéder aux sources.",
  },
  recordDetails: {
    "OpenAI Build Week":
      "Compétition. Création de darija-gap, banc d'évaluation de GPT-5.6 sur la darija.",
    "L'Oréal Brandstorm":
      "Compétition. Projet AR et IA pour la beauté et le soin masculins, présenté sur un site 3D privé (démo sur demande).",
    "GITEX Africa":
      "Bliss Bites présentée sur le salon et pitch de SafeLens AI.",
    "ICEF 2026":
      "Présentation de l'article sur la prédiction des pannes CSP (réseaux de neurones et optimisation quantique à Noor Ouarzazate).",
    "Ventures Adventure":
      "Bliss Bites : 1 des 17 startups retenues parmi 537 étudiants de 4 universités.",
    "Best Startup Award, AUI Entrepreneurship Week":
      "Bliss Bites, la startup agroalimentaire que j'ai fondée. Deux années consécutives, 100 % de financement investisseurs et 16 certificats gouvernementaux d'investisseurs en France, aux États-Unis, au Maroc et au Royaume-Uni.",
    "Predicting Failures Using Neural Networks and Quantum Optimization in Concentrated Solar Power Plants: A Case Study of Morocco Noor Ouarzazate Complex":
      "Pipeline réseaux de neurones + optimisation quantique pour prédire les pannes du complexe solaire Noor Ouarzazate. AUI × Université King Fahd. Actes ICEF'26 (Materials Research Proceedings), indexé Scopus, accès ouvert.",
    "Why Agentic AI Fails in Production: An Empirical Failure Taxonomy for Enterprise Deployment":
      "Corpus structuré de défaillances réelles de l'IA en entreprise, tableaux d'audit et alignement NIST AI RMF. Présenté à l'IBRS 2026, AUI.",
    "Enterprise AI Reliability Framework (EARF)":
      "Cadre de certification en cinq dimensions pour évaluer les agents IA autonomes avant la production, validé rétrospectivement sur des cas d'échec documentés. Présenté à l'IBRS 2026, AUI.",
    "Multi-Agent Enterprise Workflow: A Reference Architecture and Empirical Evaluation":
      "Architecture de référence pour orchestrer des systèmes multi-agents en entreprise, avec évaluation empirique. Présenté à l'IBRS 2026, AUI.",
    "Can a Black-Box Model Discover? Epistemic Opacity and the Limits of Machine Learning as a Source of Knowledge":
      "Article de philosophie des sciences : les modèles de ML produisent des « artefacts épistémiques » plutôt qu'un véritable savoir, avec un pipeline réel de découverte de médicaments comme étude de cas. Dialogue avec Gettier, Goldman, Rudin, Humphreys et Pollock. Soumis à Stance (Ball State University, ~7 % d'acceptation).",
    "RAG Class Assistant":
      "Avec Dr. Sofiane Grira. Un système RAG qui transforme le carnet OneNote d'un professeur en assistant de cours intelligent.",
    "ML Virtual Screening for Cancer Drug Discovery":
      "Avec Dr. Thana Sutthibutpong. Article sur le pipeline de criblage d'inhibiteurs de l'aromatase construit à KMUTT. Visée revue Q1.",
    "ESG Banking Papers":
      "Avec Dr. Youssef Chetioui et Dr. Hind Lebdaoui. Deux articles sur la conformité ESG dans la banque (rentabilité et stabilité), pour des soumissions séparées.",
    "BCG X Shortlisted":
      "Présélectionnée, évaluation Data Science.",
    "Presidential Dinner Invitation, AUI":
      "Invitée par le président d'AUI, M. Bensaid.",
    "Gold Medal, Best Young Local Swimmer":
      "Région Doukkala.",
    "IBRS 2026": "Trois articles présentés à AUI.",
    "IEEE Day 2025": "Invitée comme déléguée sponsorisée à IEEE Day, célébration de l'anniversaire de l'IEEE à Vancouver.",
    "She Hacks × BCG X": "Hackathon féminin à Casablanca. Propify construit en équipe.",
    "LeadGreen Fellowship, Cohort 4": "Acceptée. Sélectionnée parmi 6 000 candidatures. Leadership climatique panafricain entièrement financé.",
    "1st Place, UFV Energy Hackathon": "University of the Fraser Valley.",
    "BC Cancer Research Day": "Présentation d'un article issu de la recherche UFV School of Computing.",
    "CAN-CWiC, Canadian Celebration of Women in Computing": "Entièrement sponsorisée par UFV School of Computing.",
    "Road to Web Summit": "Campus Microsoft Vancouver.",
    "UM6P Entrepreneurship Incubator": "Représentante d'AUI au seul supercalculateur africain classé TOP 500.",
    "William Davidson Institute Climate Entrepreneurship Exchange": "University of Michigan × AUI.",
    "KMUTT Funded Research Internship Scholarship": "Découverte de médicaments à Bangkok. Première en ingénierie et technologie en Thaïlande. Encadrants : Dr. Thana Sutthibutpong et Dr. Teeraphan Laomettachit.",
    "Future Young Writer Award": "Bourse du Groupe Scolaire Lange Bleu.",
    "MUN Best Delegate, medal from the French Government": "Comité OTAN sur l'insécurité alimentaire, 2021.",
    "Merit Scholarship (60%) & Dean's List": "Université Al Akhawayn. Dean's List printemps 2024 et automne 2025.",
    "1st Place, Women in Tech Morocco Hackathon": "Université Al Akhawayn.",
    "1st Place, UFV Community Ideation Jam Hackathon": "AgriVerse, plateforme agricole IA.",
    "2nd Place, ALX × AUI Data Analytics Hackathon": "Université Al Akhawayn.",
    "Best Startup Award": "Sélectionnée parmi plus de 537 étudiantes et étudiants de 4 universités.",
    "Pitch Deck Competition Winner, AUI": "Victoires consécutives.",
    "Full Stack Developer Certification": "TECOM AUI.",
  },
  skills: {
    kicker: "Compétences",
    titleBefore: "Une bâtisseuse. ",
    titleAccent: "Quatre disciplines.",
    stack: "Stack",
    stackGroups: { "Languages": "Langages", "ML / AI": "ML / IA", "Scientific computing": "Calcul scientifique", "Data engineering": "Ingénierie des données", "Web & mobile": "Web et mobile", "DevOps & cloud": "DevOps et cloud" },
    items: [
      { name: "IA appliquée et données", description: "Construire des systèmes de ML et de données qui améliorent une vraie décision, pas seulement une tâche." },
      { name: "Recherche computationnelle", description: "Transformer la curiosité en enquête structurée : une question, une méthode, des preuves, puis une question plus nette." },
      { name: "Produit et stratégie", description: "Cadre le travail technique autour des utilisateurs, des contraintes et du levier qui compte." },
      { name: "Génie logiciel", description: "Concevoir des systèmes full-stack fiables, des interfaces et API jusqu'à l'infrastructure." },
    ],
  },
  method: {
    kicker: "Ma méthode",
    titleBefore: "De l'ambiguïté ",
    titleAccent: "à l'élan.",
    steps: [
      { title: "Écouter", body: "Trouver le vrai problème sous la demande initiale." },
      { title: "Cadre", body: "Définir le succès, les contraintes, les personnes et la décision qui compte." },
      { title: "Construire", body: "Créer le plus petit système capable de produire un signal utile." },
      { title: "Apprendre", body: "Mesurer ce qui s'est passé, améliorer le système, relever l'ambition." },
    ],
  },
  experience: {
    kicker: "Expérience",
    titleBefore: "Recherche, stages, ",
    titleAccent: "et travail livré.",
    groups: {"professional":"Professionnel","campus":"Emplois sur le campus","other":"Autres emplois et leadership"},
    current: "En cours",
    roles: {
      leadgreen: {
        title: "Fellow, cohorte 4",
        dateRange: "2026 à aujourd'hui",
        detail: "Leadership climatique panafricain entièrement financé",
        description: "Acceptée dans la cohorte 4 de la LeadGreen Fellowship, programme panafricain de leadership climatique entièrement financé, parmi 6 000 candidatures.",
      },
      blissbites: {
        title: "Fondatrice",
        dateRange: "2023 à 2025",
        location: "Ifrane, Maroc",
        detail: "Startup agroalimentaire",
        description: "Fondatrice de Bliss Bites, startup agroalimentaire : Best Startup Award à l'Entrepreneurship Week d'AUI deux années de suite avec 100 % de financement investisseurs, finaliste de Ventures Adventure (17 startups sur 537 étudiants de 4 universités), exposée au GITEX Africa 2024, et 16 certificats gouvernementaux d'investisseurs en France, aux États-Unis, au Maroc et au Royaume-Uni.",
      },
      phinu: {
        title: "Fondatrice",
        dateRange: "2026",
        location: "Ifrane, Maroc",
        description: "Fondatrice de Phi Nu, première sororité d'AUI, créée de zéro (50 membres). Auparavant, lancement de la procédure de création du chapitre Alpha Pi Phi Cygnet à l'UFV (2025).",
      },
      "ta-finance": {
        title: "Assistante d'enseignement, finance et banque",
        dateRange: "Sept. 2026 à aujourd'hui",
        location: "Ifrane, Maroc",
        detail: "Dr. Hind Lebdaoui",
        description: "Assistanat en finance et banque, plus relecture par les pairs et rédaction de recherche.",
      },
      uinvestors: {
        title: "Tech Lead et junior analyste",
        dateRange: "Sept. 2026 à aujourd'hui",
        location: "Casablanca, Maroc",
        detail: "Fonds VC fondé par Driss Laraki · Temps partiel",
        description: "247 dossiers startups live. Couche IA interne : Airtable deal-flow vers les tableaux de décision des associés.",
      },
      grira: {
        title: "Assistante de recherche",
        dateRange: "Août 2026 à aujourd'hui",
        location: "Ifrane, Maroc",
        detail: "Prof. Sofiane Grira",
        description: "Assistanat de recherche complet avec financement dédié. Assistant de cours RAG pour MTH 1312 Calcul II alimenté par le carnet OneNote du professeur via Microsoft Graph : BM25 + dense avec RRF, rerank cross-encoder, HyDE, EasyOCR. 88,9 % de réussite en retrieval sur 1 159 segments de 112 pages. Co-rédaction de l'article et proposition PIF printemps 2027 (72 000 MAD).",
      },
      kmutt: {
        title: "Stagiaire de recherche financée, découverte de médicaments contre le cancer",
        dateRange: "Juin à juil. 2026",
        location: "Bangkok, Thaïlande",
        detail: "Encadrants : Assoc. Prof. Dr. Thana Sutthibutpong (physique computationnelle) et Assoc. Prof. Dr. Teeraphan Laomettachit (biologie des systèmes)",
        description:
          "51 837 composés MeFSAT. ROC-AUC 0,978 (Extra Trees), 0,898 (Random Forest). 8 candidats. NPA020664 à −8,96 kcal/mol, puis MD GROMACS. Seule étudiante de licence et première Marocaine du programme. Article Q1. FIBO.",
      },
      ta: {
        title: "Assistante d'enseignement",
        dateRange: "Janv. 2026 à aujourd'hui",
        location: "Ifrane, Maroc",
        detail: "Dr. Mouna Kettani et Dr. Naeem Sheikh",
        description: "Aide à l'enseignement de la programmation, des algorithmes et de l'IA : notation, permanences, mentorat et soutien technique.",
      },
      "ufv-exchange": {
        title: "Étudiante en échange bilatéral",
        dateRange: "Sept. à déc. 2025",
        location: "Colombie-Britannique, Canada",
        detail: "Première personne en échange d'AUI (Maroc) à l'UFV · Machine learning, TAL et finance",
        description:
          "Semestre en machine learning, TAL et finance, première étudiante en échange venue d'AUI (Maroc). Intelligence de réunions sous Dr. Russell Campbell (diarisation AMI) et recherche urbanisme / agriculture sous Dr. Mike Ivanof. Présentation au BC Cancer Research Day 2025 à Vancouver.",
      },
      "ufv-ra": {
        title: "Ingénieure ML et assistante de recherche",
        dateRange: "Oct. à déc. 2025",
        location: "Fraser Valley, Canada",
        description: "Modèles de machine learning pour l'urbanisme durable et présentation d'un article au BC Cancer Research Day (2025).",
      },
      ravel: {
        title: "Stagiaire IA et automatisation",
        dateRange: "Avr. à juin 2025",
        location: "Lisbonne, Portugal (à distance)",
        description: "+35 % de vitesse de décision. Automatisation Python/SQL et benchmarks de modèles pour les matériaux durables.",
      },
      "smart-city": {
        title: "Stagiaire en génie logiciel",
        dateRange: "Juin à août 2024",
        location: "Ifrane, Maroc",
        detail: "Dr. Houssain Kettani",
        description: "−30 % de temps d'accès aux données. Plateforme React de planification urbaine, Smart City Ifrane.",
      },
      taqa: {
        title: "Stagiaire analyste de données",
        dateRange: "Juin à août 2023",
        location: "El Jadida / Jorf Lasfar, Maroc",
        detail: "Premier producteur indépendant d'électricité, environ 35 % de l'électricité marocaine",
        description:
          "TAQA Morocco est le premier producteur indépendant d'électricité du pays, filiale d'Abu Dhabi National Energy Company, et exploite le complexe thermique de Jorf Lasfar, plus grande centrale charbon de la région MENA, cotée à Casablanca. Accès aux données opérationnelles du parc, tableaux Power BI, pipelines SQL/Python et maintenance prédictive.",
      },
      freelance: {
        title: "Développeuse IA agentique et front-end",
        dateRange: "Janv. 2024 à aujourd'hui",
        location: "Maroc",
        description: "Architecture et déploiement d'agents IA autonomes et de fronts de production pour des PME.",
      },
      oip: {
        title: "Ambassadrice OIP",
        dateRange: "2026 à aujourd'hui",
        location: "Ifrane, Maroc",
        detail: "Office of International Programs, AUI",
        description: "Accompagnement des étudiantes et étudiants internationaux pendant leur semestre à AUI : accueil à l'aéroport, visites d'orientation d'Ifrane, intégration académique et sociale.",
      },
      abby: {
        title: "Tutrice",
        dateRange: "Sept. à déc. 2025",
        location: "Colombie-Britannique, Canada",
        description: "Soutien en français, physique et calcul pour des lycéens pendant le semestre d'échange UFV.",
      },
      mentor: {
        title: "Mentore",
        dateRange: "Sept. à déc. 2024",
        location: "Ifrane, Maroc",
        description: "Accompagnement de plus de 15 primo-arrivantes et primo-arrivants, 95 % de satisfaction.",
      },
      counseling: {
        title: "Assistante étudiante",
        dateRange: "2024",
        location: "Ifrane, Maroc",
        description: "Soutien aux étudiantes et étudiants à tous les niveaux pendant un an.",
      },
      charcot: {
        title: "Professeure de maths et prépa Bac",
        dateRange: "2022 à 2023",
        location: "El Jadida, Maroc",
        description: "Heures de maths et préparation programmation pour le Baccalauréat au lycée Jean Charcot.",
      },
    },
  },
  impact: {
    kicker: "Leadership et impact",
    titleBefore: "Le travail, c'est ",
    titleAccent: "le résultat.",
    body: "51 837 composés. 88,9 % de retrieval. 247 dossiers live. Plus de 500 livraisons. Les chiffres sont le travail.",
    cta: "Voir le parcours",
    stats: [
      "Composés MeFSAT criblés pour CYP19A1",
      "Taux de réussite RAG, Calcul II",
      "Dossiers VC live, pipeline U-Investors",
      "Livraisons campus à pied, Delivery2Dorms",
    ],
  },
  vision: {
    kicker: "La suite",
    titleBefore: "Préparer la prochaine ",
    titleAccent: "frontière.",
    accepted: "Acceptée",
    acceptedNames: [
      "LeadGreen Fellowship, cohorte 4",
      "William Davidson Institute Climate Entrepreneurship Exchange",
      "Intra-Africa 2063 Competition",
    ],
    acceptedDetails: [
      "Acceptée. Sélectionnée parmi 6 000 candidatures. Leadership climatique panafricain entièrement financé.",
      "Cohorte 3, AUI × University of Michigan",
      "Acceptée pour représenter AUI. Sélection uniquement à AUI. 5e édition, Université Pharos, Alexandrie, Égypte. Parrainée par AUI.",
    ],
  },
  contact: {
    kicker: "Contact",
    intro: "Le moyen le plus rapide de me joindre. CV et lettres de recommandation sur demande.",
    references: "Plus de 6 lettres de recommandation",
    referencesBody: "Disponibles sur demande. Je les envoie par e-mail avec mon CV.",
    referencesCta: "Demander CV et lettres",
    referencesSubject: "Demande : CV et lettres de recommandation",
    referencesEmailBody: "Bonjour Meriem,\n\nPourriez-vous m'envoyer votre CV et vos lettres de recommandation ?\n\n",
    meeting: "Réserver un rendez-vous de 30 min",
    meetingNote: "Créneaux en semaine, heure du Maroc",
    titleBefore: "Construisons ",
    titleAccent: "ce qui compte.",
    cv: "Demander le CV par e-mail",
    cvNote: "Le CV est privé. Demandez-le par e-mail.",
    cvSubject: "Demande de CV, Meriem Lmoubariki",
    cvBody: "Bonjour Meriem,\n\nJe souhaiterais recevoir une copie de votre CV.\n\n",
    footer: "Ingénieure IA · Chercheuse · Maroc",
    formName: "Nom",
    formEmail: "E-mail",
    formMessage: "Message",
    formSend: "Envoyer",
    formSending: "Envoi",
    formSent: "Merci. Votre application mail va s'ouvrir pour que le message m'arrive.",
    formError: "Ajoutez un nom, un e-mail valide et un court message.",
    formHint: "Le serveur valide le formulaire, puis ouvre votre application mail.",
    book: "Réserver 30 minutes",
    bookHint: "Choisissez un créneau en semaine, heure du Maroc. La demande arrive dans ma boîte mail.",
    bookDate: "Date",
    bookTime: "Heure",
    bookTopic: "De quoi parler",
    bookSend: "Demander ce créneau",
    bookSending: "Envoi",
    bookSent: "Merci. Votre application mail va s'ouvrir avec la demande.",
    bookError: "Indiquez un nom, un e-mail, une date et une heure.",
    bookZone: "Heure du Maroc (Casablanca)",
  },
};

const ar: Dict = {
  nav: { About: "نبذة", Work: "الأعمال", Record: "السجل", Life: "حياة", Skills: "المهارات", Experience: "الخبرة", Impact: "الأثر", Contact: "تواصل", Projects: "المشاريع", Education: "التعليم", Research: "البحث", Causes: "قضاياي", Places: "أماكن" },
  talk: "احجز اجتماعا",
  menu: "القائمة",
  themeLight: "الوضع الفاتح",
  themeDark: "الوضع الليلي",
  language: "اللغة",
  journeyKicker: "المسار حتى الآن",
  journey: [
    "طالبة مغربية",
    "حاصلة على منحة استحقاق",
    "أول طالبة من جامعة الأخوين (المغرب) في تبادل بجامعة فريزر فالي",
    "متدربة أتمتة في البرتغال",
    "باحثة في اكتشاف أدوية السرطان في تايلاند",
    "قائدة تقنية في U-Investors",
    "مؤسِّسة وبانية",
  ],
  countries: { Morocco: "المغرب", Canada: "كندا", Portugal: "البرتغال", Thailand: "تايلاند" },
  hero: {
    kicker: "مهندسة ذكاء اصطناعي وباحثة",
    title: "أبني أنظمة ذكاء اصطناعي تجعل العمليات المعقدة أقل تكلفة وأكثر كفاءة وقابلية للتنبؤ.",
    body: "طالبة في السنة الأخيرة لعلوم الحاسوب بجامعة الأخوين، تخصص الذكاء الاصطناعي والبيانات الضخمة. من أعمالي الأخيرة: اكتشاف أدوية سرطان الثدي في KMUTT، ونظام RAG مبني كبنية تحتية تعليمية لجامعة الأخوين، ونظام CRM بالذكاء الاصطناعي لتدفق الصفقات منشور كنظام ERP داخلي في U-Investors.",
    cta: "عرض المشاريع",
    scroll: "مرّر للاستكشاف",
    facts: [{"label":"حاليا","value":"قائدة تقنية في U-Investors · مساعدة بحث وتدريس في الأخوين"},{"label":"مقيمة في","value":"المغرب"}],
    stats: ["مركبا فُحصت في أبحاث اختبار أدوية سرطان الثدي","نسبة نجاح الاسترجاع في مساعد RAG","طلبية سلّمتها delivery2dorms","جائزة أفضل شركة ناشئة لـ Bliss Bites"],
  },
  about: {"kicker":"نبذة","title":"مهندسة، باحثة، مؤسِّسة.","lead":"من بني تجيت في جنوب شرق المغرب إلى مختبرات البحث في كندا وتايلاند، أبني ذكاء اصطناعيا ينجز عملا حقيقيا، وأحمل مجتمعي معي.","p1":"أنا مريم المباركي من بني تجيت في جنوب شرق المغرب. أدرس في السنة الأخيرة من البكالوريوس في علوم الحاسوب بجامعة الأخوين في إفران (2022 إلى ديسمبر 2026)، بتخصص الذكاء الاصطناعي وتحليل البيانات الضخمة وتخصص فرعي في إدارة الأعمال. حاصلة على منحة الاستحقاق (60%) وعلى قائمة العميد في ربيع 2024 وخريف 2025.","p2":"في خريف 2025 قضيت فصلا دراسيا في جامعة فريزر فالي بكولومبيا البريطانية في كندا ضمن برنامج التبادل الثنائي لجامعة الأخوين، كأول طالبة تبادل من جامعة الأخوين (المغرب) في UFV. درست التعلم الآلي ومعالجة اللغة الطبيعية والتمويل، وعملت مساعدة بحث في التعلم الآلي بكلية الحوسبة مع د. راسل كامبل ود. مايك إيفانوف، وقدّمت ورقة بحثية في يوم أبحاث السرطان بفانكوفر.","p3":"أقيس عملي بالنتائج. في KMUTT ببانكوك فحصت 51,837 مركبا ضمن أبحاث أدوية سرطان الثدي (ROC-AUC 0.978 مع Extra Trees) واختصرتها إلى 8 مرشحين، أقواها NPA020664 بطاقة ارتباط −8.96 كيلو كالوري/مول. في U-Investors أدير الذكاء الاصطناعي على 247 صفقة نشطة. ويحقق مساعد RAG لمادة التفاضل والتكامل 2 دقة استرجاع 88.9%. وقبل ذلك عملت على الصيانة التنبؤية في طاقة المغرب (نحو 35% من كهرباء البلاد)، وعلى الأتمتة في Ravel Future بلشبونة حيث أصبحت القرارات أسرع بنسبة 35%.","p4":"القيادة تهمني بقدر البرمجة. قُبلت في زمالة LeadGreen (الدفعة 4)، برنامج أفريقي للقيادة المناخية ممول بالكامل اختير من بين 6000 متقدم. أسست Bliss Bites، شركة ناشئة في الصناعات الغذائية الزراعية فازت بجائزة أفضل شركة ناشئة في الأخوين سنتين متتاليتين بتمويل كامل من المستثمرين، وPhi Nu، أول جمعية نسائية في الأخوين انضمت إليها 50 عضوة. وفي UFV أطلقت فرع Alpha Pi Phi Cygnet. كما أكتب (جائزة الكاتبة الشابة في سن 16)، وأقدّم الموسيقى باسم DJ Mimi، وألعب كرة القدم داخل القاعة وأمارس السباحة.","headed":"إلى أين أتجه","facts":[{"label":"المدينة الأم","value":"بني تجيت، المغرب"},{"label":"الجامعة","value":"جامعة الأخوين، دفعة ديسمبر 2026"},{"label":"التخصص","value":"الذكاء الاصطناعي والبيانات الضخمة، فرعي أعمال"},{"label":"التميز","value":"منحة استحقاق 60%، قائمة العميد مرتين"},{"label":"التبادل","value":"جامعة فريزر فالي، كندا"},{"label":"اللغات","value":"العربية، الفرنسية (C1)، الإنجليزية (IELTS 7)"}],"accreditation":"عن جامعة الأخوين: أول جامعة غير أمريكية في أفريقيا تعتمدها NECHE، الجهة الأمريكية التي تعتمد هارفارد ومعهد ماساتشوستس للتكنولوجيا وييل (منذ 2017، مجدد حتى 2032). برنامج علوم الحاسوب معتمد من ABET، وكلية الأعمال حاصلة على اعتماد EFMD EPAS، والجامعة معترف بها من وزارة التعليم العالي المغربية."},
  causes: {"kicker":"قضاياي","titleBefore":"ما أؤمن به. ","titleAccent":"ولمن أبني.","intro":"على التكنولوجيا أن توسّع دائرة من يقود، ومن تُحتسب معرفته.","items":[{"title":"قيادة الشباب","body":"أؤمن أن الشباب مستعدون للقيادة الآن لا لاحقا. أسست Phi Nu، أول جمعية نسائية في الأخوين، لتضم نساء من مناطق وخلفيات مختلفة، ولا سيما من لديهن موارد أو فرص أقل للوصول إلى شبكات الجامعة. وأطلقت فرعا في UFV، وانتُخبت في مجلس الطلبة، وما زلت أفتح الأبواب لمن يأتي بعدي."},{"title":"معارف الشعوب الأصلية","body":"تحمل الشعوب الأصلية معارف بيئية متوارثة عبر أجيال، وهي معرضة للضياع. بنيت AgriVerse للحفاظ عليها: منصة تجمع هذه المعارف مع التعلم الآلي لمساعدة المزارع على اتخاذ قرارات أكثر استدامة. فازت بالمركز الأول في UFV Community Ideation Jam 2025.","link":"/projects/agriverse"},{"title":"المجتمع والشبكة","body":"عبر الزمالات ومختبرات البحث والشركات الناشئة والتطوع، بنيت مجتمعا قويا في المغرب وكندا وتايلاند والبرتغال وشبكة المناخ الأفريقية. أحضر من أجله، ويحضر من أجلي."}]},
  places: {"kicker":"أماكن","titleBefore":"جذوري في المغرب. ","titleAccent":"وتشكّلت حول العالم.","intro":"كل مكان على هذه الخريطة غيّر طريقة عملي.","home":"موطني","items":{"beniTajjit":{"name":"بني تجيت، المغرب","note":"من حيث أتيت"},"ifrane":{"name":"إفران، المغرب","note":"جامعة الأخوين، 2022 إلى 2026"},"abbotsford":{"name":"أبوتسفورد، كندا","note":"تبادل في جامعة فريزر فالي، خريف 2025"},"vancouver":{"name":"فانكوفر، كندا","note":"تقديم بحث في يوم أبحاث السرطان"},"bangkok":{"name":"بانكوك، تايلاند","note":"أبحاث سرطان الثدي في KMUTT، 2026"},"lisbon":{"name":"لشبونة، البرتغال","note":"الذكاء الاصطناعي والأتمتة في Ravel Future"}}},
  authority: "دراسة وعمل وبناء إلى جانب",
  life: {
    kicker: "خارج العمل",
    titleBefore: "من بني تجيت ",
    titleAccent: "إلى كل غرفة تطلب المزيد.",
    intro: "المختبر والمنتج جزء فقط. أكتب، أقدّم الموسيقى، أتطوع، أنافس.",
    items: [
      { title: "كتابة", detail: "جائزة الكاتبة الشابة، أصغر حاصلة في سن 16 (2022). أمسية شعر في دار العجزة. رواية غير منشورة: فرينيزي." },
      { title: "DJ Mimi والحرم", detail: "أول DJ امرأة في تاريخ الأخوين. منتخبة في مجلس الطلبة (2024)." },
      { title: "الجمعيات", detail: "أسست Phi Nu، أول جمعية نسائية في الأخوين، من الصفر سنة 2026 وانضم 50 عضوا. وقبلها أطلقت مسار تأسيس فرع Alpha Pi Phi Cygnet في UFV (2025)." },
      { title: "اللغات", detail: "العربية لغة أم. DALF C1 وDELF B2 (93/100). IELTS 7 وTOEFL." },
      { title: "تطوع", detail: "نادي الليونز، أيدي في أيد، ALCS، حفل التخرج، يوم أبحاث السرطان، إنقاذ الطعام في بانكوك." },
      { title: "رياضة", detail: "كرة القدم داخل القاعة والسباحة. ذهبية أفضل سباحة شابة محلية، دكالة (2018). فريق الفوتسال النسائي في الأخوين، المركز الثالث في دوري Cubs (ماي 2023)." },
    ],
  },
  work: { kicker: "المشاريع", titleBefore: "ما بنيته، ", titleAccent: "بالأرقام.", also: "مشاريع أخرى", caseStudy: "دراسة الحالة", filters: {"all":"الكل","ai":"الذكاء الاصطناعي","research":"البحث","fullstack":"تطوير متكامل","data":"البيانات"} },
  education: {
    kicker: "التعليم",
    titleBefore: "حيث ",
    titleAccent: "درست.",
    builtHere: "أُنجز هنا:",
    campusRoles: "استكشف الوظائف الجامعية الست",
    entries: {
      "aui": {
        "degree": "بكالوريوس علوم الحاسوب، تخصص الذكاء الاصطناعي والبيانات الضخمة",
        "location": "إفران، المغرب",
        "highlights": [
          "منحة استحقاق (60%)",
          "قائمة العميد، ربيع 2024 وخريف 2025",
          "ست وظائف جامعية في البحث والتدريس والإرشاد وخدمات الطلاب"
        ]
      },
      "ufv": {
        "degree": "فصل تبادل ثنائي: تعلم الآلة ومعالجة اللغة والتمويل",
        "location": "كولومبيا البريطانية، كندا",
        "dateRange": "سبتمبر إلى ديسمبر 2025",
        "highlights": [
          "أول طالب تبادل من جامعة الأخوين (المغرب) في UFV",
          "المركز الأول، UFV Community Ideation Jam 2025",
          "عرض بحث في BC Cancer Research Day 2025، فانكوفر"
        ]
      }
    },
  },
  projects: {
    "ai-drug-discovery": {
      category: "بحث سرطان الثدي، KMUTT بانكوك",
      outcome: "اكتشاف أدوية سرطان الثدي في KMUTT، بانكوك، تايلاند (يونيو إلى يوليو 2026). 51837 مركبا فطريا اختُصرت إلى 8 مرشحين. ROC-AUC 0.978 (Extra Trees)، وأفضل مركب عند −8.96 كيلو كالوري/مول.",
    },
    "rag-class-assistant": {
      category: "ذكاء اصطناعي تطبيقي، الأخوين",
      outcome: "نسبة نجاح استرجاع 88.9% على ملاحظات حساب التفاضل 2 بعد بحث هجين وإعادة ترتيب وHyDE.",
    },
    "the-observer": {
      category: "بحث تفاعلي",
      outcome: "أداة علمية حسابية: مراقب اصطناعي يدرس الحركة والإنتروبيا والتنبؤ والسببية. مباشر على the-observer.pages.dev.",
    },
    "safelens-ai": {
      category: "رؤية حاسوبية، GITEX",
      outcome: "نظام سلامة لمواقع البناء بـ YOLOv8 لكشف معدات الوقاية والمخاطر لحظيا، قُدّم في GITEX Africa.",
    },
  },
  more: {
    "Meeting Intelligence System": "تمييز المتحدثين على مجموعة AMI مع د. راسل كامبل. مصمم لـ Teams.",
    "RAG Class Assistant": "نسبة نجاح استرجاع 88.9% على حساب التفاضل 2. FAISS وBM25 وإعادة ترتيب.",
    "Internal CRM System: AI Screening and Sourcing": "بُني في U-Investors ونُشر كنظام ERP داخلي للشركة. 247 سجلا مباشرا لشركات ناشئة، من تدفق الصفقات في Airtable إلى لوحة استثمار.",
    "darija-gap":     "أداة تقييم الدارجة لـ GPT-5.6. أسبوع بناء OpenAI، 2025.",
    CryptoVault: "لوحة FastAPI على Azure وتقارير PDF آلية.",
    "Spark Kafka Pipeline": "جاهزية 99%. Spark وKafka وHDFS وHive.",
    ClarityBot: "روبوت تلخيص. Next.js وHuggingFace Transformers وOpenRouter.",
    "Darija Word2Vec": "3 ملايين جملة دارجة. تضمينات Gensim.",
    "Montreal AQI Forecasting": "خفض خطأ 79.9% عن الأساس.",
    "Toxic Tweet Detection": "مصنف متعدد الفئات. مقارنة 4 بنى، أفضلها SimpleRNN بدقة 86%.",
    Propify: "She Hacks × BCG X، 2025. ضريبة وصيانة ونقاط مستأجر.",
    AgriVerse: "المركز الأول في UFV (500 دولار). قيد التنفيذ في وادي فريزر.",
    Delivery2Dorms: "أكثر من 500 توصيلة سيرا من باب العين، حتى في الثلج.",
  },
  record: {
    kicker: "البحث والتكريمات",
    titleBefore: "أوراق، منصات، و",
    titleAccent: "تكريمات.",
    intro: "سجل متجدد للأسئلة التي أبحثها، والمنصات التي أشارك فيها العمل، والتقدير الذي تحقق في الطريق.",
    groups: { research: "البحث", rooms: "المنصات", honors: "التكريمات", credentials: "الشهادات", Research: "البحث", Rooms: "المنصات", Honors: "التكريمات", Credentials: "الشهادات", Papers: "الأوراق", "Talks & conferences": "المؤتمرات", "Awards & honors": "الجوائز", Certifications: "الشهادات", "Hackathons & competitions": "الهاكاثونات والمسابقات", "Programs & fellowships": "البرامج والزمالات", "AI & machine learning": "الذكاء الاصطناعي وتعلم الآلة", "Cybersecurity": "الأمن السيبراني", "Web development": "تطوير الويب", "Analytics & marketing": "التحليلات والتسويق", "Education": "التعليم", "Languages": "اللغات" },
    status: { published: "منشور", presented: "مُقدَّم", submitted: "مُرسَل", "in-progress": "قيد الإعداد" },
    totalLabel: "سجل مختار",
    archiveLabel: "الأرشيف",
    entriesLabel: "عناصر",
    indexNote: "مصنّف حسب الموضوع. يجمع كل عنصر تاريخه وحالته ومصدره.",
    paperNote: "افتح الأوراق المرتبطة أو الشرائح التقنية للاطلاع على المصادر.",
  },
  recordDetails: {
    "OpenAI Build Week":
      "مسابقة. بناء darija-gap، أداة لتقييم GPT-5.6 على الدارجة.",
    "L'Oréal Brandstorm":
      "مسابقة. مشروع واقع معزز وذكاء اصطناعي للعناية والجمال للرجال، معروض على موقع ثلاثي الأبعاد خاص (عرض عند الطلب).",
    "GITEX Africa":
      "عرض Bliss Bites في المعرض وتقديم SafeLens AI.",
    "ICEF 2026":
      "عرض ورقة التنبؤ بأعطال محطات الطاقة الشمسية المركزة (شبكات عصبية وتحسين كمي في نور ورزازات).",
    "Ventures Adventure":
      "Bliss Bites: واحدة من 17 شركة ناشئة اختيرت من بين 537 طالبا في 4 جامعات.",
    "Best Startup Award, AUI Entrepreneurship Week":
      "Bliss Bites، الشركة الناشئة الغذائية الزراعية التي أسستها. سنتان متتاليتان، تمويل كامل من المستثمرين، و16 شهادة حكومية من مستثمرين في فرنسا والولايات المتحدة والمغرب والمملكة المتحدة.",
    "Predicting Failures Using Neural Networks and Quantum Optimization in Concentrated Solar Power Plants: A Case Study of Morocco Noor Ouarzazate Complex":
      "خط معالجة يجمع الشبكات العصبية والتحسين الكمّي للتنبؤ بأعطال مجمع نور ورزازات الشمسي. الأخوين × جامعة الملك فهد. وقائع ICEF'26 (Materials Research Proceedings)، مفهرس في Scopus، وصول مفتوح.",
    "Why Agentic AI Fails in Production: An Empirical Failure Taxonomy for Enterprise Deployment":
      "مجموعة حالات منظمة لإخفاقات حقيقية للذكاء الاصطناعي في المؤسسات، وجداول تدقيق، وربط بإطار NIST AI RMF. قُدّمت في IBRS 2026، الأخوين.",
    "Enterprise AI Reliability Framework (EARF)":
      "إطار اعتماد بخمسة أبعاد لتقييم وكلاء الذكاء الاصطناعي المستقلين قبل الإنتاج، مع تحقق رجعي على حالات إخفاق موثقة. قُدّم في IBRS 2026، الأخوين.",
    "Multi-Agent Enterprise Workflow: A Reference Architecture and Empirical Evaluation":
      "بنية مرجعية لتنسيق الأنظمة متعددة الوكلاء في المؤسسات مع تقييم تجريبي. قُدّمت في IBRS 2026، الأخوين.",
    "Can a Black-Box Model Discover? Epistemic Opacity and the Limits of Machine Learning as a Source of Knowledge":
      "ورقة في فلسفة العلم تجادل بأن نماذج تعلم الآلة تنتج «مصنوعات معرفية» لا معرفة حقيقية، بدراسة حالة من خط حقيقي لاكتشاف الأدوية. تناقش Gettier وGoldman وRudin وHumphreys وPollock. مُرسلة إلى Stance (جامعة بول ستيت، نسبة قبول ~7%).",
    "RAG Class Assistant":
      "مع د. سفيان قريرا. نظام توليد معزز بالاسترجاع يحول دفتر OneNote لأستاذ إلى مساعد ذكي للمقرر.",
    "ML Virtual Screening for Cancer Drug Discovery":
      "مع د. ثانا سوثيبوتبونغ. ورقة حول خط فحص مثبطات الأروماتاز المبني في KMUTT. استهداف مجلة Q1.",
    "ESG Banking Papers":
      "مع د. يوسف شتيوي ود. هند لبداوي. ورقتان حول امتثال ESG في البنوك (الربحية والاستقرار)، لتقديمهما بشكل منفصل.",
    "BCG X Shortlisted":
      "ضمن القائمة القصيرة، تقييم علوم البيانات.",
    "Presidential Dinner Invitation, AUI":
      "بدعوة من رئيس جامعة الأخوين السيد بنسعيد.",
    "Gold Medal, Best Young Local Swimmer":
      "جهة دكالة.",
    "IBRS 2026": "ثلاث أوراق قُدّمت في الأخوين.",
    "IEEE Day 2025": "دُعيت بصفة مندوبة برعاية إلى IEEE Day، احتفالية ذكرى تأسيس IEEE في فانكوفر.",
    "She Hacks × BCG X": "هاكاثون نسائي في الدار البيضاء. بناء Propify مع الفريق.",
    "LeadGreen Fellowship, Cohort 4": "مقبولة. اختيار من 6000 متقدم. قيادة مناخية أفريقية ممولة بالكامل.",
    "1st Place, UFV Energy Hackathon": "جامعة فريزر فالي.",
    "BC Cancer Research Day": "تقديم ورقة من بحث كلية الحوسبة في UFV.",
    "CAN-CWiC, Canadian Celebration of Women in Computing": "برعاية كاملة من كلية الحوسبة في UFV.",
    "Road to Web Summit": "حرم مايكروسوفت في فانكوفر.",
    "UM6P Entrepreneurship Incubator": "تمثيل جامعة الأخوين في المنشأة الحاسوبية الفائقة الوحيدة في أفريقيا ضمن TOP 500.",
    "William Davidson Institute Climate Entrepreneurship Exchange": "جامعة ميشيغان × جامعة الأخوين.",
    "KMUTT Funded Research Internship Scholarship": "اكتشاف أدوية السرطان في بانكوك. الأولى في الهندسة والتكنولوجيا في تايلاند. المشرفان: د. ثانا سوثيبوتبونغ ود. تيرابان لاوميتاتشيت.",
    "Future Young Writer Award": "منحة من مجموعة لانج بلو المدرسية.",
    "MUN Best Delegate, medal from the French Government": "لجنة الناتو حول انعدام الأمن الغذائي، 2021.",
    "Merit Scholarship (60%) & Dean's List": "جامعة الأخوين. قائمة العميد ربيع 2024 وخريف 2025.",
    "1st Place, Women in Tech Morocco Hackathon": "جامعة الأخوين.",
    "1st Place, UFV Community Ideation Jam Hackathon": "AgriVerse، منصة زراعية ذكية.",
    "2nd Place, ALX × AUI Data Analytics Hackathon": "جامعة الأخوين.",
    "Best Startup Award": "اختيار من أكثر من 537 طالبا في 4 جامعات.",
    "Pitch Deck Competition Winner, AUI": "فوز متتالٍ.",
    "Full Stack Developer Certification": "TECOM جامعة الأخوين.",
  },
  skills: {
    kicker: "المهارات",
    titleBefore: "بانية واحدة. ",
    titleAccent: "أربعة مجالات.",
    stack: "التقنيات",
    stackGroups: { "Languages": "لغات البرمجة", "ML / AI": "تعلم الآلة / الذكاء الاصطناعي", "Scientific computing": "الحوسبة العلمية", "Data engineering": "هندسة البيانات", "Web & mobile": "الويب والهاتف", "DevOps & cloud": "DevOps والسحابة" },
    items: [
      { name: "ذكاء اصطناعي وبيانات", description: "بناء أنظمة تعلم آلي وبيانات تحسّن قرارا حقيقيا، لا مجرد أتمتة مهمة." },
      { name: "بحث حسابي", description: "تحويل الفضول إلى استقصاء منظم: سؤال، منهج، دليل، ثم سؤال أحدّ." },
      { name: "المنتج والاستراتيجية", description: "تأطير العمل التقني حول المستخدمين والقيود والرافعة التي تستحق المتابعة." },
      { name: "هندسة البرمجيات", description: "تصميم أنظمة متكاملة موثوقة، من الواجهات وواجهات البرمجة إلى البنية التحتية." },
    ],
  },
  method: {
    kicker: "كيف أعمل",
    titleBefore: "من الغموض ",
    titleAccent: "إلى الزخم.",
    steps: [
      { title: "استمع", body: "أجد المشكلة الحقيقية تحت الطلب الأول." },
      { title: "أُطر", body: "أحدد النجاح والقيود والأشخاص والقرار المهم." },
      { title: "أبني", body: "أصنع أصغر نظام قادر على إنتاج إشارة ذات معنى." },
      { title: "أتعلم", body: "أقيس ما حدث، أحسّن النظام، وأرفع الطموح." },
    ],
  },
  experience: {
    kicker: "الخبرة",
    titleBefore: "بحث وتدريب ",
    titleAccent: "وعمل مُسلَّم.",
    groups: {"professional":"مهني","campus":"وظائف داخل الحرم","other":"وظائف أخرى وقيادة"},
    current: "حالي",
    roles: {
      leadgreen: {
        title: "زميلة، الدفعة 4",
        dateRange: "2026 حتى الآن",
        detail: "قيادة مناخية أفريقية ممولة بالكامل",
        description: "قُبلت في الدفعة 4 من زمالة LeadGreen، برنامج أفريقي للقيادة المناخية ممول بالكامل، من بين 6000 متقدم.",
      },
      blissbites: {
        title: "مؤسِّسة",
        dateRange: "2023 إلى 2025",
        location: "إفران، المغرب",
        detail: "شركة ناشئة في الصناعات الغذائية الزراعية",
        description: "أسست Bliss Bites، شركة ناشئة في الصناعات الغذائية الزراعية: جائزة أفضل شركة ناشئة في أسبوع ريادة الأعمال بجامعة الأخوين سنتين متتاليتين بتمويل كامل من المستثمرين، ضمن نهائيي Ventures Adventure (17 شركة من بين 537 طالبا في 4 جامعات)، وعُرضت في GITEX Africa 2024، و16 شهادة حكومية من مستثمرين في فرنسا والولايات المتحدة والمغرب والمملكة المتحدة.",
      },
      phinu: {
        title: "مؤسِّسة",
        dateRange: "2026",
        location: "إفران، المغرب",
        description: "أسست Phi Nu، أول جمعية نسائية في الأخوين، من الصفر وانضم 50 عضوا. وقبلها أطلقت مسار تأسيس فرع Alpha Pi Phi Cygnet في UFV (2025).",
      },
      "ta-finance": {
        title: "مساعدة تدريس، المالية والبنوك",
        dateRange: "سبتمبر 2026 حتى الآن",
        location: "إفران، المغرب",
        detail: "د. هند لبداوي",
        description: "مساعدة تدريس في المالية والبنوك، مع المساعدة في التحكيم والكتابة البحثية.",
      },
      uinvestors: {
        title: "قائدة تقنية ومحللة مبتدئة",
        dateRange: "سبتمبر 2026 حتى الآن",
        location: "الدار البيضاء، المغرب",
        detail: "صندوق رأس مال مغامر أسسه إدريس لاراكي · دوام جزئي",
        description: "247 صفقة ناشئة مباشرة. طبقة ذكاء اصطناعي: Airtable إلى لوحات قرارات الشركاء.",
      },
      grira: {
        title: "مساعدة بحث",
        dateRange: "أغسطس 2026 حتى الآن",
        location: "إفران، المغرب",
        detail: "الأستاذ سفيان قريرا",
        description: "مساعدة بحث كاملة بمنحة مخصصة. مساعد مقرر RAG لمادة MTH 1312 حساب التفاضل 2 يعتمد على دفتر OneNote للأستاذ عبر Microsoft Graph: BM25 واسترجاع كثيف مع RRF، إعادة ترتيب، HyDE وEasyOCR. نسبة نجاح استرجاع 88.9% على 1159 مقطعا من 112 صفحة. مشاركة في كتابة الورقة ومقترح PIF ربيع 2027 (72000 درهم).",
      },
      kmutt: {
        title: "متدربة بحث ممولة، اكتشاف أدوية السرطان",
        dateRange: "يونيو إلى يوليو 2026",
        location: "بانكوك، تايلاند",
        detail: "المشرفان: أ.د. ثانا سوثيبوتبونغ (فيزياء حسابية) وأ.د. تيرابان لاوميتاتشيت (بيولوجيا الأنظمة)",
        description:
          "51837 مركبا. ROC-AUC 0.978 (Extra Trees)، 0.898 (Random Forest). 8 مرشحين. NPA020664 عند −8.96 كيلو كالوري/مول، ثم ديناميكا GROMACS. الطالبة الجامعية الوحيدة وأول مغربية في البرنامج. ورقة Q1. FIBO.",
      },
      ta: {
        title: "مساعدة تدريس",
        dateRange: "يناير 2026 حتى الآن",
        location: "إفران، المغرب",
        detail: "د. منى كتاني ود. نعيم شيخ",
        description: "المساعدة في تدريس البرمجة والخوارزميات والذكاء الاصطناعي: تصحيح، ساعات مكتبية، إرشاد ودعم تقني.",
      },
      "ufv-exchange": {
        title: "طالبة تبادل ثنائي",
        dateRange: "سبتمبر إلى ديسمبر 2025",
        location: "كولومبيا البريطانية، كندا",
        detail: "أول طالب تبادل من جامعة الأخوين (المغرب) في UFV · تعلم آلي ومعالجة لغة وتمويل",
        description: "فصل في التعلم الآلي ومعالجة اللغة والتمويل كأول طالب تبادل من جامعة الأخوين (المغرب) في UFV. ذكاء الاجتماعات مع د. راسل كامبل، وتخطيط حضري وزراعة مع د. مايك إيفانوف. عرض في يوم أبحاث السرطان 2025 بفانكوفر.",
      },
      "ufv-ra": {
        title: "مهندسة تعلم آلي ومساعدة بحث",
        dateRange: "أكتوبر إلى ديسمبر 2025",
        location: "وادي فريزر، كندا",
        description: "نماذج تعلم آلي للتخطيط الحضري المستدام وتقديم ورقة في يوم أبحاث سرطان كولومبيا البريطانية (2025).",
      },
      ravel: {
        title: "متدربة ذكاء اصطناعي وأتمتة",
        dateRange: "أبريل إلى يونيو 2025",
        location: "لشبونة، البرتغال (عن بُعد)",
        description: "+35% سرعة القرار. أتمتة Python وSQL ومقارنة نماذج للمواد المستدامة.",
      },
      "smart-city": {
        title: "متدربة هندسة برمجيات",
        dateRange: "يونيو إلى أغسطس 2024",
        location: "إفران، المغرب",
        detail: "د. حسين كتاني",
        description: "−30% زمن استرجاع البيانات. منصة React لتخطيط مدينة إفران الذكية.",
      },
      taqa: {
        title: "متدربة محللة بيانات",
        dateRange: "يونيو إلى أغسطس 2023",
        location: "الجديدة / الجرف الأصفر، المغرب",
        detail: "أكبر منتج مستقل للكهرباء، نحو 35% من كهرباء المغرب",
        description:
          "طاقة المغرب المنتج المستقل الرائد للكهرباء وتابعة لشركة أبوظبي الوطنية للطاقة، وتشغّل مجمع الجرف الأصفر الحراري، أكبر محطة فحم في منطقة الشرق الأوسط وشمال أفريقيا، ومدرجة في بورصة الدار البيضاء. وصول إلى بيانات المحطات، لوحات Power BI، خطوط SQL/Python وصيانة تنبؤية.",
      },
      freelance: {
        title: "مطوّرة ذكاء اصطناعي وواجهات",
        dateRange: "يناير 2024 حتى الآن",
        location: "المغرب",
        description: "تصميم ونشر وكلاء ذكاء اصطناعي مستقلين وواجهات إنتاج لشركات صغيرة.",
      },
      oip: {
        title: "سفيرة OIP",
        dateRange: "2026 حتى الآن",
        location: "إفران، المغرب",
        detail: "مكتب البرامج الدولية، جامعة الأخوين",
        description: "مرافقة الطلبة الدوليين الوافدين خلال فصلهم في الأخوين: الاستقبال من المطار، جولات تعريفية في إفران، ودعم الاندماج الأكاديمي والاجتماعي.",
      },
      abby: {
        title: "مدرّسة خصوصية",
        dateRange: "سبتمبر إلى ديسمبر 2025",
        location: "كولومبيا البريطانية، كندا",
        description: "تدريس الفرنسية والفيزياء والتفاضل لطلاب الثانوية خلال فصل التبادل.",
      },
      mentor: {
        title: "مرشدة أقران",
        dateRange: "سبتمبر إلى ديسمبر 2024",
        location: "إفران، المغرب",
        description: "إرشاد أكثر من 15 طالبا في سنتهم الأولى، بنسبة رضا 95%.",
      },
      counseling: {
        title: "مساعدة طلابية",
        dateRange: "2024",
        location: "إفران، المغرب",
        description: "دعم الطلاب في كل المستويات لمدة عام.",
      },
      charcot: {
        title: "مدرسة رياضيات وتحضير البكالوريا",
        dateRange: "2022 إلى 2023",
        location: "الجديدة، المغرب",
        description: "ساعات رياضيات إضافية وتحضير برمجة لطلاب البكالوريا في ثانوية جان شاركو.",
      },
    },
  },
  impact: {
    kicker: "القيادة والأثر",
    titleBefore: "العمل هو ",
    titleAccent: "النتيجة.",
    body: "51837 مركبا. 88.9% استرجاع. 247 صفقة. أكثر من 500 توصيلة. الأرقام هي العمل.",
    cta: "استكشف السجل",
    stats: [
      "مركبات MeFSAT فُحصت لـ CYP19A1",
      "نسبة نجاح استرجاع RAG، حساب التفاضل 2",
      "صفقات رأس مال مغامر مباشرة، U-Investors",
      "توصيلات جامعية سيرا، Delivery2Dorms",
    ],
  },
  vision: {
    kicker: "ما التالي",
    titleBefore: "الاستعداد للحدود ",
    titleAccent: "التالية.",
    accepted: "مقبولة",
    acceptedNames: [
      "زمالة LeadGreen، الدفعة 4",
      "تبادل ريادة الأعمال المناخية، معهد ويليام ديفيدسون",
      "مسابقة Intra-Africa 2063",
    ],
    acceptedDetails: [
      "مقبولة. اختيار من 6000 متقدم. قيادة مناخية أفريقية ممولة بالكامل.",
      "الدفعة 3، الأخوين × جامعة ميشيغان",
      "مقبولة لتمثيل جامعة الأخوين. الاختيار من الأخوين فقط. الطبعة 5، جامعة فاروس، الإسكندرية، مصر. برعاية الأخوين.",
    ],
  },
  contact: {
    kicker: "تواصل",
    intro: "أسرع طريقة للتواصل معي. السيرة الذاتية ورسائل التوصية متاحة عند الطلب.",
    references: "أكثر من 6 رسائل توصية",
    referencesBody: "متاحة عند الطلب، أرسلها بالبريد الإلكتروني مع سيرتي الذاتية.",
    referencesCta: "اطلب السيرة الذاتية والرسائل",
    referencesSubject: "طلب: السيرة الذاتية ورسائل التوصية",
    referencesEmailBody: "مرحبا مريم،\n\nهل يمكنك إرسال سيرتك الذاتية ورسائل التوصية؟\n\n",
    meeting: "احجز اجتماعا لمدة 30 دقيقة",
    meetingNote: "مواعيد أيام الأسبوع، بتوقيت المغرب",
    titleBefore: "لنبنِ ",
    titleAccent: "ما يهم.",
    cv: "اطلب السيرة بالبريد",
    cvNote: "السيرة خاصة. اطلبها بالبريد الإلكتروني.",
    cvSubject: "طلب السيرة، مريم المباركي",
    cvBody: "مرحبا مريم،\n\nأود طلب نسخة من سيرتك الذاتية.\n\n",
    footer: "مهندسة ذكاء اصطناعي · باحثة · المغرب",
    formName: "الاسم",
    formEmail: "البريد",
    formMessage: "الرسالة",
    formSend: "إرسال",
    formSending: "جارٍ الإرسال",
    formSent: "شكرا. سيفتح تطبيق البريد ليصلني الرسالة.",
    formError: "أضيفي اسما وبريدا صالحا ورسالة قصيرة.",
    formHint: "الخادم يتحقق من النموذج ثم يفتح تطبيق البريد.",
    book: "احجز اجتماع 30 دقيقة",
    bookHint: "اختاري يوما في الأسبوع بتوقيت المغرب. يصل الطلب إلى بريدي للتأكيد.",
    bookDate: "التاريخ",
    bookTime: "الوقت",
    bookTopic: "موضوع الحديث",
    bookSend: "اطلب هذا الموعد",
    bookSending: "جارٍ الإرسال",
    bookSent: "شكرا. سيفتح تطبيق البريد بطلب الاجتماع.",
    bookError: "أضيفي اسما وبريدا وتاريخا ووقتا.",
    bookZone: "توقيت المغرب (الدار البيضاء)",
  },
};

const originCopy: Record<
  Locale,
  {
    oldLead: string;
    newLead: string;
    oldBio: string;
    newBio: string;
    hometown: string;
    placeNote: string;
    lifeTitleBefore: string;
    base: string;
    focus: string;
    heroTitle: string;
    heroBody: string;
    stats: string[];
    ageStory: string;
    sororityOld: string;
    sororityNew: string;
  }
> = {
  en: {
    oldLead: "From Beni Tajjit in southeastern Morocco to research labs in Canada and Thailand, I build AI that does real work, and I bring my community with me.",
    newLead: "From El Jadida on Morocco's Atlantic coast to research labs in Canada and Thailand, I build AI that does real work, and I bring my community with me.",
    oldBio: "I'm Meriem Lmoubariki, from Beni Tajjit in southeastern Morocco.",
    newBio: "I'm from El Jadida on Morocco's Atlantic coast.",
    hometown: "El Jadida, Morocco",
    placeNote: "Where I'm from",
    lifeTitleBefore: "From El Jadida ",
    base: "Morocco",
    focus: "Applied AI · AI & Big Data Analytics",
    heroTitle: "I build AI systems that make complex operations less costly, more efficient, and more predictable.",
    heroBody: "I work in applied AI across computational drug discovery, education, and business operations.",
    stats: [
      "search space narrowed from 51,837 compounds to 8 candidates",
      "retrieval pass rate across 1,159 course-content chunks",
      "faster decision-making through AI and automation",
      "faster data retrieval on a city-planning platform",
      "lower forecast error versus a naive baseline",
      "campus roles held while completing my degree",
    ],
    ageStory:
      "At 21, I have often been the youngest and only Moroccan in international research and technology rooms. At KMUTT, I joined a cancer-drug-discovery lab as its only undergraduate and first Moroccan participant, with access to high-performance GPU computing. I was also invited as a sponsored delegate to IEEE Day, the IEEE anniversary celebration in Vancouver.",
    sororityOld: "AUI's first sorority",
    sororityNew: "Morocco's first university sorority",
  },
  fr: {
    oldLead: "De Beni Tajjit, dans le sud-est du Maroc",
    newLead: "D'El Jadida, sur la côte atlantique du Maroc",
    oldBio: "Je suis Meriem Lmoubariki, originaire de Beni Tajjit, dans le sud-est du Maroc.",
    newBio: "Je suis originaire d'El Jadida, sur la côte atlantique du Maroc.",
    hometown: "El Jadida, Maroc",
    placeNote: "Ma ville d'origine",
    lifeTitleBefore: "D'El Jadida ",
    base: "Maroc",
    focus: "IA appliquée · IA et Big Data",
    heroTitle: "Je crée des systèmes d'IA qui rendent les opérations complexes moins coûteuses, plus efficaces et plus prévisibles.",
    heroBody: "Je travaille en IA appliquée, entre découverte computationnelle de médicaments, éducation et opérations d'entreprise.",
    stats: [
      "espace de recherche réduit de 51 837 composés à 8 candidats",
      "taux de réussite du retrieval sur 1 159 segments de cours",
      "décisions accélérées grâce à l'IA et à l'automatisation",
      "récupération de données accélérée sur une plateforme d'urbanisme",
      "erreur de prévision réduite par rapport à une référence naïve",
      "emplois sur le campus pendant mes études",
    ],
    ageStory:
      "À 21 ans, j'ai souvent été la plus jeune et la seule Marocaine dans des espaces internationaux de recherche et de technologie. À KMUTT, j'ai rejoint un laboratoire de découverte de médicaments contre le cancer comme seule étudiante de premier cycle et première Marocaine du programme, avec accès au calcul GPU haute performance. J'ai également été invitée comme déléguée sponsorisée à IEEE Day, célébration de l'anniversaire de l'IEEE à Vancouver.",
    sororityOld: "première sororité d'AUI",
    sororityNew: "première sororité universitaire du Maroc",
  },
  ar: {
    oldLead: "من بني تجيت في جنوب شرق المغرب",
    newLead: "من الجديدة على ساحل المغرب الأطلسي",
    oldBio: "أنا مريم المباركي من بني تجيت في جنوب شرق المغرب.",
    newBio: "أنا من الجديدة على ساحل المغرب الأطلسي.",
    hometown: "الجديدة، المغرب",
    placeNote: "مدينتي الأصلية",
    lifeTitleBefore: "من الجديدة ",
    base: "المغرب",
    focus: "الذكاء الاصطناعي التطبيقي · الذكاء الاصطناعي والبيانات الضخمة",
    heroTitle: "أبني أنظمة ذكاء اصطناعي تجعل العمليات المعقدة أقل تكلفة وأكثر كفاءة وقابلية للتنبؤ.",
    heroBody: "أعمل في الذكاء الاصطناعي التطبيقي، بين اكتشاف الأدوية حاسوبيًا والتعليم والعمليات التشغيلية.",
    stats: [
      "تقليص نطاق البحث من 51,837 مركبا إلى 8 مرشحين",
      "نسبة نجاح الاسترجاع عبر 1,159 مقطعا من محتوى المقرر",
      "تسريع اتخاذ القرار باستخدام الذكاء الاصطناعي والأتمتة",
      "تسريع استرجاع البيانات في منصة تخطيط المدن",
      "خفض خطأ التنبؤ مقارنة بخط أساس بسيط",
      "وظائف جامعية خلال فترة الدراسة",
    ],
    ageStory:
      "في سن 21، كنت كثيرا الأصغر والمرأة المغربية الوحيدة في أوساط دولية للبحث والتقنية. انضممت في KMUTT إلى مختبر لاكتشاف أدوية السرطان بصفتي الطالبة الجامعية الوحيدة وأول مغربية في البرنامج، مع إمكانية الوصول إلى حوسبة GPU عالية الأداء. كما دُعيت بصفة مندوبة برعاية للمشاركة في IEEE Day، احتفالية ذكرى تأسيس IEEE في فانكوفر.",
    sororityOld: "أول جمعية نسائية في الأخوين",
    sororityNew: "أول جمعية نسائية جامعية في المغرب",
  },
};

function withCorrectOrigin(copy: Dict, locale: Locale): Dict {
  const origin = originCopy[locale];
  const otherPlaces = { ...copy.places.items };
  delete otherPlaces.beniTajjit;
  const exchangeBio =
    locale === "ar"
      ? copy.about.p2.replace(
          "كأول طالبة تبادل من جامعة الأخوين (المغرب) في UFV",
          "بصفتي أول مشاركة في التبادل من جامعة الأخوين (المغرب) في UFV",
        )
      : copy.about.p2;

  return {
    ...copy,
    about: {
      ...copy.about,
      lead: copy.about.lead.replace(origin.oldLead, origin.newLead),
      p1: copy.about.p1.replace(origin.oldBio, origin.newBio),
      p2: exchangeBio,
      p4: copy.about.p4.replaceAll(origin.sororityOld, origin.sororityNew),
      facts: copy.about.facts.map((fact, index) =>
        index === 0
          ? { ...fact, value: origin.hometown }
          : index === 2
            ? { ...fact, value: origin.focus }
            : fact,
      ),
    },
    hero: {
      ...copy.hero,
      title: origin.heroTitle,
      body: origin.heroBody,
      facts: copy.hero.facts.map((fact, index) =>
        index === 1 ? { ...fact, value: origin.base } : fact,
      ),
      stats: origin.stats,
    },
    causes: {
      ...copy.causes,
      items: copy.causes.items.map((item) => ({
        ...item,
        body: item.body.replaceAll(origin.sororityOld, origin.sororityNew),
      })),
    },
    places: {
      ...copy.places,
      items: {
        ...otherPlaces,
        elJadida: { name: origin.hometown, note: origin.placeNote },
      },
    },
    countries: { ...copy.countries, Morocco: origin.base },
    life: {
      ...copy.life,
      titleBefore: origin.lifeTitleBefore,
      items: copy.life.items.map((item) => ({
        ...item,
        detail: item.detail.replaceAll(origin.sororityOld, origin.sororityNew),
      })),
    },
  };
}

export const translations: Record<Locale, Dict> = {
  en: withCorrectOrigin(en, "en"),
  fr: withCorrectOrigin(fr, "fr"),
  ar: withCorrectOrigin(ar, "ar"),
};
