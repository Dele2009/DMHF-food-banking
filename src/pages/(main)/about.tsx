// filepath: /c:/Users/USER/Desktop/NODE_APPS/RECT_APPS/donate-app/src/pages/(main)/about.tsx
import Card from "../../components/ui/Card";
import Button from "../../components/ui/Button";
import {
  FaUsers,
  FaHandHoldingHeart,
  FaSchool,
  FaSeedling,
  FaBullseye,
} from "react-icons/fa";
import { Divider } from "@heroui/react";
import BgImage from "../../components/ui/BgImage";
import { motion } from "framer-motion";

const sectionVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const AboutUsPage = () => {
  const focusAreas = [
    {
      icon: FaHandHoldingHeart,
      title: "Food Banking",
      description:
        "We establish and manage food banks across Nigeria, providing emergency food assistance to vulnerable individuals and families.",
    },
    {
      icon: FaSeedling,
      title: "Agricultural Development",
      description:
        "We support smallholder farmers through training, capacity building, and access to finance, markets, and technology.",
    },
    {
      icon: FaSchool,
      title: "Education",
      description:
        "We provide educational support to vulnerable children and youth, empowering them with skills and knowledge to break the cycle of poverty.",
    },
    {
      icon: FaSeedling,
      title: "Agribusiness Value Chain Development",
      description:
        "We strengthen the agribusiness value chain by promoting production, processing, marketing, and distribution.",
    },
  ];
  return (
    <div className="min-h-screen text-foreground">
      <BgImage src="https://img.freepik.com/free-photo/medium-shot-people-high-fiving_23-2148868427.jpg">
        {/* Header Section */}
        <motion.section
          transition={{ delay: 4 }}
          className="py-16 text-center"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: "all" }}
          variants={sectionVariants}
        >
          <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-900 dark:text-gray-100 mix-blend-plus-darker">
            <FaUsers className="inline text-yellow-600 mr-2" /> About Us
          </h1>
          <p className="text-lg mb-6 text-gray-700 dark:text-gray-300">
            Learn more about the mission, vision, and impact of the Divine
            Mandate Humanitarian Foundation (DMHF).
          </p>
        </motion.section>

        {/* Mission and Vision */}
        <motion.section
          transition={{ delay: 4 }}
          id="mission-vision"
          className="py-16"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.1 }}
          variants={sectionVariants}
        >
          <div className="max-w-4xl mx-auto">
            <Card className="text-white">
              <h2 className="text-3xl font-semibold mb-6 text-center">
                <FaBullseye className="inline text-yellow-600 mr-2" /> Our
                Mission and Vision
              </h2>
              <p className="text-lg mb-4">
                At DMHF, we are dedicated to eradicating poverty, promoting
                agribusiness development, and fostering education in Nigeria. We
                envision a Nigeria where everyone has access to nutritious food,
                quality education, and economic opportunities.
              </p>
            </Card>
          </div>
        </motion.section>
      </BgImage>

      {/* Focus Areas */}
      <section id="focus-areas" className="py-16 bg-background">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-6 text-foreground">
            <FaSeedling className="inline text-yellow-600 mr-2" /> Our Focus
            Areas
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {focusAreas.map((area, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: false, amount: 0.1 }}
                variants={sectionVariants}
                transition={{ delay: index * 2 }}
              >
                <Card bgBlurVal={{light: '90', dark: '10'}}>
                  <h3 className="flex flex-col justify-center items-center text-xl font-semibold mb-4">
                    <area.icon className="inline text-yellow-600 mr-2" />{" "}
                    {area.title}
                  </h3>
                  <Divider className="!bg-foreground/30" />
                  <p className="text-lg">{area.description}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Founders Section */}
      <BgImage
        src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-9924.jpg"
        id="founders"
        className="py-16"
      >
        <div className="max-w-4xl mx-auto">
          <Card>
            <h2 className="text-3xl font-semibold mb-6 text-center">
              <FaUsers className="inline text-yellow-600 mr-2" /> Meet Our
              Founders
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 overflow-hidden">
              <motion.div
                initial={{ opacity: 0, x: "-100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 4, duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold">Ayeni Tosin Clement</h3>
                <p className="text-lg">
                  A visionary leader committed to empowering communities and
                  fostering sustainable livelihoods.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: "100%" }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                transition={{ delay: 4, duration: 0.5 }}
                className="text-center"
              >
                <h3 className="text-xl font-semibold">Steven Park</h3>
                <p className="text-lg">
                  A dedicated advocate for eradicating poverty and promoting
                  education and agribusiness in Nigeria.
                </p>
              </motion.div>
            </div>
          </Card>
        </div>
      </BgImage>

      {/* Call to Action */}
      <section id="get-involved" className="py-16 bg-background">
        <motion.div
          transition={{ delay: 4 }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: "all" }}
          variants={sectionVariants}
          className="max-w-4xl mx-auto text-center"
        >
          <h2 className="text-3xl font-semibold mb-6">
            <FaHandHoldingHeart className="inline text-yellow-600 mr-2" /> Get
            Involved
          </h2>
          <p className="text-lg mb-6">
            Join us in our mission to eradicate poverty in Nigeria. Donate,
            volunteer, or partner with us to make a difference.
          </p>
          <Button>Get Involved Now</Button>
        </motion.div>
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

export default AboutUsPage;
