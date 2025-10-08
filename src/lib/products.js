export const products = [
  {
    slug: "citrine-flame",
    name: "Citrine Flame",
    tagline: "Radiant citrus warmth",
    description: "A bright, effervescent blend of bergamot, blood orange, and amber woods.",
    notes: ["Bergamot", "Blood Orange", "Amber Wood"],
    price: 59,
    volume: "50ml"
  },
  {
    slug: "ivory-bloom",
    name: "Ivory Bloom",
    tagline: "Soft floral serenity",
    description: "Velvety petals and a clean musky trail for an understated elegance.",
    notes: ["Jasmine", "White Musk", "Pear"],
    price: 62,
    volume: "50ml"
  },
  {
    slug: "midnight-cherry",
    name: "Midnight Cherry",
    tagline: "Dark fruit allure",
    description: "Lush black cherry wrapped in tonka and smoldering woods.",
    notes: ["Black Cherry", "Tonka Bean", "Smoked Wood"],
    price: 68,
    volume: "50ml"
  },
  {
    slug: "or-du-soir",
    name: "Or du Soir",
    tagline: "Golden evening spice",
    description: "Spiced saffron and warm vanilla glowing over sandalwood.",
    notes: ["Saffron", "Vanilla", "Sandalwood"],
    price: 75,
    volume: "50ml"
  },
  {
    slug: "oud-legendaire",
    name: "Oud Légendaire",
    tagline: "Deep resin prestige",
    description: "An opulent oud accord balanced by rose and dark balsams.",
    notes: ["Oud", "Rose", "Labdanum"],
    price: 95,
    volume: "50ml"
  }
];

export function getProduct(slug) {
  return products.find(p => p.slug === slug);
}
