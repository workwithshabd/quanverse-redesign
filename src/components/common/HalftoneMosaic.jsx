import React from 'react';
import { HALFTONE_ILLUSTRATIONS, HALFTONE_PALETTE } from './halftoneIllustrationsData';

/**
 * HalftoneMosaic
 * Renders authentic vintage green screen-print engravings composed of thousands
 * of mathematically placed, luminance-scaled halftone dots.
 *
 * Palette:
 * - Background: #07110D
 * - Deep Green: #163A2A
 * - Emerald:    #276447
 * - Muted Sage: #748D78
 * - Lime Green: #D5F36A
 */

const SUBJECT_METADATA = {
  architecture: {
    title: 'Classical Pediment & Colonnade',
    figure: 'FIG. 01',
    plate: 'CURRICULUM BLUEPRINT',
    desc: 'Structured Corinthian architectural proportions & fluted foundation'
  },
  compass: {
    title: 'Vitruvian Caliper & Quadrant',
    figure: 'FIG. 02',
    plate: 'PACING CALIBRATION',
    desc: 'Analytical drafting instrument & Vitruvian harmonic circle'
  },
  optics: {
    title: 'Prism Dispersion & Wavefronts',
    figure: 'FIG. 03',
    plate: 'NEURAL DECOMPOSITION',
    desc: 'Refracted beam dispersion & Huygens wave interference field'
  },
  geometry: {
    title: 'Celestial Astrolabe & Polyhedra',
    figure: 'FIG. 04',
    plate: 'DIAGNOSTIC RADAR',
    desc: 'Armillary coordinate sphere & Kepler nested icosahedron'
  }
};

