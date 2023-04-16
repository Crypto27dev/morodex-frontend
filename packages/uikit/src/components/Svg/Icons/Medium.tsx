import React from "react";
import Svg from "../Svg";
import { SvgProps } from "../types";

const Icon: React.FC<React.PropsWithChildren<SvgProps>> = (props) => {
  return (
    <Svg viewBox="0 0 24 24" {...props}>
      <path d="M7.64 6.32c3.116 0 5.641 2.544 5.641 5.68 0 3.137-2.525 5.68-5.64 5.68C4.526 17.68 2 15.136 2 12c0-3.136 2.525-5.68 5.64-5.68zm9.008.333c1.558 0 2.82 2.394 2.82 5.347h.001c0 2.953-1.263 5.347-2.82 5.347-1.558 0-2.82-2.395-2.82-5.347 0-2.952 1.262-5.347 2.82-5.347zm4.36.557c.548 0 .992 2.145.992 4.79s-.444 4.79-.992 4.79-.992-2.145-.992-4.79.444-4.79.992-4.79z" />
    </Svg>
  );
};

export default Icon;
