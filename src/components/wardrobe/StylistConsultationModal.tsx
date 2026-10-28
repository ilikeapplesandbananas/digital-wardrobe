import React, { useState } from 'react';
import { X, Sparkles, Wand2, Compass, CheckCircle2, ArrowRight, RotateCcw, Award, Lightbulb, Shirt } from 'lucide-react';
import { STYLIST_QUESTIONS, MENSWEAR_ARCHETYPES } from '../../data/stylistPersonalityQuestions';
import { MenswearArchetype, GarmentItem, OutfitEvaluation, SartorialTasteProfile } from '../../types/wardrobe';
import { soundFx } from '../../lib/retroAudio';

interface StylistConsultationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onApplyOutfit: (topId: string, bottomId: string, shoeId: string, archetypeName: string) => void;
  allTops: GarmentItem[];
  allBottoms: GarmentItem[];
  allShoes: GarmentItem[];
  currentEquipped: { top: GarmentItem; bottom: GarmentItem; shoes: GarmentItem };
  evaluation: OutfitEvaluation | null;
  onSaveTasteProfile: (profile: SartorialTasteProfile) => void;
}

export const StylistConsultationModal: React.FC<StylistConsultationModalProps> = ({
  isOpen,
  onClose,
  onApplyOutfit,
  allTops,
  allBottoms,
  allShoes,
  currentEquipped,
  evaluation,
  onSaveTasteProfile
}) => {
  const [activeTab, setActiveTab] = useState<'quiz' | 'critique'>('quiz');
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isCalculating, setIsCalculating] = useState(false);
  const [diagnosedArchetype, setDiagnosedArchetype] = useState<MenswearArchetype | null>(null);

  if (!isOpen) return null;

  const currentQuestion = STYLIST_QUESTIONS[currentStep];

  const handleSelectOption = (archetypeKey: string) => {
    soundFx.playQuizStep();
    const updatedAnswers = [...answers, archetypeKey];
    setAnswers(updatedAnswers);

    if (currentStep < STYLIST_QUESTIONS.length - 1) {
      setCurrentStep(prev => prev + 1);
    } else {
      setIsCalculating(true);
      setTimeout(() => {
        // Tally archetype votes
        const counts: Record<string, number> = {};
        updatedAnswers.forEach(k => {
          counts[k] = (counts[k] || 0) + 1;
        });

        let topKey = 'sprezzatura';
        let maxCount = -1;
        Object.entries(counts).forEach(([k, c]) => {
          if (c > maxCount) {
            maxCount = c;
            topKey = k;
          }
        });

        const result = MENSWEAR_ARCHETYPES[topKey] || MENSWEAR_ARCHETYPES.sprezzatura;
        setDiagnosedArchetype(result);
        setIsCalculating(false);
        soundFx.playArchetypeReveal();

        // Save to taste profile
        onSaveTasteProfile({
          activeArchetype: result.key,
          archetypeName: result.name,
          favoritePalettes: [result.key === 'darkwear' ? 'darkwear' : 'earth', 'monochrome'],
          preferredSilhouettes: ['tailored', 'wide', 'relaxed'],
          confidenceScore: 96
        });
      }, 1100);
    }
  };

  const handleResetQuiz = () => {
    soundFx.playClick();
    setCurrentStep(0);
    setAnswers([]);
    setDiagnosedArchetype(null);
    setIsCalculating(false);
  };

  const getItem = (id: string, list: GarmentItem[]) => {
    return list.find(item => item.id === id) || list[0];
  };

  return (
    <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-2 md:p-4 overflow-y-auto">
      <div className="bg-[#c0c0c0] win95-box max-w-4xl w-full max-h-[94vh] flex flex-col shadow-2xl my-auto select-none">
        
        {/* MODAL TITLE BAR */}
        <div className="bg-gradient-to-r from-[#000080] via-[#1b3d7a] to-[#000080] text-white px-2 py-1.5 flex items-center justify-between font-bold text-xs select-none">
          <div className="flex items-center gap-2">
            <Compass size={14} className="text-yellow-300" />
            <span className="tracking-wide">
              ATELIER SARTORIAL AI STYLIST — TASTE & ARCHETYPE CONSULTATION [v4.0]
            </span>
          </div>
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="w-5 h-5 bg-[#c0c0c0] text-black win95-btn flex items-center justify-center font-bold text-xs hover:bg-gray-300"
          >
            <X size={12} />
          </button>
        </div>

        {/* TAB NAVIGATION BAR */}
        <div className="bg-[#d4d0c8] border-b border-gray-400 px-3 pt-2 flex items-center gap-2 text-xs font-mono">
          <button
            onClick={() => { soundFx.playClick(); setActiveTab('quiz'); }}
            className={`px-3 py-1.5 win95-btn font-bold flex items-center gap-1.5 ${activeTab === 'quiz' ? 'bg-[#c0c0c0] border-b-0 -mb-[1px] text-blue-900' : 'bg-gray-300 text-gray-700'}`}
          >
            <Compass size={13} />
            <span>Personality Questionnaire (10 Archetypes)</span>
          </button>

          <button
            onClick={() => { soundFx.playClick(); setActiveTab('critique'); }}
            className={`px-3 py-1.5 win95-btn font-bold flex items-center gap-1.5 ${activeTab === 'critique' ? 'bg-[#c0c0c0] border-b-0 -mb-[1px] text-blue-900' : 'bg-gray-300 text-gray-700'}`}
          >
            <Award size={13} />
            <span>Live Fit Critique & Fashion Intelligence</span>
          </button>
        </div>

        {/* MODAL CONTENT AREA */}
        <div className="p-3 md:p-4 bg-[#d4d0c8] flex-1 overflow-y-auto win95-inward">
          
          {/* TAB 1: PERSONALITY QUIZ & ARCHETYPES */}
          {activeTab === 'quiz' && (
            <>
              {/* Question Phase */}
              {!isCalculating && !diagnosedArchetype && (
                <div className="flex flex-col gap-3">
                  <div className="bg-[#c0c0c0] win95-box p-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="bg-[#000080] text-white font-mono font-bold text-[10px] px-1.5 py-0.5">
                        STEP {currentStep + 1} OF {STYLIST_QUESTIONS.length}
                      </span>
                      <span className="font-bold text-xs text-gray-900 font-serif">
                        {currentQuestion.title}
                      </span>
                    </div>
                    <div className="flex gap-1">
                      {STYLIST_QUESTIONS.map((_, i) => (
                        <div
                          key={i}
                          className={`w-4 h-3 win95-inward ${i < currentStep ? 'bg-green-700' : (i === currentStep ? 'bg-yellow-400 animate-pulse' : 'bg-gray-300')}`}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="bg-white win95-inward p-3 text-center">
                    <h3 className="font-serif text-base md:text-lg font-bold text-gray-900 mb-1">
                      "{currentQuestion.prompt}"
                    </h3>
                    <p className="text-xs font-serif italic text-gray-600 max-w-xl mx-auto">
                      {currentQuestion.narrative}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 max-h-[50vh] overflow-y-auto pr-1">
                    {currentQuestion.options.map((option, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSelectOption(option.archetypeKey)}
                        className="bg-[#c0c0c0] hover:bg-white win95-btn p-2.5 flex items-start gap-3 text-left transition-colors group cursor-pointer"
                      >
                        <span className="text-2xl flex-shrink-0 group-hover:scale-110 transition-transform">
                          {option.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-xs md:text-sm text-blue-900 font-serif group-hover:text-black">
                            {option.text}
                          </div>
                          <div className="text-[11px] text-gray-700 font-mono mt-0.5 leading-snug">
                            {option.subtitle}
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Calculating Phase */}
              {isCalculating && (
                <div className="py-20 flex flex-col items-center justify-center text-center gap-4">
                  <div className="w-12 h-12 border-4 border-[#000080] border-t-yellow-400 rounded-full animate-spin" />
                  <div className="font-mono text-sm font-bold text-blue-900 uppercase tracking-widest animate-pulse">
                    ATELIER NEURAL STYLIST: ANALYZING SARTORIAL PROPORTIONS & TASTE...
                  </div>
                  <div className="text-xs font-mono text-gray-600 max-w-md">
                    Synthesizing fabric weights, silhouette draping rules, tonal color temperatures, and aesthetic subculture...
                  </div>
                </div>
              )}

              {/* Reveal Phase */}
              {!isCalculating && diagnosedArchetype && (
                <div className="flex flex-col gap-4">
                  <div className="bg-[#1b222d] win95-box p-4 text-white border-2 border-amber-400">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b border-gray-600 pb-2 mb-2">
                      <div>
                        <div className="text-[10px] font-mono text-amber-300 uppercase tracking-widest flex items-center gap-1.5">
                          <Sparkles size={12} className="animate-spin" />
                          CONFIRMED SARTORIAL ARCHETYPE
                        </div>
                        <h2 className="text-lg md:text-2xl font-serif font-black tracking-wide text-yellow-100">
                          {diagnosedArchetype.name}
                        </h2>
                        <div className="text-xs text-cyan-300 font-mono italic">
                          {diagnosedArchetype.tagline}
                        </div>
                      </div>

                      <div className="flex flex-col items-start md:items-end">
                        <span className="text-[9px] font-mono text-gray-400 uppercase">Recommended Color Palette</span>
                        <div className="flex gap-1.5 mt-1">
                          {diagnosedArchetype.colorPalette.map((c, i) => (
                            <div
                              key={i}
                              title={`${c.name} (${c.hex})`}
                              className="w-5 h-5 rounded-sm border border-white/60 shadow"
                              style={{ backgroundColor: c.hex }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="text-xs font-serif italic text-gray-200 mt-2 bg-black/40 p-2 border-l-2 border-amber-400">
                      "{diagnosedArchetype.quote}"
                    </div>

                    <div className="mt-3">
                      <div className="text-[10px] font-mono text-amber-200 uppercase font-bold mb-1">
                        Sartorial DNA Pillars:
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-1 text-[11px] font-mono text-gray-300">
                        {diagnosedArchetype.sartorialDna.map((item, idx) => (
                          <div key={idx} className="flex items-center gap-1.5">
                            <CheckCircle2 size={12} className="text-emerald-400 flex-shrink-0" />
                            <span className="truncate">{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-1.5">
                        <Wand2 size={16} className="text-purple-900" />
                        <h3 className="font-bold text-xs uppercase tracking-wide text-gray-900">
                          3 SIGNATURE CURATED LOOKS WITH STYLING SECRETS
                        </h3>
                      </div>
                      <button
                        onClick={handleResetQuiz}
                        className="text-[10px] font-mono bg-white win95-btn px-2 py-0.5 text-gray-800 flex items-center gap-1"
                      >
                        <RotateCcw size={10} />
                        Retake Test
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                      {diagnosedArchetype.signatureLooks.map((look, idx) => {
                        const topItem = getItem(look.topId, allTops);
                        const botItem = getItem(look.bottomId, allBottoms);
                        const shoeItem = getItem(look.shoeId, allShoes);

                        return (
                          <div
                            key={idx}
                            className="bg-[#c0c0c0] win95-box p-3 flex flex-col justify-between hover:bg-gray-100 transition-colors"
                          >
                            <div>
                              <div className="flex items-center justify-between border-b border-gray-400 pb-1 mb-2">
                                <span className="bg-[#000080] text-white font-mono text-[9px] px-1 py-0.2 font-bold">
                                  LOOK 0{idx + 1}
                                </span>
                                <span className="text-[10px] font-mono font-bold text-emerald-800">
                                  98% MATCH
                                </span>
                              </div>

                              <h4 className="font-serif font-bold text-xs text-blue-900 mb-1">
                                {look.title}
                              </h4>
                              <p className="text-[11px] text-gray-700 italic font-serif mb-2 leading-tight">
                                {look.description}
                              </p>

                              <div className="bg-white win95-inward p-2 space-y-1 text-[11px] font-mono text-gray-800 mb-2">
                                <div className="truncate">👕 {topItem.name}</div>
                                <div className="truncate">👖 {botItem.name}</div>
                                <div className="truncate">👞 {shoeItem.name}</div>
                              </div>

                              <div className="bg-amber-50 border border-amber-300 p-1.5 text-[10px] font-mono text-amber-900 mb-3 flex items-start gap-1">
                                <Lightbulb size={12} className="flex-shrink-0 mt-0.5 text-amber-700" />
                                <span><strong>Styling Secret:</strong> {look.stylingSecret}</span>
                              </div>
                            </div>

                            <button
                              onClick={() => {
                                soundFx.playMatch();
                                onApplyOutfit(look.topId, look.bottomId, look.shoeId, diagnosedArchetype.name);
                                onClose();
                              }}
                              className="w-full bg-[#000080] hover:bg-blue-900 text-white font-mono font-bold text-xs py-2 px-2 win95-btn flex items-center justify-center gap-1.5 shadow"
                            >
                              <ArrowRight size={13} />
                              <span>Wear This Look on 3D Mannequin</span>
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}

          {/* TAB 2: LIVE FASHION DIRECTOR CRITIQUE & INTELLIGENCE */}
          {activeTab === 'critique' && (
            <div className="flex flex-col gap-3">
              <div className="bg-white win95-inward p-3">
                <div className="flex items-center justify-between border-b border-gray-300 pb-2 mb-2">
                  <div>
                    <h3 className="font-serif font-bold text-sm text-gray-900">
                      SARTORIAL CRITIQUE OF CURRENT ENSEMBLE
                    </h3>
                    <div className="text-xs text-gray-600 font-mono">
                      {currentEquipped.top.name} + {currentEquipped.bottom.name} + {currentEquipped.shoes.name}
                    </div>
                  </div>
                  <span className={`px-2 py-1 font-mono font-bold text-xs ${evaluation?.status === 'match' ? 'bg-emerald-700 text-white' : 'bg-red-600 text-yellow-200'}`}>
                    {evaluation?.status === 'match' ? `COHESION: ${evaluation.score}%` : 'MIS-MATCH DETECTED'}
                  </span>
                </div>

                <div className="text-xs font-serif italic text-gray-800 bg-[#f7f5f0] p-2.5 border-l-3 border-blue-900 mb-3">
                  "{evaluation?.critique}"
                </div>

                {/* 4 Pillars Breakdown */}
                {evaluation?.breakdown && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs font-mono">
                    <div className="bg-gray-50 win95-inward p-2">
                      <div className="flex justify-between font-bold text-gray-800 mb-1">
                        <span>1. Silhouette & Proportions:</span>
                        <span className="text-blue-900">{evaluation.breakdown.silhouetteProportion.score}%</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {evaluation.breakdown.silhouetteProportion.verdict}
                      </p>
                    </div>

                    <div className="bg-gray-50 win95-inward p-2">
                      <div className="flex justify-between font-bold text-gray-800 mb-1">
                        <span>2. Fabric Texture Synergy:</span>
                        <span className="text-blue-900">{evaluation.breakdown.fabricSynergy.score}%</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {evaluation.breakdown.fabricSynergy.verdict}
                      </p>
                    </div>

                    <div className="bg-gray-50 win95-inward p-2">
                      <div className="flex justify-between font-bold text-gray-800 mb-1">
                        <span>3. Color Temperature Harmony:</span>
                        <span className="text-blue-900">{evaluation.breakdown.colorTemperature.score}%</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {evaluation.breakdown.colorTemperature.verdict}
                      </p>
                    </div>

                    <div className="bg-gray-50 win95-inward p-2">
                      <div className="flex justify-between font-bold text-gray-800 mb-1">
                        <span>4. Formality Spectrum:</span>
                        <span className="text-blue-900">{evaluation.breakdown.formalityGrade.score}%</span>
                      </div>
                      <p className="text-[11px] text-gray-600 leading-snug">
                        {evaluation.breakdown.formalityGrade.verdict}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Recommended Occasions */}
              {evaluation?.suitableOccasions && (
                <div className="bg-[#c0c0c0] win95-box p-3">
                  <div className="text-xs font-mono font-bold text-blue-900 uppercase mb-1.5">
                    Recommended Occasion Contexts:
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {evaluation.suitableOccasions.map((occ, i) => (
                      <span key={i} className="text-xs bg-white win95-inward px-2.5 py-1 font-mono text-gray-800 font-bold">
                        📍 {occ}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

        </div>

        {/* FOOTER */}
        <div className="p-2 bg-[#c0c0c0] border-t border-white flex justify-end">
          <button
            onClick={() => { soundFx.playClick(); onClose(); }}
            className="bg-[#c0c0c0] win95-btn px-4 py-1 text-xs font-bold hover:bg-gray-200"
          >
            Close Consultation
          </button>
        </div>

      </div>
    </div>
  );
};
