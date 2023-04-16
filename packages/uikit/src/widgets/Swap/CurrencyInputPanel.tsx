import { AtomBox } from "@pancakeswap/ui";
import { inputContainerVariants } from "./SwapWidget.css";

import { NumericalInput } from "./NumericalInput";

type ZapStyle = "noZap" | "zap";

interface CurrencyInputPanelProps {
  value: string;
  onUserInput: (value: string) => void;
  onInputBlur?: () => void;
  id: string;
  zapStyle?: ZapStyle;
  top?: React.ReactNode;
  bottom?: React.ReactNode;
  disabled?: boolean;
  error?: boolean;
  showBridgeWarning?: boolean;
}
export function CurrencyInputPanel({
  value,
  onUserInput,
  onInputBlur,
  zapStyle,
  top,
  bottom,
  id,
  disabled,
  error,
  showBridgeWarning,
}: CurrencyInputPanelProps) {
  return (
    <AtomBox position="relative" id={id}>
      <AtomBox display="flex" alignItems="center" justifyContent="space-between">
        {top}
      </AtomBox>
      <AtomBox
        display="flex"
        flexDirection="column"
        flexWrap="nowrap"
        position="relative"
        backgroundColor="backgroundAlt"
        zIndex="1"
      >
        <AtomBox
          as="label"
          className={inputContainerVariants({
            hasZapStyle: !!zapStyle,
            showBridgeWarning: !!showBridgeWarning,
            error,
          })}
        >
          <AtomBox
            display="flex"
            flexDirection="row"
            flexWrap="nowrap"
            color="text"
            fontSize="12px"
            lineHeight="16px"
            px="16px"
            pt="12px"
          >
            <NumericalInput
              error={error}
              disabled={disabled}
              className="token-amount-input"
              value={value}
              onBlur={onInputBlur}
              onUserInput={(val) => {
                onUserInput(val);
              }}
            />
          </AtomBox>
          {bottom}
        </AtomBox>
        {disabled && (
          <AtomBox role="presentation" position="absolute" inset="0" backgroundColor="backgroundAlt" opacity="0.6" />
        )}
      </AtomBox>
    </AtomBox>
  );
}
