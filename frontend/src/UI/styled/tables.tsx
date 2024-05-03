import styled from "styled-components";

export const TableCell = styled.td`
  padding: 10px;
  border: 1px solid black;
`;

export const TableHead = styled.th`
  padding: 10px;
  border: 1px solid black;
  background-color: #fbeaeb;
  color: #2f3c7e;
`;

export const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
`;

/* 
display: "flex",
            alignItems: "center",
            backgroundColor: "rgba(173, 216, 230, 0.5)",
            borderRadius: "10px",
            boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
            marginTop: "10px",
            marginBottom: "10px",
            padding: "20px",
*/

export const TableContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  margin-top: 10px;
  margin-bottom: 10px;
  padding: 20px;
`;
