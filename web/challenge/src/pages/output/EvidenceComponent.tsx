import React from 'react';
import { Evidence } from './interfaces';
import ClueComponent from './ClueComponent';

interface EvidenceProps {
  evidence: Evidence;
}

const EvidenceComponent: React.FC<EvidenceProps> = ({ evidence }) => {
  return (
    <div className='ml-5 mb-5' >
      <div className="border-b-4 p-2 mb-4 border-red-400 text-zinc-600">
        <h3 className='text-lg' >
          {evidence.title}
        </h3>
      </div>

      {evidence.clues.map(clue => (
        <ClueComponent key={clue.key} clue={clue} />
      ))}
    </div>
  );
};

export default EvidenceComponent;
