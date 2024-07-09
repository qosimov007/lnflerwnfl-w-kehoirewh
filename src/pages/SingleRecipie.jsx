import React, { useState } from "react";
import { useLoaderData, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { FaMinus, FaPlus } from "react-icons/fa";
import toast from "react-hot-toast"; // Assuming you use react-toastify
import { addItemToCart } from "../features/user/cart/cartSlice"; // Assuming this is your action

export const loader = async ({ params }) => {
  const docRef = doc(db, "recipies", params.id);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    console.log("No such document!");
    return null;
  }
};

function SingleRecipe() {
  const data = useLoaderData();
  const [cartNumber, setCartNumber] = useState(1);
  const dispatch = useDispatch();
  const items = useSelector((state) => state.cart.items);

  const cartIncrease = () => {
    setCartNumber(cartNumber + 1);
  };

  const cartDecrease = () => {
    if (cartNumber > 1) {
      setCartNumber(cartNumber - 1);
    }
  };

  console.log(data.image);
  const addToChartHandler = () => {
    const cartProduct = {
      id: crypto.randomUUID(),
      quantity: cartNumber,
      title: data.title,
      image: data.image,
      cookingTime: data.cookingTime,
    };
    dispatch(addItemToCart(cartProduct));
    toast.success("Added to cart succesfully ");
  };

  return (
    <div>
      {data && (
        <div className="object-cover rounded p-5 mb-10">
          <h1 className="text-3xl mb-5">Recipe elements</h1>
          <div className="">
            {data.image && (
              <div className="carousel carousel-center max-w-l p-3 space-x-4 bg-neutral rounded-box">
                <div className="carousel-item ">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-96 h-80 object-cover rounded"
                  />
                </div>
                <div className="carousel-item ">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-96 h-80 object-cover rounded"
                  />
                </div>
                <div className="carousel-item ">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-96 h-80 object-cover rounded"
                  />
                </div>
                <div className="carousel-item ">
                  <img
                    src={data.image}
                    alt={data.title}
                    className="w-96 h-80 object-cover rounded"
                  />
                </div>
              </div>
            )}
            {/* other carousel items */}
          </div>
          <h1 className="text-4xl mt-3x mb-5">{data.title}</h1>
          <h2 className="mb-5 text-xl letter">
            Ingredients:{" "}
            {data.ingredients &&
              data.ingredients.map((ingredient, index) => (
                <button key={index} className="btn btn-sm btn-neutral m-1">
                  {ingredient}
                </button>
              ))}{" "}
          </h2>
          <h3 className="text-xl mb-5">
            Cooking time: {data.cookingTime} minutes
          </h3>
          <h3 className="text-xl mb-5">Category: {data.category}</h3>
          <h3 className="text-x mb-5">
            <span className="font-bold">Method:</span> {data.method}
          </h3>
          <div className="flex items-center gap-10  justify-end">
            <div className="mb-5 text-center ">
              <div className="flex  items-center gap-5">
                <button className="btn btn-secces" onClick={cartDecrease}>
                  <FaMinus />
                </button>
                <div>
                  <span className="text-lg font-semibold">{cartNumber}</span>
                </div>
                <button className="btn btn-succes" onClick={cartIncrease}>
                  <FaPlus />
                </button>
              </div>
              <div>
                <button
                  onClick={addToChartHandler}
                  className="btn btn-primary text-white w-[140px]">
                  Add item
                </button>
              </div>
            </div>
            <div className="mb-5">
              <Link
                className="bg-red-500 p-2 text-white flex justify-center mx-auto w-20 rounded px-4"
                to="/">
                Back
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SingleRecipe;
