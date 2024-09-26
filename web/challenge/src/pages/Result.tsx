import DataRenderer from './output/DataRenderer';
import { useLocation } from 'react-router-dom';

export function Result() {
  const location = useLocation();
  const data = location.state || null;

  if (!data) {
    return (
      <div className='flex items-center justify-center' >Sem dados</div>
    );
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center sbg-slate-500 py-5"
    >
      <div className='max-w-[900px] py-2 px-6 border border-neutral-300 rounded-lg' >
        <DataRenderer params={data} />
      </div>
    </div>
  );
}