export type GalleryImage = { id: string; src: string; width: number; height: number };

const img = (id: string, width: number, height: number): GalleryImage => ({
  id,
  src: `/images/${id}.jpg`,
  width,
  height,
});

export const galleryImages: GalleryImage[] = [
  img("sun-star-google-maps-hero", 900, 1200),
  img("sun-star-real-move-1", 800, 493),
  img("sun-star-real-move-2", 1280, 784),
  img("professional-furniture-packing-uae", 1448, 1086),
  img("wardrobe-installation-uae", 1200, 1600),
  img("bed-assembly-furniture-installation-uae", 1600, 1200),
  img("movers-loading-boxes-building-elevator", 1080, 1080),
  img("packed-boxes-apartment-move-uae", 720, 960),
  img("moving-truck-loaded-boxes-safe-transport", 1080, 1080),
  img("wrapped-furniture-delivered-new-home", 1600, 1200),
  img("mattress-headboard-blanket-wrapping", 1080, 1080),
];

export const videos: { id: string; src: string }[] = [];

export const heroImage = galleryImages[0];
