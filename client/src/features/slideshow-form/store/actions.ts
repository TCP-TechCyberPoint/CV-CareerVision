import type { StateCreator } from 'zustand';
import type { SlideshowState, SlideshowActions } from './types';

export const createSlideshowActions: StateCreator<
  SlideshowState & SlideshowActions,
  [],
  [],
  SlideshowActions
> = (set, get) => ({
  nextSlide: () => {
    const { slides, currentIndex } = get();
    set({ currentIndex: (currentIndex + 1) % slides.length });
  },
  prevSlide: () => {
    const { slides, currentIndex } = get();
    set({ currentIndex: (currentIndex - 1 + slides.length) % slides.length });
  },
  setSlides: (slides) => set({ slides, currentIndex: 0 }),
  togglePlay: () => set((state) => ({ isPlaying: !state.isPlaying })),
  setMeta: (meta) => set({ meta }),
});
