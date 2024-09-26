import React from "react";
import { CombinedFormData } from "@/pages/steps/validationSchemas";
import GeneralContext from "./GeneralContext";
import AddedFiles from "./AddedFiles";
import ListView from "./ListView";

interface Props {
  data: CombinedFormData;
}

const ConfirmPreview: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full">
      <GeneralContext general_context={data.general_context} />
      
      <ListView className="mt-8" data={data.params} />

      <AddedFiles className="mt-8" files={data.files} />
    </div>
  );
};

export default ConfirmPreview;