export default function HalftoneMosaic({
  subject = 'architecture',
  variant = 'plate', // 'plate' | 'watermark' | 'bare'
  className = '',
  style = {},
  showMetadata = true,
  aspectRatio,
  compact = false,
  glow = false
}) {
  const ill = HALFTONE_ILLUSTRATIONS[subject] || HALFTONE_ILLUSTRATIONS.architecture;
  const meta = SUBJECT_METADATA[subject] || SUBJECT_METADATA.architecture;
  const resolvedAspectRatio = aspectRatio || ill.aspectRatio || '360/260';

  if (variant === 'bare') {
    return (
      <svg
        viewBox={ill.viewBox}
        className={`halftone-svg halftone-bare ${className}`}
        style={{
          width: '100%',
          height: 'auto',
          aspectRatio: resolvedAspectRatio,
          display: 'block',
          pointerEvents: 'none',
          ...style
        }}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d={ill.paths.deepGreen} fill={HALFTONE_PALETTE.deepGreen} />
        <path d={ill.paths.emerald} fill={HALFTONE_PALETTE.emerald} />
        <path d={ill.paths.sage} fill={HALFTONE_PALETTE.sage} />
        <path d={ill.paths.lime} fill={HALFTONE_PALETTE.lime} />
      </svg>
    );
  }

  if (variant === 'watermark') {
    return (
      <div
        className={`halftone-watermark-wrapper ${className}`}
        style={{
          position: 'absolute',
          pointerEvents: 'none',
          userSelect: 'none',
          zIndex: 0,
          opacity: 0.85,
          ...style
        }}
        aria-hidden="true"
      >
        <svg
          viewBox={ill.viewBox}
          className="halftone-svg-watermark"
          style={{
            width: '100%',
            height: '100%',
            display: 'block'
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d={ill.paths.deepGreen} fill={HALFTONE_PALETTE.deepGreen} />
          <path d={ill.paths.emerald} fill={HALFTONE_PALETTE.emerald} />
          <path d={ill.paths.sage} fill={HALFTONE_PALETTE.sage} opacity="0.9" />
          <path d={ill.paths.lime} fill={HALFTONE_PALETTE.lime} opacity="0.85" />
        </svg>
      </div>
    );
  }

  // Default: 'plate' with registration crosshairs and vintage engraving framing
  return (
    <figure
      className={`halftone-mosaic-plate ${compact ? 'halftone-compact' : ''} ${glow ? 'halftone-glow' : ''} ${className}`}
      style={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        background: HALFTONE_PALETTE.bg,
        border: '1px solid rgba(39, 100, 71, 0.45)',
        boxShadow: 'inset 0 0 16px rgba(7, 17, 13, 0.8), 0 3px 14px rgba(0, 0, 0, 0.3)',
        overflow: 'hidden',
        ...style
      }}
      aria-label={`${meta.title} - Halftone Screen Print`}
    >
      {/* Registration Crosshairs & Plate Header */}
      {showMetadata && (
        <div
          className="halftone-plate-header font-mono"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: compact ? '0.22rem 0.55rem' : '0.45rem 0.75rem',
            borderBottom: '1px solid rgba(39, 100, 71, 0.35)',
            background: 'rgba(22, 58, 42, 0.35)',
            fontSize: compact ? '9px' : '10px',
            lineHeight: 1.2,
            minHeight: compact ? '22px' : '28px',
            maxHeight: compact ? '22px' : '28px',
            letterSpacing: '0.07em',
            color: '#748D78',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <div className="flex items-center gap-1.5 truncate">
            <span style={{ color: '#D5F36A' }}>+</span>
            <span className="font-semibold text-main">{meta.figure}</span>
            <span style={{ opacity: 0.4 }}>/</span>
            <span className="truncate">{meta.plate}</span>
          </div>
          <div className="flex items-center gap-1 text-[8.5px] uppercase tracking-wider shrink-0" style={{ color: '#276447' }}>
            <span>4-TONE</span>
            <span>•</span>
            <span>{ill.counts.total.toLocaleString()} DOTS</span>
            <span style={{ color: '#D5F36A', marginLeft: '2px' }}>+</span>
          </div>
        </div>
      )}

      {/* Main Halftone Mosaic SVG Canvas */}
      <div
        className="halftone-svg-container"
        style={{
          position: 'relative',
          width: '100%',
          flex: '1 1 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          background: `radial-gradient(ellipse at 50% 50%, rgba(22, 58, 42, 0.22) 0%, ${HALFTONE_PALETTE.bg} 80%)`
        }}
      >
        {/* Corner Registration Crosshairs */}
        <div
          style={{
            position: 'absolute',
            top: compact ? '3px' : '6px',
            left: compact ? '3px' : '6px',
            color: 'rgba(213, 243, 106, 0.35)',
            fontFamily: 'monospace',
            fontSize: compact ? '9px' : '11px',
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          +
        </div>
        <div
          style={{
            position: 'absolute',
            top: compact ? '3px' : '6px',
            right: compact ? '3px' : '6px',
            color: 'rgba(213, 243, 106, 0.35)',
            fontFamily: 'monospace',
            fontSize: compact ? '9px' : '11px',
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          +
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: compact ? '3px' : '6px',
            left: compact ? '3px' : '6px',
            color: 'rgba(213, 243, 106, 0.35)',
            fontFamily: 'monospace',
            fontSize: compact ? '9px' : '11px',
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          +
        </div>
        <div
          style={{
            position: 'absolute',
            bottom: compact ? '3px' : '6px',
            right: compact ? '3px' : '6px',
            color: 'rgba(213, 243, 106, 0.35)',
            fontFamily: 'monospace',
            fontSize: compact ? '9px' : '11px',
            lineHeight: 1,
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          +
        </div>

        <svg
          viewBox={ill.viewBox}
          className="halftone-screen-svg"
          style={{
            width: '100%',
            height: '100%',
            maxHeight: '100%',
            aspectRatio: resolvedAspectRatio,
            display: 'block',
            pointerEvents: 'none',
            transition: 'transform 0.35s ease'
          }}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Deep Green Shadows (#163A2A) */}
          <path d={ill.paths.deepGreen} fill={HALFTONE_PALETTE.deepGreen} />

          {/* Emerald Midtones (#276447) */}
          <path d={ill.paths.emerald} fill={HALFTONE_PALETTE.emerald} />

          {/* Muted Sage Light Midtones (#748D78) */}
          <path d={ill.paths.sage} fill={HALFTONE_PALETTE.sage} />

          {/* Lime Green Highlights (#D5F36A) */}
          <path
            d={ill.paths.lime}
            fill={HALFTONE_PALETTE.lime}
            className="halftone-lime-highlights"
          />
        </svg>
      </div>

      {/* Plate Footer Legend */}
      {showMetadata && (
        <figcaption
          className="halftone-plate-footer font-sans"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: compact ? '0.22rem 0.55rem' : '0.4rem 0.75rem',
            borderTop: '1px solid rgba(39, 100, 71, 0.3)',
            background: 'rgba(7, 17, 13, 0.85)',
            fontSize: compact ? '9.5px' : '11px',
            lineHeight: 1.2,
            minHeight: compact ? '20px' : '24px',
            maxHeight: compact ? '20px' : '24px',
            color: '#B5C0B8',
            gap: '0.5rem',
            whiteSpace: 'nowrap',
            overflow: 'hidden'
          }}
        >
          <span className="font-mono text-[9px] text-muted truncate">
            {meta.title} — {meta.desc}
          </span>
          <div
            className="palette-swatch-strip shrink-0 flex items-center gap-1"
            title="Halftone Screen Palette: #07110D | #163A2A | #276447 | #748D78 | #D5F36A"
          >
            <span style={{ width: compact ? '4px' : '6px', height: compact ? '4px' : '6px', borderRadius: '50%', background: HALFTONE_PALETTE.deepGreen, display: 'inline-block' }} />
            <span style={{ width: compact ? '4px' : '6px', height: compact ? '4px' : '6px', borderRadius: '50%', background: HALFTONE_PALETTE.emerald, display: 'inline-block' }} />
            <span style={{ width: compact ? '4px' : '6px', height: compact ? '4px' : '6px', borderRadius: '50%', background: HALFTONE_PALETTE.sage, display: 'inline-block' }} />
            <span style={{ width: compact ? '4px' : '6px', height: compact ? '4px' : '6px', borderRadius: '50%', background: HALFTONE_PALETTE.lime, display: 'inline-block' }} />
          </div>
        </figcaption>
      )}
    </figure>
  );
}
