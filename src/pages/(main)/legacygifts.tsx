import React, { useState, useEffect, useRef } from "react";
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import { motion, AnimatePresence } from "framer-motion";
import { FaGifts, FaRegFileAlt, FaHandsHelping } from "react-icons/fa";

const PlanLegacyGiftsPage = () => {
  const steps = ["Consider Your Legacy", "Designate Your Gift", "Notify Us"];
  const [currentStep, setCurrentStep] = useState(0);
  const stepsRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (stepsRef.current) {
        const { top } = stepsRef.current.getBoundingClientRect();
        const scrollIndex = Math.min(
          steps.length - 1,
          Math.max(0, Math.floor((-top + window.innerHeight / 2) / 200))
        );
        setCurrentStep(scrollIndex);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [steps.length]);

  return (
    <div className="min-h-screen text-gray-800">
      {/* Header Section */}
      <section className="py-16 text-center">
        <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-gray-100">
          <FaGifts className="inline text-yellow-600 mr-2" /> Plan Your Legacy
          Gifts
        </h1>
        <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
          Create a lasting impact through thoughtful and meaningful
          contributions.
        </p>
      </section>

      {/* Legacy Gift Details */}
      <section id="details" className="py-16">
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-semibold mb-6 text-center">
              <FaRegFileAlt className="inline text-yellow-600 mr-2" /> What Are
              Legacy Gifts?
            </h2>
            <p className="text-lg mb-4">
              Legacy gifts, typically designated in a will or trust, allow you
              to support our mission while leaving a meaningful legacy for
              future generations. By including DMHF in your estate plans, you
              can help eradicate poverty, support education, and promote
              agribusiness development in Nigeria.
            </p>
          </Card>
        </div>
      </section>

      {/* Steps to Create a Legacy Gift */}
      <section id="steps" className="relative py-16 bg-background">
        <div className="max-w-4xl mx-auto text-center sticky top-0 bg-background py-8 z-10">
          <h2 className="text-3xl font-semibold mb-16">
            <FaHandsHelping className="inline text-yellow-600 mr-2" /> How to
            Create a Legacy Gift
          </h2>
        </div>

        <div
          ref={stepsRef}
          className="relative flex flex-col items-center justify-center py-16 h-screen"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ opacity: currentStep === index ? 1 : 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full max-w-4xl"
            >
              <Card>
                <h3 className="text-xl font-semibold mb-4">
                  Step {index + 1}: {step}
                </h3>
                <p className="text-lg">
                  {index === 0 &&
                    "Reflect on the causes and values that matter most to you and how you'd like to make a difference."}
                  {index === 1 &&
                    "Include DMHF in your will or trust by specifying a portion of your estate or a particular asset to be donated."}
                  {index === 2 &&
                    "Let us know about your planned gift so we can recognize your generosity and ensure your wishes are honored."}
                </p>
              </Card>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section id="get-started" className="py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6">
            <FaGifts className="inline text-yellow-600 mr-2" /> Start Planning
            Today
          </h2>
          <p className="text-lg mb-6">
            Begin your journey to creating a meaningful legacy with Divine
            Mandate Humanitarian Foundation. Contact us for guidance or to learn
            more.
          </p>
          <Button size="lg" color="primary">
            Get Started Now
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-yellow-700 text-white text-center">
        <p className="text-lg">
          &copy; 2025 Divine Mandate Humanitarian Foundation. All rights
          reserved.
        </p>
      </footer>
    </div>
  );
};

export default PlanLegacyGiftsPage;
