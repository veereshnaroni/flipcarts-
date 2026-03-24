import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Star, ShoppingCart, Zap, Shield, RotateCcw, Truck } from "lucide-react";
import { Product } from "../types";
import { useCart } from "../App";
import { motion } from "motion/react";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${id}`);
        if (!res.ok) throw new Error("Product not found");
        const data = await res.json();
        setProduct(data);
      } catch (err) {
        console.error(err);
        navigate("/");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id, navigate]);

  if (loading) return <div className="container mx-auto p-10 text-center text-xl animate-pulse">Loading...</div>;
  if (!product) return <div className="container mx-auto p-10 text-center text-xl">Product not found</div>;

  return (
    <div className="container mx-auto px-4 max-w-7xl">
      <div className="bg-white rounded-sm shadow-sm p-4 md:p-8 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Left: Images & Actions */}
        <div className="md:col-span-5 flex flex-col items-center">
          <div className="w-full aspect-square border border-gray-100 rounded-sm mb-6 p-4 flex items-center justify-center group overflow-hidden">
            <motion.img 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              src={product.image} 
              alt={product.name} 
              className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="grid grid-cols-2 gap-4 w-full">
            <button 
              onClick={() => addToCart(product)}
              className="bg-[#ff9f00] text-white py-4 rounded-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#f39c12] transition-all duration-200 active:scale-95 shadow-sm"
            >
              <ShoppingCart size={20} />
              <span>ADD TO CART</span>
            </button>
            <button className="bg-[#fb641b] text-white py-4 rounded-sm font-bold flex items-center justify-center space-x-2 hover:bg-[#e65100] transition-all duration-200 active:scale-95 shadow-sm">
              <Zap size={20} />
              <span>BUY NOW</span>
            </button>
          </div>
        </div>

        {/* Right: Info */}
        <div className="md:col-span-7 flex flex-col">
          <nav className="text-xs text-gray-500 mb-2 flex items-center space-x-1">
            <span className="hover:text-[#2874f0] cursor-pointer">Home</span>
            <span>&gt;</span>
            <span className="hover:text-[#2874f0] cursor-pointer">{product.category}</span>
            <span>&gt;</span>
            <span className="text-gray-800 font-medium truncate">{product.name}</span>
          </nav>
          
          <h1 className="text-xl md:text-2xl font-medium text-gray-900 mb-2">{product.name}</h1>
          
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-[#388e3c] text-white text-xs font-bold px-2 py-0.5 rounded flex items-center space-x-1">
              <span>{product.rating}</span>
              <Star size={12} fill="currentColor" />
            </div>
            <span className="text-sm text-gray-500 font-medium">{product.reviewsCount.toLocaleString()} Ratings & Reviews</span>
            <img 
              src="https://static-assets-web.flixcart.com/batman-returns/static/content/img/fa_62673a.png" 
              alt="assured" 
              className="h-5"
            />
          </div>

          <div className="flex items-baseline space-x-3 mb-1">
            <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
            <span className="text-base text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
            <span className="text-base text-[#388e3c] font-bold">{product.discount}% off</span>
          </div>
          <p className="text-xs text-gray-500 mb-6">+ ₹99 Secured Packaging Fee</p>

          {/* Highlights */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Highlights</h3>
            <ul className="list-disc list-inside space-y-2 text-sm text-gray-700">
              {product.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
          </div>

          {/* Description */}
          <div className="mb-8">
            <h3 className="text-sm font-bold text-gray-900 mb-3">Description</h3>
            <p className="text-sm text-gray-700 leading-relaxed">{product.description}</p>
          </div>

          {/* Services */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <RotateCcw size={20} className="text-[#2874f0]" />
              <span>7 Days Replacement Policy</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <Truck size={20} className="text-[#2874f0]" />
              <span>Free Delivery</span>
            </div>
            <div className="flex items-center space-x-3 text-xs text-gray-600">
              <Shield size={20} className="text-[#2874f0]" />
              <span>1 Year Warranty</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
