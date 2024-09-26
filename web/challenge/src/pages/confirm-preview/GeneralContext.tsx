import { cn } from "@/lib/utils";

interface Props {
  general_context: string;
  className?: string;
};

const GeneralContext = ({ general_context, className } : Props) => {
  return (
    <div className={cn("p-2 border-slate-700 border-l-4", className)} >
      <div className="mb-3" >
        <span className="font-semibold" >Contexto Geral: </span>
      </div>

      {general_context}
    </div>
  );
};

export default GeneralContext;