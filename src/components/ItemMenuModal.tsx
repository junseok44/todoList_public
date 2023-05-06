import React from "react";
import styled from "@emotion/styled";
import { Button } from "@mui/material";
const ModalBody = styled.div`
  position: absolute;
  bottom: -45px;
  left: 50%;
  transform: translateX(-50%);
  width: 90%;
  height: 3rem;
  background: white;
  z-index: 100;
  display: flex;
  align-items: center;
  padding: 0 1rem;
  box-sizing: border-box;
  border-radius: 5px;
  transition: opacity 0.5s ease;
  border: 1px solid rgba(0, 0, 0, 0.5);
`;
const ModalArrow = styled.div`
  position: absolute;
  top: -18px;
  left: 20px;
  transform: translateX(-50%);
  border: 10px solid transparent;
  border-bottom: 10px solid white;

  transition: opacity 0.5s ease;
`;

const ItemMenuModal = ({
  isModalOpen,
  children,
}: // setIsModalOpen,
{
  isModalOpen: boolean;
  children: React.ReactNode;
  // setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      {isModalOpen && (
        <>
          <ModalBody>
            <ModalArrow></ModalArrow>
            {children}
          </ModalBody>
        </>
      )}
    </>
  );
};

export default ItemMenuModal;
