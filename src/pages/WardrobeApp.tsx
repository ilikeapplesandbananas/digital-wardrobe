import React, { useState, useEffect } from 'react';
import { 
  Shirt, 
  Sparkles, 
  Bookmark, 
  Volume2, 
  VolumeX, 
  Tv, 
  FolderHeart, 
  Plus, 
  Wand2, 
  Camera, 
  AlertTriangle, 
  CheckCircle2, 
  X, 
  Minus, 
  Square, 
  Sliders,
  Compass,
  Award
} from 'lucide-react';

import { GarmentItem, SavedOutfit, FittingCalibration, OutfitEvaluation, SartorialTasteProfile } from '../types/wardrobe';
import { INITIAL_WARDROBE } from '../data/menswearCatalog';
import { soundFx } from '../lib/retroAudio';
import { evaluateOutfit } from '../lib/outfitEvaluator';

import { Mannequin3D } from '../components/wardrobe/Mannequin3D';
import { RackCarousel } from '../components/wardrobe/RackCarousel';
import { StylistConsultationModal } from '../components/wardrobe/StylistConsultationModal';
import { BodyFittingModal } from '../components/wardrobe/BodyFittingModal';
import { DigitalClosetModal } from '../components/wardrobe/DigitalClosetModal';
import { LookbookModal } from '../components/wardrobe/LookbookModal';

