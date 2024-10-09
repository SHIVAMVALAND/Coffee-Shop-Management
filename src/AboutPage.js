import React, { useEffect, useState } from "react";
import { FaCoffee, FaHistory, FaUsers, FaMugHot } from "react-icons/fa";
import Navbar from "./Navbar";
import { motion } from "framer-motion";

const AboutPage = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1 } }
  };

  const sections = [
    {
      title: "Our Story",
      icon: <FaHistory className="text-3xl mb-2" />,
      content: "Founded in 2010, Coffee Haven has been serving the finest brews to coffee enthusiasts for over a decade. Our journey began with a simple passion for quality coffee and has evolved into a haven for coffee lovers."
    },
    {
      title: "Our Mission",
      icon: <FaCoffee className="text-3xl mb-2" />,
      content: "At Coffee Haven, our mission is to provide an unparalleled coffee experience. We source the highest quality beans from sustainable farms worldwide and craft each cup with precision and care."
    },
    {
      title: "Our Team",
      icon: <FaUsers className="text-3xl mb-2" />,
      content: "Our dedicated team of baristas, roasters, and coffee experts work tirelessly to ensure that every cup of Coffee Haven brew is perfect. We're united by our passion for coffee and commitment to excellence."
    },
    {
      title: "Unique Blends",
      icon: <FaMugHot className="text-3xl mb-2" />,
      content: "Discover our signature blends, carefully crafted to tantalize your taste buds. From our bold 'Midnight Roast' to our smooth 'Sunrise Blend', we offer a range of flavors to suit every palate."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 py-12 mt-4 px-4 sm:px-6 lg:px-8">
      <Navbar />
      <motion.div
        initial="hidden"
        animate={isVisible ? "visible" : "hidden"}
        variants={fadeIn}
        className="max-w-7xl mx-auto"
      >
        <h1 className="text-4xl font-bold text-center mb-12 text-amber-500">About Coffee Haven</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform duration-300"
            >
              <div className="flex items-center justify-center mb-4">
                {section.icon}
              </div>
              <h2 className="text-2xl font-semibold mb-4 text-center text-amber-400">{section.title}</h2>
              <p className="text-gray-300">{section.content}</p>
            </motion.div>
          ))}
        </div>

        <div className="mb-12">
          <h2 className="text-3xl font-semibold mb-6 text-center text-amber-500">Our Coffee Journey</h2>
          <div className="relative h-64 md:h-96 rounded-lg overflow-hidden">
            <img
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085"
              alt="Coffee beans and brewing equipment"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <p className="text-xl md:text-2xl text-center px-4 text-white">
                From bean to cup, we pour our heart into every brew
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-6 text-amber-500">Join Our Coffee Community</h2>
          <p className="mb-8 text-xl">Experience the rich flavors and warm atmosphere of Coffee Haven</p>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="bg-amber-600 text-white px-8 py-3 rounded-full text-lg font-semibold hover:bg-amber-700 transition duration-300"
          >
            Visit Us Today
          </motion.button>
        </div>
      </motion.div>

      <style jsx>{`
        .text-gold {
          color: gold;
        }
      `}</style>
    </div>
  );
};

export default AboutPage;