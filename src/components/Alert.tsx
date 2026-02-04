"use client";

import { AlertTriangle, X } from "lucide-react";
import { useState } from "react";

interface AlertProps {
  type?: "error" | "warning" | "info";
  title?: string;
  message: string;
  onClose?: () => void;
  dismissible?: boolean;
}

export function Alert({
  type = "error",
  title,
  message,
  onClose,
  dismissible = true,
}: AlertProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  const handleClose = () => {
    setIsVisible(false);
    if (onClose) onClose();
  };

  const styles = {
    error: "bg-red-50 border-red-200 text-red-800",
    warning: "bg-yellow-50 border-yellow-200 text-yellow-800",
    info: "bg-blue-50 border-blue-200 text-blue-800",
  };

  const iconColors = {
    error: "text-red-500",
    warning: "text-yellow-500",
    info: "text-blue-500",
  };

  return (
    <div
      className={`${styles[type]} border-2 rounded-xl p-4 md:p-6 shadow-sm mb-6`}
    >
      <div className="flex items-start gap-4">
        <AlertTriangle
          className={`${iconColors[type]} flex-shrink-0 mt-0.5`}
          size={24}
        />
        <div className="flex-grow">
          {title && (
            <h3 className="font-bold text-lg mb-2">{title}</h3>
          )}
          <p className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
            {message}
          </p>
        </div>
        {dismissible && (
          <button
            onClick={handleClose}
            className={`${iconColors[type]} hover:opacity-70 transition-opacity flex-shrink-0`}
            aria-label="Fechar alerta"
          >
            <X size={20} />
          </button>
        )}
      </div>
    </div>
  );
}
