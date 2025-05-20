import { GiChickenOven, GiTomato, GiGarlic, GiPotato, GiCabbage, GiMushroom, GiNoodles, GiAvocado } from "react-icons/gi";
import { FaBowlRice, FaCheese, FaShrimp, FaFish, FaCarrot } from "react-icons/fa6";
import { FaPepperHot, FaAppleAlt } from "react-icons/fa";
import { LuBeef } from "react-icons/lu";
import { IoEggSharp } from "react-icons/io5";

// Animation variants for tag appearance
export const tagVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.2 } }
};

// Popular ingredients with their icons
export const POPULAR_INGREDIENTS = [
  { name: "Chicken", icon: GiChickenOven },
  { name: "Pasta", icon: null },
  { name: "Onion", icon: null },
  { name: "Rice", icon: FaBowlRice },
  { name: "Tomatoes", icon: GiTomato },
  { name: "Garlic", icon: GiGarlic },
  { name: "Potatoes", icon: GiPotato },
  { name: "Bell Peppers", icon: FaPepperHot },
  { name: "Cheese", icon: FaCheese },
  { name: "Eggs", icon: IoEggSharp },
  { name: "Beef", icon: LuBeef },
  { name: "Beans", icon: null },
  { name: "Spinach", icon: null },
  { name: "Carrots", icon: FaCarrot },
  { name: "Broccoli", icon: null },
  { name: "Apples", icon: FaAppleAlt },
  { name: "Fish", icon: FaFish },
  { name: "Shrimp", icon: FaShrimp },
  { name: "Mushrooms", icon: GiMushroom },
  { name: "Avocado", icon: GiAvocado },
  { name: "Cabbage", icon: GiCabbage },
  { name: "Noodles", icon: GiNoodles }
];