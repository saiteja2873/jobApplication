import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

interface TokenPayload {
  exp: number;
}

const TypewriterText: React.FC<{ text: string; className?: string }> = ({
  text,
  className,
}) => {
  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i === text.length) clearInterval(interval);
    }, 30);
    return () => clearInterval(interval);
  }, [text]);

  return <p className={className}>{displayedText}</p>;
};

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Session expired. Please login again.");
      navigate("/login", { replace: true });
      return;
    }

    try {
      const decoded: TokenPayload = jwtDecode(token);
      const isExpired = decoded.exp * 1000 < Date.now();

      if (isExpired) {
        toast.warning("Session expired. Please login again.");
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/login", { replace: true });
      }
    } catch (error) {
      console.error("Invalid token", error);
      navigate("/login", { replace: true });
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    toast.success("Logged out successfully!");
    navigate("/", { replace: true });
  };

  const goToProfile = () => {
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white relative px-6 py-4 overflow-hidden">
      <div className="absolute top-8 right-4 flex gap-4 z-10">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={goToProfile}
          className="border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
        >
          Profile
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleLogout}
          className="border border-white/30 text-white px-4 py-2 rounded-lg hover:bg-white/10 transition cursor-pointer"
        >
          Logout
        </motion.button>
      </div>

      <motion.h1
        className="text-4xl font-bold text-center mt-10"
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: -25 }}
        transition={{ duration: 0.6 }}
      >
        Let’s get productive
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="mt-16 max-w-4xl ml-40 pr-10"
      >
        <h2 className="text-2xl font-bold mb-2 text-left">
          Hey {user?.name || "there"} 👋
        </h2>
        <div className="min-h-[110px]">
          {" "}
          <TypewriterText
            className="text-base opacity-80 leading-relaxed text-left"
            text="Welcome back to your space. Here's where your journey continues! Whether you're here to explore, review, or relax — everything's ready for you. Let today be the day you discover something new, make progress, or simply enjoy the process. Your goals are just a few clicks away — let's make it happen!"
          />
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="mt-12 ml-40 flex flex-wrap gap-6"
      >
        {[
          {
            label: "Post a Job",
            path: "/post-job",
            description: "Create job opportunities with title, skills & salary",
          },
          {
            label: "Job Feed",
            path: "/jobs",
            description: "Browse jobs posted by others in the network",
          },
          {
            label: "Explore",
            path: "/explore",
            description: "Discover trending skills, users & advice",
          },
          {
            label: "My Posts",
            path: "/myposts",
            description: "View and manage your job & advice posts",
          },
        ].map(({ label, path, description }) => (
          <motion.div
            key={label}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => navigate(path)}
            className="cursor-pointer w-64 px-6 py-5 rounded-2xl bg-white/5 border border-white/20 hover:bg-white/10 transition duration-200"
          >
            <h3 className="text-lg font-semibold text-white mb-1">{label}</h3>
            <p className="text-sm text-white/70 leading-snug">{description}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default Dashboard;
