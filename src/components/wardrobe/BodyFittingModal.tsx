import React, { useRef } from 'react';
import { X, Upload, Camera, User, Sliders, RotateCcw, Check, Eye, Sun } from 'lucide-react';
import { FittingCalibration } from '../../types/wardrobe';
import { soundFx } from '../../lib/retroAudio';

interface BodyFittingModalProps {
  isOpen: boolean;
  onClose: () => void;
  calibration: FittingCalibration;
  onChangeCalibration: (updated: FittingCalibration) => void;
}

export const BodyFittingModal: React.FC<BodyFittingModalProps> = ({
  isOpen,
  onClose,
  calibration,
  onChangeCalibration
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playClick();
      const reader = new FileReader();
      reader.onload = (event) => {
        const resultUrl = event.target?.result as string;
        onChangeCalibration({
          ...calibration,
          bodyType: 'custom-photo',
          userPhotoUrl: resultUrl
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSelectPreset = (presetKey: FittingCalibration['bodyType']) => {
    soundFx.playClick();
    onChangeCalibration({
      ...calibration,
      bodyType: presetKey
    });
  };

  const handleResetDefaults = () => {
    soundFx.playClick();
    onChangeCalibration({
      scale: 1.0,
      offsetX: 0,
      offsetY: 0,
      opacity: 1.0,
      showGhostOutline: false,
      bodyType: '3d-sculpted',
      turntableAngle: 0,
      lightingMood: 'studio',
      userPhotoUrl: undefined
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-[#c0c0c0] win95-box max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl my-auto select-none">
        
        {/* MODAL TITLE BAR */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1054a8] to-[#000080] text-white px-2 py-1.5 flex items-center justify-between font-bold text-xs select-none">
          <div className="flex items-center gap-2">
            <User size={14} className="text-yellow-300" />
            <span>BODY SCANNER, 3D MANNEQUIN & FITTING CALIBRATOR COM1</span>
          </div>
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center font-bold text-xs hover:bg-gray-300"
          >
            <X size={12} />
          </button>
        </div>

        {/* MODAL CONTENT */}
        <div className="p-3 md:p-4 bg-[#d4d0c8] flex-1 overflow-y-auto win95-inward flex flex-col gap-3">
          
          {/* BODY SOURCE SELECTION */}
          <div className="bg-[#c0c0c0] win95-box p-3">
            <h4 className="font-bold text-xs text-blue-900 font-mono uppercase mb-2 flex items-center gap-1.5">
              <Camera size={14} />
              1. CHOOSE 3D MANNEQUIN, PRESET PHYSIQUE, OR YOUR BODY PHOTO
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-3">
              <button
                onClick={() => handleSelectPreset('3d-sculpted')}
                className={`p-2 text-center win95-btn font-mono text-xs flex flex-col items-center gap-1 ${calibration.bodyType === '3d-sculpted' ? 'bg-[#000080] text-white font-bold' : 'bg-white text-gray-800'}`}
              >
                <span>3D Sculpted</span>
                <span className="text-[10px] opacity-80">Studio Mannequin</span>
              </button>

              <button
                onClick={() => handleSelectPreset('preset-lean')}
                className={`p-2 text-center win95-btn font-mono text-xs flex flex-col items-center gap-1 ${calibration.bodyType === 'preset-lean' ? 'bg-[#000080] text-white font-bold' : 'bg-white text-gray-800'}`}
              >
                <span>Preset Alpha</span>
                <span className="text-[10px] opacity-80">Tall / Lean Frame</span>
              </button>

              <button
                onClick={() => handleSelectPreset('preset-athletic')}
                className={`p-2 text-center win95-btn font-mono text-xs flex flex-col items-center gap-1 ${calibration.bodyType === 'preset-athletic' ? 'bg-[#000080] text-white font-bold' : 'bg-white text-gray-800'}`}
              >
                <span>Preset Beta</span>
                <span className="text-[10px] opacity-80">Athletic Broad V-Taper</span>
              </button>

              <button
                onClick={() => handleSelectPreset('preset-relaxed')}
                className={`p-2 text-center win95-btn font-mono text-xs flex flex-col items-center gap-1 ${calibration.bodyType === 'preset-relaxed' ? 'bg-[#000080] text-white font-bold' : 'bg-white text-gray-800'}`}
              >
                <span>Preset Gamma</span>
                <span className="text-[10px] opacity-80">Relaxed Streetwear</span>
              </button>
            </div>

            {/* CUSTOM PHOTO UPLOAD DROPZONE */}
            <div className="bg-white win95-inward p-3 border-2 border-dashed border-gray-400 flex flex-col items-center justify-center text-center gap-2">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              {calibration.userPhotoUrl ? (
                <div className="flex flex-col items-center gap-2">
                  <div className="w-20 h-28 border border-black overflow-hidden shadow">
                    <img src={calibration.userPhotoUrl} alt="Uploaded body" className="w-full h-full object-cover" />
                  </div>
                  <div className="text-xs font-mono text-emerald-800 font-bold flex items-center gap-1">
                    <Check size={14} />
                    Personal Body Photo Active & Calibrated
                  </div>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#c0c0c0] win95-btn px-2 py-1 text-xs font-mono font-bold hover:bg-gray-200"
                  >
                    Replace Photo
                  </button>
                </div>
              ) : (
                <>
                  <Upload size={24} className="text-blue-900" />
                  <div className="text-xs font-mono text-gray-900 font-bold">
                    Upload a Full-Length or Torso Photo of Yourself
                  </div>
                  <p className="text-[10px] text-gray-600 max-w-sm font-sans">
                    Stand upright in natural light. The digital closet clothes will fit and drape directly over your real body in real-time.
                  </p>
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#000080] text-white win95-btn px-3 py-1.5 text-xs font-mono font-bold hover:bg-blue-900 flex items-center gap-1.5"
                  >
                    <Upload size={12} />
                    <span>Upload Body Photo from Device</span>
                  </button>
                </>
              )}
            </div>
          </div>

          {/* FITTING & 3D STUDIO CONTROLS */}
          <div className="bg-[#c0c0c0] win95-box p-3">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-xs text-blue-900 font-mono uppercase flex items-center gap-1.5">
                <Sliders size={14} />
                2. CALIBRATE CLOTHING LAYER POSITION & FIT
              </h4>
              <button
                onClick={handleResetDefaults}
                className="text-[10px] font-mono bg-white win95-btn px-1.5 py-0.5 text-gray-800 flex items-center gap-1"
              >
                <RotateCcw size={10} />
                Reset Defaults
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
              <div className="bg-white win95-inward p-2">
                <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1">
                  <span>Garment Scale:</span>
                  <span className="text-blue-900">{Math.round(calibration.scale * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.8"
                  max="1.25"
                  step="0.01"
                  value={calibration.scale}
                  onChange={(e) => onChangeCalibration({ ...calibration, scale: parseFloat(e.target.value) })}
                  className="w-full accent-blue-900 cursor-pointer"
                />
              </div>

              <div className="bg-white win95-inward p-2">
                <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1">
                  <span>Vertical Offset (Y):</span>
                  <span className="text-blue-900">{calibration.offsetY}px</span>
                </div>
                <input
                  type="range"
                  min="-40"
                  max="40"
                  step="1"
                  value={calibration.offsetY}
                  onChange={(e) => onChangeCalibration({ ...calibration, offsetY: parseInt(e.target.value) })}
                  className="w-full accent-blue-900 cursor-pointer"
                />
              </div>

              <div className="bg-white win95-inward p-2">
                <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1">
                  <span>Horizontal Offset (X):</span>
                  <span className="text-blue-900">{calibration.offsetX}px</span>
                </div>
                <input
                  type="range"
                  min="-30"
                  max="30"
                  step="1"
                  value={calibration.offsetX}
                  onChange={(e) => onChangeCalibration({ ...calibration, offsetX: parseInt(e.target.value) })}
                  className="w-full accent-blue-900 cursor-pointer"
                />
              </div>

              <div className="bg-white win95-inward p-2">
                <div className="flex justify-between text-[11px] font-bold text-gray-800 mb-1">
                  <span>Layer Transparency:</span>
                  <span className="text-blue-900">{Math.round(calibration.opacity * 100)}%</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="1.0"
                  step="0.05"
                  value={calibration.opacity}
                  onChange={(e) => onChangeCalibration({ ...calibration, opacity: parseFloat(e.target.value) })}
                  className="w-full accent-blue-900 cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-2 flex items-center justify-between bg-white win95-inward p-2">
              <div className="flex items-center gap-2">
                <Eye size={14} className="text-gray-700" />
                <span className="text-xs font-mono font-bold text-gray-800">
                  Show 3D Mannequin Alignment Wireframe
                </span>
              </div>
              <input
                type="checkbox"
                checked={calibration.showGhostOutline}
                onChange={(e) => onChangeCalibration({ ...calibration, showGhostOutline: e.target.checked })}
                className="w-4 h-4 cursor-pointer accent-blue-900"
              />
            </div>
          </div>

        </div>

        {/* MODAL FOOTER */}
        <div className="p-2 bg-[#c0c0c0] border-t border-white flex justify-between items-center">
          <span className="text-[10px] font-mono text-gray-700">
            3D FITTING ENGINE SYNCED • LIVE MIRROR CALIBRATED
          </span>
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="bg-[#000080] text-white font-mono font-bold text-xs win95-btn px-4 py-1 hover:bg-blue-900"
          >
            Apply & Return to Wardrobe
          </button>
        </div>

      </div>
    </div>
  );
};
