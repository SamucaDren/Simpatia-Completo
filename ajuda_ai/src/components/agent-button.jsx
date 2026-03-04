import { useState, useRef, useEffect } from "react";

function AgentButton({ agent, isSelected, handleAgentSelect }) {
  const containerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(agent?.specialties?.length ?? 0);
  const [ready, setReady] = useState(false);

  const measureRef = useRef(null);

  useEffect(() => {
    function updateVisible() {
      const container = containerRef.current;
      const measure = measureRef.current;
      if (!container || !measure) return;

      let totalWidth = 0;
      let count = 0;

      const children = Array.from(measure.children);

      for (let i = 0; i < children.length; i++) {
        const childWidth = children[i].offsetWidth + 17;
        if (totalWidth + childWidth > container.offsetWidth) break;
        totalWidth += childWidth;
        count++;
      }

      if (count !== visibleCount) setVisibleCount(count);
      setReady(true);
    }

    const raf = requestAnimationFrame(updateVisible);

    const observer = new ResizeObserver(() =>
      requestAnimationFrame(updateVisible)
    );
    if (containerRef.current) observer.observe(containerRef.current);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
    };
  }, [agent?.specialties, visibleCount]);

  const Icon = agent?.icon;

  return (
    <button
      style={{
        display: "flex",
        width: "100%",
        boxSizing: "border-box",
        minHeight: "100px",
        padding: "10px",
        color: isSelected ? "#fff" : "#000",
        backgroundColor: isSelected ? agent?.color ?? "transparent" : "transparent",
        cursor: "pointer",
        border: "none",
        borderRadius: "8px",
        textAlign: "left",
      }}
      onClick={() => handleAgentSelect(agent)}
    >
      <div
        style={{
          display: "flex",
          gap: "12px",
          overflow: "hidden",
          flex: 1,
          width: "100%",
          boxSizing: "border-box",
          alignItems: "center",
        }}
      >
        {Icon && (
          <Icon
            style={{
              width: "20px",
              height: "20px",
              marginTop: "2px",
              flexShrink: 0,
            }}
          />
        )}

        <div style={{ textAlign: "left", flex: 1, minWidth: 0 }}>
          {/* Nome */}
          <div
            style={{
              fontWeight: "500",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {agent?.name}
          </div>

          {/* Descrição */}
          <div
            style={{
              fontSize: "12px",
              opacity: 0.8,
              marginTop: "4px",
              whiteSpace: "nowrap",
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            {agent?.description}
          </div>

          {/* Chips de specialties */}
          <div style={{ marginTop: "8px" }}>
            <div
              ref={containerRef}
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "4px",
                overflow: "hidden",
                opacity: ready ? 1 : 0,
                transition: "opacity 0.1s ease",
                height: "20px",
              }}
            >
              {(agent?.specialties ?? [])
                .slice(0, visibleCount)
                .map((s) => (
                  <span
                    key={s}
                    style={{
                      fontSize: "12px",
                      padding: "2px 8px",
                      backgroundColor: "rgba(255,255,255,0.2)",
                      borderRadius: "9999px",
                    }}
                  >
                    {s}
                  </span>
                ))}

              {visibleCount < (agent?.specialties?.length ?? 0) && (
                <span
                  style={{
                    fontSize: "12px",
                    padding: "2px 8px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "9999px",
                  }}
                >
                  +{agent?.specialties?.length - visibleCount}
                </span>
              )}
            </div>

            {/* Área invisível para medir */}
            <div
              ref={measureRef}
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                overflow: "hidden",
                visibility: "hidden",
                pointerEvents: "none",
              }}
            >
              {(agent?.specialties ?? []).map((s) => (
                <span
                  key={s}
                  style={{
                    fontSize: "12px",
                    padding: "2px 8px",
                    backgroundColor: "rgba(255,255,255,0.2)",
                    borderRadius: "9999px",
                  }}
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </button>
  );
}

export default AgentButton;
