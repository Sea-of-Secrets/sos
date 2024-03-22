import React from "react";
import { create } from "zustand";

type FooterPayload = string | React.ReactNode | React.ReactNode[];

interface SystemPromptState {
  headerMessage: string;
  setHeaderMessage: (message: string) => void;
  removeHeaderMessage: () => void;
  footerMessage: FooterPayload;
  setFooterMessage: (message: FooterPayload) => void;
  removeFooterMessage: () => void;
}

export const useSystemPrompt = create<SystemPromptState>(set => {
  return {
    headerMessage: "",
    setHeaderMessage: (message: string) => {
      set(state => ({ ...state, headerMessage: message }));
    },
    removeHeaderMessage: () => {
      set(state => ({ ...state, headerMessage: "" }));
    },
    footerMessage: "",
    setFooterMessage: (message: FooterPayload) => {
      set(state => ({ ...state, footerMessage: message }));
    },
    removeFooterMessage: () => {
      set(state => ({ ...state, footerMessage: "" }));
    },
  };
});
