// Internal-linking map for the RelatedLinks section.
// `linkTargets` describes each page we link to; `relatedLinks` lists, per page,
// which targets it links to. Keep groups topical (e.g. removal → stump grinding)
// so each page passes relevance to its closest neighbours.

export const linkTargets = {
  "tree-removal": {
    label: "Tree Removal",
    url: "/services/tree-removal",
    description: "Safe, efficient removal of damaged, diseased or hazardous trees.",
  },
  "shelterbelt-topping-removal": {
    label: "Shelterbelt Topping & Removal",
    url: "/services/shelterbelt-topping-removal",
    description: "Controlled height reduction and complete removal for orchards, farms and boundaries.",
  },
  "stump-grinding": {
    label: "Stump Grinding",
    url: "/services/stump-grinding",
    description: "Grind out leftover stumps that are an eyesore, a tripping hazard or a magnet for pests.",
  },
  "tree-pruning-tauranga": {
    label: "Tree Pruning",
    url: "/services/tree-pruning-tauranga",
    description: "Pruning that improves the health, safety, structure and appearance of your trees.",
  },
  "hedge-trimming-tauranga": {
    label: "Hedge Trimming",
    url: "/services/hedge-trimming-tauranga",
    description: "Keep your hedges healthy, well shaped and looking their best.",
  },
  "land-clearing-tauranga": {
    label: "Land Clearing",
    url: "/services/land-clearing-tauranga",
    description: "Prepare your property for construction, development or landscaping.",
  },
  "palm-cleaning-removal-services": {
    label: "Palm Cleaning & Removal",
    url: "/services/palm-cleaning-removal-services",
    description: "Regular maintenance to keep palms healthy and safe, or removal when they need to go.",
  },
  "storm-damaged-trees-emergency-tree-work": {
    label: "Storm Damage & Emergency Tree Work",
    url: "/services/storm-damaged-trees-emergency-tree-work",
    description: "Quick help with fallen, leaning or damaged trees after a storm.",
  },
 
  "planting-and-gardening-services-tauranga": {
    label: "Planting & Gardening",
    url: "/services/planting-and-gardening-services-tauranga",
    description: "Create and maintain beautiful, thriving gardens.",
  },
  "firewood-and-mulch-tauranga": {
    label: "Firewood & Mulch",
    url: "/services/firewood-and-mulch-tauranga",
    description: "Sustainably sourced firewood, ready to burn, and nutrient-rich mulch.",
  },
  "arbor-mulch-delivery": {
    label: "Arbor Mulch Delivery",
    url: "/services/arbor-mulch-delivery",
    description: "Arborist mulch delivered to your driveway.",
  },
  "tree-removal-cost-tauranga": {
    label: "Tree Removal Cost Guide",
    url: "/tree-removal-cost-tauranga",
    description: "What affects the price of removing a tree in Tauranga.",
  },
  "grapple-saw-crane-truck": {
    label: "Grapple Saw Crane Truck",
    url: "/equipment/grapple-saw-crane-truck",
    description: "Our crane-mounted grapple saw for controlled cutting and lifting.",
  },
  gallery: {
    label: "Before & After Gallery",
    url: "/our-work/gallery",
    description: "Tree removals and land clearing jobs we've completed.",
  },
  "video-gallery": {
    label: "Video Gallery",
    url: "/our-work/video-gallery",
    description: "A variety of our tree services in action.",
  },
};

const popularServices = [
  "tree-removal",
  "stump-grinding",
  "tree-pruning-tauranga",
  "hedge-trimming-tauranga",
  "land-clearing-tauranga",
  "shelterbelt-topping-removal",
];

export const relatedLinks = {
  "tree-removal": ["stump-grinding", "storm-damaged-trees-emergency-tree-work", "shelterbelt-topping-removal", "land-clearing-tauranga", "tree-removal-cost-tauranga", "grapple-saw-crane-truck"],
  "shelterbelt-topping-removal": ["hedge-trimming-tauranga", "tree-removal", "land-clearing-tauranga", "stump-grinding", "grapple-saw-crane-truck", "gallery"],
  "stump-grinding": ["tree-removal", "land-clearing-tauranga", "planting-and-gardening-services-tauranga", "arbor-mulch-delivery", "tree-removal-cost-tauranga", "gallery"],
  "tree-pruning-tauranga": ["hedge-trimming-tauranga", "tree-removal", "powerline-clearing", "palm-cleaning-removal-services", "storm-damaged-trees-emergency-tree-work", "gallery"],
  "hedge-trimming-tauranga": ["tree-pruning-tauranga", "shelterbelt-topping-removal", "planting-and-gardening-services-tauranga", "arbor-mulch-delivery", "tree-removal", "gallery"],
  "land-clearing-tauranga": ["tree-removal", "stump-grinding", "shelterbelt-topping-removal", "firewood-and-mulch-tauranga", "grapple-saw-crane-truck", "gallery"],
  "palm-cleaning-removal-services": ["tree-removal", "tree-pruning-tauranga", "stump-grinding", "hedge-trimming-tauranga", "tree-removal-cost-tauranga", "gallery"],
  "storm-damaged-trees-emergency-tree-work": ["tree-removal", "powerline-clearing", "tree-pruning-tauranga", "stump-grinding", "grapple-saw-crane-truck", "tree-removal-cost-tauranga"],
  "powerline-clearing": ["tree-pruning-tauranga", "storm-damaged-trees-emergency-tree-work", "tree-removal", "hedge-trimming-tauranga", "grapple-saw-crane-truck", "gallery"],
  "planting-and-gardening-services-tauranga": ["arbor-mulch-delivery", "hedge-trimming-tauranga", "tree-pruning-tauranga", "stump-grinding", "land-clearing-tauranga", "gallery"],
  "firewood-and-mulch-tauranga": ["arbor-mulch-delivery", "tree-removal", "land-clearing-tauranga", "planting-and-gardening-services-tauranga", "stump-grinding", "gallery"],
  "arbor-mulch-delivery": ["firewood-and-mulch-tauranga", "planting-and-gardening-services-tauranga", "hedge-trimming-tauranga", "stump-grinding", "tree-removal", "gallery"],
  "tree-removal-cost-tauranga": ["tree-removal", "stump-grinding", "storm-damaged-trees-emergency-tree-work", "palm-cleaning-removal-services", "shelterbelt-topping-removal", "gallery"],
  "grapple-saw-crane-truck": ["tree-removal", "shelterbelt-topping-removal", "storm-damaged-trees-emergency-tree-work", "land-clearing-tauranga", "video-gallery", "tree-removal-cost-tauranga"],
  popular: popularServices,
};

export function getRelatedLinks(pageId) {
  return (relatedLinks[pageId] || [])
    .filter((id) => id !== pageId)
    .map((id) => linkTargets[id])
    .filter(Boolean);
}
