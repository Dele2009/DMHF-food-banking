import React from "react";
import Button from "../../components/ui/Button";
import Card from "../../components/ui/Card";
import { Accordion, AccordionItem } from "@heroui/react";
import {
  FaHandHoldingHeart,
  FaDonate,
  FaHandshake,
  FaBitcoin,
  FaCreditCard,
  FaUniversity,
} from "react-icons/fa";
import BgImage from "../../components/ui/BgImage";
import { PageMeta } from "../../utils/app/pageMetaValues";

const ActionsPage = () => {
  return (
    <>
      <PageMeta>
        <meta
          name="description"
          content="Empower communities by supporting our initiatives"
        />
        <title>DMHF | Support us by taking action</title>
      </PageMeta>
      <div className=" text-gray-800">
        {/* Header Section */}
        <BgImage src="/Take-Action.jpg">
          <section className="py-16 text-center">
            <h1 className="text-4xl font-extrabold mb-4 tracking-tight text-gray-100">
              Take Action
            </h1>
            <p className="text-lg mb-6 text-gray-300">
              Empower communities by supporting our initiatives
            </p>
          </section>
          {/* Sponsorship Options */}
          <section id="sponsorship" className="py-1 pb-14 text-gray-900">
            <div className="max-w-4xl mx-auto">
              <Card>
                <div className="flex flex-col justify-center items-center space-x-4 mb-6">
                  <FaHandHoldingHeart className="text-yellow-600 text-3xl" />
                  <h2 className="text-3xl font-semibold">
                    Sponsor a Food Bank Project
                  </h2>
                </div>
                <p className="text-lg mb-4">
                  By sponsoring a project, you can provide a food bank for a
                  community, school, or health clinic. 100% of your donation
                  will directly fund food bank initiatives.
                </p>
                <div className="flex justify-center space-x-4">
                  <Button>Sponsor Now</Button>
                </div>
              </Card>
            </div>
          </section>
        </BgImage>

        {/* Contribution Methods */}
        <section id="contributions" className="py-16 bg-background">
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
        </section>

        {/* Brand Partnerships */}
        <BgImage
          id="partnerships"
          className="py-16"
          src="https://img.freepik.com/free-photo/artistic-blurry-colorful-wallpaper-background_58702-9924.jpg"
        >
          <div className="max-w-4xl mx-auto">
            <Card>
              <div className="flex flex-col justify-center items-center space-x-4 mb-6">
                <FaHandshake className="text-yellow-600 text-3xl" />
                <h2 className="text-3xl font-semibold">Brand Partnerships</h2>
              </div>
              <p className="text-lg mb-4">
                Join our network of brand partners in the fight against food
                insecurity. Together, we can create a hunger-free Nigeria by
                providing food assistance to vulnerable populations and
                promoting sustainable solutions.
              </p>
              <div className="flex justify-center space-x-4">
                <Button>Partner Now</Button>
              </div>
            </Card>
          </div>
        </BgImage>

        {/* FAQs */}
        <section id="faqs" className="py-16 bg-background text-foreground">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-semibold mb-6 text-center">
              Frequently Asked Questions
            </h2>
            <Accordion variant="light">
              <AccordionItem
                key="1"
                aria-label="How much does it cost?"
                title={
                  <p className="font-bold">
                    How much does it cost to sponsor a food bank project in
                    Nigeria?"
                  </p>
                }
              >
                <p className="text-sm">
                  It costs approximately $2,850 to feed 100 children per month.
                </p>
              </AccordionItem>
              <AccordionItem
                key="2"
                aria-label="Can I choose donation?"
                title={
                  <p className="font-bold">
                    Can I choose where my donation goes?"
                  </p>
                }
              >
                <p className="text-sm">
                  Yes, you can specify a country or region. Our team will guide
                  you through opportunities to make the greatest impact.
                </p>
              </AccordionItem>
              <AccordionItem
                key="3"
                aria-label="Who is eligible?"
                title={
                  <p className="font-bold">
                    Who is eligible to receive food from a food bank?"
                  </p>
                }
              >
                <p className="text-sm">
                  Food banks typically serve vulnerable populations, including
                  low-income families, children, seniors, and individuals with
                  disabilities.
                </p>
              </AccordionItem>
            </Accordion>
          </div>
        </section>
      </div>
    </>
  );
};

export default ActionsPage;
