import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Size Guide',
  description: 'Find your perfect fit with the Footway India size guide for men, women, and kids.',
};

const MENS_SIZES = [
  { in: '6',   eu: '39', uk: '5.5', cm: '24.5' },
  { in: '7',   eu: '40', uk: '6.5', cm: '25.4' },
  { in: '8',   eu: '41', uk: '7.5', cm: '26.2' },
  { in: '9',   eu: '42', uk: '8.5', cm: '27.0' },
  { in: '10',  eu: '43', uk: '9.5', cm: '27.9' },
  { in: '11',  eu: '44', uk: '10.5', cm: '28.8' },
  { in: '12',  eu: '45', uk: '11.5', cm: '29.6' },
  { in: '13',  eu: '46', uk: '12.5', cm: '30.5' },
];

const WOMENS_SIZES = [
  { in: '4',   eu: '35', uk: '2',   cm: '22.0' },
  { in: '5',   eu: '36', uk: '3',   cm: '22.9' },
  { in: '6',   eu: '37', uk: '4',   cm: '23.8' },
  { in: '7',   eu: '38', uk: '5',   cm: '24.6' },
  { in: '8',   eu: '39', uk: '6',   cm: '25.4' },
  { in: '9',   eu: '40', uk: '7',   cm: '26.2' },
  { in: '10',  eu: '41', uk: '8',   cm: '27.0' },
  { in: '11',  eu: '42', uk: '9',   cm: '27.9' },
];

const KIDS_SIZES = [
  { in: '1C',  eu: '16', uk: '0.5', cm: '9.5'  },
  { in: '4C',  eu: '20', uk: '3.5', cm: '12.0' },
  { in: '7C',  eu: '23', uk: '6',   cm: '14.5' },
  { in: '10C', eu: '27', uk: '9',   cm: '17.0' },
  { in: '13C', eu: '31', uk: '12',  cm: '19.5' },
  { in: '1Y',  eu: '33', uk: '1',   cm: '21.0' },
  { in: '3Y',  eu: '35', uk: '2.5', cm: '22.5' },
  { in: '5Y',  eu: '37', uk: '4.5', cm: '24.0' },
];

const TIPS = [
  { icon: '📏', title: 'Measure in the evening', desc: 'Feet tend to swell slightly during the day. Measure at the end of the day for the most accurate fit.' },
  { icon: '🧦', title: 'Wear your usual socks', desc: 'Measure while wearing the type of socks you plan to wear with the shoes.' },
  { icon: '📐', title: 'Measure both feet', desc: 'Most people have one foot slightly larger than the other. Always fit to the larger foot.' },
  { icon: '👆', title: 'Allow thumb space', desc: 'There should be roughly 1cm (one thumb-width) of space between your longest toe and the shoe tip.' },
];

