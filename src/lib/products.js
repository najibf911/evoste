export const products = [
  {
    slug: "citrine-flame",
    name: "Citrine Flame",
    tagline: "Radiant citrus warmth",
    description: "Radiating a fresh, fruity, and woody character, the scent blends bergamot, apple, plum, and cedarwood with hints of geranium.",
    notes: ["Bergamot", "Apple", "Aromatic Bouquet"],
    price: 59,
    volumes: ["30ml", "50ml"]
  },
  {
    slug: "ivory-bloom",
    name: "Ivory Bloom",
    tagline: "Soft floral serenity",
    description: "Unveiling a fresh, sweet, and exotic character, the scent blends lychee, rhubarb, saffron, and bergamot with Turkish rose, jasmine, and soft musk. It captures the memory of a peaceful spring morning in a blooming garden.",
    notes: ["Lychee", "Rhubarb", "Bergamot", "Saffron"],
    price: 62,
    volumes: ["30ml", "50ml"]
  },
  {
    slug: "midnight-cherry",
    name: "Midnight Cherry",
    tagline: "Dark fruit allure",
    description: "A captivating blend of cherry liqueur, bitter almond, and fresh bergamot — a sweet yet bold aroma that instantly draws attention",
    notes: ["Black Cherry", "Cherry Liqueur", "Bitter Almond", "Bergamot"],
    price: 68,
    volumes: ["30ml", "50ml"]
  },
  {
    slug: "or-du-soir",
    name: "Or du Soir",
    tagline: "Golden evening spice",
    description: "A touch of coffee and amaretto brings warmth, like the first sip of a slow evening. Creamy ice cream notes melt into bourbon vanilla, brown sugar, and a spark of black pepper.",
    notes: ["Coffee", "Amaretto", "Black Pepper"],
    price: 75,
    volumes: ["30ml", "50ml"]
  },
  {
    slug: "oud-legendaire",
    name: "Oud Légendaire",
    tagline: "Deep resin prestige",
    description: "Bright, tropical, and mysterious, the scent combines passion fruit, pineapple, mango, and bergamot with warm woods, leather, oud, and soft amber.",
    notes: ["Passionfruit", "Fruity", "Bergamot"],
    price: 95,
    volumes: ["30ml", "50ml"]
  }
];

export function getProduct(slug) {
  return products.find(p => p.slug === slug);
}
