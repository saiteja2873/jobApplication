import React, {
  useState,
  type FormEvent,
  type ChangeEvent,
  useEffect,
} from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";

interface LoginFormData {
  email: string;
  password: string;
}

interface TokenPayload {
  exp: number;
  // optionally: userId, email, etc.
}

const Login: React.FC = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: TokenPayload = jwtDecode(token);
        const isExpired = decoded.exp * 1000 < Date.now();

        if (!isExpired) {
          navigate("/dashboard", { replace: true }); // ✅ Replace so back button doesn't go to Login
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      } catch (err) {
        console.error("Invalid token", err);
      }
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setLoginData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setLoading(true);
    try {
      const res = await axios.post("http://localhost:3000/api/auth/login", {
        email: loginData.email,
        password: loginData.password,
      });

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      toast.success("Login successful!");

      setTimeout(() => {
        navigate("/dashboard");
      }, 1000);
    } catch (error: any) {
      const msg =
        error.response?.data?.message || "Invalid credentials or server error.";
      toast.error(msg);
      console.error("Login error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex justify-center items-center relative overflow-hidden bg-gray-950 text-white px-4">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, type: "spring" }}
        className="absolute top-0 left-0 w-32 h-32 bg-amber-400 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-0 blur-sm"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 0.2 }}
        transition={{ duration: 1.2, type: "spring", delay: 0.3 }}
        className="absolute bottom-0 right-0 w-32 h-32 bg-amber-400 rounded-full transform translate-x-1/2 translate-y-1/2 z-0 blur-sm"
      />
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
          <form onSubmit={handleSubmit}>
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="email"
              name="email"
              value={loginData.email}
              onChange={handleChange}
              placeholder="Email"
              className="w-full p-3 mb-5 rounded-full bg-white/10 text-white placeholder-gray-50 outline-none backdrop-blur-sm focus:shadow-md transition duration-300 border-2 border-transparent focus:border-amber-50"
              required
            />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
              type="password"
              name="password"
              value={loginData.password}
              onChange={handleChange}
              placeholder="Password"
              className="w-full p-3 mb-5 rounded-full bg-white/10 text-white placeholder-gray-50 outline-none backdrop-blur-sm focus:shadow-md transition duration-300 border-2 border-transparent focus:border-amber-50"
              required
            />
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              type="submit"
              disabled={loading}
              className="w-full bg-cyan-900 text-white font-bold p-3 rounded-full transition-all hover:bg-cyan-950 hover:shadow-lg border-2 border-transparent hover:border-amber-100 cursor-pointer"
            >
              {loading ? "Logging in..." : "SUBMIT"}
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
