import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Login: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className="min-h-screen flex justify-center items-center relative overflow-hidden bg-gray-950 text-white px-4">
      {/* Top-left bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, type: "spring" }}
        className="absolute top-0 left-0 w-32 h-32 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0 blur-sm"
      />

      {/* Bottom-right bubble */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, type: "spring", delay: 0.3 }}
        className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400 rounded-full transform translate-x-1/2 translate-y-1/2 z-0 blur-sm"
      />

      {/* Login Box */}
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative w-full max-w-md z-10"
      >
        <div className="shadow-md rounded-xl backdrop-blur-md p-8 bg-[rgba(53,68,71,0.6)] border-amber-50 border-2">
          <h1 className="text-3xl font-bold text-center mb-6 tracking-wider opacity-80">
            LOGIN
          </h1>

          <form>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="text"
              placeholder="USERNAME"
              className="w-full p-3 mb-5 rounded-full bg-white/10 text-white placeholder-gray-50 outline-none backdrop-blur-sm focus:shadow-md transition duration-300 border-2 border-transparent focus:border-amber-50"
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="password"
              placeholder="PASSWORD"
              className="w-full p-3 mb-5 rounded-full bg-white/10 text-white placeholder-gray-50 outline-none backdrop-blur-sm focus:shadow-md transition duration-300 border-2 border-transparent focus:border-amber-50"
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              className="w-full bg-cyan-900 text-white font-bold p-3 rounded-full transition-all hover:bg-cyan-950 hover:shadow-lg border-2 border-transparent hover:border-amber-100 cursor-pointer"
            >
              SUBMIT
            </motion.button>
          </form>

          <div className="opacity-70 flex justify-between mt-4 text-sm tracking-wide">
            <motion.button
              whileHover={{ scale: 1.05 }}
              onClick={() => navigate("/register")}
              className="hover:text-amber-200 transition underline cursor-pointer"
            >
              REGISTER
            </motion.button>
            <motion.a
              whileHover={{ scale: 1.05 }}
              href="#"
              className="hover:text-amber-200 transition underline cursor-pointer"
            >
              FORGOT PASSWORD
            </motion.a>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Login;
