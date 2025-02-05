import React, { createContext, useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  Button,
  CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { Currency } from "react-paystack/dist/types";
import { usePaystackPayment } from "../hooks/usePayStack";

interface PaymentModalProps {
  proceed?: (details: PaymentDetailsType) => void;
}

export type PaymentDetailsType = {
  firstname: string;
  lastname: string;
  email: string;
  currency: Currency | string;
  amount: string;
};

export interface PaymentContentType {
  PaymentModal: React.FC<PaymentModalProps>;
  openPaymentModal: () => void;
}

export const PaymentContext = createContext<PaymentContentType>({
  PaymentModal: () => null,
  openPaymentModal: () => {},
});

export const PaymentProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // Only managing modal open/close in the provider
  const { isOpen, onOpen: openPaymentModal, onOpenChange } = useDisclosure();

  const PaymentModal = ({ proceed }: PaymentModalProps) => {
    const [localPaymentDetails, setLocalPaymentDetails] =
      useState<PaymentDetailsType>({
        firstname: "",
        lastname: "",
        email: "",
        currency: "NGN",
        amount: "",
      });
    const handleLocalChange = (
      e: React.ChangeEvent<HTMLInputElement> | any
    ) => {
      const { name, value } = e.target;
      setLocalPaymentDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const initializePayment = usePaystackPayment({
      ...localPaymentDetails,
      amount: Number(localPaymentDetails.amount),
    });
    const onSuccess = (res: any) => {
      console.log(res);
    };
    const onClose = (close: any) => {
      console.log("payment closed", close);
    };
    const handlePaymentInitialization = () => {
      if (initializePayment) {
        initializePayment({ onSuccess, onClose });
      }
    };

    return (
      <Modal isOpen={isOpen} onOpenChange={onOpenChange} size="md">
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Make a Payment</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    name="firstname"
                    label="First Name"
                    value={localPaymentDetails.firstname}
                    onChange={handleLocalChange}
                  />
                  <Input
                    name="lastname"
                    label="Last Name"
                    value={localPaymentDetails.lastname}
                    onChange={handleLocalChange}
                  />
                  <Input
                    name="email"
                    label="Email Address"
                    value={localPaymentDetails.email}
                    onChange={handleLocalChange}
                  />
                  <CheckboxGroup
                    label="Currency"
                    value={[localPaymentDetails.currency as string]}
                    onChange={(value) =>
                      setLocalPaymentDetails((prev) => ({
                        ...prev,
                        currency: value[0],
                      }))
                    }
                  >
                    <Checkbox value="NGN">NGN</Checkbox>
                    <Checkbox value="USD">USD</Checkbox>
                  </CheckboxGroup>
                  <Input
                    name="amount"
                    label="Amount"
                    type="number"
                    value={localPaymentDetails.amount}
                    onChange={handleLocalChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button onPress={onClose}>Cancel</Button>
                <Button onPress={handlePaymentInitialization} color="primary">
                  Proceed
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    );
  };

  // Memoize context value if needed (here it’s static aside from the modal component)

  return (
    <PaymentContext.Provider
      value={{
        PaymentModal,
        openPaymentModal,
      }}
    >
      {children}
    </PaymentContext.Provider>
  );
};