export default function WardrobeApp() {
  // Wardrobe Catalog State (Initial + Custom Items from LocalStorage)
  const [wardrobe, setWardrobe] = useState(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sartorial_custom_wardrobe');
        if (saved) {
          const parsed = JSON.parse(saved);
          return {
            tops: [...INITIAL_WARDROBE.tops, ...(parsed.tops || [])],
            bottoms: [...INITIAL_WARDROBE.bottoms, ...(parsed.bottoms || [])],
            shoes: [...INITIAL_WARDROBE.shoes, ...(parsed.shoes || [])]
          };
        }
      } catch (e) {
        console.error('Failed to load saved wardrobe', e);
      }
    }
    return INITIAL_WARDROBE;
  });

  // Carousel Rack Indices
  const [topIdx, setTopIdx] = useState(0);
  const [botIdx, setBotIdx] = useState(0);
  const [shoeIdx, setShoeIdx] = useState(0);

  // Equipped outfit on avatar
  const [equipped, setEquipped] = useState<{
    top: GarmentItem;
    bottom: GarmentItem;
    shoes: GarmentItem;
  }>({
    top: wardrobe.tops[0],
    bottom: wardrobe.bottoms[0],
    shoes: wardrobe.shoes[0]
  });

  // 3D Mannequin Calibration & Real Photo Fitting
  const [calibration, setCalibration] = useState<FittingCalibration>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sartorial_fitting_calibration');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return {
      scale: 1.0,
      offsetX: 0,
      offsetY: 0,
      opacity: 1.0,
      showGhostOutline: false,
      bodyType: '3d-sculpted',
      turntableAngle: 0,
      lightingMood: 'studio'
    };
  });

  useEffect(() => {
    try {
      localStorage.setItem('sartorial_fitting_calibration', JSON.stringify(calibration));
    } catch (e) {
      console.error(e);
    }
  }, [calibration]);

  // Sartorial Taste Profile
  const [tasteProfile, setTasteProfile] = useState<SartorialTasteProfile | null>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sartorial_taste_profile');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return null;
  });

  const handleSaveTasteProfile = (profile: SartorialTasteProfile) => {
    setTasteProfile(profile);
    try {
      localStorage.setItem('sartorial_taste_profile', JSON.stringify(profile));
    } catch (e) {
      console.error(e);
    }
  };

  // Saved Lookbook Ensembles
  const [savedFits, setSavedFits] = useState<SavedOutfit[]>(() => {
    if (typeof window !== 'undefined') {
      try {
        const saved = localStorage.getItem('sartorial_saved_lookbook');
        if (saved) return JSON.parse(saved);
      } catch (e) {
        console.error(e);
      }
    }
    return [
      {
        id: 'fit-default-1',
        title: 'The Tribeca Power Merchant',
        top: wardrobe.tops[0],
        bottom: wardrobe.bottoms[0],
        shoes: wardrobe.shoes[0],
        score: 98,
        date: '1995-10-14',
        archetype: 'The Neapolitan Sprezzatura Savant'
      },
      {
        id: 'fit-default-2',
        title: 'Tokyo Runway Poet',
        top: wardrobe.tops[8] || wardrobe.tops[0],
        bottom: wardrobe.bottoms[6] || wardrobe.bottoms[0],
        shoes: wardrobe.shoes[8] || wardrobe.shoes[0],
        score: 99,
        date: '1995-10-18',
        archetype: 'The Neo-Tokyo Darkwear Avant-Garde'
      }
    ];
  });

  useEffect(() => {
    try {
      localStorage.setItem('sartorial_saved_lookbook', JSON.stringify(savedFits));
    } catch (e) {
      console.error(e);
    }
  }, [savedFits]);

  // UI States
  const [evaluation, setEvaluation] = useState<OutfitEvaluation | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [soundOn, setSoundOn] = useState(true);
  const [crtActive, setCrtActive] = useState(true);
  const [clock, setClock] = useState('02:45 PM');

  // Modals
  const [isStylistModalOpen, setIsStylistModalOpen] = useState(false);
  const [isBodyModalOpen, setIsBodyModalOpen] = useState(false);
  const [isClosetModalOpen, setIsClosetModalOpen] = useState(false);
  const [isLookbookOpen, setIsLookbookOpen] = useState(false);

  // Digital clock simulation
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setClock(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    };
    updateTime();
    const interval = setInterval(updateTime, 15000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    soundFx.muted = !soundOn;
  }, [soundOn]);

  // Initial evaluation on load
  useEffect(() => {
    const initialEval = evaluateOutfit(equipped.top, equipped.bottom, equipped.shoes, tasteProfile);
    setEvaluation(initialEval);
  }, []);

  // Carousel Navigation Handlers
  const handleNext = (category: 'top' | 'bottom' | 'shoes') => {
    soundFx.playCarousel();
    if (category === 'top') {
      setTopIdx(prev => (prev + 1) % wardrobe.tops.length);
    } else if (category === 'bottom') {
      setBotIdx(prev => (prev + 1) % wardrobe.bottoms.length);
    } else {
      setShoeIdx(prev => (prev + 1) % wardrobe.shoes.length);
    }
  };

  const handlePrev = (category: 'top' | 'bottom' | 'shoes') => {
    soundFx.playCarousel();
    if (category === 'top') {
      setTopIdx(prev => (prev - 1 + wardrobe.tops.length) % wardrobe.tops.length);
    } else if (category === 'bottom') {
      setBotIdx(prev => (prev - 1 + wardrobe.bottoms.length) % wardrobe.bottoms.length);
    } else {
      setShoeIdx(prev => (prev - 1 + wardrobe.shoes.length) % wardrobe.shoes.length);
    }
  };

  // Iconic "DRESS ME!" Action
  const handleDressMe = () => {
    soundFx.playDressMe();
    setIsEvaluating(true);
    setEvaluation(null);

    const selectedTop = wardrobe.tops[topIdx] || wardrobe.tops[0];
    const selectedBottom = wardrobe.bottoms[botIdx] || wardrobe.bottoms[0];
    const selectedShoe = wardrobe.shoes[shoeIdx] || wardrobe.shoes[0];

    setEquipped({
      top: selectedTop,
      bottom: selectedBottom,
      shoes: selectedShoe
    });

    setTimeout(() => {
      const outcome = evaluateOutfit(selectedTop, selectedBottom, selectedShoe, tasteProfile);
      setEvaluation(outcome);
      setIsEvaluating(false);

      if (outcome.status === 'mismatch') {
        soundFx.playMismatch();
      } else {
        soundFx.playMatch();
      }
    }, 650);
  };

  // Auto-Match / AI Stylist Shuffle
  const handleShuffleMatch = () => {
    soundFx.playClick();
    const pairs = [
      [0, 0, 0],   // Double-breasted blazer + Pleated + Loafer (Sprezzatura)
      [1, 0, 0],   // Knit polo + Pleated + Loafers (Jude Law)
      [2, 2, 4],   // Hoodie + Carpenter + DC skate (Beastie boys)
      [3, 1, 3],   // Oxford OCBD + Selvedge + Wallabees (Ivy)
      [4, 13, 2],  // ACG Windbreaker + Climbing Cargo + Dad runners (Gorpcore)
      [5, 4, 4],   // Washed tee + Baggy acid + DC skate (Kurt Cobain)
      [7, 11, 0],  // Fisherman sweater + Ecru denim + Loafers (Hamptons)
      [8, 6, 8],   // Deconstructed Kimono + Drop-crotch + Combat Tabi (Darkwear)
      [9, 8, 12],  // Baracuta Harrington + Mod Check + Dr. Martens (Brit Mod)
      [10, 5, 9],  // Casablanca Silk Shirt + Linen Chinos + Belgian Loafers (Riviera)
      [11, 9, 10], // Acronym Shell + Fidlock Cargo + Salomon XT-6 (Cyber Techwear)
      [12, 10, 11] // Blanket Chore Coat + Wabash Stripe + Red Wing Boots (Americana)
    ];

    const pick = pairs[Math.floor(Math.random() * pairs.length)];
    const newTopIdx = pick[0] % wardrobe.tops.length;
    const newBotIdx = pick[1] % wardrobe.bottoms.length;
    const newShoeIdx = pick[2] % wardrobe.shoes.length;

    setTopIdx(newTopIdx);
    setBotIdx(newBotIdx);
    setShoeIdx(newShoeIdx);

    const chosenTop = wardrobe.tops[newTopIdx];
    const chosenBot = wardrobe.bottoms[newBotIdx];
    const chosenShoe = wardrobe.shoes[newShoeIdx];

    setEquipped({ top: chosenTop, bottom: chosenBot, shoes: chosenShoe });
    const outcome = evaluateOutfit(chosenTop, chosenBot, chosenShoe, tasteProfile);
    setEvaluation(outcome);
    soundFx.playMatch();
  };

  // Add Custom Item from Digital Closet Modal
  const handleAddCustomGarment = (newItem: GarmentItem) => {
    setWardrobe(prev => {
      const updated = {
        tops: newItem.category === 'top' ? [newItem, ...prev.tops] : prev.tops,
        bottoms: newItem.category === 'bottom' ? [newItem, ...prev.bottoms] : prev.bottoms,
        shoes: newItem.category === 'shoes' ? [newItem, ...prev.shoes] : prev.shoes
      };

      try {
        const customItems = {
          tops: updated.tops.filter(t => t.isCustom),
          bottoms: updated.bottoms.filter(b => b.isCustom),
          shoes: updated.shoes.filter(s => s.isCustom)
        };
        localStorage.setItem('sartorial_custom_wardrobe', JSON.stringify(customItems));
      } catch (e) {
        console.error(e);
      }

      return updated;
    });

    if (newItem.category === 'top') setTopIdx(0);
    else if (newItem.category === 'bottom') setBotIdx(0);
    else setShoeIdx(0);
  };

  // Save current equipped ensemble to Lookbook
  const handleSaveToLookbook = () => {
    soundFx.playClick();
    const newFit: SavedOutfit = {
      id: `fit-${Date.now()}`,
      title: evaluation?.vibe || `Custom Ensemble #${savedFits.length + 1}`,
      top: equipped.top,
      bottom: equipped.bottom,
      shoes: equipped.shoes,
      score: evaluation?.score || 94,
      date: new Date().toISOString().split('T')[0],
      archetype: tasteProfile?.archetypeName
    };
    setSavedFits([newFit, ...savedFits]);
    setIsLookbookOpen(true);
  };

  const handleDeleteSavedFit = (id: string) => {
    setSavedFits(prev => prev.filter(f => f.id !== id));
  };

  const handleWearSavedFit = (fit: SavedOutfit) => {
    setEquipped({
      top: fit.top,
      bottom: fit.bottom,
      shoes: fit.shoes
    });

    const tIdx = wardrobe.tops.findIndex(t => t.id === fit.top.id);
    const bIdx = wardrobe.bottoms.findIndex(b => b.id === fit.bottom.id);
    const sIdx = wardrobe.shoes.findIndex(s => s.id === fit.shoes.id);

    if (tIdx >= 0) setTopIdx(tIdx);
    if (bIdx >= 0) setBotIdx(bIdx);
    if (sIdx >= 0) setShoeIdx(sIdx);

    setEvaluation({
      status: 'match',
      score: fit.score,
      title: 'LOOKBOOK RECALL',
      critique: `Loaded ensemble straight from your vintage digital wardrobe archive.`,
      vibe: fit.title,
      breakdown: {
        silhouetteProportion: { score: 95, verdict: "Harmonious balance from personal archive." },
        fabricSynergy: { score: 94, verdict: "Cohesive fabric weights." },
        colorTemperature: { score: 96, verdict: "Tonal compatibility." },
        formalityGrade: { score: 94, verdict: "Balanced formality." }
      },
      suitableOccasions: ['Everyday Curation', 'Personal Signature']
    });
  };

  const handleApplyCuratedLook = (topId: string, bottomId: string, shoeId: string, archetypeName: string) => {
    const tIdx = Math.max(0, wardrobe.tops.findIndex(t => t.id === topId));
    const bIdx = Math.max(0, wardrobe.bottoms.findIndex(b => b.id === bottomId));
    const sIdx = Math.max(0, wardrobe.shoes.findIndex(s => s.id === shoeId));

    setTopIdx(tIdx);
    setBotIdx(bIdx);
    setShoeIdx(sIdx);

    const chosenTop = wardrobe.tops[tIdx];
    const chosenBot = wardrobe.bottoms[bIdx];
    const chosenShoe = wardrobe.shoes[sIdx];

    setEquipped({
      top: chosenTop,
      bottom: chosenBot,
      shoes: chosenShoe
    });

    const outcome = evaluateOutfit(chosenTop, chosenBot, chosenShoe, tasteProfile);
    setEvaluation({
      ...outcome,
      status: 'match',
      score: 99,
      title: 'ARCHETYPE FORMULA FIT',
      vibe: `${archetypeName} Signature`
    });
  };

  const currentTop = wardrobe.tops[topIdx] || wardrobe.tops[0];
  const currentBottom = wardrobe.bottoms[botIdx] || wardrobe.bottoms[0];
  const currentShoe = wardrobe.shoes[shoeIdx] || wardrobe.shoes[0];

  return (
    <div className={`min-h-screen bg-[#008080] text-gray-900 font-sans p-2 md:p-6 flex flex-col justify-between relative overflow-hidden select-none ${crtActive ? 'crt-scanlines' : ''}`}>
      
      {/* 90s RETRO SCANLINE & WINDOWS 95 BEVEL STYLES */}
      <style>{`
        .crt-scanlines::before {
          content: " ";
          display: block;
          position: fixed;
          top: 0; left: 0; bottom: 0; right: 0;
          background: linear-gradient(rgba(18, 16, 16, 0) 50%, rgba(0, 0, 0, 0.25) 50%), linear-gradient(90deg, rgba(255, 0, 0, 0.03), rgba(0, 255, 0, 0.01), rgba(0, 0, 255, 0.03));
          z-index: 60;
          background-size: 100% 3px, 6px 100%;
          pointer-events: none;
          opacity: 0.85;
        }
        .win95-box {
          box-shadow: inset -1.5px -1.5px 0px #0a0a0a, inset 1.5px 1.5px 0px #ffffff, inset -3px -3px 0px #808080, inset 3px 3px 0px #dfdfdf;
        }
        .win95-inward {
          box-shadow: inset 2px 2px 0px #808080, inset -2px -2px 0px #ffffff, inset 3px 3px 0px #000000;
        }
        .win95-btn {
          box-shadow: inset -2px -2px 0px #0a0a0a, inset 2px 2px 0px #ffffff, inset -3px -3px 0px #808080, inset 3px 3px 0px #dfdfdf;
        }
        .win95-btn:active {
          box-shadow: inset 2px 2px 0px #0a0a0a, inset -2px -2px 0px #ffffff, inset 3px 3px 0px #808080;
        }
      `}</style>

      {/* DESKTOP RETRO SHORTCUT ICONS ON WALLPAPER */}
      <div className="absolute top-4 left-4 hidden xl:flex flex-col gap-5 text-white text-xs opacity-90 z-0 select-none">
        {/* Atelier AI Stylist */}
        <div 
          onClick={() => { soundFx.playClick(); setIsStylistModalOpen(true); }}
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 group"
        >
          <div className="w-11 h-11 bg-[#c0c0c0] win95-btn flex items-center justify-center text-amber-900 group-hover:scale-105 transition-transform">
            <Compass size={24} />
          </div>
          <span className="bg-[#000080] px-1 text-[11px] text-white">StylistAI.exe</span>
        </div>

        {/* 3D Body Mirror Calibrator */}
        <div 
          onClick={() => { soundFx.playClick(); setIsBodyModalOpen(true); }}
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 group"
        >
          <div className="w-11 h-11 bg-[#c0c0c0] win95-btn flex items-center justify-center text-cyan-800 group-hover:scale-105 transition-transform">
            <Camera size={24} />
          </div>
          <span className="bg-[#000080] px-1 text-[11px] text-white">3DFitting.exe</span>
        </div>

        {/* Add Garment to Digital Closet */}
        <div 
          onClick={() => { soundFx.playClick(); setIsClosetModalOpen(true); }}
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 group"
        >
          <div className="w-11 h-11 bg-[#c0c0c0] win95-btn flex items-center justify-center text-green-800 group-hover:scale-105 transition-transform">
            <Plus size={24} />
          </div>
          <span className="bg-[#000080] px-1 text-[11px] text-white">DigitalCloset.exe</span>
        </div>

        {/* Lookbook */}
        <div 
          onClick={() => { soundFx.playClick(); setIsLookbookOpen(true); }}
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 group"
        >
          <div className="w-11 h-11 bg-[#c0c0c0] win95-btn flex items-center justify-center text-blue-900 group-hover:scale-105 transition-transform">
            <FolderHeart size={24} />
          </div>
          <span className="bg-[#000080] px-1 text-[11px] text-white">Lookbook.exe</span>
        </div>

        {/* Auto Stylist */}
        <div 
          onClick={handleShuffleMatch}
          className="flex flex-col items-center gap-1 cursor-pointer hover:opacity-100 group"
        >
          <div className="w-11 h-11 bg-[#c0c0c0] win95-btn flex items-center justify-center text-purple-900 group-hover:scale-105 transition-transform">
            <Wand2 size={24} />
          </div>
          <span className="bg-[#000080] px-1 text-[11px] text-white">AutoStylist.bat</span>
        </div>
      </div>

      {/* MAIN RETRO APPLICATION WINDOW */}
      <div className="max-w-6xl w-full mx-auto bg-[#c0c0c0] win95-box flex flex-col z-10 my-auto shadow-2xl">
        
        {/* WINDOW TITLE BAR */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1054a8] to-[#000080] text-white px-2 py-1.5 flex items-center justify-between font-bold text-xs md:text-sm tracking-wide select-none">
          <div className="flex items-center gap-2">
            <Shirt size={16} className="text-yellow-300" />
            <span>CLOTHES-O-MATIC '95 [MENSWEAR EDITION v4.0] — CHER_CLOSET.EXE</span>
          </div>

          <div className="flex items-center gap-1">
            <button 
              onClick={() => { soundFx.playClick(); setSoundOn(!soundOn); }}
              title={soundOn ? 'Mute Audio Synthesizer' : 'Unmute Audio Synthesizer'}
              className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center hover:bg-gray-200"
            >
              {soundOn ? <Volume2 size={12} /> : <VolumeX size={12} />}
            </button>
            <button 
              onClick={() => { soundFx.playClick(); setCrtActive(!crtActive); }}
              title="Toggle CRT Scanline Effect"
              className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center hover:bg-gray-200"
            >
              <Tv size={12} className={crtActive ? "text-green-800 font-bold" : "text-gray-500"} />
            </button>
            <div className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center text-[10px]">
              <Minus size={11} />
            </div>
            <div className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center text-[10px]">
              <Square size={10} />
            </div>
            <div className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center font-bold text-[11px]">
              <X size={12} />
            </div>
          </div>
        </div>

        {/* TOP MENU BAR WITH ACTIVE ACTIONS */}
        <div className="bg-[#c0c0c0] border-b border-gray-400 px-3 py-1 flex flex-wrap items-center gap-3 text-xs font-serif text-black border-t border-white">
          <span 
            className="hover:bg-blue-900 hover:text-white px-1.5 py-0.5 cursor-pointer"
            onClick={() => setIsClosetModalOpen(true)}
          >
            <u>F</u>ile (Add Garment)
          </span>

          <span 
            className="hover:bg-blue-900 hover:text-white px-1.5 py-0.5 cursor-pointer"
            onClick={handleShuffleMatch}
          >
            <u>E</u>dit (Auto-Match)
          </span>

          <span 
            className="hover:bg-blue-900 hover:text-white px-1.5 py-0.5 cursor-pointer font-bold text-blue-950"
            onClick={() => { soundFx.playClick(); setIsStylistModalOpen(true); }}
          >
            <u>A</u>I Stylist Consultation
          </span>

          <span 
            className="hover:bg-blue-900 hover:text-white px-1.5 py-0.5 cursor-pointer"
            onClick={() => { soundFx.playClick(); setIsBodyModalOpen(true); }}
          >
            <u>M</u>irror (3D Mannequin & Photo)
          </span>

          <span 
            className="hover:bg-blue-900 hover:text-white px-1.5 py-0.5 cursor-pointer"
            onClick={() => { soundFx.playClick(); setIsLookbookOpen(true); }}
          >
            <u>L</u>ookbook ({savedFits.length})
          </span>

          <span 
            className="hover:bg-blue-900 hover:text-white px-1.5 py-0.5 cursor-pointer hidden sm:inline"
            onClick={() => alert("Cher Horowitz's 90s Menswear Digital Wardrobe v4.0:\n• Realistic 3D Mannequin with turntable rotation & studio lighting.\n• Atelier AI Stylist with 10 menswear archetypes & live silhouette critique.\n• Real body photo fitting with calibration controls.\n• Custom digital closet intake.")}
          >
            <u>H</u>elp
          </span>

          <div className="ml-auto text-[11px] text-gray-700 font-mono hidden md:flex items-center gap-3">
            <span>TASTE: {tasteProfile ? tasteProfile.archetypeName : 'DISCOVERING'}</span>
            <span>CLOSET: {wardrobe.tops.length + wardrobe.bottoms.length + wardrobe.shoes.length} ITEMS</span>
          </div>
        </div>

        {/* WORKSPACE: LEFT 3D MIRROR DISPLAY + RIGHT RACK CAROUSELS */}
        <div className="p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-4 bg-[#d4d0c8]">
          
          {/* LEFT COLUMN: REALISTIC 3D MANNEQUIN / BODY PHOTO DISPLAY (5 Cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <div className="bg-[#c0c0c0] win95-box p-2 flex flex-col">
              <div className="bg-[#000080] text-white text-xs px-2 py-1 font-bold flex items-center justify-between">
                <span>3D STUDIO MIRROR — CAM 01 [REALISTIC 3D PERSPECTIVE]</span>
                <span className="bg-red-600 text-white px-1 text-[9px] uppercase animate-pulse">
                  LIVE 60FPS
                </span>
              </div>

              {/* CRT / VIEWPORT BOX */}
              <div className="relative bg-[#111620] win95-inward h-[400px] md:h-[440px] flex items-center justify-center overflow-hidden border-2 border-black">
                {/* 90s Cyber Telemetry */}
                <div className="absolute top-2 left-2 text-[10px] font-mono text-cyan-400 bg-black/75 px-2 py-1 border border-cyan-800 z-30">
                  MANNEQUIN: {calibration.bodyType.toUpperCase()}<br />
                  TOP: {equipped.top?.name.toUpperCase().slice(0, 24)}<br />
                  BOT: {equipped.bottom?.name.toUpperCase().slice(0, 24)}<br />
                  SHOE: {equipped.shoes?.name.toUpperCase().slice(0, 24)}
                </div>

                {/* Quick Fit Controls Floating Button */}
                <button
                  onClick={() => { soundFx.playClick(); setIsBodyModalOpen(true); }}
                  title="Calibrate Body & Fit"
                  className="absolute bottom-2 left-2 bg-black/80 hover:bg-black text-cyan-300 border border-cyan-600 px-2 py-1 text-[10px] font-mono win95-btn flex items-center gap-1 z-30"
                >
                  <Sliders size={12} />
                  <span>Calibrate 3D Fit</span>
                </button>

                {/* REALISTIC 3D SCULPTED MANNEQUIN COMPONENT */}
                <Mannequin3D 
                  top={equipped.top}
                  bottom={equipped.bottom}
                  shoes={equipped.shoes}
                  isShaking={evaluation?.status === 'mismatch'}
                  calibration={calibration}
                  onUpdateCalibration={setCalibration}
                />

                {/* ICONIC CLUELESS "MIS-MATCH!" FLASHING WARNING DIALOG OVERLAY */}
                {evaluation?.status === 'mismatch' && (
                  <div className="absolute inset-x-4 top-1/2 -translate-y-1/2 bg-red-600/95 border-4 border-yellow-300 win95-box p-3 shadow-2xl animate-pulse z-40 text-center">
                    <div className="flex items-center justify-center gap-2 text-yellow-200 text-lg md:text-2xl font-black font-mono tracking-widest drop-shadow">
                      <AlertTriangle className="animate-spin text-yellow-300" size={28} />
                      MIS-MATCH!
                      <AlertTriangle className="animate-spin text-yellow-300" size={28} />
                    </div>
                    <div className="bg-black/85 text-white font-mono text-xs mt-2 p-2 border border-red-400 text-left">
                      {evaluation.critique}
                    </div>
                    {evaluation.recommendation && (
                      <div className="text-[11px] text-yellow-100 font-mono mt-1 italic">
                        Stylist Advice: {evaluation.recommendation}
                      </div>
                    )}
                    <div className="mt-3 flex gap-2 justify-center">
                      <button 
                        onClick={handleShuffleMatch}
                        className="bg-yellow-400 hover:bg-yellow-300 text-black font-bold text-xs px-3 py-1 win95-btn font-mono"
                      >
                        Auto-Correct
                      </button>
                      <button 
                        onClick={() => setEvaluation(null)}
                        className="bg-gray-200 hover:bg-white text-black text-xs px-3 py-1 win95-btn font-mono"
                      >
                        Dismiss
                      </button>
                    </div>
                  </div>
                )}

                {/* "MATCH!" VICTORY BADGE OVERLAY */}
                {evaluation?.status === 'match' && (
                  <div className="absolute top-3 right-3 bg-emerald-800 border-2 border-emerald-300 win95-box p-2.5 shadow-2xl z-40 animate-bounce">
                    <div className="flex items-center gap-1.5 text-white font-black text-xs font-mono">
                      <CheckCircle2 size={16} className="text-yellow-300" />
                      MATCH! {evaluation.score}%
                    </div>
                    <div className="text-[10px] text-emerald-100 font-sans italic max-w-[160px] truncate mt-0.5">
                      {evaluation.vibe}
                    </div>
                  </div>
                )}

                {/* Processing Spinner Overlay */}
                {isEvaluating && (
                  <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center text-green-400 font-mono text-sm gap-2 z-50">
                    <div className="w-9 h-9 border-4 border-green-500 border-t-transparent rounded-full animate-spin" />
                    <span className="animate-pulse">ATELIER ENGINE: SCANNING 3D DRAPE & FABRICS...</span>
                  </div>
                )}
              </div>

              {/* EQUIPPED STATUS STRIP */}
              <div className="mt-2 p-1.5 bg-[#e0ded8] win95-inward text-[11px] font-mono flex items-center justify-between">
                <span className="truncate pr-2">
                  FIT VIBE: <strong>{evaluation?.vibe || "Custom Assembled"}</strong>
                </span>
                <span className="font-bold text-blue-900 whitespace-nowrap">
                  SCORE: {evaluation ? `${evaluation.score}/100` : '--/100'}
                </span>
              </div>
            </div>

            {/* DRESS ME ACTION BUTTON CLUSTER */}
            <div className="bg-[#c0c0c0] win95-box p-3 flex flex-col gap-2">
              <button
                onClick={handleDressMe}
                disabled={isEvaluating}
                className="w-full bg-[#ff0055] hover:bg-[#e6004c] active:bg-[#cc0043] text-white py-3 px-4 win95-btn font-black text-base md:text-lg tracking-widest flex items-center justify-center gap-2 shadow-lg transition-transform"
              >
                <Sparkles size={20} className="animate-pulse text-yellow-300" />
                DRESS ME !
                <Sparkles size={20} className="animate-pulse text-yellow-300" />
              </button>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => { soundFx.playClick(); setIsStylistModalOpen(true); }}
                  className="bg-[#c0c0c0] hover:bg-white text-black py-2 px-2 win95-btn font-bold flex items-center justify-center gap-1.5"
                >
                  <Compass size={14} className="text-amber-800" />
                  AI Stylist Studio
                </button>

                <button
                  onClick={() => { soundFx.playClick(); setIsBodyModalOpen(true); }}
                  className="bg-[#c0c0c0] hover:bg-white text-black py-2 px-2 win95-btn font-bold flex items-center justify-center gap-1.5"
                >
                  <Camera size={14} className="text-blue-800" />
                  3D Body & Photo
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                <button
                  onClick={() => { soundFx.playClick(); setIsClosetModalOpen(true); }}
                  className="bg-[#c0c0c0] hover:bg-white text-black py-1.5 px-2 win95-btn font-bold flex items-center justify-center gap-1.5"
                >
                  <Plus size={14} className="text-green-800" />
                  Add to Closet
                </button>

                <button
                  onClick={handleSaveToLookbook}
                  className="bg-[#c0c0c0] hover:bg-white text-black py-1.5 px-2 win95-btn font-bold flex items-center justify-center gap-1.5"
                >
                  <Bookmark size={14} className="text-purple-800" />
                  Save Lookbook
                </button>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: RACK CAROUSELS FOR TOPS, BOTTOMS, & SHOES (7 Cols) */}
          <div className="lg:col-span-7 flex flex-col gap-3">
            
            {/* CAROUSEL 1: TOPS */}
            <RackCarousel
              rackNumber={1}
              rackLabel="TOPS / JACKETS, KNITWEAR & SHIRTING"
              items={wardrobe.tops}
              currentIndex={topIdx}
              onNext={() => handleNext('top')}
              onPrev={() => handlePrev('top')}
              onSelectIndex={(idx) => { soundFx.playCarousel(); setTopIdx(idx); }}
            />

            {/* CAROUSEL 2: BOTTOMS */}
            <RackCarousel
              rackNumber={2}
              rackLabel="BOTTOMS / PLEATED TROUSERS & DENIM"
              items={wardrobe.bottoms}
              currentIndex={botIdx}
              onNext={() => handleNext('bottom')}
              onPrev={() => handlePrev('bottom')}
              onSelectIndex={(idx) => { soundFx.playCarousel(); setBotIdx(idx); }}
            />

            {/* CAROUSEL 3: SHOES */}
            <RackCarousel
              rackNumber={3}
              rackLabel="FOOTWEAR / LOAFERS, DERBIES & RUNNERS"
              items={wardrobe.shoes}
              currentIndex={shoeIdx}
              onNext={() => handleNext('shoes')}
              onPrev={() => handlePrev('shoes')}
              onSelectIndex={(idx) => { soundFx.playCarousel(); setShoeIdx(idx); }}
            />

            {/* QUICK SELECTION HARMONY METER */}
            <div className="bg-[#c0c0c0] win95-box p-3 text-xs font-mono flex flex-col sm:flex-row items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-800">PENDING RACK SELECTION:</span>
                <span className="text-gray-700 bg-white win95-inward px-2 py-0.5">
                  {currentTop.silhouetteCut} • {currentBottom.silhouetteCut} • {currentShoe.fabricTexture}
                </span>
              </div>

              <button
                onClick={handleDressMe}
                className="text-blue-900 font-bold hover:underline flex items-center gap-1 animate-pulse"
              >
                <span>PRESS [DRESS ME] TO RENDER FIT</span>
                <Sparkles size={13} />
              </button>
            </div>

            {/* ATELIER SARTORIAL AI STYLIST BANNER */}
            <div 
              onClick={() => { soundFx.playClick(); setIsStylistModalOpen(true); }}
              className="bg-gradient-to-r from-[#1c2430] via-[#2a374a] to-[#1c2430] win95-box p-3 text-white flex items-center justify-between cursor-pointer hover:brightness-110 transition-all border border-blue-500/40"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-400 text-black flex items-center justify-center font-bold font-serif rounded-full shadow text-lg">
                  ✦
                </div>
                <div>
                  <div className="text-[10px] font-mono text-amber-300 uppercase font-bold tracking-widest flex items-center gap-1.5">
                    <span>ATELIER SARTORIAL AI STYLIST</span>
                    <span className="bg-blue-600 text-white px-1 text-[8px] font-mono">10 ARCHETYPES</span>
                  </div>
                  <div className="text-xs font-serif italic text-gray-200">
                    Discover your menswear archetype through atmosphere, silhouette, scent & sartorial creed.
                  </div>
                </div>
              </div>

              <div className="bg-amber-400 text-black font-mono font-bold text-xs px-3 py-1.5 win95-btn whitespace-nowrap hidden sm:block">
                Start Consultation →
              </div>
            </div>

          </div>
        </div>

        {/* BOTTOM TASKBAR / STATUS BAR */}
        <div className="bg-[#c0c0c0] border-t-2 border-white px-2 py-1 flex items-center justify-between text-xs font-mono text-gray-800 select-none">
          <div className="flex items-center gap-2">
            <button 
              onClick={() => setIsStylistModalOpen(true)}
              className="bg-[#c0c0c0] win95-btn px-2 py-0.5 font-bold flex items-center gap-1 text-black"
            >
              <span className="text-blue-900 font-serif font-black">⊞</span> Start
            </button>
            <span className="win95-inward px-2 py-0.5 bg-[#d4d0c8]">READY</span>
            <span className="hidden sm:inline win95-inward px-2 py-0.5 bg-[#d4d0c8]">COM1 (3D_TURNTABLE_OK)</span>
            <span className="hidden md:inline win95-inward px-2 py-0.5 bg-[#d4d0c8]">
              CLOSET: {wardrobe.tops.length + wardrobe.bottoms.length + wardrobe.shoes.length} GARMENTS
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => { soundFx.playClick(); setSoundOn(!soundOn); }}
              className="win95-inward px-2 py-0.5 bg-[#d4d0c8] flex items-center gap-1"
            >
              {soundOn ? <Volume2 size={12} className="text-blue-900" /> : <VolumeX size={12} className="text-red-700" />}
              <span className="text-[10px]">{soundOn ? 'SFX ON' : 'MUTED'}</span>
            </button>
            <span className="win95-inward px-3 py-0.5 bg-[#d4d0c8] font-bold">
              {clock}
            </span>
          </div>
        </div>

      </div>

      {/* MODALS */}
      <StylistConsultationModal
        isOpen={isStylistModalOpen}
        onClose={() => setIsStylistModalOpen(false)}
        onApplyOutfit={handleApplyCuratedLook}
        allTops={wardrobe.tops}
        allBottoms={wardrobe.bottoms}
        allShoes={wardrobe.shoes}
        currentEquipped={equipped}
        evaluation={evaluation}
        onSaveTasteProfile={handleSaveTasteProfile}
      />

      <BodyFittingModal
        isOpen={isBodyModalOpen}
        onClose={() => setIsBodyModalOpen(false)}
        calibration={calibration}
        onChangeCalibration={setCalibration}
      />

      <DigitalClosetModal
        isOpen={isClosetModalOpen}
        onClose={() => setIsClosetModalOpen(false)}
        onAddItem={handleAddCustomGarment}
      />

      <LookbookModal
        isOpen={isLookbookOpen}
        onClose={() => setIsLookbookOpen(false)}
        savedFits={savedFits}
        onWearFit={handleWearSavedFit}
        onDeleteFit={handleDeleteSavedFit}
      />

      {/* FOOTER NOTICE */}
      <footer className="text-center text-[11px] text-teal-100 font-mono py-2 opacity-85 z-10">
        CLOTHES-O-MATIC v4.0 • CHER HOROWITZ 'CLUELESS' (1995) HOMAGE • TAILORED FOR MODERN MENSWEAR
      </footer>
    </div>
  );
}
