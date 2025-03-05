import React, { useState, useEffect, useRef } from "react";
import {
  FaGifts,
  FaRegFileAlt,
  FaHandsHelping,
  FaBitcoin,
  FaUniversity,
  FaCreditCard,
} from "react-icons/fa";
import BgImage from "../../components/ui/BgImage";
import { PageMeta } from "../../utils/app/pageMetaValues";
import Card from "../../components/ui/Card";
import { IntersectionObserverWrapper } from "../../components/ui/IntersectionWrapper";

const steps = [
  {
    title: "Consider Your Legacy",
    icon: <FaRegFileAlt className="" />,
    content:
      "Think about the values and causes that have shaped your life. Consider how you want to be remembered and the impact you’d like to leave behind for future generations. Take time to explore various charitable options and how they align with your personal mission.",
  },
  {
    title: "Designate Your Gift",
    icon: <FaGifts className="" />,
    content:
      "Decide the form of your legacy gift, whether it’s a bequest in your will, a trust, or another financial contribution. You can allocate a portion of your estate, donate specific assets, or set up recurring support. Consulting a financial advisor can help optimize your contributions.",
  },
  {
    title: "Notify Us",
    icon: <FaHandsHelping className="" />,
    content:
      "Inform our team about your planned legacy gift so we can ensure your wishes are honored. This allows us to recognize your generosity, provide you with special donor benefits, and ensure your contributions are utilized effectively to create lasting change.",
  },
];

const PlanLegacyGiftsPage = () => {
  return (
    <>
      <PageMeta>
        <meta
          name="description"
          content="Create a lasting impact through thoughtful and meaningful contributions."
        />
        <title>DMHF | Plan Your Legacy Gifts</title>
      </PageMeta>

      <div className="min-h-screen  text-gray-800">
        <BgImage
          className="h-full lg:h-[600px] grid place-items-center"
          src="/legacy-gift.jpg"
        >
          <IntersectionObserverWrapper>
            <section className="text-center">
              <h1 className="text-6xl font-extrabold mb-4 tracking-tight text-gray-100">
                <FaGifts className="inline text-yellow-600 mr-2" /> Plan Your
                Legacy Gifts
              </h1>
              <p className="text-2xl mb-6 text-gray-300">
                Create a lasting impact through thoughtful and meaningful
                contributions.
              </p>
            </section>
          </IntersectionObserverWrapper>
        </BgImage>

        <section id="steps" className="py-16 bg-background">
          <IntersectionObserverWrapper>
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl font-semibold mb-16 text-gray-900 dark:text-gray-100">
                <FaHandsHelping className="inline text-yellow-600 mr-2" /> How
                to Create a Legacy Gift
              </h2>
            </div>
          </IntersectionObserverWrapper>

          <div className="max-w-4xl mx-auto border-l-2 border-yellow-400 pl-6">
            {steps.map((step, index) => (
              <IntersectionObserverWrapper key={index}>
                <div className="flex items-start space-x-4 mb-12 relative">
                  <div className="text-3xl absolute -left-[3.4rem] bg-yellow-400 size-14 flex justify-center items-center rounded-full text-white">
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-xl text-yellow-400 font-semibold mb-4">
                      Step {index + 1}: {step.title}
                    </h3>
                    <p className="text-lg text-gray-700 dark:text-gray-300">
                      {step.content}
                    </p>
                  </div>
                </div>
              </IntersectionObserverWrapper>
            ))}
          </div>
        </section>
        <BgImage
          id="contributions"
          className="py-16"
          src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-9924.jpg"
        >
          <div className="w-full max-w-6xl mx-auto text-center">
            <h2 className="text-3xl font-semibold mb-6 text-foreground">
              Ways to Contribute
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-9">
              <Card>
                <div className="flex items-center space-x-4 mb-4">
                  <FaBitcoin className="text-yellow-600 text-2xl" />
                  <h3 className="text-xl font-semibold">Crypto</h3>
                </div>
                <p className="text-lg">
                  Make secure contributions using cryptocurrency.
                </p>
              </Card>
              <Card>
                <div className="flex items-center space-x-4 mb-4">
                  <FaUniversity className="text-yellow-600 text-2xl" />
                  <h3 className="text-xl font-semibold">Wire</h3>
                </div>
                <p className="text-lg">
                  Transfer directly to our bank account for a lasting impact.
                </p>
              </Card>
              <Card>
                <div className="flex items-center space-x-4 mb-4">
                  <FaCreditCard className="text-yellow-600 text-2xl" />
                  <h3 className="text-xl font-semibold">Card</h3>
                </div>
                <p className="text-lg">
                  Use your credit or debit card to support our mission.
                </p>
              </Card>
            </div>
          </div>
        </BgImage>
      </div>
    </>
  );
};

export default PlanLegacyGiftsPage;
