import api from '@/api';
import { IDimensionsList } from '@/types';
import React, { useEffect, useState } from 'react';

interface Props {
  data: IDimensionsList;
}

const SelectedCluesList: React.FC<Props> = ({ data }) => {
  const [baseData, setBaseData] = useState<IDimensionsList | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await api.get("/evidences", {
          headers: {
            showLoader: false,
          },
        });

        const { data } = response;
        setBaseData(data);
      } catch (err) {
        setBaseData(null);
      }
    }

    fetchData();
  }, []);

  return (
    <div>
      {data.dimensions.map((dimension) => {
        const baseDimension = baseData?.dimensions[Number(dimension.key)];
        if (!baseDimension) return null;

        return (
          <div key={dimension.key} className='mb-4' >
            <h2>{baseDimension.title}</h2>

            {dimension.evidences.map((evidence) => {
              const baseEvidence = baseDimension.evidences[Number(evidence.key)];
              if (!baseEvidence) return null;

              return (
                <div key={evidence.key} className='ml-6 mb-2'>
                  <h3>{baseEvidence.title}</h3>

                  {evidence.clues.map((clue) => {
                    const baseClue = baseEvidence.clues[Number(clue.key)];
                    if (!baseClue) return null;

                    return (
                      <div key={clue.key} className='ml-6 mb-2' >
                        <p>{baseClue.title}</p>
                      </div>
                    );
                  })}
                </div>
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default SelectedCluesList;