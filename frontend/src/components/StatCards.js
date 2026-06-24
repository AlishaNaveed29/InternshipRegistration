import React from "react";

function StatCards({ stats }) {
  return (
    <div style={styles.grid}>
      {stats.map((item, idx) => (
        <div key={idx} style={{ ...styles.card, borderLeft: `5px solid ${item.color}` }}>
          <div style={styles.info}>
            <span style={styles.count}>{item.count}</span>
            <span style={styles.title}>{item.title}</span>
          </div>
          <div style={{ ...styles.iconContainer, backgroundColor: `${item.color}15`, color: item.color }}>
            {item.icon}
          </div>
        </div>
      ))}
    </div>
  );
}

const styles = {
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px",
    marginBottom: "30px",
  },
  card: {
    backgroundColor: "#ffffff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 4px 6px -1px rgba(0,0,0,0.01), 0 2px 4px -2px rgba(0,0,0,0.02)",
    border: "1px solid #f1f5f9",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  info: {
    display: "flex",
    flexDirection: "column",
  },
  count: {
    fontSize: "28px",
    fontWeight: "700",
    color: "#0f172a",
  },
  title: {
    fontSize: "14px",
    fontWeight: "500",
    color: "#64748b",
    marginTop: "4px",
  },
  iconContainer: {
    width: "48px",
    height: "48px",
    borderRadius: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "20px",
  }
};

export default StatCards;