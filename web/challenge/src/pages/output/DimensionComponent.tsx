import React from 'react';
import { Dimension } from './interfaces';
import EvidenceComponent from './EvidenceComponent';

interface DimensionProps {
  dimension: Dimension;
}

const DimensionComponent: React.FC<DimensionProps> = ({ dimension }) => {
  return (
    <div className='mb-5'>
      <div className="border-b-4 p-2 mb-4 border-gray-400 text-zinc-600">
        <h2 className='text-lg' >
          {dimension.title}
        </h2>
      </div>

      {dimension.evidences.map(evidence => (
        <EvidenceComponent key={evidence.key} evidence={evidence} />
      ))}
    </div>
  );
};

export default DimensionComponent;
