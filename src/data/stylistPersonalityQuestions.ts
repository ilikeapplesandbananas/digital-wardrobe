import { StylistQuestion, MenswearArchetype } from '../types/wardrobe';

export const STYLIST_QUESTIONS: StylistQuestion[] = [
  {
    id: 1,
    title: 'The Architecture of Sanctuary',
    prompt: 'Where does your mind naturally drift when the world falls quiet?',
    narrative: 'Personal style is anchored first in the architecture of your dreams.',
    options: [
      {
        text: 'A Sunlit Palazzo on Lake Como',
        subtitle: 'Terrazzo floors, linen drapery, and a cold espresso at noon.',
        icon: '🏛️',
        archetypeKey: 'sprezzatura'
      },
      {
        text: 'A Concrete Loft in Lower Manhattan',
        subtitle: '1994 cassette tapes, exposed steel beams, and rain against warehouse glass.',
        icon: '🏙️',
        archetypeKey: 'grungeSkate'
      },
      {
        text: 'A Monastic Cedar Pavilion in Kyoto',
        subtitle: 'Clean geometric lines, raked gravel, and absolute silence.',
        icon: '⛩️',
        archetypeKey: 'minimalist'
      },
      {
        text: 'An Antique Library in Oxford',
        subtitle: 'Aged mahogany shelves, worn leather tomes, and green shaded desk lamps.',
        icon: '📚',
        archetypeKey: 'neoIvy'
      },
      {
        text: 'A Glass Alpine Observatory in the Alps',
        subtitle: 'Crisp mountain air, summit mist, and technical high-altitude gear.',
        icon: '⛰️',
        archetypeKey: 'gorpcore'
      },
      {
        text: 'A Brutalist Concrete Bunker in Neo-Tokyo',
        subtitle: 'Charcoal shadows, neon reflections in black asphalt, and deconstructed art.',
        icon: '🌑',
        archetypeKey: 'darkwear'
      },
      {
        text: 'A Carnaby Street Record Shop in London',
        subtitle: 'Vintage vinyl, sharp trench coats, and 90s Britpop basslines.',
        icon: '🇬🇧',
        archetypeKey: 'britMod'
      },
      {
        text: 'A Cap d\'Antibes Waterfront Villa',
        subtitle: 'Unbuttoned silk, Mediterranean sea spray, and chilled white wine.',
        icon: '⛵',
        archetypeKey: 'quietLuxury'
      },
      {
        text: 'A High-Tech Subterranean Cyber Lab',
        subtitle: 'Ergonomic hardware, waterproof ripstop membranes, and modular gear.',
        icon: '⚡',
        archetypeKey: 'cyberTech'
      },
      {
        text: 'A Timber Cabin in the Pacific Northwest',
        subtitle: 'Heavy canvas, woodsmoke, aged leather boots, and roaring iron stoves.',
        icon: '🪵',
        archetypeKey: 'americana'
      }
    ]
  },
  {
    id: 2,
    title: 'The Silhouette & Social Aura',
    prompt: 'How do you command attention when entering an eclectic gathering?',
    narrative: 'Presence is not about volume; it is about deliberate harmony between posture and fabric.',
    options: [
      {
        text: 'Nonchalant Sprezzatura',
        subtitle: 'Unstudied ease. Peak lapels, an unbuttoned cuff, and fluid high-waist trousers.',
        icon: '🍸',
        archetypeKey: 'sprezzatura'
      },
      {
        text: 'Raw Subcultural Swagger',
        subtitle: 'Oversized boxy proportions, dropped shoulders, and heavy skate sneakers.',
        icon: '🛹',
        archetypeKey: 'grungeSkate'
      },
      {
        text: 'Architectural Restraint',
        subtitle: 'Monochrome precision. Zero unnecessary details, pure silhouette and form.',
        icon: '📐',
        archetypeKey: 'minimalist'
      },
      {
        text: 'Collegiate Charm',
        subtitle: 'Button-down collar roll, crisp raw selvedge cuffs, and sand suede shoes.',
        icon: '🎓',
        archetypeKey: 'neoIvy'
      },
      {
        text: 'Electric Utilitarianism',
        subtitle: 'Vibrant colorblock contrasts, technical nylon textures, and trail-ready grip.',
        icon: '🧭',
        archetypeKey: 'gorpcore'
      },
      {
        text: 'Sculptural Deconstruction',
        subtitle: 'Fluid asymmetrical coats, drop-crotch gabardine, and anti-fashion poetry.',
        icon: '🖤',
        archetypeKey: 'darkwear'
      },
      {
        text: 'Sharp British Mod Tailoring',
        subtitle: 'Cropped houndstooth trousers, Harrington jacket, and polished Cherry Red derbies.',
        icon: '🎸',
        archetypeKey: 'britMod'
      },
      {
        text: 'Unstudied Riviera Luxury',
        subtitle: 'Silk-linen camp collar, natural linen trousers, and hand-turned Belgian slippers.',
        icon: '🏖️',
        archetypeKey: 'quietLuxury'
      },
      {
        text: 'Tactical Cyber Ergonomics',
        subtitle: 'Gore-Tex shells, Fidlock buckles, articulated cargo pockets, and trail tech.',
        icon: '🥷',
        archetypeKey: 'cyberTech'
      },
      {
        text: 'Heirloom Heritage Workwear',
        subtitle: '16oz blanket-lined canvas chore coat, raw denim, and Goodyear-welted boots.',
        icon: '🔨',
        archetypeKey: 'americana'
      }
    ]
  },
  {
    id: 3,
    title: 'The Olfactory Signature',
    prompt: 'What sensory aroma defines your nocturnal atmosphere?',
    narrative: 'Scent is the invisible layer of tailoring that lingers long after you depart.',
    options: [
      {
        text: 'Tuscan Tobacco & Warm Amber',
        subtitle: 'Smoky cedar, sun-dried leather, and vintage Italian amaro.',
        icon: '🥃',
        archetypeKey: 'sprezzatura'
      },
      {
        text: 'Damp Asphalt & Heavy Fleece',
        subtitle: 'Rain on Brooklyn pavement, vinyl record sleeves, and cold black coffee.',
        icon: '🌧️',
        archetypeKey: 'grungeSkate'
      },
      {
        text: 'Dry Iris, Vetiver & White Musk',
        subtitle: 'Cool crisp paper, distilled bergamot, and metallic minimalism.',
        icon: '🌫️',
        archetypeKey: 'minimalist'
      },
      {
        text: 'Antique Saddle Leather & Bay Rum',
        subtitle: 'Cashmere warmth, pipe tobacco, and fresh autumn oak leaves.',
        icon: '🍂',
        archetypeKey: 'neoIvy'
      },
      {
        text: 'Pine Needle, Ozone & Glacial River',
        subtitle: 'Crisp mountain wind, damp moss, and waterproof ripstop nylon.',
        icon: '🌲',
        archetypeKey: 'gorpcore'
      },
      {
        text: 'Smoky Incense & Japanese Sumi Ink',
        subtitle: 'Dark wood resin, charred vetiver, and midnight rain.',
        icon: '🪔',
        archetypeKey: 'darkwear'
      },
      {
        text: 'Black Tea, Rain on Wool & Bitter Citrus',
        subtitle: 'Camden Town dampness, fine merino, and vintage aftershave.',
        icon: '🫖',
        archetypeKey: 'britMod'
      },
      {
        text: 'Fig Leaf, Orange Blossom & Salty Sea Air',
        subtitle: 'Warm afternoon stone, wild cypress, and sunlit terracotta.',
        icon: '🍊',
        archetypeKey: 'quietLuxury'
      },
      {
        text: 'Ionized Ozone & Synthetic Polymer',
        subtitle: 'Late night server rooms, carbon fiber, and storm rain on Gore-Tex.',
        icon: '💻',
        archetypeKey: 'cyberTech'
      },
      {
        text: 'Beeswax, Raw Denim Cotton & Aged Oak',
        subtitle: 'Workshop sawdust, cedarwood shavings, and vintage workboots.',
        icon: '🪵',
        archetypeKey: 'americana'
      }
    ]
  },
  {
    id: 4,
    title: 'The Sartorial Creed',
    prompt: 'What philosophy dictates the clothes hanging in your wardrobe?',
    narrative: 'A gentleman does not follow trends; his closet is a curated manifesto of his worldview.',
    options: [
      {
        text: '"Tailoring is an art of drape, movement, and effortless grace."',
        subtitle: 'Noble wools, relaxed shoulders, and bespoke Neapolitan craft.',
        icon: '✂️',
        archetypeKey: 'sprezzatura'
      },
      {
        text: '"Authenticity lies in heavy cotton, skate scars, and washed heritage."',
        subtitle: 'Every scuff on the sneakers and fade in the denim tells a real story.',
        icon: '🛹',
        archetypeKey: 'grungeSkate'
      },
      {
        text: '"Perfection is reached when nothing more can be taken away."',
        subtitle: 'Quiet luxury, sculptural tailoring, and pristine tonal harmony.',
        icon: '🖤',
        archetypeKey: 'minimalist'
      },
      {
        text: '"Tradition reinvented with youthful irony and sharp wit."',
        subtitle: 'Timeless Ivy pieces worn with nonchalance and modern attitude.',
        icon: '👔',
        archetypeKey: 'neoIvy'
      },
      {
        text: '"Form and function are one; beauty must withstand the elements."',
        subtitle: 'Weather-sealed membranes, modular pockets, and ergonomic silhouettes.',
        icon: '🧭',
        archetypeKey: 'gorpcore'
      },
      {
        text: '"Black is the color of infinite depth and intellectual freedom."',
        subtitle: 'Subverting western tailoring through deconstructed Japanese asymmetry.',
        icon: '🌑',
        archetypeKey: 'darkwear'
      },
      {
        text: '"Sharpness is a discipline; tailored attitude cuts through any room."',
        subtitle: 'Clean geometric lines, micro-checks, and rock-and-roll precision.',
        icon: '🎸',
        archetypeKey: 'britMod'
      },
      {
        text: '"True luxury whispers; it is felt in the hand and the breath of the weave."',
        subtitle: 'Unlined silk-linen, cashmere layers, and effortless seaside ease.',
        icon: '🌊',
        archetypeKey: 'quietLuxury'
      },
      {
        text: '"The body is an interface; garments are modular armor for the future."',
        subtitle: 'Articulated joints, gravity-pockets, and waterproof technical membranes.',
        icon: '⚡',
        archetypeKey: 'cyberTech'
      },
      {
        text: '"Heirloom durability outlives fleeting fashion cycles."',
        subtitle: 'Double-needle stitching, raw indigo selvedge, and heavy-duty canvas.',
        icon: '🔨',
        archetypeKey: 'americana'
      }
    ]
  },
  {
    id: 5,
    title: 'The Midnight Sanctuary',
    prompt: 'Where will we find you at 1:30 AM on a Friday evening?',
    narrative: 'The night reveals the true spirit beneath the daylight facade.',
    options: [
      {
        text: 'At a dim candlelit marble bar debating art with friends',
        subtitle: 'Negroni in hand, coat casually draped over the shoulders.',
        icon: '🥂',
        archetypeKey: 'sprezzatura'
      },
      {
        text: 'Underground basement club or late-night diner booth',
        subtitle: 'Headphones resting on the collar, laughing over greasy fries.',
        icon: '🍟',
        archetypeKey: 'grungeSkate'
      },
      {
        text: 'Private gallery viewing or minimalist rooftop terrace',
        subtitle: 'Sipping sparkling water, contemplating modern sculpture under the stars.',
        icon: '🌃',
        archetypeKey: 'minimalist'
      },
      {
        text: 'Late-night study session or speakeasy vinyl lounge',
        subtitle: 'Enjoying deep cuts on 33 RPM vinyl with vintage scotch.',
        icon: '🎷',
        archetypeKey: 'neoIvy'
      },
      {
        text: 'Urban night hike or warehouse rave with industrial beats',
        subtitle: 'Moving effortlessly through city fog in weatherproof technical layers.',
        icon: '🔦',
        archetypeKey: 'gorpcore'
      },
      {
        text: 'Solitary midnight studio session sketching or listening to dark ambient',
        subtitle: 'Surrounded by charcoal drawings, draped in oversized black wool.',
        icon: '🕯️',
        archetypeKey: 'darkwear'
      },
      {
        text: 'Lively Soho pub or live indie gig in North London',
        subtitle: 'Singing along with friends in a crisp Harrington and Chelsea boots.',
        icon: '🍻',
        archetypeKey: 'britMod'
      },
      {
        text: 'Midnight yacht deck or seaside balcony enjoying sea breeze',
        subtitle: 'Unbuttoned silk shirt fluttering in the warm Mediterranean night air.',
        icon: '🌙',
        archetypeKey: 'quietLuxury'
      },
      {
        text: 'Late night coding marathon or subterranean techno sanctuary',
        subtitle: 'Ergonomic sling bag across the chest, moving with cyber speed.',
        icon: '⚡',
        archetypeKey: 'cyberTech'
      },
      {
        text: 'Gathered around a campfire under starry mountain skies',
        subtitle: 'Sipping bourbon from a tin cup, warming up in heavy canvas and wool.',
        icon: '🔥',
        archetypeKey: 'americana'
      }
    ]
  }
];

