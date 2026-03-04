import { useState } from "react";
import { useMan } from "../../hooks/man-provider";
import AgentButton from "../agent-button";
import styles from "./side-bar.module.css";

const SideBar = ({ children }) => {
  const { agents, handleAgentSelect, selectedAgent } = useMan();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div
      className={styles.sidebar}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div className={styles["sidebar-header"]}>Agentes Especializados</div>
      <div className={styles["sidebar-content"]}>
        {agents?.map((agent, index) => {
          const isSelected = selectedAgent?.id === agent.id;
          return (
            <AgentButton
              key={index}
              isSelected={isSelected}
              handleAgentSelect={
                isExpanded
                  ? handleAgentSelect
                  : () => {
                    }
              }
              agent={agent}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SideBar;
