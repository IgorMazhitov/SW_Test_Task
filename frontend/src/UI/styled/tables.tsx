import styled from "styled-components";

export const TableCell = styled.td`
  padding: 10px;
  max-width: 100px;
  word-wrap: break-word;
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

export const TableContainer = styled.div`
  display: flex;
  width: 100%;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  justify-content: center;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
`;
