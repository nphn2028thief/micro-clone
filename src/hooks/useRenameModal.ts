import { create } from "zustand";

const defaultValues = { id: "", title: "" };

interface IState {
  isOpen: boolean;
  initialState: typeof defaultValues;
  onOpen: (id: string, title: string) => void;
  onClose: () => void;
}

const useRenameModal = create<IState>((set) => ({
  isOpen: false,
  initialState: defaultValues,
  onOpen: (id, title) =>
    set({
      isOpen: true,
      initialState: { id, title },
    }),
  onClose: () =>
    set({
      isOpen: false,
      initialState: defaultValues,
    }),
}));

export default useRenameModal;
