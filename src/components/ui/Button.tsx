import {
  Button as MyButton,
  ButtonProps as MyButtonProps,
} from "@heroui/react";

interface ButtonProps extends MyButtonProps {
  useDefaultBg?: boolean;
}

/**
 * A button component that can be used to trigger actions.
 * @param children - The content to be displayed in the button.
 * @param size - The size of the button.
 * @param variant - The variant of the button.
 * @param color - The color of the button.
 * @param props - Additional props to be passed to the button component.
 * @returns The button component.
 * @note
 * This component is a wrapper around the Button component from the "@heroui/react" library.
 * @see https://heroui.com/docs/components/button
 */
export default function Button({
  children,
  useDefaultBg = true,
  className = "",
  size = "lg",
  variant = "solid",
  color = "default",
  ...props
}: ButtonProps) {
  return (
    <MyButton
      className={`${
        useDefaultBg ? "bg-gradient-to-br from-yellow-400 to-yellow-300" : ""
      } text-foreground ${className}`}
      size={size}
      variant={variant}
      color={color}
      {...props}
    >
      {children}
    </MyButton>
  );
}
