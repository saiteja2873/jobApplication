import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const Profile: React.FC = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-4xl font-bold text-center mb-10"
      >
        Your Profile
      </motion.h1>

      <div className="max-w-xl mx-auto bg-white/5 rounded-xl border border-white/10 p-8 shadow-md">
        <div className="space-y-6">
          <div>
            <p className="text-sm text-gray-400">Name</p>
            <p className="text-lg font-semibold">{user?.name || "N/A"}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Email</p>
            <p className="text-lg font-semibold">{user?.email || "N/A"}</p>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mt-10">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/edit")}
            className="flex-1 border border-white/20 text-white py-2 rounded-lg hover:bg-white/10 transition"
          >
            Edit
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate("/dashboard")}
            className="flex-1 border border-white/20 text-white py-2 rounded-lg hover:bg-white/10 transition"
          >
            ← Back to Dashboard
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
