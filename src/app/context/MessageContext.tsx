"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface MessageContextType {
  unreadCount: number;
  setUnreadCount: (count: number) => void;
  updateUnreadCount: () => void;
}

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [unreadCount, setUnreadCount] = useState(0);

  const updateUnreadCount = () => {
    // Здесь можно добавить логику для обновления счетчика
    // например, через API запрос
  };

  return (
    <MessageContext.Provider value={{ unreadCount, setUnreadCount, updateUnreadCount }}>
      {children}
    </MessageContext.Provider>
  );
}

export function useMessageContext() {
  const context = useContext(MessageContext);
  if (context === undefined) {
    throw new Error("useMessageContext must be used within a MessageProvider");
  }
  return context;
}
