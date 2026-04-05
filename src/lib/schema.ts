// Schema.org JSON-LD generators for structured data.
// Paste output into https://validator.schema.org/ to test.

export const SITE_URL = "https://www.nuradi.co.in";
export const SITE_NAME = "NuradiHealth";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      "India's most complete free health platform — 34 health calculators, 120 disease guides, live health news, AI chatbot, curated wellness videos.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      email: "hello@nuradi.co.in",
      availableLanguage: ["English", "Hindi"],
    },
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    description:
      "A premium health education platform featuring curated videos, 34 calculators, 120 disease infographics, and live health news from trusted sources.",
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_URL}/search?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function webApplicationSchema(tool: {
  name: string;
  description: string;
  slug: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: tool.name,
    description: tool.description,
    url: `${SITE_URL}/tools/${tool.slug}`,
    applicationCategory: "HealthApplication",
    applicationSubCategory: tool.category || "Health Calculator",
    operatingSystem: "Any",
    browserRequirements: "Requires JavaScript",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "INR",
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function faqPageSchema(qa: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: qa.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.a,
      },
    })),
  };
}

export function medicalWebPageSchema(article: {
  title: string;
  excerpt: string;
  author: string;
  published: string; // ISO date
  slug: string;
  image?: string;
  category?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/blog/${article.slug}`,
    datePublished: article.published,
    dateModified: article.published,
    inLanguage: "en-IN",
    author: {
      "@type": "Person",
      name: article.author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_URL}/logo.png`,
      },
    },
    ...(article.image && { image: article.image }),
    ...(article.category && {
      about: { "@type": "MedicalEntity", name: article.category },
    }),
    mainContentOfPage: {
      "@type": "WebPageElement",
      cssSelector: "article",
    },
  };
}

export function articleSchema(article: {
  title: string;
  excerpt: string;
  author: string;
  published: string;
  slug: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.excerpt,
    url: `${SITE_URL}/blog/${article.slug}`,
    datePublished: article.published,
    dateModified: article.published,
    author: { "@type": "Person", name: article.author },
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    ...(article.image && {
      image: { "@type": "ImageObject", url: article.image },
    }),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `${SITE_URL}/blog/${article.slug}`,
    },
  };
}

export function medicalConditionSchema(item: {
  disease: string;
  category: string;
  tips: { text: string }[];
  id: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalCondition",
    name: item.disease,
    url: `${SITE_URL}/infographics/${item.id}`,
    inLanguage: "en-IN",
    about: {
      "@type": "MedicalEntity",
      name: item.category,
    },
    preventionGuideline: item.tips.map((t) => ({
      "@type": "MedicalGuideline",
      guidelineSubject: t.text,
    })),
  };
}

export function medicalSignOrSymptomSchema(item: {
  name: string;
  slug: string;
  description: string;
  bodyArea: string;
  causes: { name: string; description: string }[];
  possibleTests: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "MedicalSignOrSymptom",
    name: item.name,
    url: `${SITE_URL}/symptoms/${item.slug}`,
    description: item.description,
    inLanguage: "en-IN",
    associatedAnatomy: {
      "@type": "AnatomicalStructure",
      name: item.bodyArea,
    },
    cause: item.causes.map((c) => ({
      "@type": "MedicalCause",
      name: c.name,
      description: c.description,
    })),
    possibleTreatment: item.possibleTests.map((t) => ({
      "@type": "MedicalTest",
      name: t,
    })),
    publisher: {
      "@type": "Organization",
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function collectionPageSchema(args: {
  name: string;
  description: string;
  url: string;
  itemCount: number;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: args.name,
    description: args.description,
    url: args.url,
    inLanguage: "en-IN",
    isPartOf: {
      "@type": "WebSite",
      name: SITE_NAME,
      url: SITE_URL,
    },
    numberOfItems: args.itemCount,
  };
}

export function itemListSchema(args: {
  name: string;
  url: string;
  items: { name: string; url: string }[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: args.name,
    url: args.url,
    numberOfItems: args.items.length,
    itemListElement: args.items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
    })),
  };
}
