import React, { useState } from 'react';
import { GarmentItem, FittingCalibration } from '../../types/wardrobe';
import { RotateCw, Sun, Moon, Sparkles } from 'lucide-react';

interface Mannequin3DProps {
  top: GarmentItem | null;
  bottom: GarmentItem | null;
  shoes: GarmentItem | null;
  isShaking?: boolean;
  calibration: FittingCalibration;
  onUpdateCalibration: (updated: FittingCalibration) => void;
}

export const Mannequin3D: React.FC<Mannequin3DProps> = ({
  top,
  bottom,
  shoes,
  isShaking,
  calibration,
  onUpdateCalibration
}) => {
  const isCustomPhoto = calibration.bodyType === 'custom-photo' && !!calibration.userPhotoUrl;
  const isPresetPhoto = calibration.bodyType.startsWith('preset-');

  const presetPhotos: Record<string, string> = {
    'preset-lean': 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=700&q=80',
    'preset-athletic': 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=700&q=80',
    'preset-relaxed': 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=700&q=80'
  };

  const activePhotoUrl = isCustomPhoto 
    ? calibration.userPhotoUrl 
    : (isPresetPhoto ? presetPhotos[calibration.bodyType] : null);

  // Turntable angle (degrees)
  const angle = calibration.turntableAngle || 0;
  // Lighting mood
  const lighting = calibration.lightingMood || 'studio';

  // Rotate Turntable
  const cycleAngle = (newAngle: number) => {
    onUpdateCalibration({
      ...calibration,
      turntableAngle: newAngle
    });
  };

  const cycleLighting = () => {
    const moods: FittingCalibration['lightingMood'][] = ['studio', 'chiaroscuro', 'neon90s'];
    const nextIdx = (moods.indexOf(lighting) + 1) % moods.length;
    onUpdateCalibration({
      ...calibration,
      lightingMood: moods[nextIdx]
    });
  };

  return (
    <div className={`relative w-full h-full flex flex-col items-center justify-center select-none overflow-hidden ${isShaking ? 'animate-bounce' : ''}`}>
      
      {/* 3D STUDIO LIGHTING BACKGROUND */}
      <div 
        className="absolute inset-0 transition-colors duration-500 pointer-events-none"
        style={{
          background: lighting === 'chiaroscuro'
            ? 'radial-gradient(circle at 65% 25%, #2a241e 0%, #11100e 70%, #080706 100%)'
            : (lighting === 'neon90s'
              ? 'radial-gradient(circle at 50% 30%, #0d242b 0%, #0a111a 60%, #05080c 100%)'
              : 'radial-gradient(circle at 50% 20%, #252e3d 0%, #161c26 60%, #0e1218 100%)')
        }}
      />

      {/* 3D PERSPECTIVE STUDIO FLOOR & REFLECTION GRID */}
      <div 
        className="absolute inset-x-0 bottom-0 h-44 opacity-25 pointer-events-none"
        style={{
          backgroundImage: 'linear-gradient(to right, rgba(0,255,200,0.3) 1px, transparent 1px), linear-gradient(to bottom, rgba(0,255,200,0.3) 1px, transparent 1px)',
          backgroundSize: '28px 18px',
          transform: 'perspective(300px) rotateX(65deg) scale(1.4)',
          transformOrigin: 'bottom center'
        }}
      />

      {/* 3D TURNTABLE SHADOW DISC */}
      <div 
        className="absolute bottom-5 w-56 h-12 rounded-full opacity-60 pointer-events-none blur-sm"
        style={{
          background: lighting === 'neon90s'
            ? 'radial-gradient(ellipse at center, rgba(0,255,200,0.4) 0%, rgba(255,0,128,0.2) 50%, transparent 75%)'
            : 'radial-gradient(ellipse at center, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, transparent 80%)'
        }}
      />

      {/* PHOTO OF USER'S REAL BODY / SILHOUETTE PRESET */}
      {activePhotoUrl && (
        <div className="absolute inset-0 flex items-center justify-center p-2 z-0">
          <img
            src={activePhotoUrl}
            alt="User Body Fitting Mirror"
            className="w-auto h-full max-h-[460px] object-contain rounded drop-shadow-2xl border border-cyan-500/40 filter brightness-95 contrast-105"
            style={{
              opacity: calibration.opacity < 1 ? 0.9 : 1
            }}
          />
          <div className="absolute top-2 right-2 bg-black/85 text-cyan-400 font-mono text-[9px] px-1.5 py-0.5 border border-cyan-500">
            PHOTO CALIBRATED • 1:1 SCALE
          </div>
        </div>
      )}

      {/* 3D VIEWPORT CONTAINER WITH CALIBRATION TRANSFORMS */}
      <div 
        className="relative w-full h-full flex items-center justify-center z-10 transition-transform duration-200"
        style={{
          transform: `scale(${calibration.scale}) translate(${calibration.offsetX}px, ${calibration.offsetY}px)`,
          opacity: calibration.opacity
        }}
      >
        <svg
          viewBox="0 0 320 540"
          className="w-full h-full max-h-[500px] transition-transform duration-300"
          preserveAspectRatio="xMidYMid meet"
          style={{
            transform: `perspective(600px) rotateY(${angle}deg)`,
            transformOrigin: 'center center'
          }}
        >
          <defs>
            {/* 3D STUDIO LIGHTING FILTERS & GRADIENTS */}
            <filter id="studio3d-shadow" x="-20%" y="-20%" width="150%" height="150%">
              <feDropShadow dx={angle > 0 ? "8" : (angle < 0 ? "-8" : "3")} dy="8" stdDeviation="6" floodOpacity="0.55" />
            </filter>

            {/* Realistic Anatomical Shading Gradients */}
            <radialGradient id="torso3d-grad" cx="45%" cy="35%" r="65%">
              <stop offset="0%" stopColor="#f7d9be" />
              <stop offset="50%" stopColor="#dfb28b" />
              <stop offset="85%" stopColor="#b6835a" />
              <stop offset="100%" stopColor="#8d5b35" />
            </radialGradient>

            <linearGradient id="pectoral3d-light" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffeedd" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#8d5b35" stopOpacity="0.5" />
            </linearGradient>

            <radialGradient id="hair3d-grad" cx="40%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#3d291f" />
              <stop offset="60%" stopColor="#1e130d" />
              <stop offset="100%" stopColor="#0c0704" />
            </radialGradient>

            {/* Metallic / Texture overlays */}
            <linearGradient id="blazer-3d-sheen" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#96784d" />
              <stop offset="35%" stopColor="#bfa278" />
              <stop offset="70%" stopColor="#d8bc93" />
              <stop offset="100%" stopColor="#87693d" />
            </linearGradient>

            <linearGradient id="denim-3d-wash" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#121e33" />
              <stop offset="40%" stopColor="#1d2e4f" />
              <stop offset="70%" stopColor="#2c4475" />
              <stop offset="100%" stopColor="#10192b" />
            </linearGradient>

            <linearGradient id="leather-3d-sheen" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.3" />
              <stop offset="50%" stopColor="#000000" stopOpacity="0.1" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.6" />
            </linearGradient>
          </defs>

          {/* 1. SCULPTED 3D MANNEQUIN ANATOMY (Only rendered if no photo, or if ghost guide is on) */}
          {(!activePhotoUrl || calibration.showGhostOutline) && (
            <g id="sculpted-3d-mannequin" opacity={activePhotoUrl ? 0.35 : 0.95} filter="url(#studio3d-shadow)">
              
              {/* Head & Neck Sculpting */}
              <path d="M 148 95 L 148 128 C 148 134 172 134 172 128 L 172 95 Z" fill="url(#torso3d-grad)" />
              {/* Sternocleidomastoid Neck Muscle lines */}
              <path d="M 152 98 Q 156 115 158 126" stroke="#9e6e48" strokeWidth="1.2" fill="none" opacity="0.6" />
              <path d="M 168 98 Q 164 115 162 126" stroke="#9e6e48" strokeWidth="1.2" fill="none" opacity="0.6" />

              {/* Chiseled Jaw & Facial Planes */}
              <path d="M 144 54 Q 160 36 176 54 Q 181 82 160 98 Q 139 82 144 54 Z" fill="url(#torso3d-grad)" />
              {/* Cheekbone Specular Highlight */}
              <ellipse cx="152" cy="70" rx="3.5" ry="1.5" fill="#fff" opacity="0.4" />
              <ellipse cx="168" cy="70" rx="3.5" ry="1.5" fill="#fff" opacity="0.25" />

              {/* 90s Leonardo / River Phoenix Middle Part Curtain Hair */}
              <path d="M 139 53 C 142 32, 178 32, 181 53 C 178 42, 162 46, 160 62 C 158 46, 142 42, 139 53 Z" fill="url(#hair3d-grad)" />
              <path d="M 137 51 C 130 64 135 79 141 83 C 139 72 142 62 146 56 Z" fill="url(#hair3d-grad)" />
              <path d="M 183 51 C 190 64 185 79 179 83 C 181 72 178 62 174 56 Z" fill="url(#hair3d-grad)" />

              {/* 90s Wireframe Oval Sunglasses */}
              <g transform="translate(146, 63)">
                <ellipse cx="6" cy="4" rx="6.5" ry="4" fill="#0d1117" stroke="#d4af37" strokeWidth="0.9" />
                <ellipse cx="22" cy="4" rx="6.5" ry="4" fill="#0d1117" stroke="#d4af37" strokeWidth="0.9" />
                <line x1="12.5" y1="4" x2="15.5" y2="4" stroke="#d4af37" strokeWidth="1.2" />
                <path d="M 4 2 Q 8 3 7 5" stroke="#fff" strokeWidth="0.8" opacity="0.6" fill="none" />
                <path d="M 20 2 Q 24 3 23 5" stroke="#fff" strokeWidth="0.8" opacity="0.6" fill="none" />
              </g>

              {/* Clavicle / Collarbone Bones */}
              <path d="M 132 133 Q 146 138 160 131 Q 174 138 188 133" stroke="#8d5b35" strokeWidth="1.8" fill="none" opacity="0.7" />
              <path d="M 134 132 Q 146 137 159 130 Q 174 137 186 132" stroke="#fff" strokeWidth="0.8" fill="none" opacity="0.5" />

              {/* Broad Athletic Shoulders (Deltoids) & Torso */}
              <path d="M 110 136 L 148 126 L 172 126 L 210 136 L 220 188 L 206 280 L 196 280 L 204 195 L 182 186 L 138 186 L 116 195 L 124 280 L 114 280 L 100 188 Z" fill="url(#torso3d-grad)" />

              {/* Pectoral Muscle Contours */}
              <path d="M 132 152 Q 146 172 158 168 Q 158 142 142 142 Z" fill="url(#pectoral3d-light)" opacity="0.4" />
              <path d="M 188 152 Q 174 172 162 168 Q 162 142 178 142 Z" fill="url(#pectoral3d-light)" opacity="0.4" />
              <path d="M 134 165 Q 146 176 158 171" stroke="#8d5b35" strokeWidth="1.5" fill="none" opacity="0.6" />
              <path d="M 186 165 Q 174 176 162 171" stroke="#8d5b35" strokeWidth="1.5" fill="none" opacity="0.6" />

              {/* Ribcage & Abdominal Definition */}
              <line x1="160" y1="172" x2="160" y2="230" stroke="#8d5b35" strokeWidth="1.2" opacity="0.5" />
              <path d="M 148 188 Q 160 193 172 188" stroke="#8d5b35" strokeWidth="1" fill="none" opacity="0.4" />
              <path d="M 150 206 Q 160 211 170 206" stroke="#8d5b35" strokeWidth="1" fill="none" opacity="0.4" />

              {/* Hands & Wrists */}
              <ellipse cx="118" cy="290" rx="6" ry="11" fill="url(#torso3d-grad)" />
              <ellipse cx="202" cy="290" rx="6" ry="11" fill="url(#torso3d-grad)" />

              {/* Athletic Legs & Thigh Base */}
              <path d="M 132 250 L 130 450 L 144 450 L 153 280 L 167 280 L 176 450 L 190 450 L 188 250 Z" fill="url(#torso3d-grad)" />
              <path d="M 138 310 Q 133 360 137 400" stroke="#8d5b35" strokeWidth="1.2" fill="none" opacity="0.4" />
              <path d="M 182 310 Q 187 360 183 400" stroke="#8d5b35" strokeWidth="1.2" fill="none" opacity="0.4" />
            </g>
          )}

          {/* 2. 3D BOTTOMS LAYER */}
          {bottom && (
            <g id="layer-3d-bottoms" filter="url(#studio3d-shadow)">
              {bottom.customImageUrl ? (
                <image
                  href={bottom.customImageUrl}
                  x="110"
                  y="228"
                  width="100"
                  height="240"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <g>
                  {/* Base Trouser Silhouette */}
                  <path 
                    d={bottom.silhouetteCut === 'wide' || bottom.silhouetteCut === 'baggy'
                      ? "M 124 230 C 145 228 175 228 196 230 L 206 340 L 198 462 L 164 462 L 160 305 L 156 462 L 122 462 L 114 340 Z"
                      : (bottom.silhouetteCut === 'drop-crotch'
                        ? "M 125 230 L 195 230 L 206 330 L 192 460 L 168 460 L 160 375 L 152 460 L 128 460 L 114 330 Z"
                        : "M 126 230 C 145 228 175 228 194 230 L 200 335 L 192 458 L 166 458 L 160 300 L 154 458 L 128 458 L 120 335 Z")}
                    fill={bottom.renderKey === 'selvedge' ? 'url(#denim-3d-wash)' : bottom.baseColor} 
                    stroke={bottom.accentColor} 
                    strokeWidth="1.5" 
                  />

                  {/* 3D Crease & Depth Shading */}
                  <line x1="142" y1="234" x2="137" y2="455" stroke={bottom.accentColor} strokeWidth="1.5" strokeDasharray="4,1" opacity="0.75" />
                  <line x1="178" y1="234" x2="183" y2="455" stroke={bottom.accentColor} strokeWidth="1.5" strokeDasharray="4,1" opacity="0.75" />
                  
                  {/* Leather Belt & Buckle */}
                  <path d="M 126 230 L 194 230 L 194 238 L 126 238 Z" fill="#1b120c" />
                  <rect x="156" y="229" width="8" height="10" fill="#d4af37" stroke="#997a15" strokeWidth="1" />

                  {/* Selvedge Cuffs if raw denim */}
                  {bottom.renderKey === 'selvedge' && (
                    <g>
                      <rect x="126" y="446" width="38" height="12" rx="1" fill="#e9ddc7" stroke="#1d2e4f" strokeWidth="1" />
                      <rect x="156" y="446" width="38" height="12" rx="1" fill="#e9ddc7" stroke="#1d2e4f" strokeWidth="1" />
                      <line x1="163" y1="446" x2="163" y2="458" stroke="#d32f2f" strokeWidth="1.5" />
                      <line x1="192" y1="446" x2="192" y2="458" stroke="#d32f2f" strokeWidth="1.5" />
                    </g>
                  )}

                  {/* Carpenter Hammer Loop */}
                  {bottom.renderKey === 'carpenter' && (
                    <path d="M 204 310 Q 212 325 202 340" fill="none" stroke={bottom.accentColor} strokeWidth="2.5" />
                  )}
                </g>
              )}
            </g>
          )}

          {/* 3. 3D TOPS LAYER */}
          {top && (
            <g id="layer-3d-tops" filter="url(#studio3d-shadow)">
              {top.customImageUrl ? (
                <image
                  href={top.customImageUrl}
                  x="85"
                  y="120"
                  width="150"
                  height="165"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <g>
                  {/* Blazer / Suiting */}
                  {top.renderKey === 'blazer' && (
                    <g>
                      <polygon points="152,126 168,126 164,175 156,175" fill="#f8f9fa" />
                      <polygon points="158,135 162,135 164,185 160,195 156,185" fill="#8b0000" />
                      <path d="M 148 126 L 102 136 L 94 210 L 114 275 L 132 278 L 140 280 L 180 280 L 188 278 L 206 275 L 226 210 L 218 136 L 172 126 Z" fill="url(#blazer-3d-sheen)" stroke={top.accentColor} strokeWidth="1.5" />
                      <polygon points="148,126 130,175 148,172 140,210 160,240 180,210 172,172 190,175 172,126 160,150" fill={top.baseColor} stroke={top.accentColor} strokeWidth="1.5" />
                      <circle cx="152" cy="225" r="3.2" fill="#3a2717" stroke="#d4af37" strokeWidth="0.8" />
                      <circle cx="168" cy="225" r="3.2" fill="#3a2717" stroke="#d4af37" strokeWidth="0.8" />
                      <circle cx="152" cy="245" r="3.2" fill="#3a2717" stroke="#d4af37" strokeWidth="0.8" />
                      <circle cx="168" cy="245" r="3.2" fill="#3a2717" stroke="#d4af37" strokeWidth="0.8" />
                      <rect x="114" y="246" width="22" height="4" fill={top.accentColor} rx="1" />
                      <rect x="184" y="246" width="22" height="4" fill={top.accentColor} rx="1" />
                    </g>
                  )}

                  {/* Hoodie */}
                  {top.renderKey === 'hoodie' && (
                    <g>
                      <path d="M 148 128 L 96 142 L 86 215 L 108 220 L 118 185 L 118 255 L 202 255 L 202 185 L 212 220 L 234 215 L 224 142 L 172 128 Z" fill={top.baseColor} stroke={top.accentColor} strokeWidth="1.5" />
                      <path d="M 142 124 Q 160 148 178 124 Q 192 110 160 106 Q 128 110 142 124 Z" fill={top.baseColor} stroke={top.accentColor} strokeWidth="1.5" />
                      <path d="M 154 138 Q 152 170 150 185" stroke="#ffffff" strokeWidth="2" fill="none" />
                      <path d="M 166 138 Q 168 170 170 185" stroke="#ffffff" strokeWidth="2" fill="none" />
                      <path d="M 132 215 L 188 215 L 196 250 L 124 250 Z" fill={top.baseColor} stroke={top.accentColor} strokeWidth="1.2" />
                      <rect x="118" y="250" width="84" height="7" fill={top.accentColor} opacity="0.4" />
                    </g>
                  )}

                  {/* Default Top Shape for Knitwear / Shirts / Jackets */}
                  {top.renderKey !== 'blazer' && top.renderKey !== 'hoodie' && (
                    <g>
                      <path d="M 148 126 L 104 138 L 96 195 L 116 200 L 122 168 L 124 246 L 196 246 L 198 168 L 204 200 L 224 195 L 216 138 L 172 126 Z" fill={top.baseColor} stroke={top.accentColor} strokeWidth="1.5" />
                      {/* Collar Roll */}
                      <polygon points="146,126 136,145 156,140 160,148 164,140 184,145 174,126 160,132" fill={top.baseColor} stroke={top.accentColor} strokeWidth="1.2" />
                      <line x1="160" y1="135" x2="160" y2="246" stroke="#fff" strokeWidth="1" strokeDasharray="3,2" opacity="0.7" />
                    </g>
                  )}
                </g>
              )}
            </g>
          )}

          {/* 4. 3D FOOTWEAR LAYER */}
          {shoes && (
            <g id="layer-3d-shoes" filter="url(#studio3d-shadow)">
              {shoes.customImageUrl ? (
                <image
                  href={shoes.customImageUrl}
                  x="100"
                  y="445"
                  width="120"
                  height="45"
                  preserveAspectRatio="xMidYMid meet"
                />
              ) : (
                <g>
                  {/* Left Shoe */}
                  <path d="M 123 450 L 146 450 L 149 468 L 145 480 L 115 480 L 118 462 Z" fill={shoes.baseColor} stroke={shoes.accentColor} strokeWidth="1.2" />
                  <rect x="112" y="476" width="35" height="6" rx="1" fill="#111" />
                  <path d="M 125 458 Q 135 464 144 458" stroke={shoes.accentColor} strokeWidth="1.2" fill="none" />

                  {/* Right Shoe */}
                  <path d="M 174 450 L 197 450 L 202 462 L 205 480 L 175 480 L 171 468 Z" fill={shoes.baseColor} stroke={shoes.accentColor} strokeWidth="1.2" />
                  <rect x="172" y="476" width="35" height="6" rx="1" fill="#111" />
                  <path d="M 176 458 Q 186 464 195 458" stroke={shoes.accentColor} strokeWidth="1.2" fill="none" />
                </g>
              )}
            </g>
          )}
        </svg>
      </div>

      {/* 3D TURNTABLE & LIGHTING FLOATING HUD CONTROLLER */}
      <div className="absolute bottom-2 inset-x-4 flex items-center justify-between pointer-events-auto z-30">
        
        {/* Turntable Angle Selector */}
        <div className="bg-black/80 win95-inward p-1 flex items-center gap-1 text-[10px] font-mono border border-cyan-800">
          <span className="text-cyan-400 px-1 font-bold">3D ANGLE:</span>
          <button
            onClick={() => cycleAngle(0)}
            className={`px-1.5 py-0.5 win95-btn ${angle === 0 ? 'bg-[#000080] text-white font-bold' : 'bg-gray-300 text-black'}`}
          >
            0° Front
          </button>
          <button
            onClick={() => cycleAngle(35)}
            className={`px-1.5 py-0.5 win95-btn ${angle === 35 ? 'bg-[#000080] text-white font-bold' : 'bg-gray-300 text-black'}`}
          >
            35° ¾ Turn
          </button>
          <button
            onClick={() => cycleAngle(90)}
            className={`px-1.5 py-0.5 win95-btn ${angle === 90 ? 'bg-[#000080] text-white font-bold' : 'bg-gray-300 text-black'}`}
          >
            90° Profile
          </button>
        </div>

        {/* Lighting Mood Toggle */}
        <button
          onClick={cycleLighting}
          title="Cycle Studio Lighting Mode"
          className="bg-black/80 hover:bg-black text-amber-300 win95-btn p-1.5 text-[10px] font-mono flex items-center gap-1.5 border border-amber-600"
        >
          <Sun size={12} className="text-yellow-400 animate-spin" />
          <span className="capitalize">{lighting} Light</span>
        </button>

      </div>

    </div>
  );
};