function SizeTable({
  rows,
}: {
  rows: { in: string; eu: string; uk: string; cm: string }[];
}) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm border-collapse">
        <thead>
          <tr className="border-b border-brand-border">
            {['India (IN)', 'Europe (EU)', 'UK', 'Foot Length (cm)'].map((h) => (
              <th
                key={h}
                className="py-3 px-4 text-left text-[10px] font-semibold tracking-[0.2em] uppercase text-brand-text-muted"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr
              key={row.in}
              className={`border-b border-brand-border/50 transition-colors duration-150 hover:bg-brand-surface ${
                i % 2 === 0 ? '' : 'bg-brand-surface/40'
              }`}
            >
              <td className="py-3.5 px-4 font-medium text-brand-text">{row.in}</td>
              <td className="py-3.5 px-4 text-brand-text-secondary">{row.eu}</td>
              <td className="py-3.5 px-4 text-brand-text-secondary">{row.uk}</td>
              <td className="py-3.5 px-4 text-brand-text-secondary">{row.cm}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function SizeGuidePage() {
  return (
    <>
      {/* Header */}
      <div className="border-b border-brand-border py-16 px-4 text-center">
        <div className="flex items-center justify-center gap-4 mb-4">
          <span className="w-5 h-px bg-brand-gold" />
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
            Footway India
          </p>
          <span className="w-5 h-px bg-brand-gold" />
        </div>
        <h1
          className="font-display font-bold uppercase tracking-tight text-brand-text mb-4"
          style={{ fontSize: 'clamp(28px, 4vw, 60px)' }}
        >
          Size Guide
        </h1>
        <p className="text-brand-text-muted text-sm max-w-md mx-auto font-light">
          Find your perfect fit. All sizes are listed in India sizing with EU, UK, and foot length equivalents.
        </p>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">

        {/* How to measure */}
        <div>
          <div className="flex items-center gap-4 mb-8">
            <span className="divider-gold" />
            <h2 className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold">
              How to Measure
            </h2>
          </div>

          {/* Diagram + steps side by side */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-brand-border mb-px">

            {/* SVG Diagram */}
            <div className="bg-brand-surface flex flex-col items-center justify-center py-12 px-8">
              <svg
                viewBox="0 0 220 340"
                className="w-full max-w-[180px]"
                aria-label="Foot measurement diagram"
                role="img"
              >
                {/* Background */}
                <rect x="0" y="0" width="220" height="340" rx="8" fill="#F4F3F0" />

                {/*
                  Single continuous path — right foot, plantar (bottom) view.
                  Big toe top-left, pinky top-right. Heel at bottom.
                  Toes flow as natural bumps in one path — no separate shapes.
                */}
                <path
                  d="
                    M 64 94
                    C 58 82, 56 64, 62 50
                    C 67 38, 80 34, 88 42
                    C 90 36, 98 30, 108 34
                    C 114 26, 126 26, 130 36
                    C 132 28, 142 26, 148 34
                    C 154 28, 163 32, 163 44
                    C 164 38, 170 40, 173 50
                    C 176 44, 180 52, 178 64
                    C 176 74, 170 80, 164 84
                    C 168 100, 170 122, 168 148
                    C 165 178, 156 208, 144 232
                    C 132 256, 118 272, 108 280
                    C 96 290, 80 290, 70 278
                    C 58 264, 54 242, 54 218
                    C 54 192, 58 166, 61 146
                    C 63 126, 65 108, 64 94 Z
                  "
                  fill="#E8E5E0"
                  stroke="#C8773A"
                  strokeWidth="1.8"
                  strokeLinejoin="round"
                />

                {/* Subtle arch line on medial side */}
                <path
                  d="M 54 218 C 52 200, 54 180, 58 162"
                  fill="none"
                  stroke="#C8773A"
                  strokeWidth="0.8"
                  strokeDasharray="2,3"
                  opacity="0.5"
                />

                {/* Toenail hints — subtle lines across each toe bump */}
                <path d="M 68 44 Q 75 38 84 42"   fill="none" stroke="#C8773A" strokeWidth="0.8" opacity="0.5" />
                <path d="M 92 32 Q 100 26 110 32"  fill="none" stroke="#C8773A" strokeWidth="0.8" opacity="0.5" />
                <path d="M 132 28 Q 140 24 148 30" fill="none" stroke="#C8773A" strokeWidth="0.8" opacity="0.5" />
                <path d="M 152 32 Q 158 28 165 36" fill="none" stroke="#C8773A" strokeWidth="0.8" opacity="0.5" />
                <path d="M 170 44 Q 175 42 178 50" fill="none" stroke="#C8773A" strokeWidth="0.8" opacity="0.5" />

                {/* === MEASUREMENT ANNOTATIONS === */}

                {/* Top dashed reference line (big toe) */}
                <line x1="22" y1="34" x2="62" y2="34" stroke="#C8773A" strokeWidth="0.9" strokeDasharray="3,3" />
                {/* Bottom dashed reference line (heel) */}
                <line x1="22" y1="282" x2="64" y2="282" stroke="#C8773A" strokeWidth="0.9" strokeDasharray="3,3" />

                {/* Vertical length arrow */}
                <line x1="32" y1="38" x2="32" y2="278" stroke="#C8773A" strokeWidth="1.4" />
                <polygon points="32,34 27,46 37,46" fill="#C8773A" />
                <polygon points="32,282 27,270 37,270" fill="#C8773A" />

                {/* Length label */}
                <text x="18" y="155" fill="#C8773A" fontSize="8" fontFamily="system-ui" fontWeight="700" letterSpacing="0.8" writingMode="vertical-rl" textAnchor="middle" transform="rotate(180, 18, 158)">FOOT LENGTH</text>

                {/* Callout dot + label: big toe */}
                <circle cx="88" cy="38" r="2.5" fill="#C8773A" />
                <line x1="88" y1="35" x2="108" y2="22" stroke="#8A8880" strokeWidth="0.8" />
                <text x="110" y="20" fill="#8A8880" fontSize="7.5" fontFamily="system-ui">big toe</text>

                {/* Callout dot + label: heel */}
                <circle cx="88" cy="284" r="2.5" fill="#C8773A" />
                <line x1="95" y1="284" x2="115" y2="296" stroke="#8A8880" strokeWidth="0.8" />
                <text x="117" y="299" fill="#8A8880" fontSize="7.5" fontFamily="system-ui">heel</text>

                {/* Width arrow at bottom */}
                <line x1="54" y1="314" x2="168" y2="314" stroke="#8A8880" strokeWidth="1.1" />
                <polygon points="54,314 64,310 64,318" fill="#8A8880" />
                <polygon points="168,314 158,310 158,318" fill="#8A8880" />
                <text x="88" y="328" fill="#8A8880" fontSize="8" fontFamily="system-ui" letterSpacing="0.8">WIDTH</text>
              </svg>

              <p className="text-brand-text-muted text-[10px] tracking-[0.2em] uppercase mt-6 text-center">
                Measure heel to longest toe
              </p>
            </div>

            {/* Steps */}
            <div className="bg-brand-surface p-8 md:p-10">
              <h3 className="font-display font-bold uppercase text-brand-text text-xl mb-8 tracking-tight">
                Step-by-Step
              </h3>
              <ol className="space-y-6">
                {[
                  { n: '01', title: 'Prepare a sheet of paper', body: 'Place a blank A4 sheet on a hard floor against a wall.' },
                  { n: '02', title: 'Trace your foot', body: 'Stand on the paper with your heel touching the wall. Trace around your foot with a pen held vertically.' },
                  { n: '03', title: 'Measure the length', body: 'Using a ruler, measure from the heel mark to the tip of your longest toe in centimetres.' },
                  { n: '04', title: 'Match to the chart', body: 'Find your measurement in the foot length (cm) column below to get your India size.' },
                ].map((step) => (
                  <li key={step.n} className="flex gap-5">
                    <span className="font-display font-bold text-brand-gold text-xl leading-none flex-shrink-0 w-8">
                      {step.n}
                    </span>
                    <div>
                      <p className="text-brand-text text-sm font-medium mb-1">{step.title}</p>
                      <p className="text-brand-text-muted text-xs leading-relaxed font-light">{step.body}</p>
                    </div>
                  </li>
                ))}
              </ol>
            </div>
          </div>

          {/* Tips row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-px bg-brand-border">
            {TIPS.map((tip) => (
              <div key={tip.title} className="bg-brand-bg p-6">
                <div className="text-2xl mb-4">{tip.icon}</div>
                <h3 className="text-brand-text text-sm font-medium mb-2">{tip.title}</h3>
                <p className="text-brand-text-muted text-xs leading-relaxed font-light">{tip.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Men's */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="divider-gold" />
            <h2 className="font-display font-bold uppercase text-brand-text tracking-tight text-2xl">
              Men&apos;s Sizes
            </h2>
          </div>
          <div className="border border-brand-border">
            <SizeTable rows={MENS_SIZES} />
          </div>
        </div>

        {/* Women's */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="divider-gold" />
            <h2 className="font-display font-bold uppercase text-brand-text tracking-tight text-2xl">
              Women&apos;s Sizes
            </h2>
          </div>
          <div className="border border-brand-border">
            <SizeTable rows={WOMENS_SIZES} />
          </div>
        </div>

        {/* Kids' */}
        <div>
          <div className="flex items-center gap-4 mb-6">
            <span className="divider-gold" />
            <h2 className="font-display font-bold uppercase text-brand-text tracking-tight text-2xl">
              Kids&apos; Sizes
            </h2>
          </div>
          <div className="border border-brand-border">
            <SizeTable rows={KIDS_SIZES} />
          </div>
          <p className="text-brand-text-muted text-xs mt-3 font-light">
            C = Child · Y = Youth (toddler to big kids sizing)
          </p>
        </div>

        {/* Still unsure CTA */}
        <div className="border border-brand-border p-8 md:p-12 text-center">
          <p className="text-[10px] font-medium tracking-[0.4em] uppercase text-brand-gold mb-3">
            Still unsure?
          </p>
          <h3 className="font-display font-bold uppercase text-brand-text text-2xl mb-4">
            We&apos;re here to help
          </h3>
          <p className="text-brand-text-muted text-sm font-light mb-6 max-w-sm mx-auto">
            Our team is available to help you find the right fit. Reach out before you order.
          </p>
          <a
            href="mailto:support@footwayindia.com"
            className="inline-flex items-center gap-2 border border-brand-gold text-brand-gold px-6 py-3 text-[11px] font-medium tracking-[0.2em] uppercase hover:bg-brand-gold hover:text-brand-bg transition-all duration-300"
          >
            Contact Support
          </a>
        </div>

      </div>
    </>
  );
}
