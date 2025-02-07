import {
  Card as MainCard,
  CardBody as MainCardBody,
  CardProps as MyCardProps,
} from "@heroui/react";

interface CardProps extends MyCardProps {
  bgBlurVal?: { light?: string; dark?: string };
}

/**
 * A card component that can be used to display content in a card format.
 * @param children - The content to be displayed in the card.
 * @param className - Additional classes to be added to the card.
 * @param isBlurred - Whether the card should have a blurred background.
 * @param shadow - The shadow level of the card.
 * @param props - Additional props to be passed to the card component.
 * @returns The card component.
 * @note
 * This component is a wrapper around the Card and CardBody components from the "@heroui/react" library.
 * @see https://heroui.com/docs/components/card
 */

export default function Card({
  children,
  className = "",
  isBlurred = false,
  shadow = "lg",
  bgBlurVal = { light: "10", dark: "10" },
  ...props
}: CardProps) {
  return (
    <MainCard
      shadow={shadow}
      isBlurred={isBlurred}
      {...props}
      className={`bg-white/${bgBlurVal.light} dark:!bg-white/${bgBlurVal.dark} border border-gray-200 backdrop-filter backdrop-blur-lg p-10 ${className}`}
    >
      <MainCardBody className="text-center">{children}</MainCardBody>
    </MainCard>
  );
}
