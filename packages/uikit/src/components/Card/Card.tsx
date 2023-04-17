import React from "react";
import { StyledCard, StyledCardInner } from "./StyledCard";
import { CardProps } from "./types";

const Card: React.FC<React.PropsWithChildren<CardProps>> = ({ ribbon, children, background, ...props }) => {
  return (
    <StyledCard {...props}>
      <StyledCardInner background="hsla(0,0%,100%,.15)" hasCustomBorder={!!props.borderBackground}>
        {ribbon}
        {children}
      </StyledCardInner>
    </StyledCard>
  );
};
export default Card;
