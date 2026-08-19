import { createFileRoute, Link } from "@tanstack/react-router";
import { Reveal } from "@/components/Reveal";
import { ArchThumb } from "@/components/ArchThumb";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { profile, projects, publications, experience, skills, journey, certifications, achievements, certificates, currentlyLearning } from "@/data/portfolio";

const title = "Rachit Jain — AI Engineer | Multi-Agent Systems & Production RAG";
const description =
  "AI Engineer building multi-agent systems and production RAG. 91% RAG accuracy, 300+ users served, IEEE published 2024 & 2026.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { property: "og:image", content: "/newprofilephoto.jpeg" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: title },
      { name: "twitter:description", content: description },
      { name: "twitter:image", content: "/newprofilephoto.jpeg" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: "AI Engineer",
          alumniOf: "NMIMS Hyderabad",
          knowsAbout: ["Retrieval Augmented Generation", "Multi-Agent Systems", "AWS Bedrock"],
          image: "/newprofilephoto.jpeg",
        }),
      },
    ],
  }),
  component: Index,
});

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <SiteHeader />

      {/* HERO */}
      <section id="top" className="relative mx-auto max-w-6xl px-5 pb-12 pt-12 sm:px-6 sm:pb-16 sm:pt-20 md:pb-20 md:pt-28 overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-gradient-to-br from-brand/30 to-transparent rounded-full blur-3xl opacity-70 dark:opacity-50 sm:w-[500px] sm:h-[500px] sm:top-1/4 sm:left-1/4" />
          <div className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] bg-gradient-to-tl from-purple-500/20 to-transparent rounded-full blur-2xl opacity-50 dark:opacity-30 sm:w-[400px] sm:h-[400px] sm:bottom-1/4 sm:right-1/4" />
        </div>
        
        {/* Stack badges visual - only show on larger screens */}
        <div className="absolute top-12 right-4 -z-10 hidden md:block">
          <div className="flex flex-wrap gap-2 max-w-[300px]">
            <div className="px-3 py-1.5 rounded bg-card/90 border border-border text-xs text-foreground backdrop-blur shadow-sm">Python</div>
            <div className="px-3 py-1.5 rounded bg-card/90 border border-border text-xs text-foreground backdrop-blur shadow-sm">AWS</div>
            <div className="px-3 py-1.5 rounded bg-card/90 border border-border text-xs text-foreground backdrop-blur shadow-sm">React</div>
            <div className="px-3 py-1.5 rounded bg-card/90 border border-border text-xs text-foreground backdrop-blur shadow-sm">FastAPI</div>
            <div className="px-3 py-1.5 rounded bg-card/90 border border-border text-xs text-foreground backdrop-blur shadow-sm">LangChain</div>
          </div>
        </div>

        <Reveal>
          <div className="flex flex-col items-center md:items-start gap-8 md:gap-10">
            {/* Profile Section with Photo */}
            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-8 lg:gap-10 w-full max-w-5xl">
              {/* Profile Photo */}
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-br from-brand to-purple-500 rounded-2xl blur opacity-50 group-hover:opacity-70 transition duration-500"></div>
                <div className="relative rounded-2xl overflow-hidden border-2 border-border shadow-2xl">
                  <img
                    src={profile.profilePhoto}
                    alt={profile.name}
                    className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 lg:w-56 lg:h-56 xl:w-64 xl:h-64 object-cover object-center transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-3 -right-3 bg-card border-2 border-border rounded-lg px-3 py-2 shadow-lg hidden md:block">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-brand">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
              </div>
              
              <div className="flex-1 w-full text-center md:text-left">
                <h1 className="font-mono text-4xl md:text-5xl lg:text-6xl font-semibold leading-[1.05] tracking-tight">
                  {profile.name}
                </h1>
                <p className="mt-5 max-w-2xl text-lg md:text-xl lg:text-2xl text-muted-foreground">{profile.role}</p>
                <p className="mt-4 max-w-xl text-sm md:text-base lg:text-lg leading-relaxed text-muted-foreground">
                  {profile.tagline}
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={100}>
          <div className="mt-8 grid grid-cols-3 gap-2 sm:mt-10 sm:grid-cols-3 sm:gap-3">
            {profile.stats.map((s) => (
              <div
                key={s.label}
                className="rounded-md border border-border bg-card p-3 text-center transition-colors hover:border-brand sm:p-5"
              >
                <div className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl">{s.value}</div>
                <div className="mt-1 font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                  {s.label}
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay={180}>
          <div className="mt-8 flex flex-wrap gap-2 sm:mt-10 sm:gap-3">
            <a
              href={profile.resume}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md bg-brand px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest text-white transition-opacity hover:opacity-90 sm:px-5 sm:py-2.5 sm:text-xs"
            >
              View Resume
            </a>
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-border px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors hover:border-brand hover:text-brand sm:px-5 sm:py-2.5 sm:text-xs"
            >
              GitHub ↗
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer noopener"
              className="rounded-md border border-border px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors hover:border-brand hover:text-brand sm:px-5 sm:py-2.5 sm:text-xs"
            >
              LinkedIn ↗
            </a>
            <a
              href="#contact"
              className="rounded-md border border-border px-3.5 py-2 font-mono text-[10px] uppercase tracking-widest transition-colors hover:border-brand hover:text-brand sm:px-5 sm:py-2.5 sm:text-xs"
            >
              Contact
            </a>
          </div>
        </Reveal>
      </section>

      {/* ABOUT / JOURNEY */}
      <section id="about" className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">About</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              From curious student to production AI.
            </h2>
            <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
              I'm a B.Tech Computer Science & Engineering (Data Science) graduate from Svkm's Narsee Monjee Institute of Management Studies Hyderabad (NMIMS).
              I specialise in building RAG pipelines and AI systems that handle real users and real edge cases not just notebook demos.
              My work has been peer-reviewed and published at IEEE twice.
            </p>
          </Reveal>

          <div className="mt-8 grid gap-6 md:mt-12 md:grid-cols-[1.2fr_1fr]">
            {/* Timeline */}
            <Reveal delay={80}>
              <ol className="space-y-4 sm:space-y-6">
                {journey.map((j, i) => (
                  <li key={j.year} className="relative flex gap-4 sm:gap-5 pl-5 sm:pl-6">
                    <span className="absolute left-0 top-2 size-2 rounded-full bg-brand sm:size-2.5" />
                    {i < journey.length - 1 && (
                      <span className="absolute left-[5px] top-4 h-full w-px bg-border sm:left-[6px]" />
                    )}
                    <div>
                      <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                        {j.year}
                      </div>
                      <div className="mt-0.5 font-mono text-sm font-semibold sm:text-base">{j.title}</div>
                      <div className="mt-1 max-w-[46ch] text-xs text-muted-foreground sm:text-sm">{j.body}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </Reveal>

            {/* Credentials + Certs */}
            <Reveal delay={140}>
              <div className="space-y-3 sm:space-y-4">
                <div className="rounded-md border border-border bg-card p-3 sm:p-4 sm:p-5">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                    Education
                  </p>
                  <p className="mt-2 font-mono text-sm font-semibold sm:text-base">{profile.education}</p>
                </div>
                {certifications.map((c) => (
                  <div
                    key={c.name}
                    className="flex items-center justify-between rounded-md border border-border bg-card p-3 transition-colors hover:border-brand sm:p-4"
                  >
                    <div>
                      <p className="font-mono text-[9px] uppercase tracking-widest text-muted-foreground sm:text-[10px]">
                        {c.issuer}
                      </p>
                      <p className="mt-0.5 font-mono text-sm font-semibold sm:text-base">{c.name}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Selected Projects</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Systems shipped, not demos.
            </h2>
          </Reveal>
          <div className="mt-8 grid gap-4 sm:mt-10 sm:gap-5 sm:grid-cols-2 md:gap-6">
            {projects.map((p, i) => (
              <Reveal key={p.slug} delay={i * 60}>
                <Link
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                  className="group flex h-full flex-col rounded-lg border border-border bg-card p-4 transition-all hover:-translate-y-0.5 hover:border-brand hover:shadow-lg sm:p-6"
                >
                  <div className="flex items-start justify-between gap-3 sm:gap-4">
                    <div>
                      <h3 className="font-mono text-base font-semibold tracking-tight sm:text-lg">{p.name}</h3>
                      <p className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                        {p.tagline}
                      </p>
                    </div>
                    {p.highlight ? (
                      <span className="shrink-0 rounded border border-brand px-2 py-1 font-mono text-[9px] uppercase tracking-widest text-brand sm:text-[10px]">
                        {p.highlight}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-4 text-xs leading-relaxed text-muted-foreground sm:text-sm">{p.problem}</p>
                  <div className="mt-4 overflow-hidden rounded-md border border-border bg-surface sm:mt-5">
                    {p.cover ? (
                      <img
                        src={p.cover}
                        alt={`${p.name} interface screenshot`}
                        loading="lazy"
                        className="h-32 w-full object-cover object-top transition-transform duration-500 group-hover:scale-[1.03] sm:h-40"
                      />
                    ) : (
                      <ArchThumb label={p.name} />
                    )}
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1 sm:mt-5 sm:gap-1.5">
                    {p.stack.slice(0, 4).map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                    {p.stack.length > 4 && <span className="text-[9px] text-muted-foreground sm:text-[10px]">+{p.stack.length - 4}</span>}
                  </div>
                  <span className="mt-4 font-mono text-[10px] uppercase tracking-widest text-brand sm:mt-6 sm:text-xs">
                    View Case Study{" "}
                    <span className="inline-block transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PUBLICATIONS */}
      <section id="research" className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Research</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              IEEE publications.
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:gap-5">
            {publications.map((pub, i) => (
              <Reveal key={pub.title} delay={i * 60}>
                <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-brand sm:text-[11px]">
                    {pub.venue}
                  </span>
                  <h3 className="mt-3 max-w-3xl font-mono text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
                    {pub.title}
                  </h3>
                  <p className="mt-3 max-w-2xl text-xs text-muted-foreground sm:text-sm">{pub.summary}</p>
                  <a
                    href={pub.link}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="mt-4 inline-block font-mono text-[10px] uppercase tracking-widest text-brand hover:underline sm:mt-6 sm:text-xs"
                  >
                    IEEE Xplore →
                  </a>
                  {pub.certificate && (
                    <div className="mt-4">
                      <a
                        href={pub.certificate.preview}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="font-mono text-[10px] uppercase tracking-widest text-brand hover:underline sm:mt-6 sm:text-xs"
                      >
                        View Certificate →
                      </a>
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Experience</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Where I've shipped from.
            </h2>
          </Reveal>
          <div className="mt-6 divide-y divide-border border-y border-border sm:mt-8">
            {experience.map((e, i) => (
              <Reveal key={e.org} delay={i * 80}>
                <div className="grid gap-2 py-4 sm:py-6 sm:grid-cols-[160px_1fr] md:grid-cols-[180px_1fr]">
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-xs">
                    {e.period}
                  </div>
                  <div>
                    <h3 className="font-mono text-sm font-semibold sm:text-base">
                      {e.role} —{" "}
                      <span className="text-muted-foreground">{e.org}</span>
                    </h3>
                    <ul className="mt-2 space-y-1 text-xs text-muted-foreground sm:text-sm">
                      {e.points.map((pt) => (
                        <li key={pt}>— {pt}</li>
                      ))}
                    </ul>
                    {e.playStoreLink && (
                      <a
                        href={e.playStoreLink}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="mt-3 inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest transition-colors hover:border-brand hover:text-brand sm:mt-4 sm:px-4 sm:py-2 sm:text-xs"
                      >
                        <svg
                          className="size-4"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          aria-label="Play Store"
                        >
                          <path d="M12 2L1 21h22L12 2zm0 3.5L19.5 19h-15L12 5.5z" fill="currentColor"/>
                        </svg>
                        View on Google Play
                        <span className="font-mono text-[9px] text-muted-foreground sm:text-xs">↗</span>
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS */}
      <section id="stack" className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Stack</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              The ecosystem I build in.
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3">
            {skills.map((g, i) => (
              <Reveal key={g.group} delay={i * 60}>
                <div className="rounded-lg border border-border bg-card p-4 sm:p-5 h-full">
                  <h3 className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                    {g.group}
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5">
                    {g.items.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ACHIEVEMENTS */}
      <section id="achievements" className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Achievements</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Certifications & Recognitions.
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4 md:grid-cols-3">
            {achievements
              .sort((a, b) => (b as any).date.localeCompare((a as any).date))
              .map((a, i) => (
                <Reveal key={i} delay={i * 60}>
                  <a
                    href={(a as any).credlyUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-brand hover:shadow-md"
                  >
                    <div className="relative flex items-center justify-center bg-surface px-2 py-2 sm:px-4 sm:py-3">
                      <img
                        src={(a as any).imageUrl}
                        alt={(a as any).title}
                        className="max-h-24 w-full object-contain sm:max-h-32"
                      />
                    </div>
                    <div className="p-3 sm:p-4">
                      <h3 className="font-mono text-base font-semibold">{(a as any).title}</h3>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                        {(a as any).issuer}
                      </p>
                      <p className="mt-2 font-mono text-[10px] text-muted-foreground sm:text-xs">{(a as any).date}</p>
                    </div>
                  </a>
                </Reveal>
              ))}
          </div>
        </div>
      </section>

      {/* CERTIFICATES */}
      <section id="certificates" className="border-t border-border bg-surface/50">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Certificates</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              Official Certifications.
            </h2>
          </Reveal>
          <div className="mt-6 grid grid-cols-1 gap-3 sm:mt-6 sm:grid-cols-2 sm:gap-4">
            {certificates.map((c, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="group flex flex-col overflow-hidden rounded-lg border border-border bg-card transition-all hover:border-brand hover:shadow-md">
                  <div className="relative aspect-video overflow-hidden bg-surface">
                    <img
                      src={c.previewUrl}
                      alt={`${c.title} preview`}
                      className="h-full w-full object-cover object-center"
                    />
                  </div>
                  <div className="p-3 sm:p-4">
                    <h3 className="font-mono text-base font-semibold">{c.title}</h3>
                    <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
                      {c.issuer}
                    </p>
                    <p className="mt-2 font-mono text-[10px] text-muted-foreground sm:text-xs">{c.date}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CURRENTLY LEARNING */}
      <section id="learning" className="border-t border-border">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 sm:py-16 md:py-20">
          <Reveal>
            <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-brand sm:text-xs">Currently Exploring</p>
            <h2 className="mt-3 font-mono text-xl font-semibold tracking-tight sm:text-2xl md:text-3xl">
              What I'm leaning & building.
            </h2>
          </Reveal>
          <div className="mt-6 grid gap-4 sm:mt-8 sm:grid-cols-2 sm:gap-6">
            {currentlyLearning.map((l, i) => (
              <Reveal key={i} delay={i * 60}>
                <div className="rounded-lg border border-border bg-card p-4 sm:p-5 h-full">
                  <h3 className="font-mono text-base font-semibold">{l.topic}</h3>
                  <p className="mt-2 text-xs text-muted-foreground sm:text-sm">{l.description}</p>
                  <div className="mt-3 flex flex-wrap gap-1 sm:mt-3 sm:gap-1.5">
                    {l.tags.map((t) => (
                      <Tag key={t}>{t}</Tag>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </div>
  );
}

