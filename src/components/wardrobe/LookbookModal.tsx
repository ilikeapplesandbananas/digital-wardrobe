import React from 'react';
import { X, FolderHeart, Trash2, Printer, Check } from 'lucide-react';
import { SavedOutfit } from '../../types/wardrobe';
import { soundFx } from '../../lib/retroAudio';

interface LookbookModalProps {
  isOpen: boolean;
  onClose: () => void;
  savedFits: SavedOutfit[];
  onWearFit: (fit: SavedOutfit) => void;
  onDeleteFit: (id: string) => void;
}

export const LookbookModal: React.FC<LookbookModalProps> = ({
  isOpen,
  onClose,
  savedFits,
  onWearFit,
  onDeleteFit
}) => {
  if (!isOpen) return null;

  const handlePrint = () => {
    soundFx.playClick();
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-[#c0c0c0] win95-box max-w-3xl w-full max-h-[88vh] flex flex-col shadow-2xl my-auto select-none">
        
        {/* MODAL TITLE BAR */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1054a8] to-[#000080] text-white px-2 py-1.5 flex items-center justify-between font-bold text-xs select-none">
          <div className="flex items-center gap-2">
            <FolderHeart size={14} className="text-yellow-300" />
            <span>MY_LOOKBOOK.DAT — ARCHIVED MENSWEAR ENSEMBLES ({savedFits.length})</span>
          </div>
          <button 
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center font-bold text-xs hover:bg-gray-300"
          >
            <X size={12} />
          </button>
        </div>

        {/* SUBHEADER */}
        <div className="bg-[#e4dfd7] border-b border-gray-400 p-2 flex items-center justify-between text-xs font-mono">
          <span className="text-gray-800">
            TOTAL STORED ARCHIVES: <strong>{savedFits.length} ENSEMBLES</strong>
          </span>
          <button
            onClick={handlePrint}
            className="bg-[#c0c0c0] win95-btn px-2 py-1 text-gray-800 flex items-center gap-1.5 hover:bg-gray-200"
          >
            <Printer size={12} />
            <span>Print Lookbook Card</span>
          </button>
        </div>

        {/* CONTENT */}
        <div className="p-3 md:p-4 bg-[#d4d0c8] flex-1 overflow-y-auto win95-inward">
          {savedFits.length === 0 ? (
            <div className="text-center py-16 text-gray-600 font-mono text-xs md:text-sm">
              <FolderHeart size={36} className="mx-auto mb-2 text-gray-400" />
              NO SAVED ENSEMBLES RECORDED IN MEMORY.<br />
              DRESS YOUR 3D MANNEQUIN ON THE MAIN CONSOLE AND HIT "SAVE TO LOOKBOOK"!
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {savedFits.map((fit) => (
                <div
                  key={fit.id}
                  className="bg-[#c0c0c0] win95-box p-3 flex flex-col justify-between hover:bg-gray-50 transition-colors"
                >
                  <div>
                    <div className="flex items-start justify-between gap-1 border-b border-gray-400 pb-1 mb-2">
                      <div className="min-w-0">
                        <h4 className="font-bold text-xs text-blue-900 font-mono truncate">
                          {fit.title}
                        </h4>
                        <div className="text-[10px] text-gray-500 font-mono">
                          Date: {fit.date} {fit.archetype ? `• ${fit.archetype}` : ''}
                        </div>
                      </div>
                      <span className="bg-emerald-700 text-white font-mono text-[10px] px-1.5 py-0.5 font-bold whitespace-nowrap shadow">
                        {fit.score}% MATCH
                      </span>
                    </div>

                    <div className="bg-white win95-inward p-2 space-y-1.5 text-xs font-mono text-gray-800">
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: fit.top.baseColor }} />
                        <span className="truncate">👕 <strong>Top:</strong> {fit.top.name}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: fit.bottom.baseColor }} />
                        <span className="truncate">👖 <strong>Bottom:</strong> {fit.bottom.name}</span>
                      </div>
                      <div className="flex items-center gap-2 truncate">
                        <span className="w-2.5 h-2.5 rounded-full flex-shrink-0" style={{ backgroundColor: fit.shoes.baseColor }} />
                        <span className="truncate">👞 <strong>Shoes:</strong> {fit.shoes.name}</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 pt-2 border-t border-gray-300 flex items-center justify-between">
                    <button
                      onClick={() => {
                        soundFx.playDressMe();
                        onWearFit(fit);
                        onClose();
                      }}
                      className="bg-[#000080] hover:bg-blue-900 text-white text-xs px-3 py-1 win95-btn font-bold font-mono flex items-center gap-1.5"
                    >
                      <Check size={13} />
                      <span>Wear Ensemble</span>
                    </button>
                    <button
                      onClick={() => {
                        soundFx.playClick();
                        onDeleteFit(fit.id);
                      }}
                      title="Delete Fit from Archive"
                      className="text-red-700 hover:text-red-900 p-1 win95-btn"
                    >
                      <Trash2 size={13} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* FOOTER */}
        <div className="p-2 bg-[#c0c0c0] border-t border-white flex justify-end">
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="bg-[#c0c0c0] win95-btn px-4 py-1 text-xs font-bold hover:bg-gray-200"
          >
            Close Window
          </button>
        </div>

      </div>
    </div>
  );
};
