import React from "react";
import { Input, Textarea } from "@heroui/react";
import { FaEnvelope, FaMapMarkerAlt, FaPhone, FaPhoneAlt, FaUser, } from "react-icons/fa";
const ContactForm = () => {
  return (
    <div  className="min-h-screen flex items-center justify-center bg-white/10 p-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-5xl">
        {/* Contact us */}
        <div className="shadow-lg rounded-lg bg-white/10" >
          <h1 className="font-bold text-2xl items-center mb-4" >CONTACT US</h1>
          <FaMapMarkerAlt className="text-yellow-500 text-4xl"/>
        </div>

        <div className="bg-white/10 px-5 p-6 rounded-2xl shadow-2xl max-w-md ">
          <h1 className="text-2xl font-semibold text-center text-white mb-3 ">CONTACT US</h1>
          <p className=" flex justify-center items-center text-gray-400 mb-10 ">We Will get back to you ASAP!</p>

          <form className="space-y-2">
            <div className="flex items-center gap-5">
              <Input
                isClearable
                isRequired
                label=" First Name"
                type="Name"
                labelPlacement="inside"
                className="mb-5 mt-0 w-56"
                startContent={<FaUser className="text-yellow-500 text-lg" />}
              />
              <Input
                isClearable
                isRequired
                label="Last Name"
                type="Name"
                labelPlacement="inside"
                className="mb-5 mt-0 w-56"
                startContent={<FaUser className="text-yellow-500 text-lg" />}
              />
            </div>

            <div className="flex space-y-2">
              <div className="flex items-center w-full border-gray-300 rounded-lg">
                <Input
                  isClearable
                  isRequired
                  className="mb-4 "
                  label="Email Address"
                  labelPlacement="inside"
                  type="email"
                  startContent={<FaEnvelope className="text-yellow-500 text-xl" />}
                />
              </div>

            </div>
            <div className="flex space-y-2" >
              <Input
                isClearable
                isRequired
                className="mb-4"
                label="Phone Number"
                labelPlacement="inside"
                type="number"
                startContent={<FaPhoneAlt className="text-yellow-500 text-lg" />}
              />

            </div>
            <div className="flex space-x-2">
              <Textarea
                isRequired
                label="Enter Your Message here!"
                className="mb-4"
                labelPlacement="inside"
                fullWidth
              />
            </div>

            <button className="w-full text-2xl mb-5 font-semibold bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-600">
              Send
            </button>
          </form>


        </div>
      </div>
    </div>
  );
};

export default ContactForm;
