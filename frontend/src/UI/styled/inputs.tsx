import styled from "styled-components";

export const BasicInput = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
`;

export const BasicSelect = styled.select`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ced4da;
`;

export const InputColor = styled.div`
  position: fixed;
  top: 0;
  gap: 20px;
  right: 0;
  margin: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const ModalMessageInput = styled.textarea`
  width: 100%;
  resize: none;
  text-align: left;
  item-align: center;
  justify-content: center;
  margin-top: 10px;
`;
