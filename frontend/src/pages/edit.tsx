import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import axios from "axios";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react"; // 👈 Import icons

const EditProfile: React.FC = () => {
  const navigate = useNavigate();
  const storedUser = JSON.parse(localStorage.getItem("user") || "{}");

  const [name, setName] = useState(storedUser?.name || "");
  const [prevPassword, setPrevPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [showPrevPassword, setShowPrevPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);

  const handleSave = async () => {
    if (!name.trim()) return toast.error("Name cannot be empty.");

    if ((prevPassword && !newPassword) || (!prevPassword && newPassword)) {
      return toast.error("Please fill both previous and new passwords to update.");
    }

    const payload: any = {
      userId: storedUser.id,
      name,
    };

    if (prevPassword && newPassword) {
      payload.prevPassword = prevPassword;
      payload.newPassword = newPassword;
    }

    try {
      const res = await axios.put("http://localhost:3000/api/auth/edit", payload);

      if (res.data.success) {
        localStorage.setItem("user", JSON.stringify(res.data.updatedUser));
        toast.success("Profile updated successfully!");
        setPrevPassword("");
        setNewPassword("");
        navigate("/profile");
      } else {
        toast.error(res.data.message || "Update failed");
      }
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white px-6 py-10">
      <motion.h1
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-center mb-10"
      >
        Edit Profile
      </motion.h1>

      <div className="max-w-xl mx-auto bg-white/5 rounded-xl border border-white/10 p-8 shadow-md space-y-6">
        <div>
          <p className="text-sm text-gray-400">Name</p>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full mt-1 p-2 bg-transparent border border-white/20 rounded-lg text-white focus:outline-none"
          />
        </div>

        <div>
          <p className="text-sm text-gray-400">Previous Password</p>
          <div className="relative">
            <input
              type={showPrevPassword ? "text" : "password"}
              value={prevPassword}
              onChange={(e) => setPrevPassword(e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white/20 rounded-lg text-white pr-10 focus:outline-none"
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowPrevPassword((prev) => !prev)}
            >
              {showPrevPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <div>
          <p className="text-sm text-gray-400">New Password</p>
          <div className="relative">
            <input
              type={showNewPassword ? "text" : "password"}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full mt-1 p-2 bg-transparent border border-white/20 rounded-lg text-white pr-10 focus:outline-none"
            />
            <div
              className="absolute top-1/2 right-3 transform -translate-y-1/2 cursor-pointer"
              onClick={() => setShowNewPassword((prev) => !prev)}
            >
              {showNewPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </div>
          </div>
        </div>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleSave}
          className="w-full border border-white/20 text-white py-2 rounded-lg hover:bg-white/10 transition"
        >
          Save Changes
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => navigate("/profile")}
          className="w-full border border-white/20 text-white py-2 rounded-lg hover:bg-white/10 transition"
        >
          ← Back to Profile
        </motion.button>
      </div>
    </div>
  );
};

export default EditProfile;
