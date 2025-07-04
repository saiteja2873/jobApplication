import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="bg-gray-950 min-h-screen text-white flex flex-col items-center justify-center px-6 py-12"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2 }}
    >
      <motion.div
        className="max-w-3xl text-center"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Welcome to RizeOS — The Job & Networking Portal of the Future
        </h1>
        <p className="text-lg md:text-xl mb-10 text-gray-300">
          Connect. Collaborate. Grow. Discover opportunities, build your profile, and experience the power of AI and Web3 integration — all in one place.
        </p>

        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <motion.button
            onClick={() => navigate("/login")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-700 hover:bg-cyan-800 px-8 py-3 rounded-full text-lg transition-all duration-300 cursor-pointer"
          >
            Login
          </motion.button>
          <motion.button
            onClick={() => navigate("/register")}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-amber-600 hover:bg-amber-700 px-8 py-3 rounded-full text-lg transition-all duration-300 cursor-pointer"
          >
            Register
          </motion.button>
        </div>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-5xl w-full"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.3 }}
      >
        <motion.div
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-2">AI Skill Extraction</h2>
          <p className="text-gray-300">
            Let AI analyze your experience and auto-fill your skills for faster and smarter profile creation.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Smart Job Matching</h2>
          <p className="text-gray-300">
            Discover opportunities tailored to your skills using intelligent job matching algorithms.
          </p>
        </motion.div>

        <motion.div
          className="bg-white/10 backdrop-blur-lg p-6 rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
        >
          <h2 className="text-2xl font-semibold mb-2">Blockchain Integration</h2>
          <p className="text-gray-300">
            Connect your Web3 wallet, receive payments, and interact with smart contracts seamlessly.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default LandingPage;
