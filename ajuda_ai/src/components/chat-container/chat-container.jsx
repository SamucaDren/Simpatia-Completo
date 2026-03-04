import {
  ArrowsCounterClockwise,
  CircleNotch,
  PaperPlaneRight,
  Robot,
  User,
  ClipboardText,
  Checks,
  Check,
  ShieldCheck,
} from "phosphor-react";
import { useMan } from "../../hooks/man-provider";
import { formatDate } from "../../utils/format-date";
import TypingMessage from "../typing-message/typing-message";
import styles from "./chat-container.module.css";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import "katex/dist/katex.min.css";
import { useState } from "react";

const ChatContainer = () => {
  const {
    selectedAgent,
    scrollRef,
    isLoading,
    handleSubmit,
    textareaRef,
    inputValue,
    setInputValue,
    autoResize,
    reload,
    limparStorage,
    isMobile,
  } = useMan();

  const Icon = selectedAgent?.icon;
  const [copiedId, setCopiedId] = useState(null);

  const handleCopy = async (id, text) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      console.error("Erro ao copiar:", err);
    }
  };

  return (
    <div className={styles.chatContainer}>
      {selectedAgent ? (
        <>
          <header className={styles.chatHeader}>
            <div className={styles.chatHeaderTitle}>
              {Icon && <Icon size={20} color={selectedAgent.color} />}
              <div>
                <strong>{selectedAgent.name}</strong>
                {!isMobile && <p>{selectedAgent.description}</p>}
              </div>
            </div>
            {
              selectedAgent?.messages?.length <= 11 &&
              <button className={styles.buttonTop} onClick={limparStorage}>
                <ArrowsCounterClockwise
                  size={20}
                  color="white"
                  className={reload ? styles.spinTop : ""}
                />
              </button>
            }
          </header>

          <div className={styles.messages} ref={scrollRef}>
            {selectedAgent.messages.map((msg) => {
              const MessageIcon = msg.type === "user" ? User : Icon;
              const isBot = msg.type === "bot";

              return (
                <div
                  key={msg.id}
                  className={`${styles.message} ${styles[`message${msg.type}`]}`}
                  style={{
                    backgroundColor: isBot ? "#F8F8FC" : selectedAgent.color,
                    color: isBot ? "#000" : "#fff",
                    position: "relative",
                  }}
                >
                  {isBot &&
                    selectedAgent?.messages[selectedAgent.messages.length - 1].id === msg.id &&
                    Date.now() - new Date(msg.timestamp).getTime() <= 5000 ? (
                    <TypingMessage content={msg.content} scrollRef={scrollRef} />
                  ) : isBot ? (
                    <div className={styles.markdownContainer}>
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm, remarkMath]}
                        rehypePlugins={[rehypeKatex]}
                      >
                        {msg.content}
                      </ReactMarkdown>
                    </div>
                  ) : (
                    <>{msg.content}</>
                  )}

                  <small>{formatDate(msg.timestamp)}</small>
                  {isBot &&
                    <button
                      className={styles.copyButton}
                      onClick={() => handleCopy(msg.id, msg.content)}
                      title="Copiar mensagem"
                    >

                      {copiedId === msg.id ?
                        <div style={{ backgroundColor: '#e8ebf0', borderRadius: '100%', minWidth: '25px', minHeight: '25px', display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                          <Checks size={18} color={"#000"} />
                        </div>
                        :
                        <ClipboardText
                          size={18}
                          color={isBot ? "#000" : "#fff"}
                        />
                      }

                    </button>
                  }

                </div>
              );
            })}

            {isLoading && (
              <div className={`${styles.messagebot} ${styles.message} ${styles.loadingContainer}`}>
                <div className={styles.typingIndicator}>
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <span className={styles.loadingText}>Pensando...</span>
              </div>
            )}

          </div>

          <form onSubmit={handleSubmit} className={styles.inputArea}>
            {
              selectedAgent?.messages?.length > 11 ?
                <div style={{ display: 'flex', textAlign: 'center', gap: isMobile ? 0 : '4rem', flexDirection: isMobile ? 'column-reverse' : 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                  <p>Você chegou no limite do seu agente, recarregue e continue aproveitando!</p>

                  <button className={styles.buttonTop} style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minWidth: '40px', minHeight: '40px' }} onClick={limparStorage}>
                    <ArrowsCounterClockwise
                      size={20}
                      color="white"
                      className={reload ? styles.spinTop : ""}
                    />
                  </button>
                </div>
                :
                <>
                  <textarea
                    ref={textareaRef}
                    value={inputValue}
                    onChange={(e) => {
                      setInputValue(e.target.value);
                      autoResize();
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        if (!isLoading && inputValue.trim()) {
                          handleSubmit(e);
                        }
                      }
                    }}
                    placeholder={`Converse com ${selectedAgent.name}...`}
                    rows={1}
                    style={{
                      flex: 1,
                      border: "1px solid #E4E4F2",
                      resize: "none",
                      padding: "8px 12px 8px 8px",
                      outline: "none",
                      borderRadius: "8px",
                      font: "inherit",
                      lineHeight: "24px",
                      height: "auto",
                      maxHeight: `${24 * 10}px`,
                      overflowY: "hidden",
                      boxShadow: "0px 1px 4px rgba(76, 75, 103, 0.08)",
                      boxSizing: "border-box",
                      overflowWrap: "break-word",
                      wordBreak: "break-word",
                      whiteSpace: "pre-wrap",
                      fontSize: isMobile ? "14px" : "15px",
                    }}
                  />
                  <button type="submit" disabled={isLoading || !inputValue.trim()}>
                    {isLoading ? (
                      <CircleNotch size={20} className={styles.spin} />
                    ) : (
                      <PaperPlaneRight size={20} />
                    )}
                  </button>
                  <p style={{ position: 'absolute', width: '90%', textAlign: 'center', bottom: '-5px', left: '50%', transform: 'translateX(-50%)', fontSize: isMobile ? '8px' : '11px' }}> A Simpatia para alunos pode cometer erros. Por isso, lembre-se de conferir as informações geradas.</p>
                </>
            }
          </form>
        </>
      ) : (
        <div className={styles.emptyChat}>
          <Robot size={40} />
          <p>Selecione um agente para começar</p>
        </div>
      )}
    </div>
  );
};

export default ChatContainer;
