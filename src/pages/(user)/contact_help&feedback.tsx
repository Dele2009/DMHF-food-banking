import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  Textarea,
  Button,
  Dropdown,
  Card,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Chip,
  Form,
} from "@heroui/react";
import {
  FaPaperPlane,
  FaEnvelope,
  FaExclamationTriangle,
  FaQuestionCircle,
  FaInfoCircle,
  FaUserShield,
} from "react-icons/fa";
import Input from "../../components/ui/Input";

const contactSchema = yup.object().shape({
  subject: yup.string().required("Subject is required"),
  category: yup.string().required("Category is required"),
  message: yup
    .string()
    .min(10, "Message must be at least 10 characters")
    .required("Message is required"),
});

type ContactFormData = yup.InferType<typeof contactSchema>;

export default function Contact_Help_RequestPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ContactFormData>({
    resolver: yupResolver(contactSchema),
  });

  const [selectedCategory, setSelectedCategory] = React.useState("");

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setValue("category", category);
  };

  const onSubmit = (data: ContactFormData) => {
    console.log("Submitted Data:", data);
    // Handle sending the request to the backend
  };

  return (
    <div className="flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        <Card className="p-6 bg-[#1e1e1e] shadow-md text-center mb-3">
          <h2 className="text-2xl font-semibold flex items-center justify-center gap-2 text-white">
            <FaUserShield /> Contact Admin
          </h2>
          <p className="text-gray-400">
            If you have any questions, issues, or inquiries, please feel free to
            contact us. We will respond to you as soon as possible.
          </p>
        </Card>
        <div>
          <Form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <Input
              label="Subject"
              {...register("subject")}
              placeholder="Enter subject"
              startContent={<FaEnvelope />}
              isInvalid={!!errors.subject}
              errorMessage={errors.subject?.message}
              fullWidth
            />

            <label className="block text-sm font-medium">Category</label>
            <Dropdown>
              <DropdownTrigger className="w-full">
                <Button
                  variant="bordered"
                  fullWidth
                  color="warning"
                  className="capitalize text-right"
                >
                  {selectedCategory || "Select a category"}
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem
                  key="report_an_issue"
                  onPress={() => handleCategoryChange("issue")}
                >
                  <FaExclamationTriangle className="inline-block mr-2 text-yellow-500" />{" "}
                  Report an Issue
                </DropdownItem>
                <DropdownItem
                  key="ask_a_question"
                  onPress={() => handleCategoryChange("question")}
                >
                  <FaQuestionCircle className="inline-block mr-2 text-blue-500" />{" "}
                  Ask a Question
                </DropdownItem>
                <DropdownItem
                  key="general_inquiry"
                  onPress={() => handleCategoryChange("inquiry")}
                >
                  <FaInfoCircle className="inline-block mr-2 text-green-500" />{" "}
                  General Inquiry
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            {errors.category && (
              <p className="text-red-500 text-xs">{errors.category.message}</p>
            )}

            <Textarea
              label="Message"
              {...register("message")}
              placeholder="Enter your message..."
              rows={4}
              isInvalid={!!errors.message}
              errorMessage={errors.message?.message}
              fullWidth
              classNames={{
                inputWrapper:
                  "border-yellow-500 group-data-[focus=true]:border-yellow-500",
                input: "dark:!bg-white dark:autofill:bg-white !text-white",
              }}
              variant="bordered"
            />

            {/* <div className="flex justify-between items-center"> */}
            <Chip color="warning">Response Time: 24-48 hrs</Chip>
            <Button
              type="submit"
              color="warning"
              fullWidth
              className="flex items-center"
              startContent={<FaPaperPlane className="mr-2" />}
            >
              Submit
            </Button>
            {/* </div> */}
          </Form>
        </div>
      </div>
    </div>
  );
}
