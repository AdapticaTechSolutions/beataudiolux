import React from 'react';
import { Speaker, Zap, Monitor, Box, Projector, Sparkles } from 'lucide-react';
import { ServiceItem, Partner, EventCategory, Venue } from './types';

export const SERVICES: ServiceItem[] = [
  {
    id: 'sound',
    title: 'Pro Audio Systems',
    description: 'Crystal clear line arrays and subwoofers for immersive audio experiences.',
    icon: <Speaker className="w-6 h-6 text-gold-400" />,
    price: 15000,
    image: 'https://picsum.photos/seed/audio/800/600',
  },
  {
    id: 'lights',
    title: 'Intelligent Lighting',
    description: 'Moving heads, beams, and wash lights to set the perfect mood.',
    icon: <Zap className="w-6 h-6 text-gold-300" />,
    price: 12000,
    image: 'https://picsum.photos/seed/lights/800/600',
  },
  {
    id: 'led',
    title: 'LED Walls',
    description: 'High-definition P3 LED walls for vibrant visuals and presentations.',
    icon: <Monitor className="w-6 h-6 text-stone-200" />,
    price: 25000,
    image: 'https://picsum.photos/seed/led/800/600',
  },
  {
    id: 'truss',
    title: 'Heavy Duty Trusses',
    description: 'Safety-certified aluminum rigging structures for any scale.',
    icon: <Box className="w-6 h-6 text-gold-500" />,
    price: 8000,
    image: 'https://picsum.photos/seed/truss/800/600',
  },
  {
    id: 'visuals',
    title: 'Projection Mapping',
    description: 'Transform any surface into a dynamic video display.',
    icon: <Projector className="w-6 h-6 text-stone-400" />,
    price: 18000,
    image: 'https://picsum.photos/seed/projector/800/600',
  },
  {
    id: 'fx',
    title: 'Special Effects',
    description: 'Low fog, sparkulars, confetti blasters, and CO2 jets.',
    icon: <Sparkles className="w-6 h-6 text-gold-200" />,
    price: 5000,
    image: 'https://picsum.photos/seed/fx/800/600',
  },
];

export const PARTNERS: Partner[] = [
  { id: '1', name: 'Luxe Catering', category: 'Catering', description: 'Premium culinary experiences.', image: 'https://picsum.photos/seed/cat1/400/400' },
  { id: '2', name: 'Vogue Events', category: 'Event Planners', description: 'End-to-end coordination.', image: 'https://picsum.photos/seed/plan1/400/400' },
  { id: '3', name: 'Snap & Glow', category: 'Photobooth', description: '360 degree video booths.', image: 'https://picsum.photos/seed/photo1/400/400' },
  { id: '4', name: 'Style Studio', category: 'Stylists', description: 'Venue transformation experts.', image: 'https://picsum.photos/seed/style1/400/400' },
  { id: '5', name: 'Brew Bar', category: 'Food Carts', description: 'Mobile coffee and cocktail bars.', image: 'https://picsum.photos/seed/cart1/400/400' },
];

export const EVENTS: EventCategory[] = [
  { id: 'wed', title: 'Weddings', image: 'https://picsum.photos/seed/wedding/800/1000', description: 'Make your special day unforgettable with romantic lighting and crisp audio.' },
  { id: 'corp', title: 'Corporate', image: 'https://picsum.photos/seed/corp/800/1000', description: 'Professional setups for conferences, product launches, and galas.' },
  { id: 'concert', title: 'Live Performances', image: 'https://picsum.photos/seed/concert/800/1000', description: 'Tour-grade production for bands and artists.' },
  { id: 'school', title: 'School Events', image: 'https://picsum.photos/seed/school/800/1000', description: 'Proms, graduations, and sports meets.' },
  { id: 'fest', title: 'Festivals', image: 'https://picsum.photos/seed/fest/800/1000', description: 'Large scale outdoor rigging and sound reinforcement.' },
];

export const VENUES: Venue[] = [
  { id: 'v1', name: 'The Grand Ballroom', location: 'Downtown', capacity: 500, image: 'https://picsum.photos/seed/venue1/600/400' },
  { id: 'v2', name: 'Sky Garden', location: 'Rooftop District', capacity: 200, image: 'https://picsum.photos/seed/venue2/600/800' },
  { id: 'v3', name: 'Industrial Warehouse', location: 'Arts District', capacity: 1000, image: 'https://picsum.photos/seed/venue3/600/600' },
  { id: 'v4', name: 'Seaside Pavilion', location: 'Coastal Road', capacity: 350, image: 'https://picsum.photos/seed/venue4/800/500' },
];

export const EVENT_TYPES = ['Wedding', 'Corporate', 'Birthday', 'Concert', 'Debut', 'Other'];