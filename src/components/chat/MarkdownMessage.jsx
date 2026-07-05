import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "./CodeBlock";

export default function MarkdownMessage({ content }) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        code(props) {
          const { className, children } = props;

          const match = /language-(\w+)/.exec(className || "");

          return (
            <CodeBlock language={match?.[1] || "text"}>
              {children}
            </CodeBlock>
          );
        },
      }}
    >
      {content}
    </ReactMarkdown>
  );
}