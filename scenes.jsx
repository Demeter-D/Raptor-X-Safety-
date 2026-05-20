// scenes.jsx — Raptor X 30T Safety Briefing video scenes.
// Visual DNA: paper #f7f4ec, ink #1a1814, hazard orange #d9531e,
// hazard yellow #f4c200, Barlow Semi Condensed + JetBrains Mono.

const COL = {
  paper: '#f7f4ec',
  paperEdge: '#eee7d5',
  ink: '#1a1814',
  inkSoft: '#514a3f',
  inkMute: '#8a8170',
  accent: '#d9531e',
  danger: '#c8102e',
  warning: '#f26522',
  caution: '#ffd000',
  yellow: '#f4c200',
  notice: '#0067b1',
  safety: '#00843d',
  ruleSoft: '#c9c0a8',
};

const FONT = {
  display: '"Barlow Semi Condensed", Impact, sans-serif',
  body: '"Source Sans 3", system-ui, sans-serif',
  mono: '"JetBrains Mono", ui-monospace, monospace',
};

// ────────── helpers ──────────
function Eyebrow({ text, color = COL.ink, x, y, width = 460 }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp(localTime / 0.5, 0, 1));
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width,
      display: 'flex', alignItems: 'center', gap: 14,
      opacity: t,
      fontFamily: FONT.mono,
      fontSize: 14, letterSpacing: '0.22em',
      textTransform: 'uppercase', color,
    }}>
      <div style={{
        width: t * 64, height: 1, background: color, flexShrink: 0,
      }}/>
      <span>{text}</span>
    </div>
  );
}

function HazardTape({ x = 0, y = 0, width = 1920, height = 36, angle = 0, opacity = 1, stripe = 28 }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y, width, height,
      transform: `rotate(${angle}deg)`,
      transformOrigin: 'top left',
      opacity,
      background: `repeating-linear-gradient(135deg,
        ${COL.ink} 0 ${stripe}px,
        ${COL.yellow} ${stripe}px ${stripe * 2}px)`,
    }}/>
  );
}

function CornerBrackets({ x, y, width, height, color = COL.accent, thickness = 3, size = 56, progress = 1 }) {
  const len = size * progress;
  const s = { position: 'absolute', background: color };
  return (
    <>
      <div style={{ ...s, left: x, top: y, width: len, height: thickness }}/>
      <div style={{ ...s, left: x, top: y, width: thickness, height: len }}/>

      <div style={{ ...s, left: x + width - len, top: y, width: len, height: thickness }}/>
      <div style={{ ...s, left: x + width - thickness, top: y, width: thickness, height: len }}/>

      <div style={{ ...s, left: x, top: y + height - thickness, width: len, height: thickness }}/>
      <div style={{ ...s, left: x, top: y + height - len, width: thickness, height: len }}/>

      <div style={{ ...s, left: x + width - len, top: y + height - thickness, width: len, height: thickness }}/>
      <div style={{ ...s, left: x + width - thickness, top: y + height - len, width: thickness, height: len }}/>
    </>
  );
}

function CountUp({ to, suffix = '', duration = 1.0, decimals = 0, style }) {
  const { localTime } = useSprite();
  const t = Easing.easeOutCubic(clamp(localTime / duration, 0, 1));
  const v = to * t;
  return <span style={style}>{v.toFixed(decimals)}{suffix}</span>;
}

function PaperBG({ children }) {
  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: COL.paper,
      backgroundImage: `radial-gradient(circle at 1px 1px, rgba(26,24,20,0.045) 1px, transparent 0)`,
      backgroundSize: '14px 14px',
      overflow: 'hidden',
    }}>
      {children}
    </div>
  );
}

