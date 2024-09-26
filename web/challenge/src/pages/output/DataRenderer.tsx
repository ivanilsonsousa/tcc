import React from "react";
import { Dimension } from "./interfaces";
import DimensionComponent from "./DimensionComponent";

interface Props {
  params: Dimension[]
}

const DataRenderer: React.FC<Props> = ({ params }) => {
  
  return (
    <div className="py-4">
      {params.map((item) => (
        <DimensionComponent key={item.key} dimension={item} />
      ))}
    </div>
  );
};

export default DataRenderer;
