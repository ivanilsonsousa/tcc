import React from 'react';
import { Clue } from './interfaces';
import MardownOutput from './MarkdownOutput'

interface ClueProps {
  clue: Clue;
}

const ClueComponent: React.FC<ClueProps> = ({ clue }) => {
  return (
    <div className='ml-5 mb-5'>
      <div className="border-b-4 p-2 mb-4 border-orange-400 text-zinc-600">
        <p className='text-md' >
          {clue.title}
        </p>
      </div>
      
      <div className='border rounded-lg p-4 bg-neutral-200 text-zinc-600' >
        <MardownOutput text={clue.output} />
      </div>
    </div>
  );
};

export default ClueComponent;