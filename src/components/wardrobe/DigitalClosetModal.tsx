import React, { useState, useRef } from 'react';
import { X, Plus, Upload, Check, Image as ImageIcon } from 'lucide-react';
import { GarmentItem, Category, Formality, Palette, FabricTexture, SilhouetteCut } from '../../types/wardrobe';
import { soundFx } from '../../lib/retroAudio';

interface DigitalClosetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddItem: (item: GarmentItem) => void;
}

export const DigitalClosetModal: React.FC<DigitalClosetModalProps> = ({
  isOpen,
  onClose,
  onAddItem
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [name, setName] = useState('');
  const [brand, setBrand] = useState('');
  const [category, setCategory] = useState<Category>('top');
  const [formality, setFormality] = useState<Formality>('smart-casual');
  const [palette, setPalette] = useState<Palette>('earth');
  const [fabricTexture, setFabricTexture] = useState<FabricTexture>('wool');
  const [silhouetteCut, setSilhouetteCut] = useState<SilhouetteCut>('tailored');
  const [colorName, setColorName] = useState('Vintage Olive');
  const [baseColor, setBaseColor] = useState('#4a5d4e');
  const [accentColor, setAccentColor] = useState('#2d3a30');
  const [vibe, setVibe] = useState('Bespoke Atelier Archive');
  const [tagsInput, setTagsInput] = useState('vintage, archive, cotton, tailored');
  const [customImageUrl, setCustomImageUrl] = useState<string>('');

  if (!isOpen) return null;

  const handleImageFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      soundFx.playClick();
      const reader = new FileReader();
      reader.onload = (event) => {
        setCustomImageUrl(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    soundFx.playMatch();
    const newItem: GarmentItem = {
      id: `custom-${category}-${Date.now()}`,
      name: name.trim(),
      brand: brand.trim() || 'Custom Archive',
      category,
      formality,
      palette,
      colorName: colorName.trim() || 'Custom Hue',
      baseColor,
      accentColor,
      vibe: vibe.trim() || 'Bespoke Wardrobe Item',
      tags: tagsInput.split(',').map(t => t.trim().toLowerCase()).filter(Boolean),
      renderKey: category === 'top' ? 'blazer' : (category === 'bottom' ? 'pleated' : 'loafer'),
      fabricTexture,
      silhouetteCut,
      customImageUrl: customImageUrl || undefined,
      isCustom: true
    };

    onAddItem(newItem);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-3 overflow-y-auto">
      <div className="bg-[#c0c0c0] win95-box max-w-2xl w-full max-h-[92vh] flex flex-col shadow-2xl my-auto select-none">
        
        {/* TITLE BAR */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1054a8] to-[#000080] text-white px-2 py-1.5 flex items-center justify-between font-bold text-xs select-none">
          <div className="flex items-center gap-2">
            <Plus size={14} className="text-yellow-300" />
            <span>ADD TO DIGITAL CLOSET — NEW GARMENT INTAKE WIZARD</span>
          </div>
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center font-bold text-xs hover:bg-gray-300"
          >
            <X size={12} />
          </button>
        </div>

        {/* CONTENT */}
        <form onSubmit={handleSubmit} className="p-3 md:p-4 bg-[#d4d0c8] flex-1 overflow-y-auto win95-inward flex flex-col gap-3">
          
          <div className="bg-white win95-inward p-2.5 text-xs text-gray-800 font-mono">
            <strong>DIGITAL CLOSET INTAKE:</strong> Upload photos of your own wardrobe garments or enter bespoke specs to fit them directly onto your 3D digital mirror.
          </div>

          {/* SECTION 1: PHOTO UPLOAD */}
          <div className="bg-[#c0c0c0] win95-box p-3">
            <h4 className="font-bold text-xs text-blue-900 font-mono uppercase mb-2 flex items-center gap-1.5">
              <ImageIcon size={14} />
              1. GARMENT PHOTO (TRANSPARENT PNG OR CUTOUT RECOMMENDED)
            </h4>

            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleImageFile}
              className="hidden"
            />

            <div className="flex flex-col sm:flex-row items-center gap-3">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 bg-white win95-inward flex flex-col items-center justify-center cursor-pointer hover:bg-gray-50 border border-gray-400 relative overflow-hidden flex-shrink-0"
              >
                {customImageUrl ? (
                  <img src={customImageUrl} alt="Garment preview" className="w-full h-full object-contain p-1" />
                ) : (
                  <div className="text-center p-2 text-gray-500">
                    <Upload size={20} className="mx-auto mb-1 text-blue-900" />
                    <span className="text-[9px] font-mono">Click to Upload</span>
                  </div>
                )}
              </div>

              <div className="flex-1 text-xs font-mono text-gray-700">
                <p className="mb-1">
                  Upload an image of your shirt, blazer, trousers, or shoes.
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="bg-[#c0c0c0] win95-btn px-2 py-1 text-xs font-bold hover:bg-gray-200"
                  >
                    Select Image File
                  </button>
                  {customImageUrl && (
                    <button
                      type="button"
                      onClick={() => setCustomImageUrl('')}
                      className="text-red-700 win95-btn px-2 py-1 text-xs hover:bg-gray-200"
                    >
                      Clear Image
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* SECTION 2: DETAILS */}
          <div className="bg-[#c0c0c0] win95-box p-3 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs font-mono">
            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Garment Name *</label>
              <input
                type="text"
                required
                placeholder="e.g. Vintage Leather Aviator"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Brand / House</label>
              <input
                type="text"
                placeholder="e.g. Helmut Lang '98"
                value={brand}
                onChange={(e) => setBrand(e.target.value)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              />
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Closet Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as Category)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              >
                <option value="top">Top (Jacket / Shirt / Knitwear)</option>
                <option value="bottom">Bottom (Trousers / Denim / Shorts)</option>
                <option value="shoes">Footwear (Loafers / Derbies / Sneakers)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Formality Level</label>
              <select
                value={formality}
                onChange={(e) => setFormality(e.target.value as Formality)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              >
                <option value="casual">Casual (Relaxed / Everyday)</option>
                <option value="streetwear">Streetwear (Skate / Graphic)</option>
                <option value="smart-casual">Smart-Casual (Ivy / Sprezzatura)</option>
                <option value="formal">Formal (Tailored / Suiting)</option>
                <option value="avant-garde">Avant-Garde (Runway / Sculptural)</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Fabric Texture</label>
              <select
                value={fabricTexture}
                onChange={(e) => setFabricTexture(e.target.value as FabricTexture)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              >
                <option value="wool">Wool / Flannel / Tweed</option>
                <option value="cotton">Cotton / Oxford / Jersey</option>
                <option value="denim">Raw / Washed Denim</option>
                <option value="silk">Mulberry Silk</option>
                <option value="linen">Belgian Linen</option>
                <option value="canvas">Duck Canvas</option>
                <option value="leather">Leather / Suede</option>
                <option value="nylon">Technical Nylon / Ripstop</option>
                <option value="fleece">Heavyweight Fleece</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Silhouette Cut</label>
              <select
                value={silhouetteCut}
                onChange={(e) => setSilhouetteCut(e.target.value as SilhouetteCut)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              >
                <option value="tailored">Tailored (Classic structured)</option>
                <option value="boxy">Boxy / Cropped</option>
                <option value="relaxed">Relaxed / Fluid</option>
                <option value="wide">Wide-Leg / Voluminous</option>
                <option value="baggy">Baggy / Puddle</option>
                <option value="slim">Slim / Contoured</option>
                <option value="drop-crotch">Drop-Crotch / Asymmetric</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Color Swatch & Tone</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={baseColor}
                  onChange={(e) => setBaseColor(e.target.value)}
                  className="w-8 h-8 win95-inward p-0 cursor-pointer"
                />
                <input
                  type="text"
                  placeholder="Color Name e.g. Hunter Green"
                  value={colorName}
                  onChange={(e) => setColorName(e.target.value)}
                  className="flex-1 bg-white win95-inward px-2 py-1 text-gray-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold text-gray-800 mb-0.5">Aesthetic Vibe Description</label>
              <input
                type="text"
                placeholder="e.g. 90s Downtown Artist"
                value={vibe}
                onChange={(e) => setVibe(e.target.value)}
                className="w-full bg-white win95-inward px-2 py-1 text-gray-900"
              />
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={() => { soundFx.playClick(); onClose(); }}
              className="bg-[#c0c0c0] win95-btn px-4 py-1.5 text-xs font-mono font-bold hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-[#000080] hover:bg-blue-900 text-white win95-btn px-4 py-1.5 text-xs font-mono font-bold flex items-center gap-1.5"
            >
              <Check size={14} />
              <span>Save Garment to Closet</span>
            </button>
          </div>

        </form>

      </div>
    </div>
  );
};
