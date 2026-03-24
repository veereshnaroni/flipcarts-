import { Link } from "react-router-dom";
import { Star, ShoppingCart } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../App";
import { motion } from "motion/react";

export default function ProductCard({ product }: any) {
  const { addToCart } = useCart();

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="bg-white rounded-sm shadow-sm hover:shadow-xl transition-all duration-300 p-4 flex flex-col h-full border border-gray-100"
    >
      <Link to={`/product/${product.id}`} className="flex-1 flex flex-col">
        <div className="relative aspect-square mb-4 overflow-hidden group">
          <img 
            src={product.image} 
            alt={product.name} 
            className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
            referrerPolicy="no-referrer"
          />
        </div>
        <h3 className="text-sm font-medium text-gray-800 line-clamp-2 mb-2 hover:text-[#2874f0]">
          {product.name}
        </h3>
        <div className="flex items-center space-x-2 mb-2">
          <div className="bg-[#388e3c] text-white text-[10px] font-bold px-1.5 py-0.5 rounded flex items-center space-x-0.5">
            <span>{product.rating}</span>
            <Star size={10} fill="currentColor" />
          </div>
          <span className="text-xs text-gray-500 font-medium">({product.reviewsCount.toLocaleString()})</span>
        </div>
        <div className="flex items-center space-x-2 mb-4">
          <span className="text-lg font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          <span className="text-xs text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          <span className="text-xs text-[#388e3c] font-bold">{product.discount}% off</span>
        </div>
      </Link>
      <button 
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          addToCart(product);
        }}
        className="w-full bg-[#ff9f00] text-white py-2.5 rounded-sm text-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#f39c12] transition-all duration-200 active:scale-95 shadow-sm"
      >
        <ShoppingCart size={16} />
        <span>Add to Cart</span>
      </button>
    </motion.div>
  );
}
