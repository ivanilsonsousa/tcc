import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import rehypeHighlight from "rehype-highlight";
import { CustomMarkdownComponents } from "@/config/CustomMarkdownComponents";
import "highlight.js/styles/atom-one-dark.css";

interface Props {
  text: string;
}

const MardownOutput: React.FC<Props> = ({ text }) => {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]} // Habilitando suporte a listas com remark-gfm
      rehypePlugins={[rehypeRaw, rehypeHighlight]}
      components={CustomMarkdownComponents} // Usando os componentes customizados
    >
      {text}
    </ReactMarkdown>
  );
}

export default MardownOutput;