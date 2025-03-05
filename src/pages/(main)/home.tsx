import Card from "../../components/ui/Card";
import { FaHandsHelping, FaSeedling, FaDonate } from "react-icons/fa";
import BgImage from "../../components/ui/BgImage";

import { useEffect, useState } from "react";
import { usePayment, usePaystackPayment } from "../../hooks/usePayStack";
import { PaymentDetailsType } from "../../context/PaymentContext";
import { PageMeta } from "../../utils/app/pageMetaValues";
import { motion } from "framer-motion";
import PulsatingElement from "../../components/ui/PulsatingShadow";
import { Link } from "react-router-dom";
import { Button, Divider } from "@heroui/react";
import Carousel from "../../components/ui/Carousel";
import { focusAreas } from "./about";

// https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-9924.jpg
// https://img.freepik.com/free-vector/line-style-volunteer-group-raising-hand-up-with-heart-vector_1017-48262.jpg

// src="https://img.freepik.com/free-vector/line-style-volunteer-group-raising-hand-up-with-heart-vector_1017-48262.jpg"

const HomePage = () => {
  const { openPaymentModal } = usePayment();
  return (
    <>
      <PageMeta>
        <meta
          name="description"
          content="Welcome to the Divine Mandate Humanitarian Foundation (DMHF), Empowering Sustainable Livelihoods in Nigeria"
        />
        <title>DMHF | Home</title>
      </PageMeta>

      <div className="min-h-screen transition-all duration-500">
        <BgImage className="h-screen grid place-items-center" src="/home.jpg">
          {/* Hero Section */}
          <section className="text-center ">
            <motion.h1
              initial={{ opacity: 0, y: "-50%" }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              className="text-6xl font-extrabold -mt-12 mb-12 tracking-tight text-gray-900 dark:text-gray-100"
            >
              <FaHandsHelping className="inline text-yellow-600 mr-2" /> Welcome
              to Divine Mandate Humanitarian Foundation (DMHF)
            </motion.h1>
            <Carousel
              showIndicators={false}
              autoPlay
              loop
              className="max-w-2xl m-auto  mb-8"
            >
              {focusAreas.map((area, index) => (
                <Card key={index} className="w-[60%] h-full !p-2">
                  <h3 className="flex flex-col justify-center items-center text-md font-semibold mb-2">
                    <area.icon className="inline text-yellow-600" />{" "}
                    {area.title}
                  </h3>
                  <Divider className="!bg-foreground/30" />
                  <p className="text-sm mt-2">{area.description}</p>
                </Card>
              ))}
            </Carousel>
            {/* <p className="text-2xl mb-6 text-gray-700 dark:text-gray-300">
              Empowering Sustainable Livelihoods in Nigeria
            </p> */}
            <PulsatingElement
              className="mx-auto rounded-xl"
              shadowColor="#ca8a04"
            >
              <Button
                onPress={openPaymentModal}
                color="warning"
                size="lg"
                startContent={<FaDonate className="" />}
                className="scale-105"
              >
                Donate Now
              </Button>
            </PulsatingElement>
          </section>
        </BgImage>

        {/* Call to Action */}
        <section id="call-to-action" className="py-16 bg-background">
          {/* Why Food Banking */}
          <section
            id="why-food-banking"
            className="relative py-16 text-gray-900 dark:text-gray-100 !z-30"
          >
            <div className="max-w-4xl mx-auto text-center">
              <Card>
                <h2 className="text-3xl font-semibold mb-6 text-center">
                  <FaSeedling className="inline text-yellow-600 mr-2" /> Why
                  Food Banking?
                </h2>
                <p className="text-lg mb-4">
                  Food Bank is a testament to our commitment to creating a
                  hunger-free Nigeria. By partnering with local farmers, food
                  manufacturers, and community organizations, we're building a
                  sustainable food system that benefits everyone.
                </p>
              </Card>
            </div>
          </section>

          <div className="max-w-4xl mx-auto text-center">
            <Card>
              <h3 className="text-2xl font-semibold mb-4 text-center">
                <FaHandsHelping className="inline text-yellow-600 mr-2" />{" "}
                Become a Food Bank Project Sponsor
              </h3>
              <p className="text-lg mb-6">
                Sponsor a project and provide food banks for a community,
                school, or health clinic. 100% of your donation will fund food
                bank initiatives.
              </p>
              <div className="flex justify-center space-x-4">
                <Button
                  as={Link}
                  to="/about"
                  color="warning"
                  size="lg"
                  startContent={<FaDonate className="" />}
                >
                  Learn More
                </Button>
              </div>
            </Card>
          </div>
        </section>
      </div>
    </>
  );
};

export default HomePage;
