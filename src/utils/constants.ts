export const SERVICES = {
  STARTER: {
    name: 'Starter',
    priceRange: { min: 249, max: 349 },
    features: [
      'One-page website',
      'Modern, responsive design',
      'Fast loading times',
      'Mobile optimization',
    ],
  },
  BUSINESS: {
    name: 'Business',
    priceRange: { min: 499, max: 799 },
    features: [
      'Up to 5 pages',
      'Basic SEO optimization',
      'Enhanced features and customization',
      'Professional design system',
    ],
  },
  MAINTENANCE: {
    name: 'Maintenance',
    priceRange: { min: 29, max: 59 },
    period: 'month',
    features: [
      'Hosting included',
      'Small updates and changes',
      'Security updates',
      'Performance monitoring',
    ],
    contract: 'Minimum 1 year commitment',
  },
} as const;

export const PROCESS_STEPS = [
  {
    number: 1,
    title: 'Select Plan',
    description: 'Choose the package that best fits your needs',
  },
  {
    number: 2,
    title: 'Fill Form',
    description: 'Submit detailed project requirements',
  },
  {
    number: 3,
    title: 'Evaluation',
    description: 'We review scope and timeline',
  },
  {
    number: 4,
    title: 'Confirmation',
    description: 'Receive email confirmation',
  },
  {
    number: 5,
    title: 'Payment',
    description: 'Stripe payment link sent',
  },
  {
    number: 6,
    title: 'Project Start',
    description: 'Development begins after payment',
  },
] as const;
