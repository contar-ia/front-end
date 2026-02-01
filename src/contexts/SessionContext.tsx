"use client";
import { createContext, ReactNode, useContext } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const APP_NAME = "contaria_app";

export interface SessionData {
  token: string;
  user_id: string;
  username: string;
  email: string;
}

interface SessionContextType {
  logOut: () => void;
  updateSessionData: (novaSession: Partial<SessionData>) => void;
}

export async function getStorageData(key: string = APP_NAME): Promise<SessionData | null> {
  if (typeof window === "undefined") return null;
  const storagedData = localStorage.getItem(key);
  return storagedData ? JSON.parse(storagedData) : null;
}

export async function setStorageData(data: SessionData, key: string = APP_NAME): Promise<void> {
  localStorage.setItem(key, JSON.stringify(data));
}

export async function clearStorageData(key: string = APP_NAME): Promise<void> {
  localStorage.removeItem(key);
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function SessionContextProvider({ children }: Props) {
  const queryClient = useQueryClient();

  const session = useQuery<SessionData | null, Error>({
    queryKey: ["sessions"],
    queryFn: () => getStorageData(),
  });

  function logOut() {
    clearStorageData();
    queryClient.invalidateQueries({ queryKey: ["sessions"] });
  }

    function updateSessionData(novaSession: Partial<SessionData>) {
        const defaultSession: SessionData = {
            token: "",
            user_id: "",
            username: "",
            email: "",
        };

        const updatedData: SessionData = {
            ...(session.data ?? defaultSession),
            ...novaSession,
        };

        setStorageData(updatedData);
        queryClient.invalidateQueries({ queryKey: ["sessions"] });
    }

  return (
    <SessionContext.Provider
      value={{
        ...session,
        logOut,
        updateSessionData,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
}

export function useSession() {
  const context = useContext(SessionContext);
  if (context === undefined) {
    throw new Error("useSession deve ser usado dentro de um SessionContextProvider");
  }
  return context;
}

export default SessionContext;