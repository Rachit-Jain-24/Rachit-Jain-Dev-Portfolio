import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useRef, useState, useCallback } from "react";
import { Reveal } from "@/components/Reveal";
import { ArchThumb } from "@/components/ArchThumb";
import { SiteHeader, SiteFooter } from "@/components/SiteChrome";
import { profile, projects, type Project } from "@/data/portfolio";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const project = projects.find((p) => p.slug === params.slug);
    if (!project) throw notFound();
    return { project };
  },
  head: ({ params, loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Unavailable" }, { name: "robots", content: "noindex" }] };
    }
    const t = `${loaderData.project.name} — Case Study | ${profile.name}`;
    return {
      meta: [
        { title: t },
        { name: "description", content: loaderData.project.problem },
        { property: "og:title", content: t },
        { property: "og:description", content: loaderData.project.problem },
        { property: "og:type", content: "article" },
        { property: "og:url", content: `/projects/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      links: [{ rel: "canonical", href: `/projects/${params.slug}` }],
    };
  },
  component: CaseStudy,
});

/* ── Lightbox ──────────────────────────────────────────────────────── */

interface LightboxImage {
  src: string;
  alt: string;
  caption: string;
}

function Lightbox({
  images,
  startIndex,
  onClose,
}: {
  images: LightboxImage[];
  startIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(startIndex);
  const overlayRef = useRef<HTMLDivElement>(null);

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length],
  );
  const next = useCallback(
    () => setCurrent((c) => (c + 1) % images.length),
    [images.length],
  );

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose, prev, next]);

  const img = images[current];
  if (!img) return null;

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-sm"
      onClick={(e) => { if (e.target === overlayRef.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-label="Image viewer"
    >
      {/* Close */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 grid size-9 place-items-center rounded-full border border-white/20 font-mono text-sm text-white/70 transition-colors hover:border-white/60 hover:text-white"
        aria-label="Close"
      >
        ✕
      </button>

      {/* Prev */}
      {images.length > 1 && (
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full border border-white/20 font-mono text-white/70 transition-colors hover:border-white/60 hover:text-white sm:left-6"
          aria-label="Previous"
        >
          ←
        </button>
      )}

      {/* Image + caption */}
      <div className="mx-12 flex max-h-[90dvh] max-w-4xl flex-col items-center gap-3 sm:mx-20">
        <img
          src={img.src}
          alt={img.alt}
          className="max-h-[80dvh] max-w-full rounded-lg object-contain shadow-2xl"
        />
        {img.caption && (
          <p className="px-2 text-center font-mono text-[11px] text-white/55">{img.caption}</p>
        )}
        {images.length > 1 && (
          <p className="font-mono text-[10px] text-white/35">
            {current + 1} / {images.length}
          </p>
        )}
      </div>

      {/* Next */}
      {images.length > 1 && (
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 grid size-10 place-items-center rounded-full border border-white/20 font-mono text-white/70 transition-colors hover:border-white/60 hover:text-white sm:right-6"
          aria-label="Next"
        >
          →
        </button>
      )}
    </div>
  );
}

/* Shared hook — manages open/close state for a pool of lightbox images */
function useLightbox(images: LightboxImage[]) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const node =
    openIndex !== null ? (
      <Lightbox images={images} startIndex={openIndex} onClose={() => setOpenIndex(null)} />
    ) : null;
  return { open: setOpenIndex, node };
}

/* ── Shared visual primitives ──────────────────────────────────────── */

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded border border-border bg-surface px-2 py-1 font-mono text-[11px] text-muted-foreground">
      {children}
    </span>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-md border border-border bg-card p-4 sm:p-5">
      <div className="font-mono text-xl font-semibold tracking-tight text-foreground sm:text-2xl">
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted-foreground sm:text-[11px]">
        {label}
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-5">
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-brand">{eyebrow}</p>
      <h2 className="mt-2 font-mono text-lg font-semibold tracking-tight sm:text-xl md:text-2xl">
        {title}
      </h2>
    </div>
  );
}

function Divider() {
  return <hr className="border-t border-border" />;
}

function Callout({ children }: { children: React.ReactNode }) {
  return (
    <blockquote className="my-6 border-l-2 border-brand pl-4 font-mono text-sm italic leading-7 text-muted-foreground">
      {children}
    </blockquote>
  );
}

/* Diagram — can optionally be clickable for expand */
function DiagramImage({
  src,
  alt,
  caption,
  className = "",
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  className?: string;
  onClick?: () => void;
}) {
  const isClickable = !!onClick;
  return (
    <figure
      className={`overflow-hidden rounded-lg border border-border bg-surface ${isClickable ? "group cursor-zoom-in transition-all hover:border-brand hover:shadow-md" : ""} ${className}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); } : undefined}
      aria-label={isClickable ? `Expand: ${alt}` : undefined}
    >
      <div className="relative overflow-hidden">
        <img src={src} alt={alt} loading="lazy" className="w-full object-contain" />
        {isClickable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/15 group-hover:opacity-100">
            <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
              Click to expand
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-border px-4 py-2.5 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* Portrait diagram — tall images, centered, optionally clickable */
function PortraitDiagram({
  src,
  alt,
  caption,
  onClick,
}: {
  src: string;
  alt: string;
  caption?: string;
  onClick?: () => void;
}) {
  const isClickable = !!onClick;
  return (
    <figure
      className={`overflow-hidden rounded-lg border border-border bg-surface ${isClickable ? "group cursor-zoom-in transition-all hover:border-brand hover:shadow-md" : ""}`}
      onClick={onClick}
      role={isClickable ? "button" : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => { if (e.key === "Enter" || e.key === " ") onClick?.(); } : undefined}
      aria-label={isClickable ? `Expand: ${alt}` : undefined}
    >
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="mx-auto max-h-[560px] w-full object-contain sm:max-h-[640px]"
        />
        {isClickable && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/15 group-hover:opacity-100">
            <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
              Click to expand
            </span>
          </div>
        )}
      </div>
      {caption && (
        <figcaption className="border-t border-border px-3 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* UI Screenshot — clickable, opens lightbox */
function UIImage({
  src,
  alt,
  caption,
  onClick,
  className = "",
}: {
  src: string;
  alt: string;
  caption: string;
  onClick: () => void;
  className?: string;
}) {
  return (
    <figure
      className={`group cursor-zoom-in overflow-hidden rounded-lg border border-border bg-surface transition-all hover:border-brand hover:shadow-md ${className}`}
      onClick={onClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") onClick(); }}
      aria-label={`Expand: ${alt}`}
    >
      <div className="relative overflow-hidden">
        <img
          src={src}
          alt={alt}
          loading="lazy"
          className="w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/0 opacity-0 transition-all duration-200 group-hover:bg-black/20 group-hover:opacity-100">
          <span className="rounded-full bg-black/60 px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest text-white backdrop-blur-sm">
            Click to expand
          </span>
        </div>
      </div>
      {caption && (
        <figcaption className="border-t border-border px-3 py-2 font-mono text-[11px] text-muted-foreground">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ── Campus Assistant — lightbox image pool ────────────────────────── */
// Every image — UI screenshots AND diagrams — is in one pool so ← →
// navigation works across the whole case study.

const CA_UI_IMAGES: LightboxImage[] = [
  {
    src: "/projects/campus-assistant/context_collision_mono.png",
    alt: "Context collision in monolithic RAG",
    caption: "Context collision — a single index surfaces conflicting STME and SOL policies simultaneously",
  },
  {
    src: "/projects/campus-assistant/architecture flow.png",
    alt: "Campus Assistant system architecture",
    caption: "Fig. 1 — System architecture: query → Flask API → domain router → school-specific FAISS index → Mixtral-8x7b on Amazon Bedrock → cited response",
  },
  {
    src: "/projects/campus-assistant/knowledgebase_interface.png",
    alt: "Knowledge base ingestion UI",
    caption: "Knowledge base ingestion and rebuild UI — per-school document management",
  },
  {
    src: "/projects/campus-assistant/admin_interface.png",
    alt: "Admin portal",
    caption: "Admin portal — upload documents, trigger rebuild, monitor index health",
  },
  {
    src: "/projects/campus-assistant/first_interface_chat.jpg",
    alt: "English chat interface",
    caption: "English query — grounded policy answer with source citation",
  },
  {
    src: "/projects/campus-assistant/hindi.jpg",
    alt: "Hindi language support",
    caption: "Hindi language — query normalised via Google Translation API before retrieval",
  },
  {
    src: "/projects/campus-assistant/telugu.jpg",
    alt: "Telugu language support",
    caption: "Telugu language — full trilingual coverage",
  },
  {
    src: "/projects/campus-assistant/user_conversational_flow.png",
    alt: "User conversational flow diagram",
    caption: "Fig. 3 — Conversational flow: input → language detection → routing → retrieval → grounding check → cited response",
  },
  {
    src: "/projects/campus-assistant/user_chat_interface.png",
    alt: "Full user chat interface",
    caption: "Full chat UI — citations rendered inline below each response",
  },
  {
    src: "/projects/campus-assistant/end_to_end_query.png",
    alt: "End-to-end query resolution",
    caption: "End-to-end query — domain router selects school shard, retrieves top-k chunks",
  },
  {
    src: "/projects/campus-assistant/query_classification.png",
    alt: "Query classification decision tree",
    caption: "Query classification — school identification + policy sensitivity check",
  },
  {
    src: "/projects/campus-assistant/Figure_4_1_1.png",
    alt: "Response accuracy and contextual relevance comparison",
    caption: "Fig. 4.1.1 — Response accuracy and contextual relevance: baseline vs F-RAG",
  },
  {
    src: "/projects/campus-assistant/Figure_4_1_2.png",
    alt: "Hallucination rate comparison",
    caption: "Fig. 4.1.2 — Hallucination rate: 14% baseline → 3% with F-RAG",
  },
];

/* ── Campus Assistant body ─────────────────────────────────────────── */

function CampusAssistantCaseStudy() {
  const { open, node } = useLightbox(CA_UI_IMAGES);
  const idx = (src: string) => CA_UI_IMAGES.findIndex((i) => i.src === src);

  return (
    <>
      {node}

      {/* 01 Problem */}
      <Reveal>
        <section className="py-8 sm:py-10">
          <SectionHeading
            eyebrow="01 · Problem"
            title="Campus knowledge is siloed, multilingual, and hallucination-prone."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              NMIMS Hyderabad runs four distinct schools — Engineering (STME), Law (SOL), Commerce
              (SCOM), and Pharmacy — each with its own policies, fee structures, and attendance rules.
              Students routinely asked the same policy questions but received inconsistent answers because
              no single machine-readable source of truth existed.
            </p>
            <p>
              The student body communicates in English, Hindi, and Telugu. Generic LLMs deployed without
              grounding would confidently hallucinate policy numbers — stating the wrong attendance
              threshold or the wrong grade boundary — because they had no access to the actual
              institutional documents.
            </p>
            <p>
              The specific failure mode that motivated the federated design was{" "}
              <strong className="text-foreground">context collision</strong>: when STME's 75% attendance
              rule and SOL's 80% rule both appeared in the same monolithic retrieval context, the model had
              no principled way to choose the correct one. It would hedge, average, or pick wrong.
            </p>
          </div>

          <UIImage
            src="/projects/campus-assistant/context_collision_mono.png"
            alt="Context collision in monolithic RAG"
            caption="Context collision — a single index surfaces conflicting STME and SOL policies, causing incorrect or hedged answers"
            onClick={() => open(idx("/projects/campus-assistant/context_collision_mono.png"))}
            className="my-8"
          />

          <div className="text-sm leading-7 text-muted-foreground">
            <p>
              The baseline system achieved only{" "}
              <strong className="text-foreground">68% response accuracy</strong> and a{" "}
              <strong className="text-foreground">14% hallucination rate</strong> on a 120-question
              evaluation. Context collision accounted for the majority of accuracy failures.
            </p>
          </div>

          <Callout>
            The core failure was not the LLM — it was retrieval without boundaries. A single index
            served four schools with conflicting policies, and the model had no way to know which
            policy applied.
          </Callout>
        </section>
      </Reveal>

      <Divider />

      {/* 02 System Design */}
      <Reveal>
        <section className="py-8 sm:py-10">
          <SectionHeading
            eyebrow="02 · System Design"
            title="Federated RAG with context-aware domain routing."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              The solution is a{" "}
              <strong className="text-foreground">Federated RAG (F-RAG)</strong> architecture: each
              school owns an isolated FAISS index. A{" "}
              <strong className="text-foreground">Context-Aware Domain Router</strong> classifies every
              incoming query before retrieval — SOL questions only ever hit the SOL index, eliminating
              context collision by design.
            </p>
          </div>

          <DiagramImage
            src="/projects/campus-assistant/architecture flow.png"
            alt="Campus Assistant system architecture"
            caption="Fig. 1 — System architecture: query → Flask API → domain router → school-specific FAISS index → grounded context → Mixtral-8x7b on Amazon Bedrock → cited response"
            className="my-8"
            onClick={() => open(idx("/projects/campus-assistant/architecture flow.png"))}
          />

          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Documents are ingested via a pipeline combining{" "}
              <strong className="text-foreground">Amazon Textract</strong> for layout-aware PDF
              parsing and <strong className="text-foreground">LangChain document loaders</strong> for
              structured formats. Every chunk is embedded with{" "}
              <strong className="text-foreground">Amazon Bedrock Titan Embeddings</strong> and stored in
              the school's FAISS index on <strong className="text-foreground">Amazon S3</strong>.
            </p>
            <p>
              At inference time the router applies keyword + semantic classification, routing to the
              correct shard.{" "}
              <strong className="text-foreground">Mixtral-8x7b-instruct-v0:1</strong> on Amazon Bedrock
              receives only top-k chunks from that shard — dramatically reducing context window noise.
            </p>
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 03 Knowledge Base */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="03 · Knowledge Base"
            title="Per-school ingestion and rebuild pipeline."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
            Each school's index can be rebuilt independently without affecting others — a deliberate
            ownership model that keeps the system maintainable as policies change each semester.
            Amazon Textract handles scanned PDFs; once embedded, the index is persisted to S3 and
            hot-swapped without downtime.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/campus-assistant/knowledgebase_interface.png"
              alt="Knowledge base ingestion UI"
              caption="Knowledge base ingestion and rebuild UI"
              onClick={() => open(idx("/projects/campus-assistant/knowledgebase_interface.png"))}
            />
            <UIImage
              src="/projects/campus-assistant/admin_interface.png"
              alt="Admin portal"
              caption="Admin portal — upload, rebuild, monitor"
              onClick={() => open(idx("/projects/campus-assistant/admin_interface.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 04 Multilingual & Voice */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="04 · Multilingual & Voice"
            title="Three languages. One pipeline."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
            Students code-mix English, Hindi, and Telugu mid-sentence. A{" "}
            <strong className="text-foreground">query normalisation layer</strong> translates
            non-English input via the{" "}
            <strong className="text-foreground">Google Translation API</strong> before embedding,
            ensuring recall doesn't collapse on mixed-language input. A{" "}
            <strong className="text-foreground">Whisper STT</strong> front-end enables voice queries —
            particularly useful on mobile.
          </p>

          <div className="grid gap-4 sm:grid-cols-3">
            <UIImage
              src="/projects/campus-assistant/first_interface_chat.jpg"
              alt="English chat interface"
              caption="English — cited answer"
              onClick={() => open(idx("/projects/campus-assistant/first_interface_chat.jpg"))}
            />
            <UIImage
              src="/projects/campus-assistant/hindi.jpg"
              alt="Hindi language support"
              caption="Hindi — normalised before retrieval"
              onClick={() => open(idx("/projects/campus-assistant/hindi.jpg"))}
            />
            <UIImage
              src="/projects/campus-assistant/telugu.jpg"
              alt="Telugu language support"
              caption="Telugu — full coverage"
              onClick={() => open(idx("/projects/campus-assistant/telugu.jpg"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 05 User Experience */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="05 · User Experience"
            title="From query to grounded answer."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
            The system displays the source document and section alongside every answer — a
            transparency mechanism that lets students verify policy claims directly. The conversational
            flow below shows the full path from input to cited response.
          </p>

          <DiagramImage
            src="/projects/campus-assistant/user_conversational_flow.png"
            alt="User conversational flow diagram"
            caption="Fig. 3 — Conversational flow: input → language detection → routing → retrieval → grounding check → cited response"
            className="mb-6"
            onClick={() => open(idx("/projects/campus-assistant/user_conversational_flow.png"))}
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/campus-assistant/user_chat_interface.png"
              alt="Full user chat interface"
              caption="Chat UI — citations inline below each response"
              onClick={() => open(idx("/projects/campus-assistant/user_chat_interface.png"))}
            />
            <UIImage
              src="/projects/campus-assistant/end_to_end_query.png"
              alt="End-to-end query resolution"
              caption="End-to-end — router selects shard, retrieves chunks"
              onClick={() => open(idx("/projects/campus-assistant/end_to_end_query.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 06 Routing Logic */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="06 · Routing Logic"
            title="How the domain router classifies queries."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              The router combines keyword signals (school names, department codes, module IDs) with
              lightweight semantic classification to assign each query to one of four school shards —
              or a global shard for cross-department queries like campus events.
            </p>
            <p>
              The router also flags <em>policy-sensitive</em> queries. These trigger an additional
              grounding check — answers below a retrieval confidence threshold are refused with an
              explicit "I couldn't find a reliable answer" rather than hallucinated.
            </p>
          </div>

          <div className="my-8 flex justify-center">
            <PortraitDiagram
              src="/projects/campus-assistant/query_classification.png"
              alt="Query classification decision tree"
              caption="Query classification — school identification + policy sensitivity check"
              onClick={() => open(idx("/projects/campus-assistant/query_classification.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 07 Evaluation */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="07 · Evaluation"
            title="60 questions. 120 graded answers. Real policy conflicts."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground sm:text-base">
            <p>
              The evaluation was designed to expose context collision. A 60-question test set targeted
              policy areas where STME and SOL conflict: STME requires 75% attendance / 50% passing grade;
              SOL requires 80% attendance / 40% passing grade. Each question was graded for both schools
              — 120 total answer judgements.
            </p>
            <p>
              Three metrics tracked:{" "}
              <strong className="text-foreground">Response Accuracy</strong> (factually correct?),{" "}
              <strong className="text-foreground">Contextual Relevance</strong> (answers the question?),
              and{" "}
              <strong className="text-foreground">Hallucination Rate</strong> (asserts something not in
              retrieved docs?).
            </p>
          </div>

          <div className="my-8 grid gap-4 sm:grid-cols-2">
            <PortraitDiagram
              src="/projects/campus-assistant/Figure_4_1_1.png"
              alt="Accuracy and relevance comparison"
              caption="Fig. 4.1.1 — Response accuracy and contextual relevance: baseline vs F-RAG"
              onClick={() => open(idx("/projects/campus-assistant/Figure_4_1_1.png"))}
            />
            <PortraitDiagram
              src="/projects/campus-assistant/Figure_4_1_2.png"
              alt="Hallucination rate comparison"
              caption="Fig. 4.1.2 — Hallucination rate: 14% baseline → 3% with F-RAG"
              onClick={() => open(idx("/projects/campus-assistant/Figure_4_1_2.png"))}
            />
          </div>

          <Callout>
            The federated architecture's biggest gain was the 11 percentage-point collapse in
            hallucination rate. Grounding queries to a school-specific shard eliminates the class of
            errors that come from the LLM choosing between two contradictory but equally plausible
            retrieved chunks.
          </Callout>
        </section>
      </Reveal>

      <Divider />

      {/* 08 Demo */}
      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="08 · Demo" title="Full end-to-end walkthrough." />
          <p className="mb-6 text-sm leading-7 text-muted-foreground sm:text-base">
            The video walks through a complete session: school selection, a Hindi query, the routing
            decision, retrieval from the school-specific FAISS shard, the grounding check, and the cited
            response rendered in the chat UI.
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <video
              controls
              className="w-full"
              aria-label="Campus Assistant demo video"
              poster="/projects/campus-assistant/first_interface_chat.jpg"
            >
              <source
                src="/projects/campus-assistant/campus assistant demo - Made with Clipchamp.mp4"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </Reveal>
    </>
  );
}

/* ── Generic case study ────────────────────────────────────────────── */

function GenericCaseStudy({ project }: { project: Project }) {
  // Build lightbox pool: architecture + all screenshots
  const lightboxImages: LightboxImage[] = [];
  
  // Add architecture image first if available
  if (project.architectureImage) {
    lightboxImages.push({
      src: project.architectureImage,
      alt: `${project.name} architecture`,
      caption: `System architecture — ${project.name}`,
    });
  }
  
  // Add all screenshots
  if (project.screenshots) {
    project.screenshots.forEach((s) => {
      lightboxImages.push({
        src: s.src,
        alt: s.caption,
        caption: s.caption,
      });
    });
  }
  
  const { open, node } = useLightbox(lightboxImages);
  const idx = (src: string) => lightboxImages.findIndex((i) => i.src === src);

  return (
    <>
      {node}

      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="01 · Problem" title="What this was solving." />
          <p className="text-sm leading-7 text-muted-foreground">{project.problem}</p>
        </section>
      </Reveal>

      <Divider />

      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="02 · Architecture" title="How it's built." />
          {project.architectureImage ? (
            <DiagramImage
              src={project.architectureImage}
              alt={`${project.name} architecture`}
              caption={`System architecture — ${project.name}`}
              className="my-6"
              onClick={() => open(idx(project.architectureImage!))}
            />
          ) : (
            <div className="rounded-lg border border-border bg-surface p-2">
              <ArchThumb label={project.name} />
              <p className="mt-2 px-2 pb-2 font-mono text-[11px] text-muted-foreground">
                Add an image to{" "}
                <code className="rounded bg-muted px-1">/public/projects/{project.slug}/</code> to
                replace this placeholder.
              </p>
            </div>
          )}
        </section>
      </Reveal>

      <Divider />

      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="03 · Key Decisions" title="Why it was built this way." />
          <ul className="space-y-4">
            {project.decisions.map((d: string, i: number) => (
              <li key={d} className="flex gap-4 text-sm leading-7 text-muted-foreground">
                <span className="mt-0.5 shrink-0 font-mono text-xs text-brand">0{i + 1}</span>
                <span>{d}</span>
              </li>
            ))}
          </ul>
        </section>
      </Reveal>

      {lightboxImages.length > 1 && (
        <>
          <Divider />
          <Reveal>
            <section className="py-10">
              <SectionHeading eyebrow="04 · Screenshots" title="In production." />
              <div className="grid gap-4 sm:grid-cols-2">
                {lightboxImages.slice(1).map((img, i) => (
                  <UIImage
                    key={img.src}
                    src={img.src}
                    alt={img.alt}
                    caption={img.caption}
                    onClick={() => open(i + 1)}
                  />
                ))}
              </div>
            </section>
          </Reveal>
        </>
      )}

      <Divider />

      {project.demoMedia ? (
        <Reveal>
          <section className="py-10">
            <SectionHeading eyebrow="Demo" title="Walkthrough." />
            <div className="overflow-hidden rounded-lg border border-border bg-surface">
              <video controls className="w-full" aria-label={`${project.name} demo`}>
                <source src={project.demoMedia} type="video/mp4" />
              </video>
            </div>
          </section>
        </Reveal>
      ) : (
        <Reveal>
          <section className="py-10">
            <SectionHeading eyebrow="Demo" title="Coming soon." />
            <div className="flex aspect-video items-center justify-center rounded-md border border-dashed border-border bg-surface">
              <p className="font-mono text-[11px] uppercase tracking-widest text-muted-foreground">
                {project.demoNote}
              </p>
            </div>
          </section>
        </Reveal>
      )}
    </>
  );
}

/* ── Root component ────────────────────────────────────────────────── */

function CaseStudy() {
  const { project } = Route.useLoaderData();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />

      <article className="mx-auto max-w-3xl px-5 pb-16 pt-12 sm:px-6 sm:pt-16">

        {/* Header */}
        <Reveal>
          <Link
            to="/"
            hash="projects"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-muted-foreground transition-colors hover:text-brand"
          >
            ← All projects
          </Link>

          <div className="mt-8 border-b border-border pb-10">
            {project.highlight && (
              <span className="mb-4 inline-block rounded border border-brand px-2 py-1 font-mono text-[10px] uppercase tracking-widest text-brand">
                {project.highlight}
              </span>
            )}
            <h1 className="font-mono text-2xl font-semibold tracking-tight sm:text-3xl md:text-4xl">
              {project.name}
            </h1>
            <p className="mt-2 font-mono text-sm text-muted-foreground">{project.tagline}</p>

            <div className="mt-5 flex flex-wrap gap-1.5">
              {project.stack.map((t: string) => <Tag key={t}>{t}</Tag>)}
            </div>

            <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-4">
              {project.results.map((r: { label: string; value: string }) => (
                <Metric key={r.label} value={r.value} label={r.label} />
              ))}
            </div>

            <div className="mt-6 flex flex-wrap gap-4">
              <a
                href={project.repo ?? profile.github}
                target="_blank"
                rel="noreferrer noopener"
                className="font-mono text-xs uppercase tracking-widest text-brand hover:underline"
              >
                GitHub →
              </a>
              {project.paper && (
                <a
                  href={project.paper}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="font-mono text-xs uppercase tracking-widest text-brand hover:underline"
                >
                  Read paper (PDF) →
                </a>
              )}
            </div>
          </div>
        </Reveal>

        {/* Body */}
        {project.slug === "campus-assistant" ? (
          <CampusAssistantCaseStudy />
        ) : project.slug === "campus2career" ? (
          <Campus2CareerCaseStudy />
        ) : project.slug === "smart-resume-evaluator" ? (
          <SmartResumeEvaluatorCaseStudy />
        ) : project.slug === "finnacleai" ? (
          <FinnacleAICaseStudy />
        ) : (
          <GenericCaseStudy project={project} />
        )}

        {/* Bottom nav */}
        <Reveal>
          <div className="mt-12 flex items-center justify-between border-t border-border pt-8">
            <Link
              to="/"
              hash="projects"
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-brand"
            >
              ← All projects
            </Link>
            <a
              href={`mailto:${profile.email}`}
              className="font-mono text-xs uppercase tracking-widest text-muted-foreground hover:text-brand"
            >
              Get in touch →
            </a>
          </div>
        </Reveal>

      </article>

      <SiteFooter />
    </div>
  );
}
/* ── Campus2Career Case Study ─────────────────────────────────────── */

const C2C_LIGHTBOX_IMAGES: LightboxImage[] = [
  { src: "/projects/campus2career/systemarch.png", alt: "Campus2Career architecture", caption: "System architecture — hybrid retrieval with multi-model LLM fallback" },
  { src: "/projects/campus2career/campus2career_intro.png", alt: "Campus2Career intro", caption: "Welcome screen — introduction to AI career assistant" },
  { src: "/projects/campus2career/studentportal.png", alt: "Student dashboard", caption: "Student dashboard — placement readiness overview and progress tracking" },
  { src: "/projects/campus2career/ai_career_advisor.png", alt: "AI Career Advisor", caption: "AI career advisor chat interface — ask anything about placements, resume, or interviews" },
  { src: "/projects/campus2career/career roadmap.png", alt: "Career roadmap", caption: "4-year career roadmap with milestone tracking and skill gap recommendations" },
  { src: "/projects/campus2career/4year roadmap.png", alt: "4-year roadmap", caption: "Interactive 4-year roadmap showing semester-wise preparation plan" },
  { src: "/projects/campus2career/batch analytics.png", alt: "Batch analytics", caption: "Batch analytics — placement trends, top hiring companies, and average packages" },
  { src: "/projects/campus2career/student_onboarding_flow.png", alt: "Student onboarding", caption: "Student onboarding flow — profile setup and career preference collection" },
  { src: "/projects/campus2career/resume analyis.png", alt: "Resume analysis", caption: "Resume analysis with ATS scoring and skill gap identification" },
  { src: "/projects/campus2career/interview.png", alt: "Interview prep", caption: "Interview preparation module — common questions and best practices" },
  { src: "/projects/campus2career/mock interview.png", alt: "Mock interview", caption: "Mock interview session with AI interviewer feedback" },
  { src: "/projects/campus2career/code console.png", alt: "Code console", caption: "Technical coding practice interface with real-time evaluation" },
  { src: "/projects/campus2career/readiness_Score.png", alt: "Readiness score", caption: "Placement readiness score breakdown — resume, technical, and soft skills" },
  { src: "/projects/campus2career/program chair dashboard.png", alt: "Program chair dashboard", caption: "Program chair dashboard — student performance tracking and intervention alerts" },
  { src: "/projects/campus2career/student registration.png", alt: "Student registration", caption: "Student registration and profile creation flow" },
  { src: "/projects/campus2career/database_entity_diagram.png", alt: "Database schema", caption: "Database schema — student profiles, modules, placements, and interactions" },
  { src: "/projects/campus2career/Screenshot 2026-04-30 121046.png", alt: "Search interface", caption: "Search interface — find placement questions, company patterns, and preparation tips" },
];

function Campus2CareerCaseStudy() {
  const { open, node } = useLightbox(C2C_LIGHTBOX_IMAGES);
  const idx = (src: string) => C2C_LIGHTBOX_IMAGES.findIndex((i) => i.src === src);

  return (
    <>
      {node}

      {/* 01 Problem */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="01 · Problem"
            title="Placement prep was fragmented, siloed, and impossible to scale."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              At NMIMS Hyderabad, students preparing for campus placements faced a fragmented landscape:
              curriculum details buried in PDFs, placement patterns scattered across seniors' notes,
              and no reliable way to ask questions at scale. Generic LLMs lacked access to NMIMS-specific
              curriculum details, placement patterns, and industry requirements.
            </p>
            <p>
              Students couldn't easily find answers to questions like: "What topics are covered in
              Module 3 of Financial Management?" or "What's the typical HR round pattern for consulting
              companies recruiting from NMIMS?" The lack of a centralized, searchable knowledge base
              meant students wasted hours sifting through documents or relied on word-of-mouth that
              often contained outdated information.
            </p>
          </div>

          <DiagramImage
            src="/projects/campus2career/systemarch.png"
            alt="Campus2Career architecture"
            caption="System architecture — hybrid retrieval with multi-model LLM fallback"
            className="my-8"
            onClick={() => open(idx("/projects/campus2career/systemarch.png"))}
          />

          <div className="text-sm leading-7 text-muted-foreground">
            <p>
              Without a dedicated placement assistant, students relied on manual searches through
              PDF syllabi, scattered placement reports, and informal conversations with seniors.
              This process was inefficient, inconsistent, and often led to incomplete preparation.
            </p>
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 02 System Design */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="02 · System Design"
            title="Hybrid retrieval with multi-model LLM fallback."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Campus2Career combines <strong className="text-foreground">hybrid retrieval</strong>
              (BM25 + dense embeddings) with a <strong className="text-foreground">three-tier LLM
              fallback chain</strong> to deliver reliable, accurate answers 24/7. The system uses
              <strong className="text-foreground">Module-scoped retrieval</strong> to limit context
              to relevant courses and placement modules, ensuring precise answers without context
              pollution.
            </p>
            <p>
              The LLM fallback chain ensures availability: if Claude 3.5 Sonnet is rate-limited,
              the system automatically falls back to Llama 3 70B, then Mistral 7B. FastAPI streaming
              responses provide typing indicators so students see responses flowing in real-time
              rather than waiting for the complete model output.
            </p>
          </div>

          <DiagramImage
            src="/projects/campus2career/ai_career_advisor.png"
            alt="AI Career Advisor chat"
            caption="AI career advisor chat interface — ask anything about placements, resume, or interviews"
            className="my-8"
            onClick={() => open(idx("/projects/campus2career/ai_career_advisor.png"))}
          />
        </section>
      </Reveal>

      <Divider />

      {/* 03 Student Portal */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="03 · Student Portal"
            title="Placement readiness overview and progress tracking."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The student portal serves as the main dashboard where students see their overall placement
            readiness score, 4-year roadmap progress, skill assessment results, and upcoming milestones.
            It provides a centralized view of their placement preparation journey with visual progress
            tracking and personalized recommendations based on their current status.
          </p>

          <UIImage
            src="/projects/campus2career/studentportal.png"
            alt="Student portal"
            caption="Student portal — placement readiness overview and progress tracking"
            className="my-8"
            onClick={() => open(idx("/projects/campus2career/studentportal.png"))}
          />
        </section>
      </Reveal>

      <Divider />

      {/* 04 4-Year Career Roadmap */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="03 · 4-Year Career Roadmap"
            title="Semester-wise preparation planning."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The 4-year career roadmap provides personalized preparation plans based on the student's
            current semester and career goals. Each semester has specific milestones: resume building,
            skill development, mock interviews, company research, and placement practice. The roadmap
            adapts as students progress, suggesting next steps and highlighting skill gaps.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/campus2career/career roadmap.png"
              alt="Career roadmap"
              caption="4-year career roadmap with milestone tracking"
              onClick={() => open(idx("/projects/campus2career/career roadmap.png"))}
            />
            <UIImage
              src="/projects/campus2career/4year roadmap.png"
              alt="4-year roadmap detail"
              caption="Interactive 4-year roadmap showing semester-wise preparation plan"
              onClick={() => open(idx("/projects/campus2career/4year roadmap.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 04 Resume Analysis */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="04 · Resume Analysis"
            title="ATS scoring and skill gap identification."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The resume analysis module uploads resumes and generates an ATS (Applicant Tracking System)
            score based on keyword matching with target job descriptions. The system extracts skills,
            projects, and experience, then compares against the student's target roles to identify
            gaps. Missing skills come with YouTube and Coursera learning resource links.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/campus2career/resume analyis.png"
              alt="Resume analysis"
              caption="Resume analysis with ATS scoring and skill gap identification"
              onClick={() => open(idx("/projects/campus2career/resume analyis.png"))}
            />
            <UIImage
              src="/projects/campus2career/readiness_Score.png"
              alt="Readiness score"
              caption="Placement readiness score breakdown — resume, technical, and soft skills"
              onClick={() => open(idx("/projects/campus2career/readiness_Score.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 05 Interview Preparation */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="05 · Interview Preparation"
            title="Mock interviews and technical practice."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The interview module provides both HR and technical interview preparation. Students can
            practice common questions, record their answers, and receive AI feedback on content,
            structure, and delivery. The technical coding interface supports real-time evaluation
            of coding problems with sample test cases.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/campus2career/mock interview.png"
              alt="Mock interview"
              caption="Mock interview session with AI interviewer feedback"
              onClick={() => open(idx("/projects/campus2career/mock interview.png"))}
            />
            <UIImage
              src="/projects/campus2career/interview.png"
              alt="Interview prep"
              caption="Interview preparation module — common questions and best practices"
              onClick={() => open(idx("/projects/campus2career/interview.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 06 Admin & Analytics */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="06 · Admin & Analytics"
            title="Program chair dashboard and batch insights."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The program chair dashboard provides aggregate insights into student progress, placement
            trends, and intervention opportunities. Administrators can identify students who need
            additional support, track which companies are hiring, and monitor placement statistics
            in real-time. The batch analytics module shows historical placement data, average packages,
            and top hiring companies.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/campus2career/program chair dashboard.png"
              alt="Program chair dashboard"
              caption="Program chair dashboard — student performance tracking and intervention alerts"
              onClick={() => open(idx("/projects/campus2career/program chair dashboard.png"))}
            />
            <UIImage
              src="/projects/campus2career/batch analytics.png"
              alt="Batch analytics"
              caption="Batch analytics — placement trends, top hiring companies, and average packages"
              onClick={() => open(idx("/projects/campus2career/batch analytics.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 07 Demo */}
      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="07 · Demo" title="Full end-to-end walkthrough." />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The demo video walks through a complete student journey: onboarding, resume upload and
            analysis, 4-year roadmap generation, AI career advisor chat, mock interview practice,
            and accessing batch analytics. Each step demonstrates how Campus2Career transforms
            fragmented placement prep into a structured, data-driven experience.
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <video
              controls
              className="w-full"
              aria-label="Campus2Career demo video"
              poster="/projects/campus2career/campus2career_intro.png"
            >
              <source src="/projects/campus2career/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </Reveal>
    </>
  );
}

/* ── FinnacleAI Case Study ────────────────────────────────────────── */

const FA_LIGHTBOX_IMAGES: LightboxImage[] = [
  { src: "/projects/finnacleai/fetchfinancle.png", alt: "FinnacleAI architecture", caption: "System architecture — yfinance + GNews APIs → FastAPI → Claude 3.5 Sonnet" },
  { src: "/projects/finnacleai/homepage_stock selection.png", alt: "FinnacleAI homepage", caption: "Portfolio input page — enter tickers to generate personalized market intelligence" },
  { src: "/projects/finnacleai/stock_info_json.png", alt: "Stock data extraction", caption: "Stock data extraction — real-time prices, historical performance, and key metrics" },
  { src: "/projects/finnacleai/stock_insights.png", alt: "Stock insights", caption: "Portfolio analysis output — holdings breakdown, performance attribution, and market sentiment" },
  { src: "/projects/finnacleai/rsi_analysis_and _stockbot.png", alt: "Technical indicators", caption: "Technical indicators — RSI, MACD, and moving averages for each holding" },
];

function FinnacleAICaseStudy() {
  const { open, node } = useLightbox(FA_LIGHTBOX_IMAGES);
  const idx = (src: string) => FA_LIGHTBOX_IMAGES.findIndex((i) => i.src === src);

  return (
    <>
      {node}

      {/* 01 Problem */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="01 · Problem"
            title="Retail investors drown in market noise with no personalized view."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Retail investors face an overwhelming flood of market information from news outlets,
              financial apps, and social media. Generic market summaries provide overwhelming information
              without context for individual portfolios, leaving investors uncertain about how their
              actual holdings are performing relative to the broader market and what actions they
              should take.
            </p>
            <p>
              Free investment apps typically offer either generic market news or basic portfolio
              tracking, but rarely combine real-time data with personalized analysis. Investors are
              left manually connecting dots between their portfolio performance and market events,
              often making decisions based on incomplete information or emotional reactions to news
              headlines rather than data-driven insights.
            </p>
          </div>

          <DiagramImage
            src="/projects/finnacleai/fetchfinancle.png"
            alt="FinnacleAI architecture"
            caption="System architecture — yfinance + GNews APIs → FastAPI → Claude 3.5 Sonnet → personalized briefing"
            className="my-8"
            onClick={() => open(idx("/projects/finnacleai/fetchfinancle.png"))}
          />

          <div className="text-sm leading-7 text-muted-foreground">
            <p>
              Without personalized market intelligence, investors either ignore their portfolios
              entirely (fearing they'll miss something important) or constantly check generic news
              feeds that don't address their specific holdings. This leads to either panic selling
              during market volatility or missed opportunities to rebalance based on actual portfolio
              performance.
            </p>
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 02 System Design */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="02 · System Design"
            title="Live data grounding with Claude 3.5 Sonnet memo generation."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              FinnacleAI combines <strong className="text-foreground">live financial data APIs</strong>
              (yfinance for stock prices, GNews for market news) with <strong className="text-foreground">
              Claude 3.5 Sonnet on AWS Bedrock</strong> to generate personalized investment memos.
              The FastAPI backend orchestrates data aggregation, caching frequently requested portfolios,
              and passing grounded context to the LLM.
            </p>
            <p>
              Claude 3.5 Sonnet was chosen for its superior instruction-following on structured memo
              formats. The prompt explicitly instructs the model to reference actual price movements,
              news headlines, and portfolio holdings rather than generic market commentary. The output
              follows a consistent format: Executive Summary, Portfolio Performance, Market Context,
              Holdings Deep Dive, and Action Items.
            </p>
          </div>

          <DiagramImage
            src="/projects/finnacleai/homepage_stock selection.png"
            alt="Homepage"
            caption="Portfolio input page — enter tickers to generate personalized market intelligence"
            className="my-8"
            onClick={() => open(idx("/projects/finnacleai/homepage_stock selection.png"))}
          />
        </section>
      </Reveal>

      <Divider />

      {/* 03 Data Pipeline */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="03 · Data Pipeline"
            title="Real-time aggregation from yfinance and GNews."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The data pipeline fetches live price data, historical performance, key metrics, and recent
            news articles for each stock in the user's portfolio. This data is aggregated, normalized,
            and passed to Claude 3.5 Sonnet with explicit grounding instructions. The model cannot
            hallucinate price movements or news events — it must reference actual data points retrieved
            from the APIs.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/finnacleai/stock_info_json.png"
              alt="Stock data extraction"
              caption="Stock data extraction — real-time prices, historical performance, and key metrics"
              onClick={() => open(idx("/projects/finnacleai/stock_info_json.png"))}
            />
            <UIImage
              src="/projects/finnacleai/stock_insights.png"
              alt="Stock insights"
              caption="Portfolio analysis output — holdings breakdown, performance attribution, and market sentiment"
              onClick={() => open(idx("/projects/finnacleai/stock_insights.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 04 Technical Analysis */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="04 · Technical Analysis"
            title="RSI, MACD, and moving averages for each holding."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            FinnacleAI includes technical indicators for each stock in the portfolio: RSI (Relative
            Strength Index) for overbought/oversold conditions, MACD (Moving Average Convergence Divergence)
            for trend momentum, and moving averages for support/resistance levels. These indicators
            help investors identify potential entry/exit points based on technical patterns rather
            than just fundamental data.
          </p>

          <UIImage
            src="/projects/finnacleai/rsi_analysis_and _stockbot.png"
            alt="Technical indicators"
            caption="Technical indicators — RSI, MACD, and moving averages for each holding"
            className="my-8"
            onClick={() => open(idx("/projects/finnacleai/rsi_analysis_and _stockbot.png"))}
          />
        </section>
      </Reveal>

      <Divider />

      {/* 05 AWS Infrastructure */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="05 · AWS Infrastructure"
            title="Rapid prototyping with PartyRock, scalable backend with FastAPI."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            FinnacleAI was built using <strong className="text-foreground">AWS PartyRock</strong> for
            rapid frontend prototyping with built-in authentication and database. The FastAPI backend
            handles data aggregation, API key management, and LLM orchestration. DynamoDB stores user
            portfolios and historical briefings, while Lambda manages background data refresh tasks.
          </p>

          <div className="rounded-lg border border-border bg-surface p-6">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-brand">Frontend</div>
                <div className="font-mono text-sm">AWS PartyRock + React</div>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-brand">Backend</div>
                <div className="font-mono text-sm">FastAPI + Lambda</div>
              </div>
              <div className="space-y-2">
                <div className="font-mono text-xs uppercase tracking-widest text-brand">LLM</div>
                <div className="font-mono text-sm">Claude 3.5 Sonnet (Bedrock)</div>
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 06 Demo */}
      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="06 · Demo" title="Portfolio briefing walkthrough." />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The demo shows how a user inputs their portfolio tickers, waits a few seconds for data
            aggregation and memo generation, and receives a personalized investment brief with
            portfolio performance, market context, holdings breakdown, and actionable recommendations.
            The memo is structured, grounded in actual data, and tailored to the user's specific
            holdings rather than generic market commentary.
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <video
              controls
              className="w-full"
              aria-label="FinnacleAI demo video"
              poster="/projects/finnacleai/homepage_stock selection.png"
            >
              <source src="/projects/finnacleai/demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </Reveal>
    </>
  );
}
/* ── Smart Resume Evaluator Case Study ────────────────────────────── */

const SRE_LIGHTBOX_IMAGES: LightboxImage[] = [
  { src: "/projects/smart-resume-evaluator/aws_services_flow.png", alt: "Smart Resume Evaluator architecture", caption: "System architecture — AWS Textract → Streamlit → S3 + DynamoDB + SNS" },
  { src: "/projects/smart-resume-evaluator/UI_1.png", alt: "Streamlit interface", caption: "Streamlit interface — resume upload, job role selection, and AWS credential input" },
  { src: "/projects/smart-resume-evaluator/ats_score.png", alt: "ATS score", caption: "ATS score breakdown with visual indicator — score ≥80 passes, below 80 triggers improvement suggestions" },
  { src: "/projects/smart-resume-evaluator/missing_skills_learning_resources.png", alt: "Skill gap analysis", caption: "Skill gap analysis — present skills highlighted in green, missing skills with YouTube/Coursera learning resources" },
  { src: "/projects/smart-resume-evaluator/Analysis_1.png", alt: "Evaluation results", caption: "Evaluation results dashboard — shows extracted details, skill match percentage, and report summary" },
  { src: "/projects/smart-resume-evaluator/s3bucket.png", alt: "S3 bucket storage", caption: "S3 bucket storage — resumes and generated reports stored with versioning enabled" },
  { src: "/projects/smart-resume-evaluator/admin_portsal.png", alt: "Admin portal", caption: "Admin portal — view all evaluations, download reports, manage student data" },
];

function SmartResumeEvaluatorCaseStudy() {
  const { open, node } = useLightbox(SRE_LIGHTBOX_IMAGES);
  const idx = (src: string) => SRE_LIGHTBOX_IMAGES.findIndex((i) => i.src === src);

  return (
    <>
      {node}

      {/* 01 Problem */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="01 · Problem"
            title="Candidates had no way to see how an ATS actually parses and scores their resume."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Most students and job seekers have no visibility into how Applicant Tracking Systems
              actually parse and score their resumes against job descriptions. Generic resume feedback
              tools either provide superficial suggestions or use unclear scoring algorithms, leaving
              candidates guessing about why their resumes get filtered out early by recruiters.
            </p>
            <p>
              Without understanding the specific requirements of ATS systems, students upload resumes
              that may have perfect content but fail basic parsing criteria — missing section headers,
              unconventional formatting that breaks the text extraction, or skill keywords that don't
              match the job description's terminology. This results in qualified candidates being
              automatically rejected before human review even begins.
            </p>
          </div>

          <DiagramImage
            src="/projects/smart-resume-evaluator/aws_services_flow.png"
            alt="Smart Resume Evaluator architecture"
            caption="System architecture — AWS Textract → Streamlit → S3 + DynamoDB + SNS"
            className="my-8"
            onClick={() => open(idx("/projects/smart-resume-evaluator/aws_services_flow.png"))}
          />

          <div className="text-sm leading-7 text-muted-foreground">
            <p>
              The lack of transparency in ATS scoring means candidates either over-optimize for
              keyword stuffing (making resumes unnatural) or under-optimize and get filtered out.
              There's no middle ground — no tool that explains what an ATS actually sees when it
              parses a resume and how to improve without sacrificing readability for humans.
            </p>
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 02 System Design */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="02 · System Design"
            title="Serverless pipeline with explainable TF-IDF scoring."
          />
          <div className="space-y-4 text-sm leading-7 text-muted-foreground">
            <p>
              Smart Resume Evaluator uses a <strong className="text-foreground">fully serverless
              AWS architecture</strong> with <strong className="text-foreground">AWS Textract</strong>
              for layout-aware PDF parsing, <strong className="text-foreground">Streamlit</strong> for
              the web interface, and <strong className="text-foreground">TF-IDF vectorization</strong>
              with cosine similarity for explainable ATS scoring.
            </p>
            <p>
              The scoring algorithm quantifies how well resume skills match job description keywords
              using cosine similarity between TF-IDF vectors — not just keyword counting, but weighted
              term importance. The system extracts personal details (name, email, projects), identifies
              skills, and compares against predefined job role skill sets stored in JSON files. Missing
              skills come with YouTube and Coursera learning resource links.
            </p>
          </div>

          <DiagramImage
            src="/projects/smart-resume-evaluator/UI_1.png"
            alt="Streamlit interface"
            caption="Streamlit interface — resume upload, job role selection, and AWS credential input"
            className="my-8"
            onClick={() => open(idx("/projects/smart-resume-evaluator/UI_1.png"))}
          />
        </section>
      </Reveal>

      <Divider />

      {/* 03 Resume Parsing */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="03 · Resume Parsing"
            title="Layout-aware extraction with AWS Textract."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            Unlike naive PDF text extraction that loses formatting and structure, AWS Textract provides
            layout-aware parsing that preserves table structures, section headers, and text hierarchy.
            This ensures the ATS simulation more closely mimics how real ATS systems parse resumes,
            especially those with formatting like two-column layouts, bullet points, and section dividers.
          </p>

          <UIImage
            src="/projects/smart-resume-evaluator/Analysis_1.png"
            alt="Evaluation results"
            caption="Evaluation results dashboard — extracted details, skill match percentage, and report summary"
            className="my-8"
            onClick={() => open(idx("/projects/smart-resume-evaluator/Analysis_1.png"))}
          />
        </section>
      </Reveal>

      <Divider />

      {/* 04 Skill Gap Analysis */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="04 · Skill Gap Analysis"
            title="Identifying missing skills with learning resources."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The system goes beyond simple pass/fail scoring by identifying specific skill gaps and
            recommending targeted learning resources. Present skills are highlighted in green, while
            missing skills come with YouTube and Coursera links — helping candidates understand not
            just what they're missing, but how to acquire those skills.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/smart-resume-evaluator/ats_score.png"
              alt="ATS score"
              caption="ATS score breakdown — score ≥80 passes, below 80 triggers improvement suggestions"
              onClick={() => open(idx("/projects/smart-resume-evaluator/ats_score.png"))}
            />
            <UIImage
              src="/projects/smart-resume-evaluator/missing_skills_learning_resources.png"
              alt="Skill gap analysis"
              caption="Skill gap analysis — missing skills with YouTube/Coursera learning resources"
              onClick={() => open(idx("/projects/smart-resume-evaluator/missing_skills_learning_resources.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 05 AWS Infrastructure */}
      <Reveal>
        <section className="py-10">
          <SectionHeading
            eyebrow="05 · AWS Infrastructure"
            title="Serverless storage with S3, DynamoDB, and SNS notifications."
          />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The architecture uses <strong className="text-foreground">Amazon S3</strong> for immutable
            file storage of resumes and evaluation reports (with versioning enabled),{" "}
            <strong className="text-foreground">Amazon DynamoDB</strong> for zero-ops storage of
            evaluation metadata (automatic scaling, built-in backup), and{" "}
            <strong className="text-foreground">Amazon SNS</strong> for event-driven notifications
            to admin email when evaluations are completed.
          </p>

          <div className="grid gap-4 sm:grid-cols-2">
            <UIImage
              src="/projects/smart-resume-evaluator/s3bucket.png"
              alt="S3 bucket storage"
              caption="S3 bucket storage — resumes and reports with versioning enabled"
              onClick={() => open(idx("/projects/smart-resume-evaluator/s3bucket.png"))}
            />
            <UIImage
              src="/projects/smart-resume-evaluator/admin_portsal.png"
              alt="Admin portal"
              caption="Admin portal — view all evaluations, download reports, manage student data"
              onClick={() => open(idx("/projects/smart-resume-evaluator/admin_portsal.png"))}
            />
          </div>
        </section>
      </Reveal>

      <Divider />

      {/* 06 Demo */}
      <Reveal>
        <section className="py-10">
          <SectionHeading eyebrow="06 · Demo" title="Full end-to-end evaluation walkthrough." />
          <p className="mb-6 text-sm leading-7 text-muted-foreground">
            The demo video walks through a complete evaluation: resume upload through Streamlit,
            AWS Textract parsing, skill extraction and matching against job role, ATS score
            calculation with TF-IDF cosine similarity, missing skill identification with learning
            resources, report generation and upload to S3, and admin notification via SNS.
          </p>
          <div className="overflow-hidden rounded-lg border border-border bg-surface">
            <video
              controls
              className="w-full"
              aria-label="Smart Resume Evaluator demo video"
              poster="/projects/smart-resume-evaluator/UI_1.png"
            >
              <source src="/projects/smart-resume-evaluator/smart-resume-evaluator-demo.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>
      </Reveal>
    </>
  );
}