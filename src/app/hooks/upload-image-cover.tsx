import { create } from "zustand";

type CoverImage = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCoverImage = create<CoverImage>((set) => ({
  isOpen: false,
  onClose() {
    set({ isOpen: false });
  },
  onOpen() {
    set({ isOpen: true });
  },
}));
