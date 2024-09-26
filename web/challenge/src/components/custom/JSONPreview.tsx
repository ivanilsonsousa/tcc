import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CombinedFormData } from "@/pages/steps/validationSchemas";

interface Props {
  data: CombinedFormData;
}

const JSONPreview: React.FC<Props> = ({ data }) => {
  return (
    <div className="w-full bg-zinc-300 overflow-y-auto rounded-md">
      <ScrollArea orientation="horizontal">
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </ScrollArea>
    </div>
  );
};

export default JSONPreview;
