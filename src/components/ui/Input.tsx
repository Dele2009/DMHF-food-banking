// filepath: /c:/Users/USER/Desktop/NODE_APPS/RECT_APPS/donate-app/src/components/ui/Input.tsx
import React from "react";
import { Input as MyInput, InputProps as MyInputProps } from "@heroui/react";

interface InputProps extends MyInputProps {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ variant = "bordered", classNames, size = "lg", ...props }, ref) => {
    return (
      <MyInput
        size={size}
        {...props}
        variant={variant}
        ref={ref}
        classNames={
          classNames || {
            inputWrapper: "border-yellow-500 group-data-[focus=true]:border-yellow-500",
            input: "dark:!bg-white dark:autofill:bg-white !text-white",
          }
        }
      />
    );
  }
);

Input.displayName = "Input";

export default Input;
