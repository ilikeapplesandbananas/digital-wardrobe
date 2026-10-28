import { GarmentItem, OutfitEvaluation, SartorialTasteProfile } from '../types/wardrobe';

export const evaluateOutfit = (
  top: GarmentItem,
  bottom: GarmentItem,
  shoes: GarmentItem,
  userProfile?: SartorialTasteProfile | null
): OutfitEvaluation => {
  // 1. FORMALITY COMPATIBILITY
  const formalityScores = {
    'casual': 1,
    'streetwear': 2,
    'smart-casual': 3,
    'formal': 4,
    'avant-garde': 4
  };

  const fTop = formalityScores[top.formality] || 2;
  const fBot = formalityScores[bottom.formality] || 2;
  const fShoe = formalityScores[shoes.formality] || 2;
  const maxFormalityDiff = Math.max(Math.abs(fTop - fBot), Math.abs(fBot - fShoe), Math.abs(fTop - fShoe));

  // 2. SILHOUETTE PROPORTION DYNAMICS
  let silhouetteScore = 85;
  let silhouetteVerdict = "Balanced proportions between upper and lower body silhouettes.";

  // Rule 1: Boxy / Cropped Top + Wide / Baggy Pants (A-Silhouette) = Elite
  if ((top.silhouetteCut === 'boxy' || top.silhouetteCut === 'tailored') && (bottom.silhouetteCut === 'wide' || bottom.silhouetteCut === 'baggy')) {
    silhouetteScore = 97;
    silhouetteVerdict = "The Rule of Thirds in full effect: the structured upper torso creates a flattering pedestal for the fluid, wide-leg lower drape.";
  }
  // Rule 2: Fitted Knit / Slim Top + Wide Pleated Trousers (V-Silhouette) = Elite Sprezzatura
  else if (top.silhouetteCut === 'slim' && (bottom.silhouetteCut === 'wide' || bottom.silhouetteCut === 'relaxed')) {
    silhouetteScore = 96;
    silhouetteVerdict = "Classic Mediterranean tailoring balance: a contoured torso line contrasts exquisitely with the sweeping hem drape.";
  }
  // Rule 3: Oversized + Drop-Crotch / Wide (Avant-Garde Architectural)
  else if ((top.silhouetteCut === 'oversized' || top.silhouetteCut === 'boxy') && (bottom.silhouetteCut === 'drop-crotch' || bottom.silhouetteCut === 'wide')) {
    silhouetteScore = 95;
    silhouetteVerdict = "Intentional sculptural volume: negative space around the limbs creates an editorial runway silhouette.";
  }
  // Rule 4: Slim + Slim (British Mod Precision)
  else if (top.silhouetteCut === 'slim' && bottom.silhouetteCut === 'slim') {
    silhouetteScore = 92;
    silhouetteVerdict = "Clean razor-sharp 1960s/90s Mod geometry with zero excess fabric bulk.";
  }
  // Conflict: Heavy Oversized Outerwear with Skinny Lower Proportion without transition
  else if (top.silhouetteCut === 'oversized' && bottom.silhouetteCut === 'slim') {
    silhouetteScore = 70;
    silhouetteVerdict = "Top-heavy silhouette imbalance: the voluminous upper layer risks overpowering the slender lower foundation.";
  }

  // 3. FABRIC SYNERGY
  let fabricScore = 85;
  let fabricVerdict = "Complementary tactile weights and weaves.";

  const isSilk = top.fabricTexture === 'silk' || bottom.fabricTexture === 'silk';
  const isLinen = top.fabricTexture === 'linen' || bottom.fabricTexture === 'linen';
  const isLeather = top.fabricTexture === 'leather' || bottom.fabricTexture === 'leather' || shoes.fabricTexture === 'leather';
  const isWool = top.fabricTexture === 'wool' || bottom.fabricTexture === 'wool';
  const isDenim = top.fabricTexture === 'denim' || bottom.fabricTexture === 'denim';
  const isTechNylon = top.fabricTexture === 'nylon' || bottom.fabricTexture === 'nylon';

  if (isSilk && isLinen) {
    fabricScore = 99;
    fabricVerdict = "Noble warm-weather synergy: the fluid luster of mulberry silk glides effortlessly against the textured breath of natural Belgian linen.";
  } else if (isWool && isLeather) {
    fabricScore = 96;
    fabricVerdict = "Tactile luxury: matte high-twist wool absorbs light while polished calfskin reflects it with rich, deep highlights.";
  } else if (top.fabricTexture === 'fleece' && bottom.fabricTexture === 'canvas') {
    fabricScore = 98;
    fabricVerdict = "Authentic workwear/skate synergy: heavy 500GSM brushed cotton fleece softens the rigid durability of duck canvas.";
  } else if (top.fabricTexture === 'denim' && bottom.fabricTexture === 'denim' && top.baseColor !== bottom.baseColor) {
    fabricScore = 94;
    fabricVerdict = "Modern Americana mastery: contrasting denim washes break up the silhouette and prevent monochrome fatigue.";
  } else if (isTechNylon && bottom.fabricTexture === 'nylon') {
    fabricScore = 95;
    fabricVerdict = "Ergonomic technical performance: weather-resistant ripstop membranes align in seamless utilitarian harmony.";
  }

  // 4. COLOR TEMPERATURE & TONAL HARMONY
  let colorScore = 88;
  let colorVerdict = "Cohesive color temperature across the ensemble.";

  if (top.palette === bottom.palette && top.palette !== 'loud') {
    colorScore = 98;
    colorVerdict = `Sophisticated tonal dressing: the unified ${top.palette} spectrum conveys effortless sprezzatura and deliberate curation.`;
  } else if ((top.palette === 'earth' && bottom.palette === 'cool') || (top.palette === 'cool' && bottom.palette === 'earth')) {
    colorScore = 93;
    colorVerdict = "Classic temperate counterpoint: balancing rich warm earth tones against crisp cool indigo and sky chambray.";
  } else if (top.palette === 'darkwear' && bottom.palette === 'darkwear') {
    colorScore = 99;
    colorVerdict = "Masterful anti-fashion depth: layering varying shades of raven black, obsidian, and coal creates sculptural depth rather than flat darkness.";
  } else if (top.palette === 'loud' && bottom.palette === 'formal') {
    colorScore = 45;
    colorVerdict = "Severe chromatic friction: electric saturated neon violently disrupts formal suiting without an intentional bridge.";
  }

  // 5. SEVERE CLASH DETECTION
  const isSevereClash =
    (top.id === 'top-blazer' && bottom.id === 'bot-baggy-acid' && shoes.id === 'shoe-skate') ||
    (top.id === 'top-windbreaker' && bottom.id === 'bot-pleated' && shoes.id === 'shoe-derby') ||
    (top.id === 'top-hoodie' && bottom.id === 'bot-pleated' && shoes.id === 'shoe-derby') ||
    (top.id === 'top-camp-silk' && bottom.id === 'bot-wabash' && shoes.id === 'shoe-redwing-moc') ||
    (top.id === 'top-blanket-chore' && bottom.id === 'bot-bermuda' && shoes.id === 'shoe-derby') ||
    (maxFormalityDiff >= 3 && top.palette === 'loud');

  if (isSevereClash) {
    const reasons = [
      `As IF! Power-tailored ${top.name} with ${shoes.name}? Major sartorial crime!`,
      `Sartorial friction: Boardroom suiting with raw street skate pieces without an ironic transition layer!`,
      `Fashion emergency: The drape of the ${bottom.name} completely clashes with the structure of the ${top.name}.`,
      `Proportion crisis: Color temperature, fabric weight, and silhouette volumes are in direct opposition.`
    ];

    return {
      status: 'mismatch',
      score: Math.floor(22 + Math.random() * 16),
      title: 'MIS-MATCH!',
      critique: reasons[Math.floor(Math.random() * reasons.length)],
      recommendation: `Try swapping the ${shoes.formality === 'formal' ? 'formal footwear for loafers or clean minimal sneakers' : 'pants for tailored trousers'}.`,
      breakdown: {
        silhouetteProportion: { score: 35, verdict: "Discordant silhouetting; top and bottom fight for dominance." },
        fabricSynergy: { score: 30, verdict: "Clashing fabric weights and contradictory tactile finishes." },
        colorTemperature: { score: 40, verdict: "Chromatic dissonance without a bridging neutral." },
        formalityGrade: { score: 25, verdict: "Formality levels are in severe conflict (formal vs raw skate)." }
      },
      suitableOccasions: ['Costume Party Only', 'Avant-Garde Irony Experiment']
    };
  }

  // 6. CURATED VIBE ARCHETYPES & OCCASIONS
  let vibeName = "90s Downtown Minimalist";
  let suitableOccasions = ["Gallery Stroll", "Creative Studio", "Casual Dinner"];

  if (top.id === 'top-blazer' && bottom.id === 'bot-pleated') {
    vibeName = "Richard Gere in Armani / 1990 Wall Street Power";
    suitableOccasions = ["Private Dinner Party", "Milan Fashion Salon", "Executive Meeting"];
  } else if (top.id === 'top-blazer' && bottom.id === 'bot-selvedge') {
    vibeName = "SoHo Art Director / Smart Casual Sprezzatura";
    suitableOccasions = ["Gallery Opening", "Cocktail Hour", "Creative Pitch"];
  } else if (top.id === 'top-hoodie' && bottom.id === 'bot-carpenter') {
    vibeName = "1995 Beastie Boys / Brooklyn Slouch";
    suitableOccasions = ["Skate Session", "Weekend Record Hunting", "Late Night Diner"];
  } else if (top.id === 'top-polo' && bottom.id === 'bot-pleated') {
    vibeName = "Jude Law in The Talented Mr. Ripley";
    suitableOccasions = ["Sunday Brunch", "Summer Speakeasy", "Riviera Terrace"];
  } else if (top.id === 'top-oxford' && bottom.id === 'bot-selvedge') {
    vibeName = "Kennedy Prep / Classic American Ivy";
    suitableOccasions = ["University Lecture", "Hamptons Weekend", "Casual Friday"];
  } else if (top.id === 'top-dark-kimono' && bottom.id === 'bot-yohji') {
    vibeName = "Tokyo Runway Poet / Deconstructed Avant-Garde";
    suitableOccasions = ["Paris Fashion Week", "Experimental Exhibition", "Midnight Studio Session"];
  } else if (top.id === 'top-harrington' && bottom.id === 'bot-mod-check') {
    vibeName = "1995 Oasis Knebworth / British Mod Swagger";
    suitableOccasions = ["Indie Concert", "Camden Pub", "Vinyl Listening Bar"];
  } else if (top.id === 'top-camp-silk' && bottom.id === 'bot-linen') {
    vibeName = "Cap d'Antibes Riviera Quiet Luxury";
    suitableOccasions = ["Seaside Sunset Dinner", "Yacht Deck", "Resort Lounge"];
  } else if (top.id === 'top-shell-jacket' && bottom.id === 'bot-fidlock-cargo') {
    vibeName = "Berlin Subterranean / Cyber Techwear Operator";
    suitableOccasions = ["Rainstorm Commute", "Techno Warehouse", "Urban Exploration"];
  } else if (top.id === 'top-blanket-chore' && bottom.id === 'bot-wabash') {
    vibeName = "Railroad Heritage / Double RL Craftsman";
    suitableOccasions = ["Makers Workshop", "Pacific Northwest Hike", "Fireside Gathering"];
  }

  // Taste personalization bonus
  let tasteBonus = 0;
  if (userProfile && userProfile.activeArchetype) {
    if (top.tags.some(t => userProfile.preferredSilhouettes.includes(t as any))) tasteBonus += 2;
    if (userProfile.favoritePalettes.includes(top.palette)) tasteBonus += 2;
  }

  const finalScore = Math.min(100, Math.round((silhouetteScore * 0.35 + fabricScore * 0.35 + colorScore * 0.3) + tasteBonus));

  return {
    status: 'match',
    score: finalScore,
    title: 'TOTALLY EN VOGUE!',
    critique: `Exquisite cohesion! The drape of the ${top.name} perfectly compliments the ${bottom.name} with ${shoes.name} grounding the silhouette. Totally ready for Rodeo Drive.`,
    vibe: vibeName,
    breakdown: {
      silhouetteProportion: { score: silhouetteScore, verdict: silhouetteVerdict },
      fabricSynergy: { score: fabricScore, verdict: fabricVerdict },
      colorTemperature: { score: colorScore, verdict: colorVerdict },
      formalityGrade: { score: 94, verdict: "Harmonious balance of formality across garments." }
    },
    suitableOccasions
  };
};
