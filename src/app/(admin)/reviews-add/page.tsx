// "use client";
// import { useState, useEffect } from "react";
// import { GetProductData } from "@/sanity/sanity.query";

// export interface ProductInterface {
//   _id: number;
//   title: string;
//   price: number;
//   priceWithoutDiscount: number;
//   badge: string;
//   imageURL: string;
//   products: number;
//   description: string;
//   inventory: number;
//   tags: string;
//   reviews: { reviewText: string; username: string }[];
//   quantity: number;
//   category: { _id: string; title: string; imageURL: string };
//   status: string;
// }

// export default function Details() {
//   const [productData, setProductData] = useState<ProductInterface[]>([]);

//   useEffect(() => {
//     async function fetchProductData() {
//       try {
//         const data = await GetProductData();
//         setProductData(data);
//       } catch (error) {
//         console.error("Failed to fetch products:", error);
//       }
//     }
//     fetchProductData();
//   }, []);

//   return (
//     <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//       <h1 className="text-[18px] font-semibold pl-4 pb-8">Customer Reviews</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
//         {productData.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white shadow-xl rounded-lg overflow-hidden border border-gray-300 transition-transform duration-300 hover:scale-105"
//           >
//             {/* Product Image and Title */}
//             <div className="relative">
//               <img
//                 src={item.imageURL}
//                 alt={item.title}
//                 className="w-full h-64 object-cover rounded-t-lg"
//               />

//               {item.badge && (
//                 <span>
//                   {item.badge == "New" ? <div className="absolute top-4 right-4 bg-color7 text-white text-xs px-2 py-1 rounded-md">New</div> : <div className="absolute top-4 right-4 bg-color8 text-white text-xs px-2 py-1 rounded-md">Sales</div>}
//                 </span>
//               )}
//             </div>

//             {/* Product Details */}
//             <div className="p-6">
//               <div className="flex justify-between items-center mb-4">
//                 <h2 className="text-xl font-semibold text-gray-800">{item.title}</h2>
//                 <div className="flex items-center gap-2">
//                   <span className="text-lg font-bold text-gray-900">${item.price}</span>
//                   {item.priceWithoutDiscount && (
//                     <span className="text-sm text-gray-500 line-through">
//                       ${item.priceWithoutDiscount}
//                     </span>
//                   )}
//                 </div>
//               </div>

//               <p className="text-gray-700 text-sm mb-4">{item.description}</p>

//               {/* Category */}
//               <div className="flex items-center gap-2 text-sm text-gray-500">
//                 <span className="font-medium">Category:</span>
//                 {/* <span>{item.category?.title || ""}</span> */}
//               </div>

//               {/* Inventory and Status */}
//               <div className="flex items-center gap-2 text-sm text-gray-500 mt-2">
//                 <span className="font-medium">Inventory:</span>
//                 <span>{item.inventory}</span>
//                 <span className="font-medium">Status:</span>
//                 <span
//                   className={`px-2 py-1 rounded-md text-white ${
//                     item.status === "In Stock" ? "bg-green-500" : "bg-red-500"
//                   }`}
//                 >
//                   {item.status}
//                 </span>
//               </div>
//             </div>

//             {/* Review Section */}
//             <div className="bg-gray-100 p-6 rounded-b-lg">
//               <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Reviews</h3>

//               {item.reviews?.length > 0 ? (
//                 item.reviews.map((review, index) => (
//                   <div
//                     key={index}
//                     className="border-b-[1px] border-gray-300 py-4 last:border-none"
//                   >
//                     <div className="flex items-center mb-2">
//                       <span className="font-medium text-gray-800">{review.username}</span>
//                     </div>
//                     <p className="text-gray-700 text-sm">{review.reviewText}</p>
//                   </div>
//                 ))
//               ) : (
//                 <p className="text-gray-500">No reviews available.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// "use client";
// import { useState, useEffect } from "react";
// import { GetProductData } from "@/sanity/sanity.query";
// import { Star } from "lucide-react";

// export interface ProductInterface {
//   _id: number;
//   title: string;
//   price: number;
//   priceWithoutDiscount: number;
//   badge: string;
//   imageURL: string;
//   products: number;
//   description: string;
//   inventory: number;
//   tags: string;
//   reviews: { reviewText: string; username: string }[];
//   quantity: number;
//   category: { _id: string; title: string; imageURL: string };
//   status: string;
// }

// export default function ReviewsAdd() {
//   const [productData, setProductData] = useState<ProductInterface[]>([]);

