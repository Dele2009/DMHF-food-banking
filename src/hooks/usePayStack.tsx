import { useContext, useEffect, useState } from "react";
import { InitializePayment, PaystackProps } from "react-paystack/dist/types";
import { PaymentContext } from "../context/PaymentContext";

export function usePaystackPayment({
  amount,
  ...props
}: Omit<PaystackProps, "publicKey">) {
  const [initializePayment, setInitializePayment] =
    useState<InitializePayment | null>(null);

  const config = {
    ...props,
    reference: new Date().getTime().toString(),
    amount: amount * 100, //Amount is in the country's lowest currency. E.g Kobo, so 20000 kobo = N200
    publicKey: `${import.meta.env.VITE_PAYSTACK_API_KEY}`,
  };

  useEffect(() => {
    // Dynamically import `usePaystackPayment` to prevent SSR issues
    import("react-paystack").then((module) => {
      const usePaystackPayment = module.usePaystackPayment;
      setInitializePayment(() => usePaystackPayment(config));
    });
  }, [config]);

  return initializePayment;
}

export const usePayment = () => {
  const context = useContext(PaymentContext)
  if(!context){
    throw new Error("Payment context should only be used inside the Payment Provider")
  }
  return context;
}
