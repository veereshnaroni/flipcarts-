import { Github, Twitter, Facebook, Youtube, ShoppingBag, Star, Gift } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-[#172337] text-white pt-10 pb-6 mt-10">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 mb-10 border-b border-gray-700 pb-10">
          <div className="flex flex-col space-y-2">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">About</h3>
            <a href="#" className="text-xs hover:underline">Contact Us</a>
            <a href="#" className="text-xs hover:underline">About Us</a>
            <a href="#" className="text-xs hover:underline">Careers</a>
            <a href="#" className="text-xs hover:underline">Flipkart Stories</a>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Help</h3>
            <a href="#" className="text-xs hover:underline">Payments</a>
            <a href="#" className="text-xs hover:underline">Shipping</a>
            <a href="#" className="text-xs hover:underline">Cancellation & Returns</a>
            <a href="#" className="text-xs hover:underline">FAQ</a>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Policy</h3>
            <a href="#" className="text-xs hover:underline">Return Policy</a>
            <a href="#" className="text-xs hover:underline">Terms Of Use</a>
            <a href="#" className="text-xs hover:underline">Security</a>
            <a href="#" className="text-xs hover:underline">Privacy</a>
          </div>
          <div className="flex flex-col space-y-2">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Social</h3>
            <a href="#" className="text-xs hover:underline flex items-center space-x-2">
              <Facebook size={14} /> <span>Facebook</span>
            </a>
            <a href="#" className="text-xs hover:underline flex items-center space-x-2">
              <Twitter size={14} /> <span>Twitter</span>
            </a>
            <a href="#" className="text-xs hover:underline flex items-center space-x-2">
              <Youtube size={14} /> <span>YouTube</span>
            </a>
          </div>
          <div className="col-span-2 border-l border-gray-700 pl-8 hidden lg:flex flex-col space-y-2">
            <h3 className="text-gray-400 text-xs font-bold uppercase mb-2">Registered Office Address</h3>
            <p className="text-xs leading-relaxed text-gray-300">
              Flipkart Internet Private Limited,<br />
              Buildings Alyssa, Begonia &<br />
              Clove Embassy Tech Village,<br />
              Outer Ring Road, Devarabeesanahalli Village,<br />
              Bengaluru, 560103,<br />
              Karnataka, India
            </p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between items-center text-xs text-gray-300 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <span className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <ShoppingBag size={14} className="text-[#ffe500]" />
              <span>Become a Seller</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <Star size={14} className="text-[#ffe500]" />
              <span>Advertise</span>
            </span>
            <span className="flex items-center space-x-1 hover:text-white cursor-pointer">
              <Gift size={14} className="text-[#ffe500]" />
              <span>Gift Cards</span>
            </span>
          </div>
          <p>© 2007-2024 Flipkart.com</p>
          <img 
            src="https://static-assets-web.flixcart.com/batman-returns/static/content/img/payment-method_69e7bc.svg" 
            alt="payments" 
            className="h-4"
          />
        </div>
      </div>
    </footer>
  );
}

