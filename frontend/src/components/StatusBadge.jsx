export default function StatusBadge({ status }) {
      const getColor = () => {
            switch (status) {
                  case "reading":
                        return "#2563eb"; 
                  case "completed":
                        return "#16a34a"; 
                  case "want_to_read":
                        return "#f59e0b"; 
                  default:
                        return "#6b7280";
            }
      };

      return (
            <span
                  style={{
                        backgroundColor: getColor(),
                        color: "white",
                        padding: "4px 8px",
                        borderRadius: "6px",
                        fontSize: "12px"
                  }}
            >
                  {status.replaceAll("_", " ")}
            </span>
      );
}