import React from "react";
import styled from "styled-components";
import Flex from "../../components/Box/Flex";
import { MotionBox } from "../../components/Box";
import { ArrowBackIcon, CloseIcon } from "../../components/Svg";
import { IconButton } from "../../components/Button";
import { ModalProps } from "./types";

export const mobileFooterHeight = 73;

export const ModalHeader = styled.div<{ background?: string }>`
  align-items: center;
  background: transparent;
  // border-bottom: 1px solid ${({ theme }) => theme.colors.cardBorder};
  display: flex;
  padding: 12px 24px 0px 24px;

  // ${({ theme }) => theme.mediaQueries.md} {
  //   background: ${({ background }) => background || "transparent"};
  // }
`;

export const ModalTitle = styled(Flex)`
  align-items: center;
  flex: 1;
`;

export const ModalBody = styled(Flex)`
  flex-direction: column;
  overflow-y: auto;
  overflow-x: hidden;
  max-height: calc(90vh - ${mobileFooterHeight}px);
  ${({ theme }) => theme.mediaQueries.md} {
    display: flex;
    max-height: 90vh;
  }
`;

export const ModalCloseButton: React.FC<React.PropsWithChildren<{ onDismiss: ModalProps["onDismiss"] }>> = ({
  onDismiss,
}) => {
  return (
    <IconButton variant="text" onClick={onDismiss} aria-label="Close the dialog">
      <CloseIcon color="primary" />
    </IconButton>
  );
};

export const ModalBackButton: React.FC<React.PropsWithChildren<{ onBack: ModalProps["onBack"] }>> = ({ onBack }) => {
  return (
    <IconButton variant="text" onClick={onBack} area-label="go back" mr="8px">
      <ArrowBackIcon color="primary" />
    </IconButton>
  );
};

export const ModalContainer = styled(MotionBox)<{ $minWidth: string }>`
  overflow: hidden;
  background: ${({ theme }) => theme.modal.background};
  // background: rgb(59, 100, 110);
  // background: rgb(83, 145, 153);
  // background: rgb(80, 116, 133);
  background-color: rgba(255, 255, 255, 0.1);
  -webkit-backdrop-filter: blur(20px);
  backdrop-filter: blur(20px); 
  box-shadow: 0px 20px 36px -8px rgba(14, 14, 44, 0.1), 0px 1px 1px rgba(0, 0, 0, 0.05);
  // border: 1px solid ${({ theme }) => theme.colors.cardBorder};
  border: 1px solid rgb(229, 231, 235);
  border-radius: 10px 10px 0px 0px;
  width: 100%;
  max-height: calc(var(--vh, 1vh) * 100);
  z-index: ${({ theme }) => theme.zIndices.modal};
  position: absolute;
  min-width: ${({ $minWidth }) => $minWidth};
  bottom: 0;
  max-width: none !important;
  min-height: 300px;

  ${({ theme }) => theme.mediaQueries.md} {
    width: auto;
    position: auto;
    bottom: auto;
    border-radius: 10px;
    max-height: 100vh;
  }
`;
