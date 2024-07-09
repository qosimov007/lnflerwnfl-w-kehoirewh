import React from "react";
import { useSelector } from "react-redux";
import { useCollection } from "../hooks/useCollection";
import RecipiesList from "../components/RecipiesList";

function Home() {
  const { user } = useSelector((state) => state.currentUser);

  // Check if user is logged in
  if (!user) {
    return (
      <div className="loading w-10 mx-auto mt-40 items-center justify-center flex object-cover">
        Loading user information...
      </div>
    );
  }

  const { data: recipies, error, isLoading } = useCollection('recipie', ["uid", "==", user.uid]);

  // Handle loading state
  if (isLoading) {
    return (
      <div className="loading w-10 mx-auto mt-40 items-center justify-center flex object-cover">
        Loading recipes...
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="error w-10 mx-auto mt-40 items-center justify-center flex object-cover">
        Error fetching recipes: {error.message}
      </div>
    );
  }

  // Render recipes or no recipes message
  return (
    <div>
      {recipies && recipies.length > 0 ? (
        <h1 className="text-2xl mt-2 mb-7 ">
          All Recipes - {recipies.length}
        </h1>
      ) : (
        <h1 className="loading w-10 mx-auto mt-40 items-center justify-center flex object-cover">
          No Recipes yet
        </h1>
      )}
      {recipies && <RecipiesList recipes={recipies} />}
    </div>
  );
}

export default Home;
