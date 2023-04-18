import React from "react";
import { Image, Box } from "@pancakeswap/uikit";
import { SpinnerProps } from "./types";

const Spinner: React.FC<React.PropsWithChildren<SpinnerProps>> = ({ size = 128 }) => {
  return (
    <Box width={size} height={size * 1.197} position="relative">
      <Image
        width={size}
        height={size * 1.197}
        src="/images/spinner_new.gif"
        alt="spinner"
      />
    </Box>
  );
};

export default Spinner;
