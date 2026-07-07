import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

export default function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
       p({ children }) {
  return <div className="mb-4">{children}</div>;
},

        code({ inline, className, children, ...props }) {
          const match = /language-(\w+)/.exec(className || "");

          // Inline code
          if (inline) {
            return (
              <code
                className="rounded bg-white/10 px-1.5 py-0.5 text-violet-300"
                {...props}
              >
                {children}
              </code>
            );
          }

          // Code block
          return (
            <CodeBlock language={match?.[1] || "text"}>
              {String(children).replace(/\n$/, "")}
            </CodeBlock>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}