import { ReactElement } from "react";
import { create } from "zustand";

export type HeaderState = {
  isActive: boolean;
  content: ReactElement | null;
  notificationIsOn: boolean;
  setIsActive: ({
    isActive,
    content,
  }: {
    isActive: boolean;
    content: ReactElement;
  }) => void;
  setNotification: (notificationIsOn: boolean) => void;
};

const useHeaderStore = create<HeaderState>((set) => ({
  isActive: false,
  content: null,
  notificationIsOn: false,
  setIsActive: ({
    isActive,
    content,
  }: {
    isActive: boolean;
    content: ReactElement;
  }) => {
    set({ content: content, isActive: isActive });
  },
  setNotification: (notificationIsOn: boolean) => {
    set({ notificationIsOn: notificationIsOn });
  },
}));

export default useHeaderStore;
