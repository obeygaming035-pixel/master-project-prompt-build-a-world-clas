/**
 * Central Brand Configuration for AAVRIT
 *
 * Keep all brand copy, product details, pricing, and owner placeholders
 * centralized here so they can easily be replaced or verified before launch.
 */

export interface FAQItem {
  question: string;
  answer: string;
  verified: boolean;
}

export interface BrandConfig {
  brandName: string;
  tagline: string;
  announcement: {
    enabled: boolean;
    text: string;
  };
  product: {
    id: string;
    name: string;
    subtitle: string;
    milkSource: 'Buffalo Milk'; // Explicitly typed to ensure buffalo milk is strictly adhered to
    unit: string;
    weightKg: number;
    priceINR: number;
    pricePaise: number;
    description: string;
    editorialStory: string;
    images: {
      hero: string;
      showcase: string;
      ritualRoti: string;
      ritualDal: string;
      ritualPour: string;
    };
    attributes: {
      label: string;
      description: string;
    }[];
  };
  navigation: {
    label: string;
    href: string;
  }[];
  faqs: FAQItem[];
  businessDetails: {
    customerEmail: string;
    customerPhone: string;
    whatsappNumber: string;
    isContactConfigured: boolean;
    deliveryCoverageNote: string;
  };
}

export const BRAND: BrandConfig = {
  brandName: 'AAVRIT',
  tagline: 'Pure Buffalo-Milk Ghee · Crafted for Everyday Indulgence',
  announcement: {
    enabled: true,
    text: 'Pure Buffalo-Milk Ghee · Crafted for Everyday Indulgence',
  },
  product: {
    id: 'aavrit-buffalo-ghee-1kg',
    name: 'Pure Buffalo-Milk Ghee',
    subtitle: '100% Pure Homemade Buffalo-Milk Ghee',
    milkSource: 'Buffalo Milk',
    unit: '1 kg jar',
    weightKg: 1,
    priceINR: 1000,
    pricePaise: 100000,
    description:
      'Discover the rich, comforting character of homemade buffalo-milk ghee, made for everyday meals and moments worth savouring.',
    editorialStory:
      'From everyday rotis to slow-cooked favourites, ghee has a special place in the Indian kitchen. Our buffalo-milk ghee brings its rich character and golden appeal to the meals you make at home.',
    images: {
      hero: '/images/hero-ghee.jpg',
      showcase: '/images/product-jar.jpg',
      ritualRoti: '/images/ritual-roti.jpg',
      ritualDal: '/images/ritual-dal.jpg',
      ritualPour: '/images/ritual-pour.jpg',
    },
    attributes: [
      {
        label: 'Buffalo-Milk Ghee',
        description: 'Made exclusively from fresh, rich buffalo milk.',
      },
      {
        label: 'Homemade',
        description: 'Crafted in small domestic batches with care.',
      },
      {
        label: '1 kg Quantity',
        description: 'Generous jar measured at ₹1,000 per kilogram.',
      },
      {
        label: 'Pure Ghee',
        description: 'Simple, wholesome, and unadulterated staple.',
      },
    ],
  },
  navigation: [
    { label: 'Our Ghee', href: '#product-showcase' },
    { label: 'Our Philosophy', href: '#philosophy' },
    { label: 'How to Enjoy', href: '#everyday-rituals' },
    { label: 'FAQ', href: '#faq' },
  ],
  faqs: [
    {
      question: 'What is this ghee made from?',
      answer:
        'This product is made from buffalo milk. Please refer to the product packaging for the complete ingredient and product information.',
      verified: true,
    },
    {
      question: 'What quantity am I purchasing?',
      answer: 'The listed product is a 1 kg quantity, priced at ₹1,000.',
      verified: true,
    },
    {
      question: 'How can I use buffalo-milk ghee?',
      answer:
        'It can be used in everyday cooking and served with foods such as roti, dal, and khichdi. Follow your preferred cooking method and the product’s storage instructions.',
      verified: true,
    },
    {
      question: 'How should I store the ghee?',
      answer:
        'Follow the storage directions provided on the product label. The seller should add the verified storage instructions before the website goes live.',
      verified: false,
    },
    {
      question: 'Where do you deliver?',
      answer:
        'Available delivery locations and estimated delivery times will be shown at checkout once delivery coverage has been configured.',
      verified: false,
    },
    {
      question: 'How can I contact you?',
      answer:
        'Add the brand’s verified customer-service email address, phone number, or WhatsApp contact here.',
      verified: false,
    },
  ],
  businessDetails: {
    customerEmail: '', // To be supplied by business owner
    customerPhone: '', // To be supplied by business owner
    whatsappNumber: '', // To be supplied by business owner
    isContactConfigured: false,
    deliveryCoverageNote:
      'Delivery coverage and shipping rates will be updated once fulfillment partners are finalized by the store owner.',
  },
};
