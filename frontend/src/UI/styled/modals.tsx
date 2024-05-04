import styled from "styled-components";

export const Modal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  background-color: white;
  border: 1px solid black;
  z-index: 999;
  padding: 20px;
  border-radius: 8px;
`;

export const ModalContainer = styled.div`
  display: flex;
  gap: 20px;
  flex-direction: row-reverse;
  justify-content: space-between;
  align-items: center;
`;

export const MessagesBox = styled.div`
  max-height: 300px;
  overflow-y: auto;
`;

// depends on the input we will position either left or rith
export const MessagePosition = styled.div<{ sender: boolean }>`
  text-align: ${(props) => (props.sender ? "right" : "left")};
`;

export const MessageColor = styled.p<{ sender: boolean }>`
  background-color: ${(props) => (props.sender ? "#007bff" : "#f0f0f0")};
  color: ${(props) => (props.sender ? "#fff" : "#000")};
  padding: 8px;
  border-radius: 8px;
  display: inline-block;
`;
