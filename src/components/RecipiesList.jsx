import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import toast from "react-hot-toast";
import { GoTrash } from "react-icons/go";
import { MdOutlineWatchLater } from "react-icons/md";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../features/user/cart/cartSlice";
import { MdOutlineShoppingCart } from "react-icons/md";

function RecipiesList() {
  const [recipes, setRecipes] = useState([]);
  console.log(recipes);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipies"));
      const recipesData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipesData);
    };

    fetchRecipes();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = confirm("Do you want to delete this recipe?");
    if (confirmed) {
      await deleteDoc(doc(db, "recipies", id));
      setRecipes(recipes.filter((recipe) => recipe.id !== id));
      toast.success("Recipe deleted successfully");
    }
  };

  const handleAddToCart = (recipe) => {
    dispatch(addItemToCart(recipe));
    toast.success("Recipe added to cart");
  };

  return (
    <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 mt-20">
      {recipes.map((recipe) => (
        <div key={recipe.id} className="card mb-10 bg-base-100 shadow-xl">
          <figure>
            <img
              src={recipe.image}
              className=":md-h-auto h-[200px] w-full rounded-b-md object-cover"
              alt="food image"
            />
          </figure>

          <Link to={`/singleRecipie/${recipe.id}`}>
            <div className="card-body">
              <div className="flex justify-between">
                <h2 className="card-title">{recipe.title}</h2>
                <p className="btn btn-sm max-w-32">
                  <MdOutlineWatchLater />
                  {recipe.cookingTime} minutes
                </p>
              </div>
              <p className="line-clamp-3">{recipe.method}</p>
            </div>
          </Link>
          <div className="card-actions items-center flex justify-between pb-5 px-5">
            <button
              onClick={() => handleAddToCart(recipe)}
              className="btn btn-sm btn-primary text-white">
              <MdOutlineShoppingCart className="w-4 h-4" />
              Add to Cart
            </button>
            <button
              onClick={() => handleDelete(recipe.id)}
              className="btn btn-sm btn-error text-white">
              <GoTrash />
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipiesList;
