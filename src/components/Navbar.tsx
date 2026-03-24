import { Link, useNavigate } from "react-router-dom";
import { Search, ShoppingCart, User as UserIcon, ChevronDown, LogOut } from "lucide-react";
import React, { useState } from "react";
import { User } from "../types";
import { useCart } from "../App";

interface NavbarProps {
  user: User | null;
  setUser: (user: User | null) => void;
}

export default function Navbar({ user, setUser }: NavbarProps) {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { cart } = useCart();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    navigate(`/?search=${search}`);
  };

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem("flipkart-user");
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#2874f0] text-white h-16 flex items-center z-50 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between max-w-7xl">
        {/* Logo */}
        <div className="flex flex-col items-start mr-4">
          <Link to="/" className="text-xl font-bold italic leading-none hover:opacity-90">
            Flipkart
          </Link>
          <Link to="/" className="text-[10px] italic flex items-center hover:underline">
            Explore <span className="text-[#ffe500] font-bold ml-0.5">Plus</span>
            <img 
              src="https://static-assets-web.flixcart.com/batman-returns/static/content/img/plus_aef861.png" 
              alt="plus" 
              className="w-2.5 h-2.5 ml-0.5"
            />
          </Link>
        </div>

        {/* Search Bar */}
        <form 
          onSubmit={handleSearch}
          className="flex-1 max-w-xl bg-white rounded-sm flex items-center px-4 h-9 mx-4 shadow-sm"
        >
          <input
            type="text"
            placeholder="Search for products, brands and more"
            className="w-full text-gray-800 outline-none text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <button type="submit" className="text-[#2874f0]">
            <Search size={20} />
          </button>
        </form>

        {/* Actions */}
        <div className="flex items-center space-x-8 font-medium">
          {user ? (
            <div className="relative group cursor-pointer flex items-center space-x-1">
              <span className="hover:text-gray-100">{user.name.split(" ")[0]}</span>
              <ChevronDown size={14} className="group-hover:rotate-180 transition-transform" />
              <div className="absolute top-full right-0 mt-2 w-48 bg-white text-gray-800 rounded shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 py-2 border border-gray-100">
                <button 
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center space-x-2 text-sm"
                >
                  <LogOut size={16} />
                  <span>Logout</span>
                </button>
              </div>
            </div>
          ) : (
            <Link 
              to="/login" 
              className="bg-white text-[#2874f0] px-8 py-1 rounded-sm text-sm font-bold hover:bg-gray-100 transition-colors"
            >
              Login
            </Link>
          )}

          <Link to="/cart" className="flex items-center space-x-2 hover:text-gray-100 relative">
            <div className="relative">
              <ShoppingCart size={20} />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-[#ff6161] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center border border-white">
                  {cart.length}
                </span>
              )}
            </div>
            <span className="hidden sm:inline">Cart</span>
          </Link>
        </div>
      </div>
    </nav>
  );
}
