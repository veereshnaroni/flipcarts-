import { useCart } from "../App";
import { Link } from "react-router-dom";
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react";
import { motion } from "motion/react";

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  const totalOriginalPrice = cart.reduce((acc, item) => acc + item.originalPrice * item.quantity, 0);
  const totalPrice = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalDiscount = totalOriginalPrice - totalPrice;
  const deliveryCharges = totalPrice > 500 ? 0 : 40;

  if (cart.length === 0) {
    return (
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="bg-white rounded-sm shadow-sm p-12 text-center flex flex-col items-center justify-center">
          <div className="w-48 h-48 bg-gray-50 rounded-full flex items-center justify-center mb-6">
            <ShoppingBag size={80} className="text-gray-300" />
          </div>
          <h2 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty!</h2>
          <p className="text-sm text-gray-500 mb-8">Add items to it now.</p>
          <Link 
            to="/" 
            className="bg-[#2874f0] text-white px-12 py-3 rounded-sm font-bold hover:bg-[#1e5bbd] transition-colors shadow-md"
          >
            Shop Now
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 max-w-7xl flex flex-col lg:flex-row gap-6">
      {/* Left: Cart Items */}
      <div className="flex-1">
        <div className="bg-white rounded-sm shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900">My Cart ({cart.length})</h2>
          </div>
          
          <div className="divide-y divide-gray-100">
            {cart.map((item) => (
              <motion.div 
                layout
                key={item.id} 
                className="p-4 md:p-6 flex flex-col md:flex-row gap-6"
              >
                <div className="w-24 h-24 md:w-32 md:h-32 flex-shrink-0 flex items-center justify-center border border-gray-100 rounded-sm p-2">
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="max-w-full max-h-full object-contain"
                    referrerPolicy="no-referrer"
                  />
                </div>
                
                <div className="flex-1 flex flex-col">
                  <div className="flex justify-between items-start mb-2">
                    <Link to={`/product/${item.id}`} className="text-base font-medium text-gray-900 hover:text-[#2874f0] line-clamp-2">
                      {item.name}
                    </Link>
                    <button 
                      onClick={() => removeFromCart(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors p-1"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                  
                  <div className="flex items-center space-x-3 mb-4">
                    <span className="text-lg font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                    <span className="text-sm text-[#388e3c] font-bold">{item.discount}% off</span>
                  </div>
                  
                  <div className="flex items-center space-x-4 mt-auto">
                    <div className="flex items-center border border-gray-200 rounded-sm">
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="p-1.5 hover:bg-gray-50 text-gray-600 disabled:opacity-30"
                        disabled={item.quantity <= 1}
                      >
                        <Minus size={16} />
                      </button>
                      <span className="w-10 text-center text-sm font-bold border-x border-gray-200 py-1">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="p-1.5 hover:bg-gray-50 text-gray-600"
                      >
                        <Plus size={16} />
                      </button>
                    </div>
                    <button className="text-sm font-bold text-gray-800 hover:text-[#2874f0] uppercase tracking-wide">
                      Save for later
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="p-4 md:p-6 bg-white border-t border-gray-100 flex justify-end sticky bottom-0 shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <button className="bg-[#fb641b] text-white px-12 py-3 rounded-sm font-bold hover:bg-[#e65100] transition-colors shadow-lg">
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>

      {/* Right: Price Details */}
      <div className="w-full lg:w-96 flex-shrink-0">
        <div className="bg-white rounded-sm shadow-sm overflow-hidden sticky top-20">
          <div className="p-4 border-b border-gray-100">
            <h2 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Price Details</h2>
          </div>
          
          <div className="p-4 space-y-4 border-b border-gray-100">
            <div className="flex justify-between text-base text-gray-800">
              <span>Price ({cart.length} items)</span>
              <span>₹{totalOriginalPrice.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base text-gray-800">
              <span>Discount</span>
              <span className="text-[#388e3c]">- ₹{totalDiscount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-base text-gray-800">
              <span>Delivery Charges</span>
              <span className={deliveryCharges === 0 ? "text-[#388e3c]" : "text-gray-800"}>
                {deliveryCharges === 0 ? "FREE" : `₹${deliveryCharges}`}
              </span>
            </div>
          </div>
          
          <div className="p-4 border-b border-gray-100">
            <div className="flex justify-between text-lg font-bold text-gray-900">
              <span>Total Amount</span>
              <span>₹{(totalPrice + deliveryCharges).toLocaleString()}</span>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-[#388e3c] font-bold text-sm">
              You will save ₹{totalDiscount.toLocaleString()} on this order
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
