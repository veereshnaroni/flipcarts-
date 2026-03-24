import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { Product } from "../types";
import { motion } from "motion/react";
import { Smartphone, Laptop, Watch, Shirt, LayoutGrid } from "lucide-react";

const categories = [
  { name: "All", icon: LayoutGrid },
  { name: "Mobiles", icon: Smartphone },
  { name: "Electronics", icon: Watch },
  { name: "Laptops", icon: Laptop },
  { name: "Fashion", icon: Shirt },
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const category = searchParams.get("category") || "All";
  const search = searchParams.get("search") || "";

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?category=${category}&search=${search}`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.error("Failed to fetch products:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [category, search]);

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      {/* Categories Bar */}
      <div className="bg-white shadow-sm rounded-sm mb-6 flex items-center justify-center space-x-4 sm:space-x-12 py-4 overflow-x-auto scrollbar-hide">
        {categories.map((cat) => (
          <button
            key={cat.name}
            onClick={() => setSearchParams({ category: cat.name })}
            className={`flex flex-col items-center space-y-1 min-w-[80px] transition-all duration-200 group ${
              category === cat.name ? "text-[#2874f0]" : "text-gray-700"
            }`}
          >
            <div className={`p-2 rounded-full transition-colors ${
              category === cat.name ? "bg-blue-50" : "group-hover:bg-gray-50"
            }`}>
              <cat.icon size={24} strokeWidth={1.5} />
            </div>
            <span className={`text-xs font-bold ${
              category === cat.name ? "" : "opacity-80"
            }`}>
              {cat.name}
            </span>
          </button>
        ))}
      </div>

      {/* Hero Banner (Advanced) */}
      <div className="relative h-48 sm:h-64 md:h-80 rounded-sm mb-8 overflow-hidden group">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0 bg-gradient-to-r from-[#2874f0] via-[#1e5bbd] to-[#2874f0] flex items-center justify-between px-8 md:px-20 text-white"
        >
          <div className="max-w-md z-10">
            <motion.span 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-block bg-yellow-400 text-blue-900 text-[10px] font-bold px-2 py-0.5 rounded-full mb-4"
            >
              LIMITED TIME OFFER
            </motion.span>
            <motion.h1 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-3xl sm:text-5xl font-bold mb-4 leading-tight"
            >
              Big Billion Days <br />
              <span className="text-yellow-400">Live Now!</span>
            </motion.h1>
            <motion.p 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-lg opacity-90 mb-6"
            >
              Up to 80% Off on Top Brands. Free Delivery for Plus Members.
            </motion.p>
            <motion.button 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-[#2874f0] px-10 py-3 rounded-sm font-bold shadow-lg hover:bg-gray-100 transition-colors"
            >
              Shop Now
            </motion.button>
          </div>
          
          <motion.div 
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="hidden md:block relative w-1/3 aspect-square"
          >
            <img 
              src="https://picsum.photos/seed/shopping/600/600" 
              alt="banner" 
              className="w-full h-full object-contain drop-shadow-2xl"
              referrerPolicy="no-referrer"
            />
          </motion.div>
        </motion.div>
        
        {/* Animated Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="bg-white rounded-sm h-64 animate-pulse"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-sm shadow-sm">
          <p className="text-xl text-gray-500">No products found for "{search || category}"</p>
          <button 
            onClick={() => setSearchParams({ category: "All" })}
            className="mt-4 text-[#2874f0] font-bold hover:underline"
          >
            Clear filters
          </button>
        </div>
      )}
    </div>
  );
}
