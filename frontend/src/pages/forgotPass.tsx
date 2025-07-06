import React, { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPass: React.FC = () => {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await axios.post("http://localhost:3000/api/auth/forgot-password", {
        email,
      });

      toast.success("Password reset instructions sent to your email.");
      setEmail("");
    } catch (err: any) {
      toast.error(
        err.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-950 text-white px-4">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-md z-10"
      >
        <div className="shadow-md rounded-xl backdrop-blur-md p-8 bg-[rgba(53,68,71,0.6)] border-amber-50 border-2">
          <h1 className="text-2xl font-bold text-center mb-6 opacity-80">
            Forgot Password
          </h1>
          <form onSubmit={handleSubmit}>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-3 mb-5 rounded-full bg-white/10 text-white placeholder-gray-50 outline-none backdrop-blur-sm focus:shadow-md transition duration-300 border-2 border-transparent focus:border-amber-50"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={submitting}
              className="w-full bg-cyan-900 text-white font-bold p-3 rounded-full transition-all hover:bg-cyan-950 hover:shadow-lg border-2 border-transparent hover:border-amber-100 cursor-pointer"
            >
              {submitting ? "Sending..." : "Send Reset Instructions"}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </section>
  );
};

export default ForgotPass;
