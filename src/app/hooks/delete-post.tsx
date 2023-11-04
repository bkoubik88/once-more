import { create } from "zustand";

type Post = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useDeletePost = create<Post>((set) => ({
  isOpen: false,
  onClose() {
    set({ isOpen: false });
  },
  onOpen() {
    set({ isOpen: true });
  },
}));
