import { productImages } from "../assets/imagedata" 

export const data = {
  productId: 1,
  companyName: "Sneaker Company",
  productName: "Fall Limited Edition Sneakers",
  productDescription:
    "These low-profile sneakers are your perfect casual wear companion. Featuring a durable rubber outer sole, they’ll withstand everything the weather can offer.",
  productPrice: 250,
  isOnSale: true,
  salePercent: 0.5,
  amount: 0,
  images: productImages,
}

export const products = [
  { ...data, category: "Shoes" },
  {
    productId: 2,
    companyName: "Sneaker Company",
    productName: "Summer Street Sneakers",
    productDescription: "Lightweight sneakers perfect for hot days and casual streetwear.",
    productPrice: 180,
    isOnSale: false,
    salePercent: 0,
    amount: 0,
    images: productImages,
    category: "Shoes",
  },
  {
    productId: 3,
    companyName: "Backpack Co.",
    productName: "Everyday Backpack",
    productDescription: "Durable backpack with multiple compartments, ideal for everyday use.",
    productPrice: 90,
    isOnSale: true,
    salePercent: 0.3,
    amount: 0,
    images: productImages,
    category: "Accessories",
  },
]
