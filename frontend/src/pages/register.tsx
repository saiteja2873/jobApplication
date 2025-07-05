import { useState } from "react";
import type { FormEvent, ChangeEvent } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";
import axios from "axios";

interface RegisterFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function Registeri() {
  const [formData, setFormData] = useState<RegisterFormData>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      toast.error("Passwords don't match");
      return;
    }
    setLoading(true);


    try {
      const res = await axios.post("http://localhost:3000/api/auth/register", {
        name : formData.name,
        email : formData.email,
        password : formData.password,
      });
      localStorage.setItem("token", res.data.token);

      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Registered successfully");
      setTimeout(() => {
        navigate("/login");
        }, 1000);
  }catch(error: any){
    const message = error.response?.data?.message || "Something went wrong. Please try again.";
    toast.error(message);
    console.error("Registration error:", error);
  } finally{
    setLoading(false);
  }
}
  return (
    <motion.div
      className="bg-gray-950 min-h-screen flex items-center justify-center px-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <motion.form
        onSubmit={handleSubmit}
        className="bg-[rgba(53,68,71,0.6)] backdrop-blur-md text-white p-10 rounded-xl shadow-lg w-full max-w-3xl border-2 border-amber-50"
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeInOut" }}
      >
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold mb-2 animate-pulse">Registration Form</h2>
          <div className="w-16 h-[2px] bg-white mx-auto" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            className="bg-white/10 border border-white rounded-full px-4 py-3 focus:outline-none placeholder-white text-white transition duration-300 focus:shadow-lg"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            className="bg-white/10 border border-white rounded-full px-4 py-3 focus:outline-none placeholder-white text-white transition duration-300 focus:shadow-lg"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Your Password"
            value={formData.password}
            onChange={handleChange}
            className="bg-white/10 border border-white rounded-full px-4 py-3 focus:outline-none placeholder-white text-white transition duration-300 focus:shadow-lg"
            required
          />
          <input
            type="password"
            name="confirmPassword"
            placeholder="Confirm Password"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="bg-white/10 border border-white rounded-full px-4 py-3 focus:outline-none placeholder-white text-white transition duration-300 focus:shadow-lg"
            required
          />
        </div>

        <div className="text-center mt-10 space-y-4">
          <motion.button
            type="submit"
            disabled={loading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-cyan-900 text-white px-10 py-3 rounded-full text-lg transition-all duration-300 ease-in-out cursor-pointer border-2 border-transparent hover:bg-cyan-950 hover:border-amber-100 hover:shadow-xl"
          >
            {loading ? "Redirecting..." : "Register"}
          </motion.button>

          <div className="text-center">
            <motion.button
              type="button"
              onClick={() => navigate("/login")}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-white underline hover:text-amber-200 transition cursor-pointer mt-4"
            >
              Already registered? Go to Login
            </motion.button>
          </div>
        </div>
      </motion.form>
    </motion.div>
  );
}

export default Registeri;
