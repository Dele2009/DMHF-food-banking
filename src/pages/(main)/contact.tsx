import { Textarea, Button, addToast, Form } from "@heroui/react";
import Input from "../../components/ui/Input";
import BgImage from "../../components/ui/BgImage";
import {
  FaEnvelope,
  FaMailBulk,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaUser,
} from "react-icons/fa";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { axios } from "../../config/axios";
import { AxiosError } from "axios";
import { useState } from "react";
import { PageMeta } from "../../utils/app/pageMetaValues";
import { IntersectionObserverWrapper } from "../../components/ui/IntersectionWrapper";

const schema = yup.object().shape({
  first_name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("This Field is required"),
  last_name: yup
    .string()
    .min(2, "Name must be at least 2 characters long")
    .required("This Field is required"),
  email: yup
    .string()
    .email("Provide a valid email address")
    .required("This Field is required"),
  phone_number: yup
    .string()
    .max(11, "Phone number can't be more than 11 characters")
    .required("This Field is required"),
  message: yup.string().required("This Field is required"),
});

type ContactFormData = yup.InferType<typeof schema>;

const ContactForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (formdata: ContactFormData) => {
    setIsLoading(true);
    try {
      const { data } = await axios.post("/contact-us/", formdata);
      console.log(formdata);
      addToast({
        title: "Message Status",
        description: data?.message || "Toast Description",
        color: "success",
      });
      reset();
    } catch (error: AxiosError | any) {
      addToast({
        title: "Message Status",
        description: error?.response?.data?.message || error.message,
        color: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta>
        <meta
          name="description"
          content="Contact the Divine Mandate Humanitarian Foundation (DMHF) for inquiries, donations, and partnerships."
        />
        <title>DMHF | Contact Us</title>
      </PageMeta>
      <div className="min-h-screen">
        <div className="min-w-full max-h-80">
          <BgImage className="h-[350px]" src="/contact.jpg">
            <IntersectionObserverWrapper>
              <section className="py-28 text-center ">
                <h1 className="text-2xl lg:text-6xl font-extrabold mb-4 tracking-tight text-gray-100">
                  <FaPhoneAlt className="inline text-yellow-600 mr-2" /> CONTACT
                  US
                </h1>
                <p className="text-lg lg:text-xl mb-6 text-gray-300">
                  Contact us for inquiries, donations, and partnerships.
                </p>
              </section>
            </IntersectionObserverWrapper>
          </BgImage>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 p-9 lg:px-28 m-auto">
          {/* ADDRESS */}
          <div
            className="flex flex-col md:flex-row items-center md:items-start gap-10 px-5 py-5 mt-14
         rounded-2xl w-full max-w-4xl mx-auto md:h-80 "
          >
            {/* Left Section */}
            <section className="text-center md:text-left">
              <h1 className="font-extrabold text-2xl">CONTACT US</h1>
              <div className="mt-5">
                <h1 className="font-semibold text-xl flex items-center gap-1.5 justify-center md:justify-start">
                  <FaMapMarkerAlt className="text-yellow-500 text-xl" /> Address
                </h1>
                <p className="text-sm md:text-base">
                  Corporate Office: 18, M K O Abiola way,
                  <br /> Ring Road, By Bolumole Junction, Challenge,
                  <br />
                  Ibadan, Oyo State, Nigeria
                </p>
              </div>
              <div className="mt-4">
                <h2 className="flex items-center gap-2 text-xl font-extrabold justify-center md:justify-start">
                  <FaMailBulk className="text-yellow-500 text-xl" /> E-mail
                </h2>
                <p className="text-sm md:text-base">support@dmhf.org</p>
              </div>
            </section>

            {/* Right Section */}
            <div className=" md:mt-4 lg:mt-10  md:text-left">
              <section>
                <h2 className="flex items-center gap-2 text-xl font-semibold justify-center md:justify-start">
                  <FaPhoneAlt className="text-yellow-500 text-xl" /> Phone
                </h2>
                <div className="mt-2 space-y-1">
                  <p className="text-sm md:text-base">+234 123 456 7890</p>
                  <p className="text-sm md:text-base">+234 123 456 7890</p>
                  <p className="text-sm md:text-base">+234 123 456 7890</p>
                  <p className="text-sm md:text-base">+234 123 456 7890</p>
                </div>
              </section>
            </div>
          </div>

          {/* fORM  */}
          <section className=" flex mt-4 mb-4">
            <div className="px-5 p-5 rounded-2xl w-full m-auto">
              <h1 className="text-2xl font-semibold text-center text-white mb-3 ">
                Send Message
              </h1>
              <p className=" flex justify-center items-center text-gray-400 mb-10 ">
                We Will get back to you ASAP!
              </p>

              <Form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full">
                  <Input
                    isClearable
                    label=" First Name"
                    {...register("first_name")}
                    isInvalid={!!errors.first_name}
                    errorMessage={errors.first_name?.message}
                    type="text"
                    startContent={
                      <FaUser className="text-yellow-500 text-lg" />
                    }
                  />
                  <Input
                    isClearable
                    label="Last Name"
                    {...register("last_name")}
                    isInvalid={!!errors.last_name}
                    errorMessage={errors.last_name?.message}
                    type="text"
                    startContent={
                      <FaUser className="text-yellow-500 text-lg" />
                    }
                  />
                </div>

                <Input
                  isClearable
                  label="Email Address"
                  {...register("email")}
                  isInvalid={!!errors.email}
                  errorMessage={errors.email?.message}
                  type="email"
                  startContent={
                    <FaEnvelope className="text-yellow-500 text-xl" />
                  }
                />
                <Input
                  isClearable
                  label="Phone Number"
                  {...register("phone_number")}
                  isInvalid={!!errors.phone_number}
                  errorMessage={errors.phone_number?.message}
                  type="number"
                  startContent={
                    <FaPhoneAlt className="text-yellow-500 text-lg" />
                  }
                />
                <Textarea
                  label="Enter Your Message here!"
                  {...register("message")}
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

                <Button
                  isLoading={isLoading}
                  isDisabled={isLoading}
                  size="lg"
                  fullWidth
                  type="submit"
                  color="warning"
                >
                  Send
                </Button>
              </Form>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default ContactForm;
