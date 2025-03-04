import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { FaHandsHelping, FaSeedling, FaDonate } from "react-icons/fa";
import BgImage from "../../components/ui/BgImage";

import { useEffect, useState } from "react";
import { usePayment, usePaystackPayment } from "../../hooks/usePayStack";
import { PaymentDetailsType } from "../../context/PaymentContext";
import { PageMeta } from "../../utils/app/pageMetaValues";

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
        <BgImage src="https://img.freepik.com/free-photo/team-volunteers-stacking-hands_53876-30767.jpg">
          {/* Hero Section */}
          <section className="py-16 text-center">
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-gray-100">
              <FaHandsHelping className="inline text-yellow-600 mr-2" /> Welcome
              to Divine Mandate Humanitarian Foundation (DMHF)
            </h1>
            <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
              Empowering Sustainable Livelihoods in Nigeria
            </p>
            <Button
              onPress={openPaymentModal}
              startContent={<FaDonate className="" />}
            >
              Donate Now
            </Button>
          </section>
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
        </BgImage>

        {/* Call to Action */}
        <section id="call-to-action" className="py-16 bg-background">
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
                <Button startContent={<FaDonate className="" />}>
                  Learn More
                </Button>
                <Button startContent={<FaDonate className="" />}>Now</Button>
              </div>
            </Card>
          </div>
        </section>

        {/* Footer */}
        {/* <footer className="py-8 bg-yellow-700 text-white text-center">
          <p className="text-lg">
            &copy; 2025 Divine Mandate Humanitarian Foundation. All rights
            reserved.
          </p>
          <div className="mt-4">
            <Button startContent={<FaHandsHelping className="" />}>
              Privacy Policy
            </Button>
            <Button startContent={<FaHandsHelping className="" />}>
              {" "}
              Terms of Service
            </Button>
          </div>
        </footer> */}
      </div>
    </>
  );
};

export default HomePage;
