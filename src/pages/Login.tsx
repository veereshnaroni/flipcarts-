import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { User } from "../types";
import { motion } from "motion/react";

interface LoginProps {
  setUser: (user: User | null) => void;
}

export default function Login({ setUser }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Mock login
    const mockUser: User = {
      id: "user123",
      name: "John Doe",
      email: email || "john@example.com",
      picture: "https://picsum.photos/seed/user/100/100"
    };
    setUser(mockUser);
    localStorage.setItem("flipkart-user", JSON.stringify(mockUser));
    navigate("/");
  };

  const handleGoogleLogin = () => {
    // Simulate Google Login
    const mockUser: User = {
      id: "google123",
      name: "Google User",
      email: "google@example.com",
      picture: "https://lh3.googleusercontent.com/a/ACg8ocL..."
    };
    setUser(mockUser);
    localStorage.setItem("flipkart-user", JSON.stringify(mockUser));
    navigate("/");
  };

  return (
    <div className="container mx-auto px-4 max-w-4xl flex items-center justify-center min-h-[80vh]">
      <div className="bg-white rounded-sm shadow-xl overflow-hidden flex flex-col md:flex-row w-full max-w-3xl">
        {/* Left: Branding */}
        <div className="bg-[#2874f0] p-10 text-white md:w-2/5 flex flex-col justify-between">
          <div>
            <h2 className="text-3xl font-bold mb-4">Login</h2>
            <p className="text-lg opacity-80 leading-relaxed">
              Get access to your Orders, Wishlist and Recommendations
            </p>
          </div>
          <img 
            src="https://static-assets-web.flixcart.com/batman-returns/static/content/img/login_img_c4a81e.png" 
            alt="login" 
            className="w-full mt-10"
          />
        </div>

        {/* Right: Form */}
        <div className="p-10 md:w-3/5 flex flex-col">
          <form onSubmit={handleLogin} className="space-y-6 flex-1">
            <div className="relative">
              <input
                type="email"
                required
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] transition-colors peer text-sm"
                placeholder=" "
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#2874f0] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Email/Mobile number
              </label>
            </div>

            <div className="relative">
              <input
                type="password"
                required
                className="w-full border-b border-gray-300 py-2 outline-none focus:border-[#2874f0] transition-colors peer text-sm"
                placeholder=" "
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label className="absolute left-0 top-2 text-gray-500 text-sm transition-all pointer-events-none peer-focus:-top-4 peer-focus:text-xs peer-focus:text-[#2874f0] peer-[:not(:placeholder-shown)]:-top-4 peer-[:not(:placeholder-shown)]:text-xs">
                Enter Password
              </label>
            </div>

            <p className="text-[10px] text-gray-500 leading-relaxed">
              By continuing, you agree to Flipkart's <span className="text-[#2874f0] cursor-pointer">Terms of Use</span> and <span className="text-[#2874f0] cursor-pointer">Privacy Policy</span>.
            </p>

            <button 
              type="submit"
              className="w-full bg-[#fb641b] text-white py-3 rounded-sm font-bold hover:bg-[#e65100] transition-colors shadow-md"
            >
              Login
            </button>

            <div className="relative flex items-center justify-center">
              <div className="border-t border-gray-200 w-full"></div>
              <span className="bg-white px-4 text-xs text-gray-400 absolute">OR</span>
            </div>

            <button 
              type="button"
              onClick={handleGoogleLogin}
              className="w-full bg-white border border-gray-200 text-gray-700 py-3 rounded-sm font-bold flex items-center justify-center space-x-3 hover:bg-gray-50 transition-colors shadow-sm"
            >
              <img 
                src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
                alt="google" 
                className="w-5 h-5"
              />
              <span>Continue with Google</span>
            </button>
          </form>

          <div className="mt-10 text-center">
            <span className="text-sm text-[#2874f0] font-bold cursor-pointer hover:underline">
              New to Flipkart? Create an account
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
