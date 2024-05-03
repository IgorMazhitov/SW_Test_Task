interface TableButtonProps {
    tableName: string;
    callback: () => void;
}

export const TableSelectButton = ({tableName, callback}: TableButtonProps) => {
  return (
    <button
      style={{
        marginRight: "5px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
      }}
      onClick={callback}
    >
      {tableName.toUpperCase()}
    </button>
  );
};
