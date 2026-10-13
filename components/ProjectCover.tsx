import type { Project } from "@/types";

/**
 * Designed cover for projects that don't have a real screenshot yet.
 * Illustrative only: the motif hints at the project, the numbers come from `project.metrics`.
 */
export function ProjectCover({ project, size = "md", bare = false }: { project: Project; size?: "sm" | "md" | "lg"; /** Motif only, for cards that already show the title. */ bare?: boolean }) {
  const metric = project.metrics?.find((m) => !m.pending);
  const titleSize = size === "lg" ? "text-4xl md:text-5xl" : size === "sm" ? "text-xl" : "text-2xl md:text-3xl";

  return (
    <div className="absolute inset-0 overflow-hidden bg-[#0d1117] text-white">
      <svg viewBox="0 0 800 450" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden="true">
        <defs>
          <pattern id={`grid-${project.slug}`} width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
          </pattern>
          <radialGradient id={`glow-${project.slug}`} cx="75%" cy="20%" r="70%">
            <stop offset="0%" stopColor="rgba(45,212,191,0.22)" />
            <stop offset="100%" stopColor="rgba(45,212,191,0)" />
          </radialGradient>
        </defs>
        <rect width="800" height="450" fill={`url(#grid-${project.slug})`} />
        <rect width="800" height="450" fill={`url(#glow-${project.slug})`} />
        <Motif slug={project.slug} />
      </svg>

      {!bare && (
        <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-7">
          <p className="text-[13px] text-white/60">{project.category}</p>
          <div>
            <p className={`font-display font-medium leading-[1.05] ${titleSize}`}>{project.title}</p>
            {metric && size !== "sm" && (
              <p className="mt-2 text-sm text-white/70">
                <span className="tabular font-semibold text-[#2dd4bf]">{metric.value}</span> {metric.label}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

const accent = "#2dd4bf";
const soft = "rgba(255,255,255,0.35)";

function Motif({ slug }: { slug: string }) {
  switch (slug) {
    case "bliss-bites":
      return (
        <g fill="none" strokeLinecap="round">
          <path d="M600 360 V220" stroke="#4ade80" strokeWidth="5" />
          <path d="M600 280 C 560 270, 530 240, 525 200 C 565 205, 595 235, 600 280 Z" fill="rgba(74,222,128,0.55)" />
          <path d="M600 245 C 640 235, 670 205, 675 165 C 635 170, 605 200, 600 245 Z" fill="rgba(74,222,128,0.8)" />
          <path d="M520 370 h160" stroke={soft} strokeWidth="3" />
          {[0, 1].map((i) => (
            <path
              key={i}
              transform={`translate(${470 + i * 260} 120)`}
              d="M0 -22 L6 -7 L22 -7 L9 3 L14 19 L0 9 L-14 19 L-9 3 L-22 -7 L-6 -7 Z"
              fill={accent}
            />
          ))}
        </g>
      );
    case "loreal-brandstorm":
      return (
        <g fill="none" strokeLinecap="round">
          <ellipse cx="610" cy="220" rx="85" ry="110" stroke={soft} strokeWidth="2" />
          <path d="M525 220 h170 M610 110 v220" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <ellipse cx="610" cy="220" rx="45" ry="110" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" />
          <path d="M500 130 h-30 v30 M720 130 h30 v30 M470 310 v30 h30 M750 310 v30 h-30" stroke={accent} strokeWidth="2.5" />
        </g>
      );
    case "montreal-aqi-forecasting":
      return (
        <g fill="none" strokeLinecap="round" strokeLinejoin="round">
          <path d="M380 300 L420 240 L455 310 L490 210 L525 290 L560 190 L600 280 L640 200 L680 260 L720 180 L760 240" stroke="rgba(248,113,113,0.6)" strokeWidth="2" strokeDasharray="6 6" />
          <path d="M380 270 C 440 250, 480 240, 530 235 S 640 215, 760 205" stroke={accent} strokeWidth="4" />
          <path d="M380 265 C 440 255, 490 236, 530 240 S 650 210, 760 210" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" strokeDasharray="2 6" />
          <path d="M360 380 h40 v-30 h20 v30 h30 v-50 h25 v50 h40 v-20 h30 v20 h50 v-60 h20 v60 h60 v-35 h30 v35 h60" stroke="rgba(255,255,255,0.12)" strokeWidth="2" />
        </g>
      );
    case "toxic-tweet-detection":
      return (
        <g>
          {[
            [430, 90, "rgba(74,222,128,0.5)"],
            [520, 160, "rgba(248,113,113,0.8)"],
            [410, 230, "rgba(74,222,128,0.5)"],
            [560, 290, "rgba(251,146,60,0.8)"],
            [450, 350, "rgba(74,222,128,0.5)"],
          ].map(([x, y, c], i) => (
            <g key={i}>
              <rect x={x as number} y={y as number} width="230" height="46" rx="14" fill="rgba(255,255,255,0.06)" stroke={c as string} strokeWidth="1.5" />
              <rect x={(x as number) + 16} y={(y as number) + 14} width="120" height="6" rx="3" fill="rgba(255,255,255,0.25)" />
              <rect x={(x as number) + 16} y={(y as number) + 26} width="80" height="6" rx="3" fill="rgba(255,255,255,0.15)" />
              <circle cx={(x as number) + 208} cy={(y as number) + 23} r="7" fill={c as string} />
            </g>
          ))}
        </g>
      );
    case "darija-gap":
      return (
        <g fontFamily="serif" fill="rgba(255,255,255,0.18)">
          {["د", "ا", "ر", "ج", "ة", "ك", "ل", "م", "ش", "ب"].map((ch, i) => (
            <text key={i} x={420 + (i % 5) * 75} y={130 + Math.floor(i / 5) * 110} fontSize={i % 3 === 0 ? 64 : 44}>
              {ch}
            </text>
          ))}
        </g>
      );
    case "meeting-intelligence-system": {
      const colors = [accent, "#60a5fa", "#a78bfa", "#4ade80"];
      return (
        <g>
          {Array.from({ length: 48 }).map((_, i) => {
            const h = Math.round(20 + Math.abs(Math.sin(i * 0.9) * 70) + (i % 5) * 6);
            return <rect key={i} x={380 + i * 8} y={200 - h / 2} width="4" height={h} rx="2" fill={colors[Math.floor(i / 12)]} opacity="0.85" />;
          })}
          {colors.map((c, i) => (
            <g key={c}>
              <circle cx={400 + i * 90} cy="320" r="6" fill={c} />
              <rect x={414 + i * 90} y="316" width="50" height="8" rx="4" fill="rgba(255,255,255,0.2)" />
            </g>
          ))}
        </g>
      );
    }
    case "cryptovault":
      return (
        <g>
          {[160, 210, 180, 250, 230, 280, 260, 310, 290, 340].map((y, i) => {
            const up = i % 3 !== 1;
            const x = 400 + i * 36;
            return (
              <g key={i}>
                <line x1={x + 8} x2={x + 8} y1={450 - y - 30} y2={450 - y + 50} stroke="rgba(255,255,255,0.3)" />
                <rect x={x} y={450 - y - 10} width="16" height="40" rx="2" fill={up ? "rgba(74,222,128,0.7)" : "rgba(248,113,113,0.7)"} />
              </g>
            );
          })}
          <rect x="640" y="300" width="100" height="120" rx="8" fill="rgba(255,255,255,0.08)" stroke={accent} />
          <text x="690" y="370" textAnchor="middle" fontSize="22" fill={accent} fontFamily="sans-serif" fontWeight="600">PDF</text>
        </g>
      );
    case "spark-kafka-streaming":
      return (
        <g fontFamily="sans-serif" fontSize="15" fontWeight="600">
          {["Kafka", "Spark", "HDFS", "Hive"].map((label, i) => (
            <g key={label}>
              <rect x={390 + i * 100} y="170" width="80" height="80" rx="14" fill="rgba(255,255,255,0.06)" stroke={i === 1 ? accent : soft} strokeWidth="1.5" />
              <text x={430 + i * 100} y="215" textAnchor="middle" fill="rgba(255,255,255,0.8)">{label}</text>
              {i < 3 && <path d={`M${470 + i * 100} 210 h20`} stroke={accent} strokeWidth="2" />}
            </g>
          ))}
          {Array.from({ length: 10 }).map((_, i) => (
            <circle key={i} cx={400 + i * 38} cy={300 + (i % 2) * 10} r="3" fill={accent} opacity={0.3 + (i % 3) * 0.2} />
          ))}
        </g>
      );
    case "aui-start-link":
      return (
        <g>
          {[
            [470, 140],
            [650, 120],
            [700, 280],
            [520, 320],
            [600, 210],
          ].map(([x, y], i, arr) => (
            <g key={i}>
              {i < arr.length - 1 && <line x1={x} y1={y} x2={600} y2={210} stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />}
              <circle cx={x} cy={y} r={i === 4 ? 26 : 16} fill={i === 4 ? accent : "rgba(255,255,255,0.1)"} stroke={soft} />
            </g>
          ))}
        </g>
      );
    default:
      return (
        <g fill="none" stroke="rgba(255,255,255,0.12)">
          <circle cx="620" cy="220" r="120" />
          <circle cx="620" cy="220" r="70" stroke={accent} />
        </g>
      );
  }
}
