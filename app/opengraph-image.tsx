import { ImageResponse } from 'next/og';

export const runtime = 'edge';
export const alt = 'Footway India — Premium Footwear';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: '#0A0A0A',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Gold border frame */}
        <div
          style={{
            position: 'absolute',
            inset: 24,
            border: '1px solid rgba(201,169,110,0.3)',
            display: 'flex',
          }}
        />

        {/* Corner accents */}
        {[
          { top: 24, left: 24 },
          { top: 24, right: 24 },
          { bottom: 24, left: 24 },
          { bottom: 24, right: 24 },
        ].map((pos, i) => (
          <div
            key={i}
            style={{
              position: 'absolute',
              width: 20,
              height: 20,
              borderColor: '#C9A96E',
              borderStyle: 'solid',
              borderWidth: 0,
              ...(pos.top !== undefined && pos.left !== undefined
                ? { borderTopWidth: 2, borderLeftWidth: 2, top: pos.top, left: pos.left }
                : pos.top !== undefined
                ? { borderTopWidth: 2, borderRightWidth: 2, top: pos.top, right: (pos as { right: number }).right }
                : pos.left !== undefined
                ? { borderBottomWidth: 2, borderLeftWidth: 2, bottom: (pos as { bottom: number }).bottom, left: pos.left }
                : { borderBottomWidth: 2, borderRightWidth: 2, bottom: (pos as { bottom: number }).bottom, right: (pos as { right: number }).right }),
              display: 'flex',
            }}
          />
        ))}

        {/* Gold divider above */}
        <div
          style={{
            width: 48,
            height: 1,
            background: '#C9A96E',
            marginBottom: 24,
            display: 'flex',
          }}
        />

        {/* FOOTWAY */}
        <div
          style={{
            fontSize: 96,
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#F5F0E8',
            lineHeight: 1,
            display: 'flex',
            textTransform: 'uppercase',
          }}
        >
          FOOTWAY
        </div>

        {/* INDIA */}
        <div
          style={{
            fontSize: 48,
            fontWeight: 700,
            letterSpacing: '0.5em',
            color: '#C9A96E',
            marginTop: 8,
            display: 'flex',
            textTransform: 'uppercase',
          }}
        >
          INDIA
        </div>

        {/* Gold divider below */}
        <div
          style={{
            width: 48,
            height: 1,
            background: '#C9A96E',
            marginTop: 24,
            marginBottom: 24,
            display: 'flex',
          }}
        />

        {/* Tagline */}
        <div
          style={{
            fontSize: 18,
            fontWeight: 300,
            letterSpacing: '0.25em',
            color: 'rgba(245,240,232,0.5)',
            textTransform: 'uppercase',
            display: 'flex',
          }}
        >
          PREMIUM FOOTWEAR
        </div>
      </div>
    ),
    { ...size },
  );
}
