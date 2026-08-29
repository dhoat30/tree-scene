import TreeRemovalQuotePage from "@/components/Pages/TreeRemovalQuotePage/TreeRemovalQuotePage";

const pageUrl = "https://treescene.co.nz/tree-removal-quote";
const heroImage =
  "https://cms.treescene.co.nz/wp-content/uploads/2026/02/down-net_http20260217-271-a7btzg-1-scaled.jpg";

export const metadata = {
  title: {
    absolute: "Tree Removal Tauranga | Free Site Visit | Tree Scene",
  },
  description:
    "Safe, efficient tree removal in Tauranga by certified arborists. Specialists in large trees and palms, with $2 million insurance and a free site visit.",
  alternates: {
    canonical: pageUrl,
  },
  openGraph: {
    title: "Tree Removal Tauranga — Free Site Visit",
    description:
      "Large tree and palm removal with certified arborists and specialist grapple saw crane equipment.",
    url: pageUrl,
    siteName: "Tree Scene Tauranga",
    type: "website",
    images: [{ url: heroImage, width: 1200, height: 900 }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tree Removal Tauranga — Free Site Visit",
    description:
      "Safe, controlled tree removal by Tauranga's large-tree specialists.",
    images: [heroImage],
  },
};

const structuredData = [
  {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Tree Removal Tauranga",
    serviceType: "Tree removal",
    url: pageUrl,
    image: heroImage,
    description:
      "Residential and commercial tree removal in Tauranga, including large trees, palms and complex crane-assisted removals.",
    provider: {
      "@type": "LocalBusiness",
      name: "Tree Scene Tauranga",
      telephone: "+64212420305",
      email: "admin@treescene.co.nz",
      url: "https://treescene.co.nz",
      address: {
        "@type": "PostalAddress",
        streetAddress: "79A Hastings Road, Pyes Pa",
        addressLocality: "Tauranga",
        postalCode: "3112",
        addressCountry: "NZ",
      },
    },
    areaServed: [
      "Tauranga",
      "Mount Maunganui",
      "Papamoa",
      "Welcome Bay",
      "Pyes Pa",
      "Te Puna",
      "Omokoroa",
    ],
    offers: {
      "@type": "Offer",
      name: "Free tree removal site visit",
      price: "0",
      priceCurrency: "NZD",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does tree removal cost in Tauranga?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Tree removal cost depends on the tree's size, condition, access and proximity to buildings or power lines. Tree Scene provides a free site visit and clear quote before work starts.",
        },
      },
      {
        "@type": "Question",
        name: "Can you remove large trees close to a house?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Tree Scene specialises in large and complex removals. Its grapple saw crane can hold, cut and lift tree sections in a controlled movement to reduce free-falling debris and property impact where site access allows.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need council permission to remove a tree in Tauranga?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Some notable or protected trees require resource consent. Tree Scene can help identify council considerations during the site assessment, and property owners should check their LIM, title and Tauranga City Council requirements.",
        },
      },
    ],
  },
];

export default function Page() {
  return (
    <>
      {structuredData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
        />
      ))}
      <TreeRemovalQuotePage />
    </>
  );
}
