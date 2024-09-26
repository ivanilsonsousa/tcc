import { useLoading } from '@/context/LoadingContext';
import { LoadingTower } from './Loading/Tower';

const LoadingOverlay = () => {
  const { isLoading, customElementLoading } = useLoading();

  if (!isLoading) return null;

  return (<LoadingTower />);
};

export default LoadingOverlay;