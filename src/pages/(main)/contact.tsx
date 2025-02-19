import { Textarea, } from "@heroui/react";
import Input from "../../components/ui/Input";
import BgImage from "../../components/ui/BgImage";
import {
  FaEnvelope,
  FaMailBulk, FaMapMarkerAlt, 
  FaPhoneAlt, FaUser,
} from "react-icons/fa";
const ContactForm = () => {
  return (
    <div className="min-h-screen bg-white/10 ">

      <div className="min-w-full max-h-80 " >
        <BgImage src="https://img.freepik.com/free-photo/medium-shot-people-high-fiving_23-2148868427.jpg">
          <section className="py-28 text-center " >
            <h1 className="flex items-center justify-center gap-2 font-extrabold text-2xl -mt-14">
              <FaPhoneAlt className="text-yellow-300" />  CONTACT US</h1>
            <p className="text-gray-300 text-lg" >Contact us through the form below</p>
          </section>
        </BgImage>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 p-9 m-auto" >


        {/* ADDRESS */}
        <div className="flex items-center gap-20 bg-white/10 px-5 mt-14 h-80 rounded-2xl shadow-2xl" >
          <section>
            <h1 className="font-extrabold text-2xl ">CONTACT US</h1>
            <div className="">
              <h1 className="font-semibold text-2xl  flex gap-1.5 mt-5">
                <FaMapMarkerAlt className="text-yellow-500 text-1xl " />   Address</h1>
              <p className="">Corporate Office: 18, M K O Abiola way,<br></br> Ring Road,
                By Bolumole Junction, Challenge,<br></br> Ibadan, Oyo State, Nigeria</p>
            </div>
            <div className="mt-4 " >
              <h2 className=" flex gap-2 text-2xl font-extrabold" >
                <FaMailBulk className="text-yellow-500 text-2xl" />   E-mail</h2>
              <div className="" >
                <p className="">support@dmhf.org</p>
              </div>
            </div>
          </section>
          <div>
            <section className="-mt-2">
              <div className="mb-4 -ml-4 " >
                <h2 className=" flex  gap-2 text-2xl font-semibold">
                  <FaPhoneAlt className="text-yellow-500 text-2xl" /> Phone</h2>
              </div>
              <section className="items-baseline" >
                <p>+234 123 456 7890</p>
                <p>+234 123 456 7890</p>
                <p>+234 123 456 7890</p>
                <p>+234 123 456 7890</p>
              </section>
            </section>
          </div>

        </div>


        {/* fORM  */}
        <section className=" flex mt-4 mb-2  " >
          <div className="bg-white/10 px-5 p-5 rounded-2xl shadow-2xl w-full m-auto">
            <h1 className="text-2xl font-semibold text-center text-white mb-3 ">Send Message</h1>
            <p className=" flex justify-center items-center text-gray-400 mb-10 ">We Will get back to you ASAP!</p>

            <form className="space-y-2">
              <div className="flex items-center gap-5">
                <Input
                  isClearable
                  isRequired
                  label=" First Name"
                  type="Name"
                  labelPlacement="inside"
                  startContent={<FaUser className="text-yellow-500 text-lg" />}
                />
                <Input
                  isClearable
                  isRequired
                  label="Last Name"
                  type="Name"
                  labelPlacement="inside"
                  startContent={<FaUser className="text-yellow-500 text-lg" />}
                />
              </div>

              <div className="flex space-y-2">
                <div className="flex items-center w-full border-gray-300 rounded-lg">
                  <Input
                    isClearable
                    isRequired
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
                  labelPlacement="inside"
                  fullWidth
                  classNames={{ innerWrapper: "border-yellow-500" }}
                  variant="bordered"
                />
              </div>

              <button className="w-full text-2xl mb-5 font-semibold bg-yellow-400 text-white py-2 rounded-lg hover:bg-yellow-600">
                Send
              </button>
            </form>


          </div>
        </section>
      </div>
    </div >

  );
};

export default ContactForm;
