import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { bytesFormat } from "@/utils";

interface Props {
  files: File[];
  className: string;
}

const AddedFiles = ({ files, className }: Props) => {
  return (
    <div className={cn("p-2 border-slate-700 border-l-4", className)}>
      <div className="mb-3" >
        <span className="font-semibold" >Arquivos Adicionados: </span>
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Nome do Arquivo</TableHead>
            <TableHead>Tamanho</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {Array.from(files).map((file, index) => (
            <TableRow key={index}>
              <TableCell>{file.name}</TableCell>
              <TableCell>{bytesFormat(file.size)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AddedFiles;
