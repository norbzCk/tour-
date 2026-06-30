import nungwiBeach from "../assets/NUNGWI BEACH - ZANZIBAR.jpeg";
import baladiniBeach from "../assets/Baladini Zanzibar beach vacation.jpeg";
import queenHotel from "../assets/Queen hotel in Zanzibar.jpeg";
import makunduchi from "../assets/MAKUNDUCHI-ZANZIBAR.jpeg";

const USD_TO_TZS = 2500;

const tours = [
  {
    id: 1,
    title: "Serengeti Safari Adventure",
    destination: "Serengeti",
    category: "Safari",
    price: Math.round(799 * USD_TO_TZS),
    priceUSD: 799,
    duration: "7 Days",
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1516426122078-c23e76319801",
    description: "Experience the breathtaking wildlife of Serengeti National Park with expert guides and luxury camps.",
    gallery: [
      "https://images.unsplash.com/photo-1516426122078-c23e76319801",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401",
      "https://images.unsplash.com/photo-1504541989296-167df755af3f"
    ]
  },
  {
    id: 2,
    title: "Zanzibar Beach Escape",
    destination: "Zanzibar",
    category: "Beach",
    price: Math.round(499 * USD_TO_TZS),
    priceUSD: 499,
    duration: "5 Days",
    rating: 4.6,
    image: nungwiBeach,
    description: "Relax on white sandy beaches, explore Stone Town, and enjoy ocean adventures.",
    gallery: [
      nungwiBeach,
      baladiniBeach,
      makunduchi
    ]
  },
  {
    id: 3,
    title: "Mount Kilimanjaro Trek",
    destination: "Kilimanjaro",
    category: "Adventure",
    price: Math.round(1200 * USD_TO_TZS),
    priceUSD: 1200,
    duration: "8 Days",
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
    description: "Climb Africa's highest mountain with professional guides and full support.",
    gallery: [
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b",
      "https://images.unsplash.com/photo-1589182373726-e4f658ab50f0",
      "https://images.unsplash.com/photo-1519681393784-d120267933ba"
    ]
  },
  {
    id: 4,
    title: "Dar es Salaam City Tour",
    destination: "Dar es Salaam",
    category: "City",
    price: Math.round(199 * USD_TO_TZS),
    priceUSD: 199,
    duration: "2 Days",
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    description: "Explore culture, food, beaches, and vibrant city life in Tanzania's largest city.",
    gallery: [
      "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
      "https://images.unsplash.com/photo-1555939594-58d7cb561ad1",
      "https://images.unsplash.com/photo-1569336415962-a4bd9f69cd83"
    ]
  },
  {
    id: 5,
    title: "Ngorongoro Crater Tour",
    destination: "Ngorongoro",
    category: "Safari",
    price: Math.round(650 * USD_TO_TZS),
    priceUSD: 650,
    duration: "4 Days",
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
    description: "Discover one of the world's most unique natural wildlife sanctuaries.",
    gallery: [
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee",
      "https://images.unsplash.com/photo-1534447677768-be436bb09401",
      queenHotel
    ]
  },
];

export default tours;
