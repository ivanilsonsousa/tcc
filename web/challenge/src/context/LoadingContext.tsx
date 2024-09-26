import { createContext, useContext, useState, ReactNode } from 'react';

interface LoadingContextProps {
  isLoading: boolean;
  showLoading: (customElementLoading?: ReactNode) => void;
  hideLoading: () => void;
  customElementLoading: ReactNode | null;
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
  const [customElementLoading, setCustomElementLoading] = useState<ReactNode | null>(null);

  const showLoading = (message?: ReactNode) => {
    setIsLoading(true);
    setCustomElementLoading(message || null);
  };

  const hideLoading = () => {
    setIsLoading(false);
    setCustomElementLoading(null);
  };

  return (
    <LoadingContext.Provider value={{ isLoading, showLoading, hideLoading, customElementLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};