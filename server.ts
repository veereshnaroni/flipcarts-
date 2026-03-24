import express from "express";
import cors from "cors";
import path from "path";
import { createServer as createViteServer } from "vite";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const products = [
  // Mobiles (10 companies)
  {
    id: "m1",
    name: "Apple iPhone 15 Pro (Natural Titanium, 256 GB)",
    price: 129900,
    originalPrice: 134900,
    discount: 3,
    image: "https://picsum.photos/seed/iphone15pro/400/400",
    category: "Mobiles",
    rating: 4.7,
    reviewsCount: 15400,
    description: "Forged in titanium and featuring the groundbreaking A17 Pro chip.",
    highlights: ["256 GB ROM", "15.49 cm (6.1 inch) Super Retina XDR Display", "48MP + 12MP + 12MP | 12MP Front Camera", "A17 Pro Chip"]
  },
  {
    id: "m2",
    name: "SAMSUNG Galaxy S24 Ultra (Titanium Black, 512 GB)",
    price: 139999,
    originalPrice: 144999,
    discount: 3,
    image: "https://picsum.photos/seed/s24u/400/400",
    category: "Mobiles",
    rating: 4.8,
    reviewsCount: 9200,
    description: "The most powerful Galaxy yet with advanced AI features.",
    highlights: ["512 GB ROM", "17.27 cm (6.8 inch) Quad HD+ Display", "200MP + 50MP + 12MP + 10MP | 12MP Front Camera", "Snapdragon 8 Gen 3"]
  },
  {
    id: "m3",
    name: "Google Pixel 8 Pro (Bay, 128 GB)",
    price: 106999,
    originalPrice: 109999,
    discount: 2,
    image: "https://picsum.photos/seed/pixel8pro/400/400",
    category: "Mobiles",
    rating: 4.5,
    reviewsCount: 3100,
    description: "The all-pro Google phone with the best Pixel Camera yet.",
    highlights: ["128 GB ROM", "17.02 cm (6.7 inch) LTPO OLED Display", "50MP + 48MP + 48MP | 10.5MP Front Camera", "Google Tensor G3"]
  },
  {
    id: "m4",
    name: "OnePlus 12 (Flowy Emerald, 512 GB)",
    price: 69999,
    originalPrice: 74999,
    discount: 6,
    image: "https://picsum.photos/seed/oneplus12/400/400",
    category: "Mobiles",
    rating: 4.6,
    reviewsCount: 5400,
    description: "Smooth Beyond Belief with the 4th Gen Hasselblad Camera.",
    highlights: ["512 GB ROM", "17.32 cm (6.82 inch) Quad HD+ Display", "50MP + 64MP + 48MP | 32MP Front Camera", "Snapdragon 8 Gen 3"]
  },
  {
    id: "m5",
    name: "Xiaomi 14 Ultra (Black, 512 GB)",
    price: 99999,
    originalPrice: 119999,
    discount: 16,
    image: "https://picsum.photos/seed/xiaomi14u/400/400",
    category: "Mobiles",
    rating: 4.4,
    reviewsCount: 850,
    description: "Co-engineered with Leica for professional-grade photography.",
    highlights: ["512 GB ROM", "17.09 cm (6.73 inch) WQHD+ Display", "50MP Quad Camera | 32MP Front Camera", "Snapdragon 8 Gen 3"]
  },
  {
    id: "m6",
    name: "Nothing Phone (2) (Dark Grey, 256 GB)",
    price: 36999,
    originalPrice: 54999,
    discount: 32,
    image: "https://picsum.photos/seed/nothing2/400/400",
    category: "Mobiles",
    rating: 4.4,
    reviewsCount: 12500,
    description: "A new way to interact with the unique Glyph Interface.",
    highlights: ["256 GB ROM", "17.02 cm (6.7 inch) LTPO OLED Display", "50MP + 50MP | 32MP Front Camera", "Snapdragon 8+ Gen 1"]
  },
  {
    id: "m7",
    name: "Motorola Edge 50 Pro (Luxe Lavender, 256 GB)",
    price: 31999,
    originalPrice: 41999,
    discount: 23,
    image: "https://picsum.photos/seed/motoedge50/400/400",
    category: "Mobiles",
    rating: 4.3,
    reviewsCount: 8900,
    description: "The world's first AI-powered pro-grade camera phone.",
    highlights: ["256 GB ROM", "17.02 cm (6.7 inch) 1.5K pOLED Display", "50MP + 13MP + 10MP | 50MP Front Camera", "Snapdragon 7 Gen 3"]
  },
  {
    id: "m8",
    name: "Vivo X100 Pro (Asteroid Black, 512 GB)",
    price: 89999,
    originalPrice: 96999,
    discount: 7,
    image: "https://picsum.photos/seed/vivox100/400/400",
    category: "Mobiles",
    rating: 4.6,
    reviewsCount: 1200,
    description: "Photography Redefined with ZEISS APO Telephoto Camera.",
    highlights: ["512 GB ROM", "17.22 cm (6.78 inch) Full HD+ Display", "50MP + 50MP + 50MP | 32MP Front Camera", "Dimensity 9300"]
  },
  {
    id: "m9",
    name: "OPPO Reno11 Pro 5G (Pearl White, 256 GB)",
    price: 37999,
    originalPrice: 44999,
    discount: 15,
    image: "https://picsum.photos/seed/opporeno11/400/400",
    category: "Mobiles",
    rating: 4.2,
    reviewsCount: 4500,
    description: "The Portrait Expert with a stunning 32MP Telephoto Lens.",
    highlights: ["256 GB ROM", "17.02 cm (6.7 inch) Full HD+ Display", "50MP + 32MP + 8MP | 32MP Front Camera", "Dimensity 8200"]
  },
  {
    id: "m10",
    name: "Realme GT 5G (Racing Yellow, 256 GB)",
    price: 34999,
    originalPrice: 41999,
    discount: 16,
    image: "https://picsum.photos/seed/realmegt/400/400",
    category: "Mobiles",
    rating: 4.3,
    reviewsCount: 6700,
    description: "Sheer Speed with the Snapdragon 888 and 120Hz Super AMOLED.",
    highlights: ["256 GB ROM", "16.33 cm (6.43 inch) Full HD+ Display", "64MP + 8MP + 2MP | 16MP Front Camera", "Snapdragon 888"]
  },

  // Electronics
  {
    id: "e1",
    name: "Sony WH-1000XM5 Noise Cancelling Headphones",
    price: 29990,
    originalPrice: 34990,
    discount: 14,
    image: "https://picsum.photos/seed/sonywh/400/400",
    category: "Electronics",
    rating: 4.7,
    reviewsCount: 12400,
    description: "Industry-leading noise cancellation and exceptional sound quality.",
    highlights: ["30 Hours Battery Life", "Touch Control", "Voice Assistant Integration", "Multipoint Connection"]
  },
  {
    id: "e2",
    name: "Apple Watch Series 9 (GPS, 45mm)",
    price: 41900,
    originalPrice: 44900,
    discount: 6,
    image: "https://picsum.photos/seed/applewatch9/400/400",
    category: "Electronics",
    rating: 4.8,
    reviewsCount: 5600,
    description: "Smarter, brighter, and more powerful with the S9 SiP.",
    highlights: ["Always-On Retina Display", "Blood Oxygen App", "ECG App", "Fall Detection"]
  },
  {
    id: "e3",
    name: "Samsung Galaxy Buds2 Pro",
    price: 14999,
    originalPrice: 19999,
    discount: 25,
    image: "https://picsum.photos/seed/galaxybuds/400/400",
    category: "Electronics",
    rating: 4.5,
    reviewsCount: 8900,
    description: "Ultimate Hi-Fi sound in your ears with 24-bit audio.",
    highlights: ["Active Noise Cancellation", "360 Audio", "Auto Switch", "IPX7 Water Resistance"]
  },
  {
    id: "e4",
    name: "Logitech MX Master 3S Wireless Mouse",
    price: 9495,
    originalPrice: 10995,
    discount: 13,
    image: "https://picsum.photos/seed/mxmaster/400/400",
    category: "Electronics",
    rating: 4.8,
    reviewsCount: 3400,
    description: "An icon remastered for ultimate precision and performance.",
    highlights: ["8K DPI Tracking", "Quiet Clicks", "MagSpeed Scrolling", "USB-C Quick Charging"]
  },
  {
    id: "e5",
    name: "ASUS ROG Swift 27\" Gaming Monitor",
    price: 54999,
    originalPrice: 69999,
    discount: 21,
    image: "https://picsum.photos/seed/rogmonitor/400/400",
    category: "Electronics",
    rating: 4.6,
    reviewsCount: 1200,
    description: "World's first 1440p 360Hz OLED gaming monitor.",
    highlights: ["27-inch QHD OLED", "360Hz Refresh Rate", "0.03ms Response Time", "G-SYNC Compatible"]
  },
  {
    id: "e6",
    name: "Bose SoundLink Revolve+ II",
    price: 24500,
    originalPrice: 27500,
    discount: 10,
    image: "https://picsum.photos/seed/bosespeaker/400/400",
    category: "Electronics",
    rating: 4.7,
    reviewsCount: 4500,
    description: "Deep, loud and immersive sound with true 360° coverage.",
    highlights: ["17 Hours Battery Life", "Water Resistant", "Built-in Speakerphone", "Voice Prompts"]
  },

  // Laptops
  {
    id: "l1",
    name: "Apple MacBook Pro M3 Max (16-inch, 36GB, 1TB)",
    price: 349900,
    originalPrice: 359900,
    discount: 2,
    image: "https://picsum.photos/seed/macbookpro/400/400",
    category: "Laptops",
    rating: 4.9,
    reviewsCount: 850,
    description: "The most advanced chips ever built for a personal computer.",
    highlights: ["M3 Max Chip", "36 GB Unified Memory", "1 TB SSD", "41.05 cm (16.2 inch) Liquid Retina XDR Display"]
  },
  {
    id: "l2",
    name: "Dell XPS 13 Plus (9320, 16GB, 512GB)",
    price: 154990,
    originalPrice: 179990,
    discount: 13,
    image: "https://picsum.photos/seed/dellxps/400/400",
    category: "Laptops",
    rating: 4.4,
    reviewsCount: 1200,
    description: "Twice as powerful as before in the same iconic size.",
    highlights: ["13th Gen Intel Core i7", "16 GB LPDDR5 RAM", "512 GB SSD", "34.03 cm (13.4 inch) OLED Touch Display"]
  }
];

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/products", (req, res) => {
    const { category, search } = req.query;
    let filtered = [...products];
    
    if (category && category !== "All") {
      filtered = filtered.filter(p => p.category === category);
    }
    
    if (search) {
      const s = (search as string).toLowerCase();
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(s) || 
        p.description.toLowerCase().includes(s)
      );
    }
    
    res.json(filtered);
  });

  app.get("/api/products/:id", (req, res) => {
    const product = products.find(p => p.id === req.params.id);
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: "Product not found" });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`Note: Localhost:4000 was requested, but using 3000 as per platform requirements.`);
  });
}

startServer();
