import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import styles from "./_typing-message.module.css";
import "katex/dist/katex.min.css";

function TypingMessage({ content, speed = 15, onFinish, scrollRef }) {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let index = 0;

    const scrollToBottom = () => {
      if (scrollRef?.current) {
        scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
      }
    };

    const interval = setInterval(() => {
      if (index < content.length) {
        index++;
        setDisplayedText(content.substring(0, index));
        scrollToBottom();
      } else {
        clearInterval(interval);
        if (onFinish) onFinish();
      }
    }, speed);

    return () => clearInterval(interval);
  }, [content, speed, onFinish, scrollRef]);

  return (
    <div className={styles.markdownContainer}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkMath]}
        rehypePlugins={[rehypeKatex]}
      >
        {displayedText}
      </ReactMarkdown>
    </div>
  );
}

export default TypingMessage;
