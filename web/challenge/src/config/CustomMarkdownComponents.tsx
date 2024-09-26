import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Element } from 'hast';

type ExtraProps = { node?: Element };

type Components = Partial<{
  [TagName in keyof JSX.IntrinsicElements]:
    | (new (props: JSX.IntrinsicElements[TagName] & ExtraProps) => JSX.ElementClass)
    | ((props: JSX.IntrinsicElements[TagName] & ExtraProps) => JSX.Element | string | null | undefined)
    | keyof JSX.IntrinsicElements;
}>;

export const CustomMarkdownComponents: Components = {
  h1: ({ children, ...props }) => (
    <h1 className="text-4xl font-bold mt-4 mb-2" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }) => (
    <h2 className="text-3xl font-semibold mt-4 mb-2" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }) => (
    <h3 className="text-2xl font-medium mt-3 mb-2" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }) => (
    <div className="text-base mb-4" {...props}>
      {children}
    </div>
  ),
  code: ({ children, className, ...props }) => (
    <ScrollArea orientation='horizontal' className='bg-transparent rounded-lg mb-5' >
      <code
        className={cn(className)}
        {...props}
      >
        {children}
      </code>
    </ScrollArea>
  ),
  input: ({ type, ...props }) => {
    if (type === 'checkbox') {
      return (
        <input
          type="checkbox"
          {...props}
        />
      );
    }
    return <input type={type} {...props} />;
  },
  ul: ({ children, ...props }) => (
    <ul className="list-disc ml-6" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }) => (
    <ol className="list-decimal ml-6" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => (
    <li className="mb-2" {...props}>
      {children}
    </li>
  ),
  table: ({ children, ...props }) => (
    <table className="table-auto border-collapse border border-gray-400 w-full mb-4" {...props}>
      {children}
    </table>
  ),
  thead: ({ children, ...props }) => (
    <thead className="bg-gray-200" {...props}>
      {children}
    </thead>
  ),
  tbody: ({ children, ...props }) => (
    <tbody className="bg-white" {...props}>
      {children}
    </tbody>
  ),
  tr: ({ children, ...props }) => (
    <tr className="border-t border-gray-300" {...props}>
      {children}
    </tr>
  ),
  th: ({ children, ...props }) => (
    <th className="px-4 py-2 text-left font-medium bg-gray-100 border border-gray-300" {...props}>
      {children}
    </th>
  ),
  td: ({ children, ...props }) => (
    <td className="px-4 py-2 border border-gray-300" {...props}>
      {children}
    </td>
  ),
};