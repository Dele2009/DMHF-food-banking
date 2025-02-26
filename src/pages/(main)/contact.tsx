import { Textarea, Button } from "@heroui/react";
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

const schema = yup.object().shape({
  first_name: yup.string().required("This Field is required"),
  last_name: yup.string().required("This Field is required"),
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
  const {
    formState: { errors },
    reset,
    register,
    handleSubmit,
  } = useForm<ContactFormData>({
    resolver: yupResolver(schema)
  });

  const onSubmit = (formdata: ContactFormData) => {
    console.log(formdata)
  }
  return (
    <div className="min-h-screen bg-white/10 ">
      <div className="min-w-full max-h-80 ">
        <BgImage src="https://img.freepik.com/free-photo/medium-shot-people-high-fiving_23-2148868427.jpg">
          <section className="py-28 text-center ">
            <h1 className="flex items-center justify-center gap-2 font-extrabold text-2xl -mt-14">
              <FaPhoneAlt className="text-yellow-300" /> CONTACT US
            </h1>
            <p className="text-gray-300 text-lg">
              Contact us through the form below
            </p>
          </section>
        </BgImage>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-9 m-auto">
        {/* ADDRESS */}
        <div
          className="flex flex-col md:flex-row items-center md:items-start gap-10 bg-white/10 px-5 py-5 mt-14
         rounded-2xl shadow-2xl w-full max-w-4xl mx-auto md:h-80 "
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
        <section className=" flex mt-4 mb-2  ">
          <div className="bg-white/10 px-5 p-5 rounded-2xl shadow-2xl w-full m-auto">
            <h1 className="text-2xl font-semibold text-center text-white mb-3 ">
              Send Message
            </h1>
            <p className=" flex justify-center items-center text-gray-400 mb-10 ">
              We Will get back to you ASAP!
            </p>

            <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <Input
                  isClearable
                  isRequired
                  label=" First Name"
                  {...register("first_name")}
                  isInvalid={!!errors.first_name}
                  errorMessage={errors.first_name?.message}
                  type="text"
                  startContent={<FaUser className="text-yellow-500 text-lg" />}
                />
                <Input
                  isClearable
                  isRequired
                  label="Last Name"
                  {...register("last_name")}
                  isInvalid={!!errors.last_name}
                  errorMessage={errors.last_name?.message}
                  type="text"
                  startContent={<FaUser className="text-yellow-500 text-lg" />}
                />
              </div>

              <div className="flex space-y-2">
                <div className="flex items-center w-full border-gray-300 rounded-lg">
                  <Input
                    isClearable
                    isRequired
                    label="Email Address"
                    {...register("email")}
                    isInvalid={!!errors.email}
                    errorMessage={errors.email?.message}
                    type="email"
                    startContent={
                      <FaEnvelope className="text-yellow-500 text-xl" />
                    }
                  />
                </div>
              </div>
              <div className="flex space-y-2">
                <Input
                  isClearable
                  isRequired
                  label="Phone Number"
                  {...register("phone_number")}
                  isInvalid={!!errors.phone_number}
                  errorMessage={errors.phone_number?.message}
                  type="number"
                  startContent={
                    <FaPhoneAlt className="text-yellow-500 text-lg" />
                  }
                />
              </div>
              <div className="flex space-x-2">
                <Textarea
                  isRequired
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
              </div>

              <Button size="lg" fullWidth type="submit" color="warning">
                Send
              </Button>
            </form>
          </div>
        </section>
      </div>
    </div>
  );
};

export default ContactForm;
