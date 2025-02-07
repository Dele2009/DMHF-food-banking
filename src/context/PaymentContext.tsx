import React, { createContext, useState, useCallback } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  // Button,
  // CheckboxGroup,
  Checkbox,
} from "@heroui/react";
import { Currency } from "react-paystack/dist/types";
import { usePaystackPayment } from "../hooks/usePayStack";
import Button from "../components/ui/Button";

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
    const [paymentDetails, setPaymentDetails] = useState<PaymentDetailsType>({
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
      console.log(name, value);
      setPaymentDetails((prev) => ({
        ...prev,
        [name]: value,
      }));
    };

    const initializePayment = usePaystackPayment({
      ...paymentDetails,
      amount: Number(paymentDetails.amount),
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
      <Modal
        isOpen={isOpen}
        backdrop="blur"
        onOpenChange={onOpenChange}
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Make a Payment</ModalHeader>
              <ModalBody>
                <div className="space-y-4">
                  <Input
                    name="firstname"
                    label="First Name"
                    value={paymentDetails.firstname}
                    onChange={handleLocalChange}
                  />
                  <Input
                    name="lastname"
                    label="Last Name"
                    value={paymentDetails.lastname}
                    onChange={handleLocalChange}
                  />
                  <Input
                    name="email"
                    isRequired
                    label="Email Address"
                    value={paymentDetails.email}
                    onChange={handleLocalChange}
                  />

                  <label className="mt-5 mb-3 text-gray-850 dark:text-white">
                    Currency
                  </label>
                  <div className="flex gap-5 flex-wrap">
                    <Checkbox
                      isSelected={paymentDetails.currency === "NGN"}
                      name="currency"
                      onChange={handleLocalChange}
                      color="warning"
                      value="NGN"
                    >
                      NGN
                    </Checkbox>
                    <Checkbox
                      isSelected={paymentDetails.currency === "USD"}
                      name="currency"
                      onChange={handleLocalChange}
                      color="warning"
                      value="USD"
                    >
                      USD
                    </Checkbox>
                  </div>

                  <Input
                    name="amount"
                    isRequired
                    label="Amount"
                    type="number"
                    value={paymentDetails.amount}
                    onChange={handleLocalChange}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button useDefaultBg={false} color="default" onPress={onClose}>Cancel</Button>
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
