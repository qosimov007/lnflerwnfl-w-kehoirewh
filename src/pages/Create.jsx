import React, { useEffect, useState } from "react";
import { Form, useActionData, redirect } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useCreateRecipie } from "../hooks/useCreateRecipie";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";  // Import useSelector to get the current user
import toast from "react-hot-toast";

export const action = async ({ request }) => {
  try {
    console.log("Processing form data...");
    const formData = await request.formData();
    console.log("Form data received:", formData);

    const title = formData.get("title");
    const image = formData.get("image");
    const cookingTime = formData.get("cookingTime");
    const method = formData.get("method");
    const category = formData.get("category");
    const uid = formData.get("uid");  // Get user ID from the form data

    return {
      title,
      image,
      cookingTime,
      method,
      category,
      uid,  // Include user ID in the returned data
    };
  } catch (error) {
    console.error("Error processing form data:", error);
    throw new Error("Failed to process form data");
  }
};

function Create() {
  const createAction = useActionData();
  const { data, addNewDoc } = useCreateRecipie();
  const [ingredients, setIngredients] = useState([]);
  const [ingredient, setIngredient] = useState("");
  const [category, setCategory] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false); // State to manage submit button disabled state
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.currentUser);  // Get the current user from Redux store

  const addIngredients = (e) => {
    e.preventDefault();
    if (!ingredients.includes(ingredient) && ingredient.trim() !== "") {
      setIngredients((prev) => [...prev, ingredient]);
      setIngredient("");
    }
  };

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  useEffect(() => {
    if (createAction && !data) {
      const newRecipe = {
        ...createAction,
        ingredients,
      };
      addNewDoc(newRecipe);
    }
    if (data) {
      navigate("/");
      toast.success("Added new recipe successfully");
      setIsSubmitting(false); // Enable submit button after successful submission
    }
  }, [createAction, data, navigate, ingredients, addNewDoc]);

  const handleSubmit = () => {
    setIsSubmitting(true); // Disable submit button when form is submitted
  };

  return (
    <div className="grid place-items-center">
      <div className="max-w-96 w-full">
        <h1 className="text-3xl text-center font-bold">Create New Recipe</h1>
        <Form method="post" onSubmit={handleSubmit}>
          <FormInput name="title" type="text" label="Title" />
          <div className="flex items-center gap-5">
            <label className="form-control w-full mb-3">
              <div className="label">
                <span className="label-text">Ingredient</span>
              </div>
              <input
                onChange={(e) => setIngredient(e.target.value)}
                type="text"
                name="ingredient"
                placeholder="Type here"
                className="input input-bordered w-full"
                value={ingredient}
              />
            </label>
            <button
              onClick={addIngredients}
              type="button"
              className="btn btn-secondary mt-6">
              Add
            </button>
          </div>
          <p className="mb-3 -mt-2">
            Ingredients:{" "}
            {ingredients.map((ing, index) => (
              <span key={index}>{ing}, </span>
            ))}
          </p>
          <FormInput name="cookingTime" type="number" label="Cooking time" />
          <FormInput name="image" type="url" label="Image" />
          <label className="text-sm mt-2">Category</label>
          <select
            name="category"
            onChange={handleCategoryChange}
            className="select select-bordered mt-3 w-full max-w-xl"
            value={category}>
            <option disabled value="">
              Food category?
            </option>
            <option value="milliyTaom">Milliy taomlar</option>
            <option value="fastFood">Fast food</option>
            <option value="turkTaom">Turk taomlar</option>
            <option value="yaponTaomi">Yapon taomlar</option>
            <option value="yevropaTaomi">Yevropa taomlar</option>
          </select>
          <FormInput name="method" type="text" label="Method" />
          <input type="hidden" name="uid" value={user.uid} />  {/* Add hidden input for user ID */}
          <div className="mt-5">
            <button
              className="btn btn-secondary w-full mb-3"
              type="submit"
              disabled={isSubmitting} // Disable button when form is submitting
            >
              {isSubmitting ? "Submitting..." : "Submit"} {/* Change button text to indicate submission */}
            </button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Create;
