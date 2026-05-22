const graphicImageModules = import.meta.glob<{ default: string }>('../imagesgraphic/*.{jpeg,jpg,png}', { eager: true });
const dynamicGraphicItems = Object.values(graphicImageModules).map((mod, index) => ({
  id: 1000 + index,
  category: 'graphic-designing',
  title: `Creative Design ${index + 1}`,
  image: mod.default,
  description: 'A premium graphic design project showcasing our creative expertise and attention to detail.'
}));

const digitalArtImageModules = import.meta.glob<{ default: string }>('../digitalartimages/*.{jpeg,jpg,png}', { eager: true });
const digitalArtSubCategoriesList = ['2d', '3d', '2d-animation', '3d-animation'];
const dynamicDigitalArtItems = Object.values(digitalArtImageModules).map((mod, index) => {
  const subCategory = digitalArtSubCategoriesList[index % digitalArtSubCategoriesList.length];
  return {
    id: 2000 + index,
    category: 'digital-art',
    subCategory,
    title: `Digital Masterpiece ${index + 1}`,
    image: mod.default,
    description: `A stunning ${subCategory.replace('-', ' ')} artwork exploring new creative boundaries.`
  };
});

export const portfolioItems = [
  ...dynamicGraphicItems,
  ...dynamicDigitalArtItems,
  {
    id: 5,
    category: 'web-dev',
    title: 'Quantum Dashboard',
    image: 'https://picsum.photos/seed/wd1/1200/800',
    description: 'Real-time data visualization platform for quantum computing research.'
  },
  {
    id: 6,
    category: 'web-dev',
    title: 'E-commerce Core',
    image: 'https://picsum.photos/seed/wd2/1200/800',
    description: 'A headless commerce solution built with React and high-performance APIs.'
  },
  {
    id: 7,
    category: 'ui-ux',
    title: 'ZenFlow Mobile',
    image: 'https://picsum.photos/seed/uiux1/1200/800',
    description: 'A meditation app focusing on minimal cognitive load and fluid animations.'
  },
  {
    id: 8,
    category: 'video-editing',
    title: 'Cinematic Reels',
    image: 'https://picsum.photos/seed/vid1/1200/800',
    description: 'Fast-paced, high-impact social media video production for tech influencers.'
  },
  {
    id: 9,
    category: 'ai-ads',
    title: 'Neural Campaigns',
    image: 'https://picsum.photos/seed/aiad1/1200/800',
    description: 'AI-generated visual assets for highly targeted AdSense and social media campaigns.'
  },
  {
    id: 10,
    category: 'yt-automation',
    title: 'Growth Engine',
    image: 'https://picsum.photos/seed/ytaut1/1200/800',
    description: 'End-to-end automated channel management, from script to high-retention upload.'
  },
];
