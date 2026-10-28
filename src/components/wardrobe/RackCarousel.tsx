import React from 'react';
import { ChevronLeft, ChevronRight, Shirt, Layers, Sparkles } from 'lucide-react';
import { GarmentItem } from '../../types/wardrobe';

interface RackCarouselProps {
  rackNumber: number;
  rackLabel: string;
  items: GarmentItem[];
  currentIndex: number;
  onNext: () => void;
  onPrev: () => void;
  onSelectIndex: (index: number) => void;
}

export const RackCarousel: React.FC<RackCarouselProps> = ({
  rackNumber,
  rackLabel,
  items,
  currentIndex,
  onNext,
  onPrev,
  onSelectIndex
}) => {
  const currentItem = items[currentIndex] || items[0];

  const getCategoryIcon = () => {
    switch (currentItem.category) {
      case 'top':
        return <Shirt size={26} className="text-white drop-shadow" />;
      case 'bottom':
        return <Layers size={24} className="text-white drop-shadow" />;
      case 'shoes':
        return <span className="text-white text-xl font-bold">👞</span>;
      default:
        return <Sparkles size={24} className="text-white drop-shadow" />;
    }
  };

  const getFormalityBadgeClass = (formality: string) => {
    switch (formality) {
      case 'formal':
        return 'bg-purple-900 text-purple-100 border-purple-700';
      case 'smart-casual':
        return 'bg-blue-900 text-blue-100 border-blue-700';
      case 'streetwear':
        return 'bg-amber-900 text-amber-100 border-amber-700';
      case 'avant-garde':
        return 'bg-gray-900 text-gray-100 border-gray-600';
      default:
        return 'bg-teal-900 text-teal-100 border-teal-700';
    }
  };

  return (
    <div className="bg-[#c0c0c0] win95-box p-2.5 flex flex-col gap-1.5 select-none">
      {/* RACK HEADER BAR */}
      <div className="flex items-center justify-between pb-1.5 border-b border-gray-400">
        <div className="flex items-center gap-2">
          <span className="bg-[#000080] text-white text-[10px] md:text-[11px] font-bold px-1.5 py-0.5">
            RACK 0{rackNumber}
          </span>
          <h3 className="font-bold text-xs uppercase tracking-wide text-gray-900">
            {rackLabel}
          </h3>
        </div>

        <div className="flex items-center gap-2">
          <select
            value={currentIndex}
            onChange={(e) => onSelectIndex(Number(e.target.value))}
            className="text-[10px] bg-white win95-inward px-1 py-0.5 font-mono text-gray-800 cursor-pointer max-w-[140px] md:max-w-[200px] truncate"
          >
            {items.map((it, idx) => (
              <option key={it.id} value={idx}>
                {idx + 1}. {it.name}
              </option>
            ))}
          </select>
          <span className="text-[11px] font-mono text-gray-700 font-bold whitespace-nowrap">
            [{currentIndex + 1}/{items.length}]
          </span>
        </div>
      </div>

      {/* CAROUSEL CONTROLLER */}
      <div className="flex items-center gap-2">
        <button
          onClick={onPrev}
          title="Previous Garment"
          className="w-8 h-18 bg-[#c0c0c0] win95-btn flex items-center justify-center font-bold text-black hover:bg-gray-200 active:scale-95 transition-transform"
        >
          <ChevronLeft size={22} />
        </button>

        {/* GARMENT DETAIL CARD */}
        <div className="flex-1 bg-white win95-inward p-2 md:p-3 flex items-center gap-3 overflow-hidden">
          {/* Swatch & Visual Graphic Badge */}
          <div
            className="w-14 h-14 md:w-16 md:h-16 rounded border-2 border-black flex-shrink-0 flex items-center justify-center shadow-inner relative overflow-hidden"
            style={{ backgroundColor: currentItem.baseColor }}
          >
            {currentItem.customImageUrl ? (
              <img
                src={currentItem.customImageUrl}
                alt={currentItem.name}
                className="w-full h-full object-cover"
              />
            ) : (
              getCategoryIcon()
            )}

            {currentItem.isCustom && (
              <span className="absolute top-0.5 left-0.5 bg-yellow-400 text-black font-mono font-bold text-[8px] px-1 rounded-sm shadow">
                CUSTOM
              </span>
            )}

            <span className={`absolute bottom-0.5 right-0.5 text-[8px] px-1 rounded-sm uppercase font-mono font-bold border ${getFormalityBadgeClass(currentItem.formality)}`}>
              {currentItem.formality}
            </span>
          </div>

          {/* Text Information */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center justify-between gap-1">
              <span className="text-[10px] md:text-xs font-mono text-blue-900 font-bold uppercase tracking-wider truncate">
                {currentItem.brand}
              </span>
              <span className="text-[9px] font-mono text-gray-500 hidden sm:inline">
                {currentItem.silhouetteCut} • {currentItem.fabricTexture}
              </span>
            </div>

            <div className="text-xs md:text-sm font-bold text-gray-900 truncate">
              {currentItem.name}
            </div>

            <div className="text-[11px] text-gray-600 truncate italic">
              Color: <strong>{currentItem.colorName}</strong> • {currentItem.vibe}
            </div>

            <div className="mt-1 flex flex-wrap gap-1">
              {currentItem.tags.slice(0, 4).map((tag) => (
                <span
                  key={tag}
                  className="text-[9px] bg-[#f0eee9] text-gray-700 px-1.5 py-0.2 border border-gray-400 font-mono"
                >
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={onNext}
          title="Next Garment"
          className="w-8 h-18 bg-[#c0c0c0] win95-btn flex items-center justify-center font-bold text-black hover:bg-gray-200 active:scale-95 transition-transform"
        >
          <ChevronRight size={22} />
        </button>
      </div>
    </div>
  );
};
