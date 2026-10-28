export type Formality = 'casual' | 'streetwear' | 'smart-casual' | 'formal' | 'avant-garde';
export type Palette = 'earth' | 'monochrome' | 'cool' | 'loud' | 'warm' | 'pastel' | 'darkwear';
export type Category = 'top' | 'bottom' | 'shoes' | 'accessory';
export type FabricTexture = 'wool' | 'denim' | 'fleece' | 'silk' | 'canvas' | 'leather' | 'nylon' | 'cotton' | 'linen' | 'corduroy';
export type SilhouetteCut = 'boxy' | 'relaxed' | 'tailored' | 'slim' | 'oversized' | 'wide' | 'baggy' | 'drop-crotch';

export type ArchetypeKey = 
  | 'sprezzatura'
  | 'grungeSkate'
  | 'minimalist'
  | 'neoIvy'
  | 'gorpcore'
  | 'darkwear'
  | 'britMod'
  | 'quietLuxury'
  | 'cyberTech'
  | 'americana';

export interface GarmentItem {
  id: string;
  name: string;
  brand: string;
  category: Category;
  formality: Formality;
  palette: Palette;
  colorName: string;
  baseColor: string;
  accentColor: string;
  vibe: string;
  tags: string[];
  renderKey: string;
  fabricTexture: FabricTexture;
  silhouetteCut: SilhouetteCut;
  customImageUrl?: string;
  isCustom?: boolean;
}

export interface OutfitEvaluation {
  status: 'match' | 'mismatch';
  score: number;
  title: string;
  critique: string;
  vibe?: string;
  recommendation?: string;
  breakdown: {
    silhouetteProportion: { score: number; verdict: string };
    fabricSynergy: { score: number; verdict: string };
    colorTemperature: { score: number; verdict: string };
    formalityGrade: { score: number; verdict: string };
  };
  suitableOccasions: string[];
}

export interface SavedOutfit {
  id: string;
  title: string;
  top: GarmentItem;
  bottom: GarmentItem;
  shoes: GarmentItem;
  score: number;
  date: string;
  archetype?: string;
  notes?: string;
}

export interface FittingCalibration {
  scale: number; // 0.8 to 1.3
  offsetX: number; // -50 to 50
  offsetY: number; // -50 to 50
  opacity: number; // 0.5 to 1.0
  showGhostOutline: boolean;
  bodyType: '3d-sculpted' | 'custom-photo' | 'preset-lean' | 'preset-athletic' | 'preset-relaxed';
  turntableAngle: number; // 0 (front), 35 (3/4 right), -35 (3/4 left), 90 (profile)
  lightingMood: 'studio' | 'chiaroscuro' | 'neon90s';
  userPhotoUrl?: string;
}

export interface StylistQuestionOption {
  text: string;
  subtitle: string;
  icon: string;
  archetypeKey: ArchetypeKey;
}

export interface StylistQuestion {
  id: number;
  title: string;
  prompt: string;
  narrative: string;
  options: StylistQuestionOption[];
}

export interface MenswearArchetype {
  id: string;
  key: ArchetypeKey;
  name: string;
  title: string;
  tagline: string;
  quote: string;
  sartorialDna: string[];
  colorPalette: { name: string; hex: string }[];
  signatureLooks: {
    title: string;
    description: string;
    topId: string;
    bottomId: string;
    shoeId: string;
    stylingSecret: string;
  }[];
}

export interface SartorialTasteProfile {
  activeArchetype: ArchetypeKey;
  archetypeName: string;
  favoritePalettes: Palette[];
  preferredSilhouettes: SilhouetteCut[];
  confidenceScore: number;
}
