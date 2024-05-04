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
