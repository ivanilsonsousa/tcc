import axios from 'axios';
import { useToast } from "@/hooks/use-toast";
import { useLoading } from "@/context/LoadingContext";

const baseURL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const useAxiosInterceptor = () => {
  const { showLoading, hideLoading } = useLoading();
  const { toast } = useToast();

  api.interceptors.request.use(
    (config) => {
      const showLoader = config.headers?.['showLoader'] !== false;

      if (showLoader) {
        const customMessage = config.headers?.['loadingMessage'];

        showLoading(customMessage);
      }

      return config;
    },
    (error) => {
      hideLoading();

      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => {
      hideLoading();

      return response;
    },
    (error) => {
      hideLoading();
      const errorMessage = error.response?.data?.message || 'Something went wrong!';
      
      toast({
        title: 'Error',
        description: errorMessage,
        variant: 'destructive',
      });

      return Promise.reject(error);
    }
  );
};

export default api;
