import React, { createContext, useState, useCallback, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Input,
  // Button,
  CheckboxGroup,
  Checkbox,
  Tabs,
  Tab,
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

  const PaymentModal = () => {
    const [selected, setSelected] = useState<React.Key>("onetime");
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
        placement="center"
        onOpenChange={onOpenChange}
        size="md"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Make a Payment</ModalHeader>
              <ModalBody>
                <Tabs
                  fullWidth
                  aria-label="Tabs form"
                  selectedKey={selected}
                  size="md"
                  onSelectionChange={setSelected}
                  color="warning"
                >
                  <Tab key="onetime" title="One Time">
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

                      {/* <label className="mt-5 mb-3 text-gray-850 dark:text-white">
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
                    </div> */}

                      <Input
                        name="amount"
                        isRequired
                        startContent="₦"
                        label="Amount"
                        type="number"
                        value={paymentDetails.amount}
                        onChange={handleLocalChange}
                      />
                    </div>
                  </Tab>
                  <Tab key="recurring" title="Recurring">
                    <div className="space-y-4">
                      <Input
                        name="firstname"
                        label="First Name"
                        value={paymentDetails.firstname}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            firstname: e.target.value,
                          })
                        }
                      />
                      <Input
                        name="lastname"
                        label="Last Name"
                        value={paymentDetails.lastname}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            lastname: e.target.value,
                          })
                        }
                      />
                      <Input
                        name="email"
                        isRequired
                        label="Email Address"
                        value={paymentDetails.email}
                        onChange={(e) =>
                          setPaymentDetails({
                            ...paymentDetails,
                            email: e.target.value,
                          })
                        }
                      />
                      <label className="mt-5 mb-3 text-gray-850 dark:text-white">
                      Currency
                    </label>
                    <div className="flex gap-5 flex-wrap">
                        <Checkbox
                          value="5000"
                          name="amount"
                          onChange={handleLocalChange}
                          isSelected={paymentDetails.amount === "5000"}
                        >
                          ₦5,000 / Monthly
                        </Checkbox>
                        <Checkbox
                          value="10000"
                          name="amount"
                          onChange={handleLocalChange}
                          isSelected={paymentDetails.amount === "10000"}
                        >
                          ₦10,000 / Monthly
                        </Checkbox>
                        <Checkbox
                          value="20000"
                          name="amount"
                          onChange={handleLocalChange}
                          isSelected={paymentDetails.amount === "20000"}
                        >
                          ₦20,000 / Monthly
                        </Checkbox>
                      </div>
                    </div>
                  </Tab>
                </Tabs>
              </ModalBody>
              <ModalFooter>
                <Button useDefaultBg={false} color="default" onPress={onClose}>
                  Cancel
                </Button>
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
