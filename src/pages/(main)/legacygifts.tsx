import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { FaGifts, FaRegFileAlt, FaHandsHelping } from "react-icons/fa";
import BgImage from "../../components/ui/BgImage";

const IntersectionObserverWrapper = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
    );
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 50 }}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.div>
  );
};

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
    <div className="min-h-screen text-gray-800">
      <BgImage src="https://img.freepik.com/free-photo/medium-shot-people-high-fiving_23-2148868427.jpg">
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
      </BgImage>

      <section id="steps" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-16 text-gray-900 dark:text-gray-100">
            <FaHandsHelping className="inline text-yellow-600 mr-2" /> How to
            Create a Legacy Gift
          </h2>
        </div>

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
    </div>
  );
};

export default PlanLegacyGiftsPage;