//   useEffect(() => {
//     async function fetchProductData() {
//       try {
//         const data = await GetProductData();
//         setProductData(data);
//       } catch (error) {
//         console.error("Failed to fetch reviews:", error);
//       }
//     }
//     fetchProductData();
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto px-6 py-12">
//       <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
//         Customer Reviews
//       </h1>
//       <div className="space-y-8">
//         {productData.map((item) => (
//           <div
//             key={item._id}
//             className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 hover:shadow-xl transition-all"
//           >
//             <div className="flex items-center gap-4">
//               <img
//                 src={item.imageURL}
//                 alt={item.title}
//                 className="w-20 h-20 object-cover rounded-lg border"
//               />
//               <div>
//                 <h2 className="text-xl font-semibold text-gray-900">
//                   {item.title}
//                 </h2>
//                 <p className="text-gray-600 text-sm">{item.description}</p>
//               </div>
//             </div>

//             {/* Reviews Section */}
//             <div className="mt-6">
//               <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
//                 Reviews
//               </h3>
//               {item.reviews?.length > 0 ? (
//                 <div className="space-y-4 mt-4">
//                   {item.reviews.map((review, index) => (
//                     <div key={index} className="bg-gray-100 p-4 rounded-md">
//                       <div className="flex items-center gap-2 mb-2">
//                         <span className="font-medium text-gray-800">
//                           {review.username}
//                         </span>
//                         <div className="flex text-yellow-500">
//                           {[...Array(5)].map((_, i) => (
//                             <Star key={i} size={14} fill="currentColor" />
//                           ))}
//                         </div>
//                       </div>
//                       <p className="text-gray-700 text-sm">{review.reviewText}</p>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <p className="text-gray-500 mt-4">No reviews available.</p>
//               )}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

"use client";
import { useState, useEffect } from "react";
import { GetProductData } from "@/sanity/sanity.query";
import { Star } from "lucide-react";

export interface ProductInterface {
  _id: number;
  title: string;
  price: number;
  priceWithoutDiscount: number;
  badge: string;
  imageURL: string;
  products: number;
  description: string;
  inventory: number;
  tags: string;
  reviews: { reviewText: string; username: string }[];
  quantity: number;
  category: { _id: string; title: string; imageURL: string };
  status: string;
}

export default function Reviews() {
  const [productData, setProductData] = useState<ProductInterface[]>([]);
  const [visibleReviews, setVisibleReviews] = useState<{ [key: number]: boolean }>({});

  useEffect(() => {
    async function fetchProductData() {
      try {
        const data = await GetProductData();
        setProductData(data);
      } catch (error) {
        console.error("Failed to fetch reviews:", error);
      }
    }
    fetchProductData();
  }, []);

  const toggleReviews = (id: number) => {
    setVisibleReviews((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="lg:max-w-5xl mx-w-2xl mx-auto lg:px-6 px-3 py-5 lg:py-12">
      <h1 className="text-xl lg:text-3xl font-bold text-center text-gray-800 mb-8">
        Customer Reviews
      </h1>
      <div className="space-y-6 lg:space-y-8">
        {productData.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-lg rounded-lg p-2 lg:p-6 border border-gray-200 hover:shadow-xl transition-all"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.imageURL}
                alt={item.title}
                className="lg:w-20 lg:h-20 h-16 w-16 object-cover rounded-lg border"
              />
              <div>
                <h2 className="text-[16px] lg:text-xl font-semibold text-gray-900">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-[12px] lg:text-sm">{item.description}</p>
              </div>
            </div>

            {/* Toggle Button */}
            <button
              onClick={() => toggleReviews(item._id)}
              className="mt-4 px-4 py-0.5 text-[14px] bg-color text-white rounded-md  transition"
            >
              {visibleReviews[item._id] ? <div className="flex justify-center items-center">Hide Reviews
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-6 h-6 md:h-7 md:w-7 lg:h-9 lg:w-9 xl:h-12 xl:w-12"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 10l-4 4-4-4" />
                  </svg>
              </div> : <div className="flex justify-center items-center">Show Reviews
              <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="w-6 h-6 md:h-7 md:w-7 lg:h-9 lg:w-9 xl:h-12 xl:w-12"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 14l4-4 4 4" />
                  </svg>
                  </div>}
            </button>

            {/* Reviews Section */}
            {visibleReviews[item._id] && (
              <div className="mt-6">
                <h3 className="text-lg font-semibold text-gray-700 border-b pb-2">
                  Reviews
                </h3>
                {item.reviews?.length > 0 ? (
                  <div className="space-y-4 mt-4">
                    {item.reviews.map((review, index) => (
                      <div key={index} className="bg-gray-100 p-4 rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium text-gray-800">
                            {review.username}
                          </span>
                          <div className="flex text-yellow-500">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} size={14} fill="currentColor" />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-700 text-sm">{review.reviewText}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 mt-4">No reviews available.</p>
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
