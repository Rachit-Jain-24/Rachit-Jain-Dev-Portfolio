export function ArchThumb({ label = "architecture" }: { label?: string }) {
  return (
    <div className="relative overflow-hidden rounded-md border border-border bg-surface">
      <svg viewBox="0 0 320 120" className="h-full w-full" role="img" aria-label={`${label} diagram placeholder`}>
        <defs>
          <pattern id="grid" width="16" height="16" patternUnits="userSpaceOnUse">
            <path d="M16 0H0V16" fill="none" stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
          </pattern>
        </defs>
        <rect width="320" height="120" fill="url(#grid)" className="text-foreground" />
        <g className="text-brand" stroke="currentColor" strokeWidth="1.2" fill="none">
          <rect x="24" y="44" width="56" height="32" rx="4" />
          <rect x="132" y="24" width="56" height="32" rx="4" />
          <rect x="132" y="64" width="56" height="32" rx="4" />
          <rect x="240" y="44" width="56" height="32" rx="4" />
          <path d="M80 60h52M188 40h26v20h26M188 80h26V60" />
        </g>
        <g className="text-muted-foreground" fill="currentColor" fontSize="7" fontFamily="monospace">
          <text x="34" y="63">ingest</text>
          <text x="142" y="43">retrieve</text>
          <text x="142" y="83">rerank</text>
          <text x="252" y="63">answer</text>
        </g>
      </svg>
    </div>
  );
}
