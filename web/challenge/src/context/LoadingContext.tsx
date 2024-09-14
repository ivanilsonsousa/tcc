import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  showLoading: (customMessage?: ReactNode) => void;
  hideLoading: () => void;
  customMessage: ReactNode | null;
}

const LoadingContext = createContext<LoadingContextProps | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }: { children: ReactNode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [customMessage, setCustomMessage] = useState<ReactNode | null>(null);

  const showLoading = (message?: ReactNode) => {
    setIsLoading(true);
    setCustomMessage(message || null);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setCustomMessage(null);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, customMessage }}>
      {children}
    </LoadingContext.Provider>
  );
};