function DocRef({ x, y, color = COL.inkSoft }) {
  return (
    <div style={{
      position: 'absolute', left: x, top: y,
      fontFamily: FONT.mono, fontSize: 14, color,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      lineHeight: 1.5,
    }}>
      Doc&nbsp;No.&nbsp;RX-30T-OM-001 · Rev&nbsp;A<br/>
      Operator Safety Briefing · EN-GB
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 1 — COLD OPEN
// Black → hazard tape sweeps in → WARNING stamp → transition
// 0.0 → 4.0 s
// ────────────────────────────────────────────────────────────────
function SceneColdOpen() {
  const { localTime, progress } = useSprite();
  const T = localTime;

  // Hazard tape sweep in
  const tapeP = Easing.easeOutCubic(clamp(T / 0.7, 0, 1));
  // Warning stamp scale-in
  const stampP = T > 0.9 ? Easing.easeOutBack(clamp((T - 0.9) / 0.5, 0, 1)) : 0;
  // Subtitle fade
  const subP = T > 1.4 ? Easing.easeOutCubic(clamp((T - 1.4) / 0.6, 0, 1)) : 0;
  // Doc ref
  const docP = T > 1.8 ? Easing.easeOutCubic(clamp((T - 1.8) / 0.6, 0, 1)) : 0;

  // Exit: whole scene slides up after 3.4s
  const exitP = T > 3.4 ? Easing.easeInCubic(clamp((T - 3.4) / 0.6, 0, 1)) : 0;
  const exitY = -exitP * 200;
  const exitOp = 1 - exitP;

  return (
    <div style={{
      position: 'absolute', inset: 0,
      background: COL.ink,
      overflow: 'hidden',
      transform: `translateY(${exitY}px)`,
      opacity: exitOp,
    }}>
      {/* Top tape */}
      <div style={{
        position: 'absolute', left: 0, top: 120,
        width: `${tapeP * 100}%`, height: 90,
        background: `repeating-linear-gradient(135deg,
          ${COL.ink} 0 32px,
          ${COL.yellow} 32px 64px)`,
      }}/>
      {/* Bottom tape (sweep from right) */}
      <div style={{
        position: 'absolute', right: 0, bottom: 120,
        width: `${tapeP * 100}%`, height: 90,
        background: `repeating-linear-gradient(135deg,
          ${COL.yellow} 0 32px,
          ${COL.ink} 32px 64px)`,
      }}/>

      {/* Center stamp box */}
      <div style={{
        position: 'absolute', left: '50%', top: '50%',
        transform: `translate(-50%, -50%) scale(${stampP}) rotate(${(1 - stampP) * -4}deg)`,
        opacity: stampP,
        border: `8px solid ${COL.danger}`,
        padding: '34px 72px',
        background: 'transparent',
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900,
          color: COL.danger, fontSize: 200, lineHeight: 0.85,
          letterSpacing: '0.04em', textTransform: 'uppercase',
          textAlign: 'center',
        }}>
          Danger
        </div>
        <div style={{
          fontFamily: FONT.mono, color: COL.paper,
          fontSize: 22, letterSpacing: '0.32em',
          textAlign: 'center', marginTop: 8,
          textTransform: 'uppercase',
          opacity: subP,
        }}>
          Read before operating
        </div>
      </div>

      {/* Doc identity bottom-left */}
      <div style={{
        position: 'absolute', left: 80, bottom: 60,
        fontFamily: FONT.mono, fontSize: 16,
        color: 'rgba(247,244,236,0.6)',
        letterSpacing: '0.16em', textTransform: 'uppercase',
        opacity: docP,
        lineHeight: 1.6,
      }}>
        RAPTOR&nbsp;X · 30T VERTICAL SPLITTER<br/>
        RX-30T-OM-001 · OPERATOR BRIEFING
      </div>

      {/* Corner brackets accent */}
      <div style={{ opacity: docP }}>
        <CornerBrackets x={40} y={40} width={1840} height={1000}
          color={COL.accent} thickness={2} size={80} progress={1}/>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 2 — TITLE CARD
// Big "RAPTOR X / 30T" mark, subtitle, manual cover hero feel
// 3.6 → 9.0 s (overlaps with scene 1 exit)
// ────────────────────────────────────────────────────────────────
function SceneTitle() {
  const { localTime } = useSprite();
  const T = localTime;

  // Headline word-by-word
  const w1 = Easing.easeOutCubic(clamp(T / 0.5, 0, 1));
  const w2 = T > 0.35 ? Easing.easeOutCubic(clamp((T - 0.35) / 0.5, 0, 1)) : 0;
  const w3 = T > 0.7 ? Easing.easeOutCubic(clamp((T - 0.7) / 0.5, 0, 1)) : 0;

  // 30T mega number
  const numP = T > 0.6 ? Easing.easeOutExpo(clamp((T - 0.6) / 0.8, 0, 1)) : 0;
  // Subtitle
  const subP = T > 1.5 ? Easing.easeOutCubic(clamp((T - 1.5) / 0.5, 0, 1)) : 0;
  // Doc strip
  const stripP = T > 1.9 ? Easing.easeOutCubic(clamp((T - 1.9) / 0.5, 0, 1)) : 0;

  // Exit
  const exitP = T > 4.4 ? Easing.easeInCubic(clamp((T - 4.4) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp }}>
      <PaperBG/>

      {/* Top brand strip */}
      <div style={{
        position: 'absolute', left: 80, top: 80, right: 80,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: `2px solid ${COL.ink}`,
        paddingBottom: 18,
        opacity: stripP,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900,
          fontSize: 36, letterSpacing: '0.04em',
          textTransform: 'uppercase', color: COL.ink,
        }}>
          RAPTOR<span style={{ color: COL.accent, fontStyle: 'italic' }}>X</span>
          <span style={{ fontFamily: FONT.mono, fontWeight: 500, fontSize: 16,
            letterSpacing: '0.22em', color: COL.inkSoft, marginLeft: 18 }}>
            HEAVY PLANT · FORESTRY IMPLEMENTS
          </span>
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 16, color: COL.inkSoft,
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          Doc No. RX-30T-OM-001 · Rev A · 05/2026
        </div>
      </div>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', left: 80, top: 220,
        opacity: w1,
        fontFamily: FONT.mono, fontSize: 18,
        letterSpacing: '0.32em', textTransform: 'uppercase',
        color: COL.accent,
      }}>
        Operator Safety Briefing
      </div>

      {/* Mega headline */}
      <div style={{
        position: 'absolute', left: 80, top: 270,
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: 260, lineHeight: 0.84,
        letterSpacing: '-0.025em', color: COL.ink,
        textTransform: 'uppercase',
      }}>
        <div style={{
          opacity: w1,
          transform: `translateY(${(1 - w1) * 30}px)`,
        }}>
          30-Tonne
        </div>
        <div style={{
          opacity: w2,
          transform: `translateY(${(1 - w2) * 30}px)`,
        }}>
          Vertical
        </div>
        <div style={{
          opacity: w3,
          transform: `translateY(${(1 - w3) * 30}px)`,
        }}>
          Splitter<span style={{ color: COL.accent }}>.</span>
        </div>
      </div>

      {/* Mega 30T monogram on right (background) */}
      <div style={{
        position: 'absolute', right: 110, top: 280,
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: 520, lineHeight: 0.78,
        color: COL.ink,
        opacity: numP * 0.05,
        transform: `scale(${0.85 + numP * 0.15})`,
        transformOrigin: 'right center',
      }}>
        30T
      </div>

      {/* Right-side stacked info panel */}
      <div style={{
        position: 'absolute', right: 80, top: 430, width: 620,
        opacity: subP,
        transform: `translateY(${(1 - subP) * 20}px)`,
      }}>
        {/* Lede */}
        <div style={{
          borderTop: `3px solid ${COL.ink}`,
          paddingTop: 18,
          fontFamily: FONT.body, fontWeight: 500,
          fontSize: 22, lineHeight: 1.4, color: COL.ink,
        }}>
          PTO-driven heavy-duty vertical splitter.<br/>
          Splits logs up to 110&nbsp;cm.
          <div style={{
            color: COL.danger, fontWeight: 700, marginTop: 14,
            fontFamily: FONT.display, fontSize: 26,
            textTransform: 'uppercase', letterSpacing: '0.01em',
            lineHeight: 1.15,
          }}>
            Read end-to-end before connecting<br/>
            the implement to any tractor.
          </div>
        </div>
      </div>

      {/* Section ladder, stacked under the lede */}
      <div style={{
        position: 'absolute', right: 80, bottom: 110, width: 620,
        opacity: stripP,
        transform: `translateY(${(1 - stripP) * 20}px)`,
        borderTop: `1px solid ${COL.ruleSoft}`,
        borderBottom: `1px solid ${COL.ruleSoft}`,
        padding: '14px 0',
      }}>
        <div style={{
          fontFamily: FONT.mono, fontSize: 12, color: COL.inkSoft,
          letterSpacing: '0.24em', textTransform: 'uppercase',
          marginBottom: 10,
        }}>
          What this briefing covers
        </div>
        <div style={{
          display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 24px',
          fontFamily: FONT.display, fontWeight: 700, fontSize: 16,
          color: COL.ink, textTransform: 'uppercase',
          letterSpacing: '0.04em', lineHeight: 1.35,
        }}>
          {['Pre-flight', 'Hazards', 'PPE', 'Procedure', 'Zones', 'Shutdown'].map((s, i) => (
            <div key={i} style={{ display: 'flex', gap: 8 }}>
              <span style={{ color: COL.accent, fontFamily: FONT.mono, fontSize: 12, fontWeight: 700 }}>
                §{String(i + 1).padStart(2, '0')}
              </span>
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 22-pages tag bottom-right */}
      <div style={{
        position: 'absolute', right: 80, bottom: 60,
        opacity: stripP,
        fontFamily: FONT.display, fontWeight: 800, fontSize: 18,
        color: COL.accent, letterSpacing: '0.08em',
        textTransform: 'uppercase', textAlign: 'right',
      }}>
        22 Pages · The Standard Cycle
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 3 — MACHINE REVEAL
// Photo with corner brackets, callouts pop, stat counters
// 9.0 → 15.5 s
// ────────────────────────────────────────────────────────────────
function SceneMachine() {
  const { localTime } = useSprite();
  const T = localTime;

  const eyebrow = Easing.easeOutCubic(clamp(T / 0.4, 0, 1));
  const photoP = T > 0.2 ? Easing.easeOutCubic(clamp((T - 0.2) / 0.7, 0, 1)) : 0;
  const bracketP = T > 0.6 ? Easing.easeOutCubic(clamp((T - 0.6) / 0.6, 0, 1)) : 0;
  const statsP = T > 1.0 ? Easing.easeOutCubic(clamp((T - 1.0) / 0.4, 0, 1)) : 0;

  const exitP = T > 5.4 ? Easing.easeInCubic(clamp((T - 5.4) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  const stats = [
    { v: '30', unit: 't', label: 'Splitting force' },
    { v: '110', unit: 'cm', label: 'Max log length' },
    { v: '540', unit: 'rpm', label: 'PTO speed' },
    { v: 'CAT1', unit: '', label: '3-point hitch' },
  ];

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp }}>
      <PaperBG/>

      {/* Header */}
      <div style={{
        position: 'absolute', left: 80, top: 80, right: 80,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: `2px solid ${COL.ink}`, paddingBottom: 14,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900, fontSize: 28,
          color: COL.ink, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          § 03 — Component Identification
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 14, color: COL.inkSoft,
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          Fig. 01 — As-built
        </div>
      </div>

      <div style={{
        position: 'absolute', left: 80, top: 150, opacity: eyebrow, width: 1100,
      }}>
        <div style={{
          fontFamily: FONT.mono, fontSize: 16, color: COL.accent,
          letterSpacing: '0.28em', textTransform: 'uppercase',
          marginBottom: 14,
        }}>
          The machine
        </div>
        <div style={{
          fontFamily: FONT.display, fontWeight: 800, fontSize: 88,
          color: COL.ink, lineHeight: 0.95, letterSpacing: '-0.015em',
        }}>
          Know every control.<br/>Find it without looking.
        </div>
      </div>

      {/* Photo with brackets */}
      <div style={{
        position: 'absolute', right: 80, top: 160,
        width: 620, height: 820,
        opacity: photoP,
        transform: `scale(${0.92 + photoP * 0.08})`,
        transformOrigin: 'center',
      }}>
        <div style={{
          position: 'absolute', inset: 0, background: COL.ink,
        }}>
          <img src="assets/raptor-x-30t.png"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            alt=""/>
        </div>
        {/* Vertical hazard tape on right edge */}
        <div style={{
          position: 'absolute', right: 0, top: 0, width: 36, height: '100%',
          background: `repeating-linear-gradient(135deg,
            ${COL.ink} 0 18px,
            ${COL.yellow} 18px 36px)`,
        }}/>
        {/* Brackets */}
        <CornerBrackets x={0} y={0} width={620} height={820}
          color={COL.accent} thickness={4} size={70} progress={bracketP}/>

        {/* Badge */}
        <div style={{
          position: 'absolute', left: 0, bottom: 0,
          background: COL.accent, color: '#fff',
          padding: '14px 24px 14px 18px',
          fontFamily: FONT.display, fontWeight: 900,
          fontSize: 20, letterSpacing: '0.06em', textTransform: 'uppercase',
          opacity: bracketP,
        }}>
          <div style={{
            fontFamily: FONT.mono, fontWeight: 500, fontSize: 12,
            letterSpacing: '0.22em', color: 'rgba(255,255,255,0.85)',
            marginBottom: 4,
          }}>FIG. 01 · AS-BUILT</div>
          Raptor X 30T · Splitter
        </div>
      </div>

      {/* Stats grid */}
      <div style={{
        position: 'absolute', left: 80, bottom: 110,
        width: 1000,
        display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)',
        borderTop: `3px solid ${COL.ink}`,
        borderBottom: `3px solid ${COL.ink}`,
        opacity: statsP,
      }}>
        {stats.map((s, i) => {
          const localT = T - (1.0 + i * 0.15);
          const sp = clamp(localT / 0.4, 0, 1);
          return (
            <div key={i} style={{
              padding: '24px 20px 24px 0',
              borderRight: i < 3 ? `1px solid ${COL.ruleSoft}` : 'none',
              opacity: sp,
              transform: `translateY(${(1 - sp) * 12}px)`,
            }}>
              <div style={{
                fontFamily: FONT.display, fontWeight: 800,
                fontSize: 80, lineHeight: 0.95,
                color: COL.ink, letterSpacing: '-0.02em',
              }}>
                {s.v}<span style={{ fontSize: 36, color: COL.accent, marginLeft: 4 }}>{s.unit}</span>
              </div>
              <div style={{
                fontFamily: FONT.mono, fontSize: 14, color: COL.inkSoft,
                letterSpacing: '0.16em', textTransform: 'uppercase',
                marginTop: 10,
              }}>
                {s.label}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 4 — PTO 540 RPM
// "9 rotations per second" with kinetic spinning indicator
// 15.5 → 22.5 s
// ────────────────────────────────────────────────────────────────
function ScenePTO() {
  const { localTime } = useSprite();
  const T = localTime;

  const eyebrow = Easing.easeOutCubic(clamp(T / 0.4, 0, 1));
  const numP = T > 0.3 ? Easing.easeOutExpo(clamp((T - 0.3) / 0.6, 0, 1)) : 0;
  const detail = T > 1.2 ? Easing.easeOutCubic(clamp((T - 1.2) / 0.5, 0, 1)) : 0;
  const stat2 = T > 1.6 ? Easing.easeOutCubic(clamp((T - 1.6) / 0.5, 0, 1)) : 0;
  const rule = T > 2.4 ? Easing.easeOutCubic(clamp((T - 2.4) / 0.5, 0, 1)) : 0;

  const exitP = T > 5.8 ? Easing.easeInCubic(clamp((T - 5.8) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  // Spinning shaft visual
  const spinAngle = T * 540 * 6; // visual approximation

  // Sleeve wind-on counter
  const windT = T > 1.6 ? clamp((T - 1.6) / 2.5, 0, 1) : 0;
  const wound = (windT * 60).toFixed(0); // cm wound on

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp, background: COL.ink, overflow: 'hidden' }}>
      {/* Top hazard strip */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 28,
        background: `repeating-linear-gradient(135deg,
          ${COL.ink} 0 18px,
          ${COL.yellow} 18px 36px)`,
      }}/>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', left: 80, top: 90,
        opacity: eyebrow,
        fontFamily: FONT.mono, fontSize: 18,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: COL.yellow,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ width: 60, height: 1, background: COL.yellow }}/>
        Hazard §08 — PTO Entanglement
      </div>

      {/* MEGA NUMBER */}
      <div style={{
        position: 'absolute', left: 80, top: 130,
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: 560, lineHeight: 0.82,
        color: COL.paper, letterSpacing: '-0.04em',
        opacity: numP,
        transform: `translateX(${(1 - numP) * -40}px)`,
      }}>
        <CountUp to={540} duration={0.8} style={{ display: 'inline-block' }}/>
      </div>
      <div style={{
        position: 'absolute', left: 80, top: 690,
        fontFamily: FONT.display, fontWeight: 800, fontSize: 64,
        color: COL.yellow, letterSpacing: '0.08em',
        textTransform: 'uppercase',
        opacity: detail,
      }}>
        Rpm · The Pto Standard
      </div>

      {/* Right side — explainer */}
      <div style={{
        position: 'absolute', right: 80, top: 200, width: 700,
        opacity: detail,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 800, fontSize: 56,
          color: COL.paper, lineHeight: 1.0,
          letterSpacing: '-0.01em', marginBottom: 30,
        }}>
          That is <span style={{ color: COL.yellow }}>9 rotations</span><br/>
          every second.
        </div>
        <div style={{
          fontFamily: FONT.body, fontWeight: 500, fontSize: 22,
          color: 'rgba(247,244,236,0.78)', lineHeight: 1.45,
          marginBottom: 36,
        }}>
          In the time it takes you to recognise a sleeve
          has touched the shaft —
        </div>

        {/* Sleeve wind counter */}
        <div style={{
          opacity: stat2,
          border: `2px solid ${COL.danger}`,
          padding: '24px 28px',
          background: 'rgba(200,16,46,0.08)',
        }}>
          <div style={{
            fontFamily: FONT.mono, fontSize: 13, color: COL.danger,
            letterSpacing: '0.22em', textTransform: 'uppercase',
            marginBottom: 10,
          }}>
            Clothing wound on shaft
          </div>
          <div style={{
            fontFamily: FONT.display, fontWeight: 900, fontSize: 96,
            color: COL.danger, lineHeight: 0.9,
            letterSpacing: '-0.02em',
          }}>
            {wound}<span style={{ fontSize: 44, marginLeft: 6 }}>cm</span>
          </div>
          <div style={{
            fontFamily: FONT.mono, fontSize: 13, color: 'rgba(247,244,236,0.6)',
            letterSpacing: '0.16em', textTransform: 'uppercase',
            marginTop: 10,
          }}>
            In under one second
          </div>
        </div>
      </div>

      {/* Bottom rule — non-negotiable */}
      <div style={{
        position: 'absolute', left: 80, right: 80, bottom: 80,
        opacity: rule,
        borderTop: `3px solid ${COL.danger}`,
        paddingTop: 22,
        display: 'flex', alignItems: 'baseline', gap: 32,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900,
          fontSize: 22, color: COL.danger,
          letterSpacing: '0.12em', textTransform: 'uppercase',
          background: COL.danger, color: COL.paper,
          padding: '6px 14px',
        }}>The Rule</div>
        <div style={{
          fontFamily: FONT.display, fontWeight: 700, fontSize: 36,
          color: COL.paper, letterSpacing: '-0.005em',
          lineHeight: 1.1,
        }}>
          Disengage PTO. Stop engine. Remove key. Wait for full rotation to stop —
          <span style={{ color: COL.yellow }}> before crossing within reach.</span>
        </div>
      </div>

      {/* Bottom hazard strip */}
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: 28,
        background: `repeating-linear-gradient(135deg,
          ${COL.yellow} 0 18px,
          ${COL.ink} 18px 36px)`,
      }}/>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 5 — HYDRAULIC 250 BAR
// 22.5 → 29.5 s
// ────────────────────────────────────────────────────────────────
function SceneHydraulic() {
  const { localTime } = useSprite();
  const T = localTime;

  const eyebrow = Easing.easeOutCubic(clamp(T / 0.4, 0, 1));
  const numP = T > 0.3 ? Easing.easeOutExpo(clamp((T - 0.3) / 0.7, 0, 1)) : 0;
  const conv = T > 1.2 ? Easing.easeOutCubic(clamp((T - 1.2) / 0.5, 0, 1)) : 0;
  const explain = T > 1.7 ? Easing.easeOutCubic(clamp((T - 1.7) / 0.6, 0, 1)) : 0;
  const rule = T > 3.2 ? Easing.easeOutCubic(clamp((T - 3.2) / 0.5, 0, 1)) : 0;
  const cardboard = T > 4.0 ? Easing.easeOutCubic(clamp((T - 4.0) / 0.5, 0, 1)) : 0;

  const exitP = T > 5.8 ? Easing.easeInCubic(clamp((T - 5.8) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp }}>
      <PaperBG/>

      {/* Section ribbon left */}
      <div style={{
        position: 'absolute', left: 0, top: 0, bottom: 0, width: 80,
        background: COL.danger,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900, fontSize: 24,
          color: COL.paper, letterSpacing: '0.32em',
          textTransform: 'uppercase',
          transform: 'rotate(-90deg)', whiteSpace: 'nowrap',
        }}>
          § 09 · Hydraulic Hazard
        </div>
      </div>

      {/* Eyebrow */}
      <div style={{
        position: 'absolute', left: 160, top: 100, opacity: eyebrow,
        fontFamily: FONT.mono, fontSize: 18,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: COL.danger,
      }}>
        What "250 bar" really means
      </div>

      {/* Mega numerator */}
      <div style={{
        position: 'absolute', left: 160, top: 140,
        opacity: numP,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900,
          fontSize: 440, lineHeight: 0.84,
          color: COL.ink, letterSpacing: '-0.035em',
        }}>
          <CountUp to={250} duration={0.9}/>
          <span style={{ fontSize: 180, color: COL.danger, marginLeft: 12 }}>bar</span>
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 22,
          color: COL.inkSoft, letterSpacing: '0.16em',
          textTransform: 'uppercase', marginTop: 8,
          opacity: conv,
        }}>
          ≈ 3,600 psi · Working pressure
        </div>
      </div>

      {/* Explainer right side */}
      <div style={{
        position: 'absolute', right: 80, top: 200, width: 580,
        opacity: explain,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 800, fontSize: 48,
          color: COL.ink, lineHeight: 1.0, letterSpacing: '-0.005em',
          marginBottom: 24,
        }}>
          A pin-hole leak produces<br/>
          an <span style={{ color: COL.danger }}>invisible jet</span> of oil.
        </div>
        <div style={{
          fontFamily: FONT.body, fontWeight: 500, fontSize: 22,
          color: COL.ink, lineHeight: 1.45,
        }}>
          It passes through clothing, skin and tendons
          with nothing more than a brief sting.
          <br/><br/>
          <strong>The injury looks trivial.</strong><br/>
          <strong style={{ color: COL.danger }}>It is catastrophic.</strong>
        </div>
      </div>

      {/* Bottom rule strip */}
      <div style={{
        position: 'absolute', left: 160, right: 80, bottom: 70,
        opacity: rule,
        background: COL.ink, color: COL.paper,
        padding: '22px 32px',
        display: 'grid',
        gridTemplateColumns: '180px 1fr 1fr',
        gap: 32,
        alignItems: 'center',
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900, fontSize: 28,
          color: COL.caution, letterSpacing: '0.08em',
          textTransform: 'uppercase', lineHeight: 1,
        }}>
          The<br/>cardboard<br/>rule
        </div>
        <div style={{
          fontFamily: FONT.body, fontWeight: 500, fontSize: 19,
          color: COL.paper, lineHeight: 1.4,
        }}>
          Never check for leaks with hand or finger.
          Use stiff cardboard, both hands well clear.
        </div>
        <div style={{
          fontFamily: FONT.body, fontWeight: 500, fontSize: 19,
          color: COL.paper, lineHeight: 1.4,
          opacity: cardboard,
        }}>
          If oil enters skin — even a tiny entry wound —
          <strong style={{ color: COL.caution }}> go directly to A&E.</strong>
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 6 — PPE
// 29.5 → 38.5 s
// ────────────────────────────────────────────────────────────────
function ScenePPE() {
  const { localTime } = useSprite();
  const T = localTime;

  const eyebrow = Easing.easeOutCubic(clamp(T / 0.4, 0, 1));
  const title = T > 0.3 ? Easing.easeOutCubic(clamp((T - 0.3) / 0.5, 0, 1)) : 0;

  const items = [
    { lbl: 'Eye Protection', desc: 'Side-shielded glasses, EN 166-F minimum.' },
    { lbl: 'Hearing Protection', desc: 'SNR ≥ 25 dB. PTO noise exceeds 85 dB(A).' },
    { lbl: 'Steel-Toe Boots', desc: 'EN ISO 20345 S3. Falling rounds land at the foot well.' },
    { lbl: 'Tight Gloves', desc: 'No loose cuffs. Remove entirely near the PTO shaft.' },
    { lbl: 'Close-Fitting Clothing', desc: 'No loose sleeves, scarves, strings or jewellery.' },
    { lbl: 'Head Protection', desc: 'EN 397 helmet when other tree work is nearby.' },
  ];

  const banner = T > 6.0 ? Easing.easeOutCubic(clamp((T - 6.0) / 0.5, 0, 1)) : 0;

  const exitP = T > 7.4 ? Easing.easeInCubic(clamp((T - 7.4) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp }}>
      <PaperBG/>

      <div style={{
        position: 'absolute', left: 80, top: 90,
        opacity: eyebrow,
        fontFamily: FONT.mono, fontSize: 18,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: COL.accent,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ width: 60, height: 1, background: COL.accent }}/>
        Section 06 — Personal Protective Equipment
      </div>

      <div style={{
        position: 'absolute', left: 80, top: 130, right: 80,
        fontFamily: FONT.display, fontWeight: 800, fontSize: 96,
        color: COL.ink, lineHeight: 0.95,
        letterSpacing: '-0.02em', textTransform: 'uppercase',
        opacity: title, transform: `translateY(${(1 - title) * 20}px)`,
        whiteSpace: 'nowrap',
      }}>
        PPE — <span style={{ color: COL.accent }}>non-negotiable.</span>
      </div>

      {/* PPE grid */}
      <div style={{
        position: 'absolute', left: 80, right: 80, top: 290, bottom: 220,
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridTemplateRows: 'repeat(2, 1fr)',
        gap: 18,
      }}>
        {items.map((it, i) => {
          const start = 0.7 + i * 0.16;
          const localT = T - start;
          const p = clamp(localT / 0.4, 0, 1);
          const eased = Easing.easeOutBack(p);
          return (
            <div key={i} style={{
              border: `2px solid ${COL.ink}`,
              background: COL.paper,
              padding: '20px 22px',
              display: 'flex',
              gap: 18,
              alignItems: 'flex-start',
              opacity: clamp(localT / 0.3, 0, 1),
              transform: `translateY(${(1 - eased) * 16}px) scale(${0.96 + eased * 0.04})`,
              transformOrigin: 'center',
            }}>
              <div style={{
                fontFamily: FONT.display, fontWeight: 900, fontSize: 64,
                color: COL.accent, lineHeight: 0.85,
                letterSpacing: '-0.02em', flexShrink: 0,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{
                  fontFamily: FONT.display, fontWeight: 700, fontSize: 26,
                  color: COL.ink, textTransform: 'uppercase',
                  letterSpacing: '0.02em', lineHeight: 1.05,
                  marginBottom: 6,
                }}>
                  {it.lbl}
                </div>
                <div style={{
                  fontFamily: FONT.body, fontSize: 17, color: COL.inkSoft,
                  lineHeight: 1.35,
                }}>
                  {it.desc}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom warning */}
      <div style={{
        position: 'absolute', left: 80, right: 80, bottom: 80,
        opacity: banner,
        background: COL.ink,
        display: 'grid',
        gridTemplateColumns: '180px 1fr',
        border: `3px solid ${COL.warning}`,
      }}>
        <div style={{
          background: COL.warning, padding: '18px 22px',
          fontFamily: FONT.display, fontWeight: 900, fontSize: 26,
          color: COL.ink, letterSpacing: '0.08em',
          textTransform: 'uppercase', lineHeight: 1,
          display: 'flex', alignItems: 'center',
        }}>
          ⚠ Warning
        </div>
        <div style={{
          padding: '18px 24px',
          fontFamily: FONT.body, fontWeight: 500, fontSize: 22,
          color: COL.paper, lineHeight: 1.4,
        }}>
          Entanglement is the <strong style={{ color: COL.warning }}>single most common</strong> cause of fatal
          injury on PTO-driven implements — usually a sleeve, a cuff or a glove.
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 7 — OPERATING PROCEDURE (steps cascade)
// 38.5 → 50.5 s
// ────────────────────────────────────────────────────────────────
function SceneProcedure() {
  const { localTime } = useSprite();
  const T = localTime;

  const eyebrow = Easing.easeOutCubic(clamp(T / 0.4, 0, 1));
  const title = T > 0.3 ? Easing.easeOutCubic(clamp((T - 0.3) / 0.5, 0, 1)) : 0;

  const steps = [
    { title: 'Bring PTO to 540 rpm', body: 'Set tractor to marked green band. Engage at low rpm to limit shock.' },
    { title: 'Confirm zone clearance', body: 'Operator station only. 5 m zone D clear of people and pets.' },
    { title: 'Load the log — flat end down', body: 'Square cut down. Lean lightly against the column. One log at a time.' },
    { title: 'Two-hand control (ZHB)', body: 'Both levers down together. Release either — ram stops instantly.' },
    { title: 'Complete the split', body: 'Halves fall to either side. Never reach in to catch them.' },
    { title: 'Retract — auto-return', body: 'Both levers fully up to detent. Hands-free travel to upper limit-stop.' },
    { title: 'Clear and reset', body: 'Halves to reception zone before loading next log. Never reach across the beam.' },
  ];

  const banner = T > 9.6 ? Easing.easeOutCubic(clamp((T - 9.6) / 0.5, 0, 1)) : 0;

  const exitP = T > 10.6 ? Easing.easeInCubic(clamp((T - 10.6) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp }}>
      <PaperBG/>

      {/* Header */}
      <div style={{
        position: 'absolute', left: 80, top: 80, right: 80,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
        borderBottom: `2px solid ${COL.ink}`, paddingBottom: 14,
        opacity: eyebrow,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900, fontSize: 28,
          color: COL.ink, textTransform: 'uppercase', letterSpacing: '0.04em',
        }}>
          § 13 — Operating Procedure
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 14, color: COL.inkSoft,
          letterSpacing: '0.14em', textTransform: 'uppercase',
        }}>
          The Standard Cycle · 7 Steps
        </div>
      </div>

      {/* Title */}
      <div style={{
        position: 'absolute', left: 80, top: 150, right: 80,
        opacity: title, transform: `translateY(${(1 - title) * 16}px)`,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 800, fontSize: 84,
          color: COL.ink, lineHeight: 0.95, letterSpacing: '-0.015em',
        }}>
          Split a log — <span style={{ color: COL.accent }}>the only way.</span>
        </div>
      </div>

      {/* Steps two-column */}
      <div style={{
        position: 'absolute', left: 80, right: 80, top: 320,
        display: 'grid', gridTemplateColumns: '1fr 1fr',
        gap: '14px 80px',
      }}>
        {steps.map((s, i) => {
          const start = 0.8 + i * 0.45;
          const localT = T - start;
          const p = clamp(localT / 0.45, 0, 1);
          const eased = Easing.easeOutCubic(p);

          // active highlight pulse — current step
          const isActive = T - start < 0.9 && T > start;
          return (
            <div key={i} style={{
              opacity: eased,
              transform: `translateX(${(1 - eased) * -24}px)`,
              display: 'flex', gap: 22, alignItems: 'flex-start',
              padding: '12px 16px 12px 0',
              borderBottom: `1px dashed ${COL.ruleSoft}`,
              background: isActive ? 'rgba(217,83,30,0.06)' : 'transparent',
              transition: 'background 200ms',
            }}>
              <div style={{
                fontFamily: FONT.display, fontWeight: 900, fontSize: 52,
                color: COL.accent, lineHeight: 0.9,
                letterSpacing: '-0.02em', minWidth: 80,
                fontVariantNumeric: 'tabular-nums',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>
              <div>
                <div style={{
                  fontFamily: FONT.display, fontWeight: 700, fontSize: 23,
                  color: COL.ink, textTransform: 'uppercase',
                  letterSpacing: '0.02em', lineHeight: 1.1,
                  marginBottom: 4,
                }}>
                  {s.title}
                </div>
                <div style={{
                  fontFamily: FONT.body, fontSize: 17, color: COL.inkSoft,
                  lineHeight: 1.4,
                }}>
                  {s.body}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom warning */}
      <div style={{
        position: 'absolute', left: 80, right: 80, bottom: 70,
        opacity: banner,
        background: COL.warning,
        padding: '18px 26px',
        display: 'flex', alignItems: 'center', gap: 26,
        borderLeft: `8px solid ${COL.ink}`,
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900, fontSize: 24,
          color: COL.ink, letterSpacing: '0.12em',
          textTransform: 'uppercase', whiteSpace: 'nowrap',
        }}>
          ▲ Warning
        </div>
        <div style={{
          fontFamily: FONT.body, fontWeight: 500, fontSize: 20,
          color: COL.ink, lineHeight: 1.35,
        }}>
          Never force a stubborn log. 5 seconds of no progress — release, retract, rotate.
          Cross-cut knotty hardwood shorter instead.
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 8 — WORK ZONES (onion)
// 50.5 → 58.0 s
// ────────────────────────────────────────────────────────────────
function SceneZones() {
  const { localTime } = useSprite();
  const T = localTime;

  const eyebrow = Easing.easeOutCubic(clamp(T / 0.4, 0, 1));
  const title = T > 0.3 ? Easing.easeOutCubic(clamp((T - 0.3) / 0.5, 0, 1)) : 0;

  // Onion ring expansions
  const zones = [
    { color: COL.danger, label: 'A · Crush · 1 m', size: 200, desc: 'Hands never enter while valve is energised.' },
    { color: COL.warning, label: 'B · Operator only · 2 m', size: 350, desc: 'Two-hand controls reachable only from here.' },
    { color: COL.caution, label: 'C · Reception · 3 m', size: 500, desc: 'Where split halves fall. Walk around, never reach across.' },
    { color: COL.safety, label: 'D · Bystander limit · 5 m', size: 680, desc: 'No person other than operator may cross while PTO runs.' },
  ];

  const exitP = T > 6.6 ? Easing.easeInCubic(clamp((T - 6.6) / 0.6, 0, 1)) : 0;
  const exitOp = 1 - exitP;

  return (
    <div style={{ position: 'absolute', inset: 0, opacity: exitOp }}>
      <PaperBG/>

      <div style={{
        position: 'absolute', left: 80, top: 90,
        opacity: eyebrow,
        fontFamily: FONT.mono, fontSize: 18,
        letterSpacing: '0.28em', textTransform: 'uppercase',
        color: COL.accent,
        display: 'flex', alignItems: 'center', gap: 16,
      }}>
        <div style={{ width: 60, height: 1, background: COL.accent }}/>
        Section 10 — Work area & operating zones
      </div>

      <div style={{
        position: 'absolute', left: 80, top: 130, width: 900,
        fontFamily: FONT.display, fontWeight: 800, fontSize: 90,
        color: COL.ink, lineHeight: 0.95,
        letterSpacing: '-0.02em', textTransform: 'uppercase',
        opacity: title, transform: `translateY(${(1 - title) * 16}px)`,
      }}>
        Where you<br/>stand. Where<br/><span style={{ color: COL.accent }}>nobody else</span> does.
      </div>

      {/* Onion centered on right */}
      <div style={{
        position: 'absolute', right: 200, top: '50%',
        width: 700, height: 700,
        transform: 'translateY(-50%)',
      }}>
        {/* Concentric circles (largest first) */}
        {[...zones].reverse().map((z, i) => {
          const idx = zones.length - 1 - i;
          const start = 0.6 + idx * 0.35;
          const localT = T - start;
          const p = clamp(localT / 0.6, 0, 1);
          const eased = Easing.easeOutBack(p);
          const size = z.size * eased;
          return (
            <div key={idx} style={{
              position: 'absolute', left: '50%', top: '50%',
              width: size, height: size,
              marginLeft: -size / 2, marginTop: -size / 2,
              borderRadius: '50%',
              background: z.color, opacity: 0.18 + (zones.length - idx) * 0.05,
              border: `2px solid ${z.color}`,
            }}/>
          );
        })}
        {/* Center mark — splitter */}
        <div style={{
          position: 'absolute', left: '50%', top: '50%',
          width: 90, height: 90,
          marginLeft: -45, marginTop: -45,
          background: COL.ink, color: COL.paper,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: FONT.mono, fontSize: 11,
          textAlign: 'center', lineHeight: 1.1,
          letterSpacing: '0.06em', textTransform: 'uppercase',
          padding: 8,
          opacity: clamp((T - 0.4) / 0.4, 0, 1),
        }}>
          Splitter<br/>+ operator
        </div>
      </div>

      {/* Zone labels list, left */}
      <div style={{
        position: 'absolute', left: 80, bottom: 100,
        display: 'flex', flexDirection: 'column', gap: 14,
        width: 700,
      }}>
        {zones.map((z, i) => {
          const start = 0.8 + i * 0.35;
          const localT = T - start;
          const p = clamp(localT / 0.45, 0, 1);
          const eased = Easing.easeOutCubic(p);
          return (
            <div key={i} style={{
              opacity: eased,
              transform: `translateX(${(1 - eased) * -16}px)`,
              display: 'flex', alignItems: 'baseline', gap: 18,
              borderBottom: `1px solid ${COL.ruleSoft}`,
              paddingBottom: 8,
            }}>
              <div style={{
                background: z.color,
                color: z.color === COL.caution ? COL.ink : '#fff',
                fontFamily: FONT.display, fontWeight: 900, fontSize: 18,
                padding: '6px 12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                minWidth: 280,
              }}>
                {z.label}
              </div>
              <div style={{
                fontFamily: FONT.body, fontSize: 17, color: COL.ink,
                lineHeight: 1.35,
              }}>
                {z.desc}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE 9 — CLOSING
// 58.0 → 68.0 s
// ────────────────────────────────────────────────────────────────
function SceneClose() {
  const { localTime } = useSprite();
  const T = localTime;

  const tape = Easing.easeOutCubic(clamp(T / 0.5, 0, 1));
  const headline1 = T > 0.4 ? Easing.easeOutCubic(clamp((T - 0.4) / 0.55, 0, 1)) : 0;
  const headline2 = T > 0.95 ? Easing.easeOutCubic(clamp((T - 0.95) / 0.55, 0, 1)) : 0;
  const headline3 = T > 1.5 ? Easing.easeOutCubic(clamp((T - 1.5) / 0.55, 0, 1)) : 0;
  const sub = T > 2.4 ? Easing.easeOutCubic(clamp((T - 2.4) / 0.5, 0, 1)) : 0;
  const doc = T > 3.0 ? Easing.easeOutCubic(clamp((T - 3.0) / 0.6, 0, 1)) : 0;
  const stamp = T > 4.0 ? Easing.easeOutBack(clamp((T - 4.0) / 0.6, 0, 1)) : 0;

  return (
    <div style={{ position: 'absolute', inset: 0, background: COL.ink, overflow: 'hidden' }}>
      {/* Diagonal yellow tape stripes top-right and bottom-left */}
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '100%', height: 80,
        background: `repeating-linear-gradient(135deg,
          ${COL.ink} 0 32px,
          ${COL.yellow} 32px 64px)`,
        transform: `translateY(${(1 - tape) * -80}px)`,
      }}/>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, width: '100%', height: 80,
        background: `repeating-linear-gradient(135deg,
          ${COL.yellow} 0 32px,
          ${COL.ink} 32px 64px)`,
        transform: `translateY(${(1 - tape) * 80}px)`,
      }}/>

      {/* Mega headline */}
      <div style={{
        position: 'absolute', left: 80, top: 200,
        fontFamily: FONT.display, fontWeight: 900,
        fontSize: 200, lineHeight: 0.85,
        color: COL.paper, letterSpacing: '-0.025em',
        textTransform: 'uppercase',
      }}>
        <div style={{
          opacity: headline1,
          transform: `translateY(${(1 - headline1) * 20}px)`,
        }}>
          Read the
        </div>
        <div style={{
          opacity: headline2,
          transform: `translateY(${(1 - headline2) * 20}px)`,
          color: COL.accent,
        }}>
          manual.
        </div>
        <div style={{
          opacity: headline3,
          transform: `translateY(${(1 - headline3) * 20}px)`,
        }}>
          No exceptions.
        </div>
      </div>

      {/* Subtitle */}
      <div style={{
        position: 'absolute', left: 80, top: 820, right: 80,
        opacity: sub,
        fontFamily: FONT.body, fontWeight: 500, fontSize: 30,
        color: 'rgba(247,244,236,0.75)', lineHeight: 1.4,
        maxWidth: 1200,
      }}>
        If anything sounds, smells or feels wrong — <strong style={{ color: COL.paper }}>stop.</strong>
        <br/>
        Disengage PTO. Investigate with the tractor engine off.
      </div>

      {/* Doc identity bottom strip */}
      <div style={{
        position: 'absolute', left: 80, bottom: 110, right: 80,
        opacity: doc,
        borderTop: `2px solid rgba(247,244,236,0.2)`,
        paddingTop: 18,
        display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900,
          fontSize: 30, letterSpacing: '0.04em',
          textTransform: 'uppercase', color: COL.paper,
        }}>
          RAPTOR<span style={{ color: COL.accent, fontStyle: 'italic' }}>X</span>
          <span style={{ fontFamily: FONT.mono, fontWeight: 500, fontSize: 14,
            letterSpacing: '0.22em', color: 'rgba(247,244,236,0.5)', marginLeft: 16 }}>
            HEAVY PLANT
          </span>
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 14,
          color: 'rgba(247,244,236,0.55)',
          letterSpacing: '0.14em', textTransform: 'uppercase',
          textAlign: 'right', lineHeight: 1.5,
        }}>
          Doc No. RX-30T-OM-001 · Rev A · 05/2026<br/>
          Operator Safety Briefing · 22 pp · EN-GB
        </div>
      </div>

      {/* Stamp top-right */}
      <div style={{
        position: 'absolute', right: 100, top: 180,
        opacity: stamp,
        transform: `scale(${0.85 + stamp * 0.15}) rotate(${(1 - stamp) * -8 + 6}deg)`,
        transformOrigin: 'center',
        border: `5px solid ${COL.danger}`,
        padding: '16px 28px',
        background: 'rgba(0,0,0,0.2)',
      }}>
        <div style={{
          fontFamily: FONT.display, fontWeight: 900, fontSize: 64,
          color: COL.danger, lineHeight: 0.9,
          letterSpacing: '0.06em', textTransform: 'uppercase',
        }}>
          Keep with<br/>machine
        </div>
        <div style={{
          fontFamily: FONT.mono, fontSize: 13,
          letterSpacing: '0.2em', color: 'rgba(247,244,236,0.65)',
          textTransform: 'uppercase', marginTop: 6, textAlign: 'center',
        }}>
          At all times
        </div>
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────
// SCENE INDICATOR (top-left section ticker)
// ────────────────────────────────────────────────────────────────
function SceneIndicator({ time }) {
  // not currently used inside scenes — leave hook for later if wanted
  return null;
}

// Export everything
Object.assign(window, {
  COL, FONT,
  Eyebrow, HazardTape, CornerBrackets, CountUp, PaperBG, DocRef,
  SceneColdOpen, SceneTitle, SceneMachine, ScenePTO, SceneHydraulic,
  ScenePPE, SceneProcedure, SceneZones, SceneClose,
});
