import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight'; // Adiciona destaque de sintaxe
import { CustomMarkdownComponents } from './md/CustomMarkdownComponents';
import { useLocation } from 'react-router-dom';

import 'highlight.js/styles/atom-one-dark.css'; // Ou qualquer outro tema de sua escolha

const markdownText = `
# Heading 1
## Heading 2
### Heading 3

This is a paragraph with some **bold** text, *italicized* text, and ~~strikethrough~~ text.  
You can also have [links](https://example.com) and inline code like \`const x = 10;\`.

---

### Lists

- Item 1
  - Subitem 1.1
  - Subitem 1.2
- Item 2
  - Subitem 2.1
  - Subitem 2.2

1. First item
2. Second item
3. Third item

---

### Blockquotes

> This is a blockquote.
>
> It can span multiple lines.

---

### Code Blocks

\`\`\`javascript
function add(a, b) {
  return a + b;
}
\`\`\`

---

### Tables

| Name    | Age | Country  |
| ------- | --- | -------- |
| Alice   | 25  | USA      |
| Bob     | 30  | UK       |
| Charlie | 35  | Canada   |

---

### Images

![Placeholder Image](https://via.placeholder.com/150)

You can also render **raw HTML** inside Markdown:

<div style="background-color: #f0f0f0; padding: 10px; border-radius: 5px;">
  This is raw HTML content.
</div>

---

### Task Lists

- [x] Task 1
- [ ] Task 2
- [x] Task 3
`;

export function Result() {
  const location = useLocation();
  const output = location.state || '';

  return (
  <div
    className="min-h-screen flex items-center justify-center sbg-slate-500 py-14"
  >
    <div className='w-[700px] pt-2 pb-6 px-8 border border-gray-400 rounded-lg' >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}  // Habilitando suporte a listas com remark-gfm
        rehypePlugins={[rehypeRaw, rehypeHighlight]}
        components={CustomMarkdownComponents}  // Usando os componentes customizados
      >
        {output}
      </ReactMarkdown>
    </div>
  </div>
  );
}