export const MENSWEAR_ARCHETYPES: Record<string, MenswearArchetype> = {
  sprezzatura: {
    id: 'arch-sprezzatura',
    key: 'sprezzatura',
    name: 'The Neapolitan Sprezzatura Savant',
    title: 'The Master of Effortless Elegance',
    tagline: 'Wall Street Power meets Mediterranean Nonchalance',
    quote: 'True elegance consists in not being noticed, until someone looks closely.',
    sartorialDna: [
      'Unstructured double-breasted camel wool blazers with peak lapels',
      'High-waisted wide-leg twin-pleat trousers with fluid ankle drape',
      'Chunky lug-sole penny loafers in deep oxblood cordovan leather',
      'Unbuttoned collar rolls, silk pocket squares, and horn buttons'
    ],
    colorPalette: [
      { name: 'Camel Melange', hex: '#bfa278' },
      { name: 'Toasted Espresso', hex: '#4a3728' },
      { name: 'Oxblood Cordovan', hex: '#4d1c24' },
      { name: 'Oatmeal Cream', hex: '#ece5d8' }
    ],
    signatureLooks: [
      {
        title: 'The Tribeca Power Merchant',
        description: 'Double-breasted camel blazer with wide twin-pleat trousers and oxblood lug loafers.',
        topId: 'top-blazer',
        bottomId: 'bot-pleated',
        shoeId: 'shoe-loafer',
        stylingSecret: 'Keep the bottom button unbuttoned to allow fluid jacket flare as you walk.'
      },
      {
        title: 'Portofino Afternoon Sprezzatura',
        description: 'Sage knit zip polo with relaxed pleated linen chinos and Belgian suede loafers.',
        topId: 'top-polo',
        bottomId: 'bot-linen',
        shoeId: 'shoe-belgian-loafer',
        stylingSecret: 'Roll trousers just once at the hem to showcase sockless leather.'
      },
      {
        title: 'Autumn Neapolitan Gentleman',
        description: 'Cashmere fisherman sweater with heavy flannel trousers and commando derbies.',
        topId: 'top-fisherman',
        bottomId: 'bot-flannel-trouser',
        shoeId: 'shoe-derby',
        stylingSecret: 'Tuck the front hem slightly into the waistband for proportional waist definition.'
      }
    ]
  },

  grungeSkate: {
    id: 'arch-grunge',
    key: 'grungeSkate',
    name: 'The 1994 SoHo Skate & Grunge Alchemist',
    title: 'The Golden Era Subculturalist',
    tagline: 'East Coast Skate Roots & Pacific Northwest Grunge',
    quote: 'Proportions are rebellion; heavy fleece and faded denim speak louder than words.',
    sartorialDna: [
      '500GSM heavyweight fleece drop-shoulder boxy hoodies',
      'Duck canvas carpenter pants with reinforced double-knees and hammer loops',
      'Puffy vulcanized skate sneakers with contrast gum outsoles',
      'Washed vintage graphic tees layered under raw denim jackets'
    ],
    colorPalette: [
      { name: 'Heather Ash Grey', hex: '#c5cad0' },
      { name: 'Hamilton Brown', hex: '#aa7a44' },
      { name: 'Acid Sky Wash', hex: '#a2c4e2' },
      { name: 'Faded Black', hex: '#2f3136' }
    ],
    signatureLooks: [
      {
        title: '1995 Beastie Boys Brooklyn Slouch',
        description: 'Boxy 500GSM ash hoodie with Carhartt carpenter pants and puffy DC skate kicks.',
        topId: 'top-hoodie',
        bottomId: 'bot-carpenter',
        shoeId: 'shoe-skate',
        stylingSecret: 'Stack the canvas hem intentionally over the puffy tongue of the skate shoes.'
      },
      {
        title: 'Kurt Cobain Pacific Northwest Slouch',
        description: 'Washed Stüssy boxy tee with ultra-baggy bleach wash denim and dad runners.',
        topId: 'top-tee',
        bottomId: 'bot-baggy-acid',
        shoeId: 'shoe-runner',
        stylingSecret: 'Drop the shoulder seams past your natural clavicle for genuine 90s silhouette.'
      },
      {
        title: 'Raw Americana Skate Uniform',
        description: 'Type II raw denim trucker jacket over baggy acid denim and puffy skate shoes.',
        topId: 'top-trucker',
        bottomId: 'bot-baggy-acid',
        shoeId: 'shoe-skate',
        stylingSecret: 'Contrasting denim washes (dark indigo top + bleached bottom) breaks up the Canadian tuxedo.'
      }
    ]
  },

  minimalist: {
    id: 'arch-minimalist',
    key: 'minimalist',
    name: 'The Milanese Linea Minimalist',
    title: 'The Architectural Purist',
    tagline: 'Jil Sander & Helmut Lang 90s Structural Purity',
    quote: 'Form follows silence; true luxury is the absolute absence of noise.',
    sartorialDna: [
      'Ribbed knit zip-collar polos in muted olive and charcoal',
      'Tailored wool bermuda shorts with razor-sharp pressed creases',
      'Polished commando-sole black calfskin derbies',
      'Sculptural monochrome palettes celebrating pure geometry'
    ],
    colorPalette: [
      { name: 'Charcoal Slate', hex: '#3d4349' },
      { name: 'Piano Black', hex: '#1a1a1a' },
      { name: 'Chalk White', hex: '#e9ecef' },
      { name: 'Sage Olive', hex: '#5c6f5e' }
    ],
    signatureLooks: [
      {
        title: 'Jude Law in The Talented Mr. Ripley',
        description: 'Ribbed zip polo with wide twin-pleat trousers and polished penny loafers.',
        topId: 'top-polo',
        bottomId: 'bot-pleated',
        shoeId: 'shoe-loafer',
        stylingSecret: 'Zip the collar exactly halfway to frame the collarbone with geometric precision.'
      },
      {
        title: 'Avant-Garde Summer Gallerist',
        description: 'Fine knit merino rollneck with tailored wool bermuda shorts and polished derbies.',
        topId: 'top-merino-rollneck',
        bottomId: 'bot-bermuda',
        shoeId: 'shoe-derby',
        stylingSecret: 'Pair long sleeves with tailored shorts for high-contrast architectural proportions.'
      },
      {
        title: 'Tokyo Deconstructed Minimalist',
        description: 'Washed boxy tee with technical nylon track pants and chalk Margiela GATs.',
        topId: 'top-tee',
        bottomId: 'bot-track',
        shoeId: 'shoe-gat',
        stylingSecret: 'Keep tonal blacks and whites unified without any visible external branding.'
      }
    ]
  },

  neoIvy: {
    id: 'arch-neoivy',
    key: 'neoIvy',
    name: 'The Ivy League Neo-Classicist',
    title: 'The Intellectual Traditionalist',
    tagline: 'Vintage Brooks Brothers & Osaka Heritage Denim',
    quote: 'Heirloom Oxford cloth, raw Japanese selvedge, and crepe-soled wallabees.',
    sartorialDna: [
      'Relaxed oxford button-down shirts (OCBD) with perfect collar rolls',
      '14oz Japanese raw indigo selvedge denim with crisp rolled red-line cuffs',
      'Sand suede Clarks Wallabee moccasin chukkas with natural crepe soles',
      'Chunky Ralph Lauren cable-knit sweaters and cordovan loafers'
    ],
    colorPalette: [
      { name: 'Chambray Sky Blue', hex: '#89b6db' },
      { name: 'Raw Japanese Indigo', hex: '#1d2e4f' },
      { name: 'Crepe Sand Suede', hex: '#c7b28f' },
      { name: 'Dark Tobacco Suede', hex: '#533c2a' }
    ],
    signatureLooks: [
      {
        title: 'Kennedy Prep & Seinfeld Cool',
        description: 'Chambray Oxford shirt with 14oz raw selvedge denim and sand suede Wallabees.',
        topId: 'top-oxford',
        bottomId: 'bot-selvedge',
        shoeId: 'shoe-wallabee',
        stylingSecret: 'Roll the selvedge hem twice to expose exactly one inch of the red-line selvedge ticker.'
      },
      {
        title: 'Hamptons Autumn Intellectual',
        description: 'Cable-knit fisherman sweater with ecru Japanese denim and oxblood lug loafers.',
        topId: 'top-fisherman',
        bottomId: 'bot-white-denim',
        shoeId: 'shoe-loafer',
        stylingSecret: 'The natural cream of the unbleached denim mirrors the cable-knit wool oatmeal.'
      },
      {
        title: 'Soho Gallery Art Director',
        description: 'Double-breasted blazer with raw selvedge denim and suede Chelsea boots.',
        topId: 'top-blazer',
        bottomId: 'bot-selvedge',
        shoeId: 'shoe-chelsea',
        stylingSecret: 'High-low dressing: formal tailoring up top, stiff Japanese denim below.'
      }
    ]
  },

  gorpcore: {
    id: 'arch-gorpcore',
    key: 'gorpcore',
    name: 'The Retro-Futurist Alpine Nomad',
    title: 'The All-Conditions Explorer',
    tagline: 'Nike ACG 1995 & Golden Era Rave Utilitarianism',
    quote: 'From the mountain trail straight to the midnight warehouse rave.',
    sartorialDna: [
      'Colorblock nylon anorak windbreakers with neon chevron accents',
      'Quick-dry ripstop climbing pants with integrated webbing belts',
      'Segmented retro dad runners (New Balance 990v2) with reflective mesh',
      'Ergonomic drawstrings, storm flaps, and weather-sealed zip closures'
    ],
    colorPalette: [
      { name: 'Mountain Teal', hex: '#009688' },
      { name: 'Electric Berry', hex: '#d81b60' },
      { name: 'Reflective Grey', hex: '#9aa0a6' },
      { name: 'Forest Olive', hex: '#3b4d3c' }
    ],
    signatureLooks: [
      {
        title: '1995 Golden Age Rave Trail',
        description: 'Colorblock ACG windbreaker with ripstop climbing pants and dad runners.',
        topId: 'top-windbreaker',
        bottomId: 'bot-cargo-gorp',
        shoeId: 'shoe-runner',
        stylingSecret: 'Cinch the waist bungee cord to create a cropped, voluminous blouson effect.'
      },
      {
        title: 'All-Terrain Cyber Hybrid',
        description: 'ACG windbreaker with technical nylon track pants and Salomon trail speedcross.',
        topId: 'top-windbreaker',
        bottomId: 'bot-track',
        shoeId: 'shoe-salomon-trail',
        stylingSecret: 'Technical materials throughout: ripstop nylon meets waterproof Gore-Tex.'
      },
      {
        title: 'Acid Street All-Conditions',
        description: 'ACG windbreaker with ultra-baggy bleach wash denim and puffy skate shoes.',
        topId: 'top-windbreaker',
        bottomId: 'bot-baggy-acid',
        shoeId: 'shoe-skate',
        stylingSecret: '90s skate-rave crossover: oversized technical windbreaker with stacking denim.'
      }
    ]
  },

  darkwear: {
    id: 'arch-darkwear',
    key: 'darkwear',
    name: 'The Neo-Tokyo Darkwear Avant-Garde',
    title: 'The Poetic Anti-Fashion Visionary',
    tagline: 'Yohji Yamamoto & Japanese Deconstruction',
    quote: 'Black is modest and arrogant at the same time. Black is lazy and easy - but mysterious.',
    sartorialDna: [
      'Asymmetrical deconstructed wool gabardine kimono coats',
      'Sculptural drop-crotch trousers with voluminous negative space',
      'Split-toe chunky combat boots or Guidi artisanal single-piece derbies',
      'Layered matte blacks, scorched textures, and raw selvedge edges'
    ],
    colorPalette: [
      { name: 'Raven Black', hex: '#141619' },
      { name: 'Coal Charcoal', hex: '#22252a' },
      { name: 'Chalk White', hex: '#e9ecef' },
      { name: 'Obsidian Wax', hex: '#16181b' }
    ],
    signatureLooks: [
      {
        title: 'The Tokyo Runway Poet',
        description: 'Asymmetrical kimono coat with drop-crotch gabardine trousers and combat boots.',
        topId: 'top-dark-kimono',
        bottomId: 'bot-yohji',
        shoeId: 'shoe-combat-tabi',
        stylingSecret: 'Embrace the generous negative space; let the garment drape and flow with every step.'
      },
      {
        title: 'Deconstructed Minimalist Icon',
        description: 'Fine knit merino rollneck with straight washed leather pants and Guidi derbies.',
        topId: 'top-merino-rollneck',
        bottomId: 'bot-leather-pant',
        shoeId: 'shoe-guidi-derby',
        stylingSecret: 'Contrast the soft matte merino knit against the glossy sheen of waxed calfskin.'
      },
      {
        title: 'Midnight Avant-Garde Tailoring',
        description: 'Double-breasted blazer with drop-crotch wool trousers and split-toe combat boots.',
        topId: 'top-blazer',
        bottomId: 'bot-yohji',
        shoeId: 'shoe-combat-tabi',
        stylingSecret: 'Subverting classic suiting with radical Japanese bottom proportions.'
      }
    ]
  },

  britMod: {
    id: 'arch-britmod',
    key: 'britMod',
    name: 'The British Mod & Britpop Tailor',
    title: 'The Carnaby Street Stylist',
    tagline: 'Sharp Savile Row Tailoring & 90s Camden Cool',
    quote: 'Style is an attitude; razor-sharp trousers and a tailored jacket never go out of tune.',
    sartorialDna: [
      'Fraser tartan-lined Harrington jackets with stand dog-collar buttons',
      'Cropped houndstooth and micro-gingham tailored check trousers',
      'Classic Dr. Martens 1461 Cherry Red derbies or R.M. Williams Chelsea boots',
      'Fine-gauge merino rollnecks and structured Oxford shirts'
    ],
    colorPalette: [
      { name: 'Racing Green', hex: '#1c3d2e' },
      { name: 'Cherry Red', hex: '#5c1926' },
      { name: 'Houndstooth Ecru', hex: '#d5d9de' },
      { name: 'Navy Blue', hex: '#1e3050' }
    ],
    signatureLooks: [
      {
        title: '1995 Oasis Knebworth Swagger',
        description: 'Baracuta G9 Harrington jacket with houndstooth check trousers and Cherry Red derbies.',
        topId: 'top-harrington',
        bottomId: 'bot-mod-check',
        shoeId: 'shoe-dr-martens',
        stylingSecret: 'Button the two-button stand collar and leave the waist zip open slightly.'
      },
      {
        title: 'Carnaby Street Intellectual',
        description: 'Merino rollneck with houndstooth trousers and waxed suede Chelsea boots.',
        topId: 'top-merino-rollneck',
        bottomId: 'bot-mod-check',
        shoeId: 'shoe-chelsea',
        stylingSecret: 'Ensure trousers end exactly above the ankle bone to showcase the Chelsea boot shaft.'
      },
      {
        title: 'Mod Casual Weekender',
        description: 'Baracuta Harrington over raw selvedge denim and Dr. Martens derbies.',
        topId: 'top-harrington',
        bottomId: 'bot-selvedge',
        shoeId: 'shoe-dr-martens',
        stylingSecret: 'The yellow welt stitching on the Dr. Martens adds a subtle pop of contrast against dark indigo.'
      }
    ]
  },

  quietLuxury: {
    id: 'arch-quietluxury',
    key: 'quietLuxury',
    name: 'The French Riviera Quiet Luxury Flâneur',
    title: 'The Master of Understated Opulence',
    tagline: 'Old Money Mediterranean Sprezzatura & Pure Silk',
    quote: 'True luxury never shouts; it whispers in the hand-feel of noble unbleached fibers.',
    sartorialDna: [
      'Mulberry silk camp-collar shirts in Riviera pastel motifs',
      'Relaxed pleated Belgian linen chinos and ecru selvedge denim',
      'Hand-sewn suede Belgian slippers or braided jute espadrilles',
      'Sun-bleached linen overshirts and cable-knit cashmere wraps'
    ],
    colorPalette: [
      { name: 'Riviera Peach', hex: '#eed1b8' },
      { name: 'Sun-Drenched Sand', hex: '#dfd5c2' },
      { name: 'Mediterranean Azure', hex: '#2574a9' },
      { name: 'Cognac Suede', hex: '#7a4b29' }
    ],
    signatureLooks: [
      {
        title: 'Cap d\'Antibes Sunset Soirée',
        description: 'Mulberry silk camp-collar shirt with pleated Belgian linen chinos and Belgian slippers.',
        topId: 'top-camp-silk',
        bottomId: 'bot-linen',
        shoeId: 'shoe-belgian-loafer',
        stylingSecret: 'Leave top two buttons open and wear sockless with hand-turned Belgian slippers.'
      },
      {
        title: 'Solomeo Cashmere Stroll',
        description: 'Washed linen overshirt with ecru Japanese denim and oiled suede Boston clogs.',
        topId: 'top-linen-overshirt',
        bottomId: 'bot-white-denim',
        shoeId: 'shoe-boston',
        stylingSecret: 'Tone-on-tone dressing: layering shades of unbleached ecru, sand, and taupe.'
      },
      {
        title: 'Saint-Tropez Harbor Sprezzatura',
        description: 'Mulberry silk shirt with tailored wool bermuda shorts and braided espadrilles.',
        topId: 'top-camp-silk',
        bottomId: 'bot-bermuda',
        shoeId: 'shoe-espadrille',
        stylingSecret: 'Effortless high-low: luxurious silk drape paired with braided jute resort footwear.'
      }
    ]
  },

  cyberTech: {
    id: 'arch-cybertech',
    key: 'cyberTech',
    name: 'The Cyberpunk 2000s Techwear Specialist',
    title: 'The Ergonomic Urban Operator',
    tagline: 'Acronym Modular Systems & Weather-Sealed Gore-Tex',
    quote: 'The body is an interface; garments are modular ergonomic armor for the urban grid.',
    sartorialDna: [
      'J1A-GT 3-layer Gore-Tex interops shell jackets with gravity-pockets',
      'P30A-E ergonomic ultrawide cargo pants with Fidlock magnetic closures',
      'Waterproof Salomon XT-6 trail speedcross shoes with Quicklace systems',
      'Stealth matte black palettes with high-vis emergency neon accents'
    ],
    colorPalette: [
      { name: 'Stealth Matte Black', hex: '#1a1c1e' },
      { name: 'Carbon Charcoal', hex: '#1d1f23' },
      { name: 'Signal Neon Red', hex: '#ff4757' },
      { name: 'Cyber Blue', hex: '#3b82f6' }
    ],
    signatureLooks: [
      {
        title: 'Berlin Subterranean Interops',
        description: 'Acronym 3L Gore-Tex shell with ultrawide Fidlock cargo pants and Salomon XT-6.',
        topId: 'top-shell-jacket',
        bottomId: 'bot-fidlock-cargo',
        shoeId: 'shoe-salomon-trail',
        stylingSecret: 'Use the jacket sling strap when entering heated subway stations or indoor spaces.'
      },
      {
        title: 'Neo-Cyber Street Transit',
        description: 'Boxy 500GSM hoodie with technical nylon track pants and Salomon trail runners.',
        topId: 'top-hoodie',
        bottomId: 'bot-track',
        shoeId: 'shoe-salomon-trail',
        stylingSecret: 'Tuck the hoodie hem slightly under the nylon waistband for athletic propulsion.'
      },
      {
        title: 'Stealth Rainstorm Commuter',
        description: 'Gore-Tex shell jacket with straight leather pants and split-toe combat boots.',
        topId: 'top-shell-jacket',
        bottomId: 'bot-leather-pant',
        shoeId: 'shoe-combat-tabi',
        stylingSecret: 'Futuristic hybrid: technical 3-layer nylon membrane juxtaposed with tactile leather.'
      }
    ]
  },

  americana: {
    id: 'arch-americana',
    key: 'americana',
    name: 'The Vintage Americana & Heritage Craftsman',
    title: 'The Heirloom Tool & Indigo Devotee',
    tagline: 'Double RL Vintage Heritage & Goodyear-Welted Craft',
    quote: 'Real garments earn their beauty through honest work, raw indigo, and decades of patina.',
    sartorialDna: [
      '16oz blanket-lined raw duck canvas chore coats with brass hardware',
      'Indigo discharge-printed Wabash stripe work pants and 14oz raw selvedge',
      'Red Wing 875 classic 6" traction-tred moc-toe boots in Oro-Legacy leather',
      'Heavyweight denim trucker jackets, cinch-backs, and copper rivets'
    ],
    colorPalette: [
      { name: 'Aged Whiskey Canvas', hex: '#8b5a2b' },
      { name: 'Wabash Indigo', hex: '#1a2744' },
      { name: 'Oro-Legacy Amber', hex: '#b46025' },
      { name: 'Aged Copper', hex: '#93a5cf' }
    ],
    signatureLooks: [
      {
        title: 'Railroad Heritage Craftsman',
        description: 'Blanket-lined canvas chore coat with Wabash stripe work pants and Red Wing moc boots.',
        topId: 'top-blanket-chore',
        bottomId: 'bot-wabash',
        shoeId: 'shoe-redwing-moc',
        stylingSecret: 'Turn the heavy canvas cuffs back once to reveal the striped blanket wool lining.'
      },
      {
        title: '1930s Golden Age Workwear',
        description: 'Type II raw denim trucker jacket with duck canvas carpenter pants and Red Wing boots.',
        topId: 'top-trucker',
        bottomId: 'bot-carpenter',
        shoeId: 'shoe-redwing-moc',
        stylingSecret: 'The rigid stiffness of raw denim breaks in uniquely to your body over time.'
      },
      {
        title: 'Pacific Northwest Autumn Camp',
        description: 'Cashmere fisherman sweater with raw selvedge denim and waxed Chelsea boots.',
        topId: 'top-fisherman',
        bottomId: 'bot-selvedge',
        shoeId: 'shoe-chelsea',
        stylingSecret: 'Heavy cable-knit wool shields against the chill while rugged suede weathers rain.'
      }
    ]
  }
};
