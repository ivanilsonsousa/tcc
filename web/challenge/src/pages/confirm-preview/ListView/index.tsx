import { IDimensionsList } from "@/types";
import { cn } from "@/lib/utils";
import SelectedCluesList from "./SelectedCluesList";

interface Props {
  data: IDimensionsList;
  className: string;
}

const ListView = ({ data, className }: Props) => {

  return (
    <div className={cn("p-2 border-slate-700 border-l-4", className)}>
      <div className="mb-3">
        <span className="font-semibold">Indícios Selecionados: </span>
      </div>

      <SelectedCluesList data={data} />
    </div>
  );
};

export default ListView;
