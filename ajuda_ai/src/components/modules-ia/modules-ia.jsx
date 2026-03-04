import { CaretDown } from "phosphor-react";
import { useMan } from "../../hooks/man-provider";
import { useDropdown } from "../../hooks/use-dropdown";
import Button from "../button";
import { useEffect, useState } from "react";
import styles from './_modules-ia.module.css'
import NavModulos from "./nav-modulos";

export default function ModuleIA() {
  const { agents, handleAgentSelect } = useMan();
  const { isOpen, toggle, close } = useDropdown();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth <= 768);
    checkMobile();

    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  return (
    <div style={{ position: "relative", display: "inline-block" }}>

      {
        isMobile ?
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            className={styles.btn}
          >
            <div
              style={{
                padding: 0,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'flex-start',
                gap: "6px"
              }}
            >
              <span style={{ lineHeight: "1" }}>Agentes de IA</span>
              <div
                style={{
                  position: 'relative',
                  display: 'flex',
                  width: "20px",
                  height: "20px",
                }}
              >
                <CaretDown
                  style={{
                    position: 'absolute',
                    width: "20px",
                    height: "20px",
                    transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                    transition: "transform 0.3s",
                    color: "#006FFF"
                  }}
                />
                <CaretDown
                  style={{
                    position: 'absolute',
                    width: "20px",
                    height: "20px",
                    transform: "rotate(0deg)",
                    transition: "transform 0.3s",
                    color: "#006FFF"
                  }}
                />
              </div>
            </div>

          </Button>
          :
          <Button
            onClick={(e) => {
              e.stopPropagation();
              toggle();
            }}
            types="outline"
          >
            Agentes de IA
            <div
              style={{
                position: 'relative',
                display: 'flex',
                width: "20px",
                height: "20px",
              }}
            >
              <CaretDown
                style={{
                  position: 'absolute',
                  width: "20px",
                  height: "20px",
                  transform: isOpen ? "rotate(-180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                  color: "#006FFF"
                }}
              />
              <CaretDown
                style={{
                  position: 'absolute',
                  width: "20px",
                  height: "20px",
                  transform: "rotate(0deg)",
                  transition: "transform 0.3s",
                  color: "#006FFF"
                }}
              />
            </div>
          </Button>
      }

      {isOpen && (
        <ul
          onClick={(e) => e.stopPropagation()}
          style={{
            position: "absolute",
            top: "100%",
            left: "0",
            zIndex: 1000,
            minWidth: "100%",
            backgroundColor: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: "6px",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
            marginTop: "4px",
            listStyle: "none",
            padding: "4px 0",
            height: "300px",
            overflowX: 'auto',
          }}
          className={styles["menu-content"]}
        >
          {agents.map((agent) => (
            <li
              key={agent.id}
              onClick={() => {
                handleAgentSelect(agent);
                close();
              }}
              style={{
                padding: "8px 12px",
                cursor: "pointer",
                color: "#374151",
                fontSize: "14px",
                display: "flex",
                alignItems: "center",
                gap: "8px",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.backgroundColor = "#f3f4f6")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor = "transparent")
              }
            >
              <agent.icon size={16} color={agent.color} />
              {agent.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
