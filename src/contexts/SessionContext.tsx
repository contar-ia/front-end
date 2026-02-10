"use client";
import { createContext, ReactNode, useContext, useEffect } from "react";
import { UseQueryResult, useQuery, useQueryClient } from "@tanstack/react-query";

const APP_NAME = "contaria_app";
const LOGOUT_REASON_KEY = `${APP_NAME}_logout_reason`;

export interface SessionData {
  token: string;
  user_id: string;
  username: string;
  email: string;
}

type SessionContextType = UseQueryResult<SessionData | null, Error> & {
  logOut: () => void;
  logOutWithReason: (reason: string) => void;
  updateSessionData: (novaSession: Partial<SessionData>) => void;
};

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

export async function setLogoutReason(reason: string): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.setItem(LOGOUT_REASON_KEY, reason);
}

export async function getLogoutReason(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(LOGOUT_REASON_KEY);
}

export async function clearLogoutReason(): Promise<void> {
  if (typeof window === "undefined") return;
  localStorage.removeItem(LOGOUT_REASON_KEY);
}

export const SessionContext = createContext<SessionContextType | undefined>(undefined);

interface Props {
  children: ReactNode;
}

export function SessionContextProvider({ children }: Props) {
  const queryClient = useQueryClient();
  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL ?? "http://localhost:8000";

  const session = useQuery<SessionData | null, Error>({
    queryKey: ["sessions"],
    queryFn: () => getStorageData(),
  });

  function logOut() {
    clearStorageData();
    clearLogoutReason();
    queryClient.invalidateQueries({ queryKey: ["sessions"] });
  }

  function logOutWithReason(reason: string) {
    setLogoutReason(reason);
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

  useEffect(() => {
    if (!session.data?.token) return;

    fetch(`${backendUrl}/auth/me`, {
      headers: {
        Authorization: `Bearer ${session.data.token}`,
      },
    })
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unauthorized");
        }
        return res.json();
      })
      .then((data) => {
        updateSessionData({
          user_id: data.user_id,
          username: data.username,
          email: data.email,
        });
      })
      .catch(() => {
        logOutWithReason("Sessão expirada. Faça login novamente.");
      });
  }, [backendUrl, session.data?.token, updateSessionData, logOutWithReason]);

  return (
    <SessionContext.Provider
      value={{
        ...session,
        logOut,
        logOutWithReason,
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