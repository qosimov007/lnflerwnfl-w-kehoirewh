import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const BarChart = () => {
  const [options, setOptions] = useState({
    chart: {
      id: "basic-bar",
    },
    xaxis: {
      categories: [],
    },
  });

  const [series, setSeries] = useState([
    {
      name: "Cooking Time",
      data: [],
    },
  ]);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "recipies"));
        const recipesData = querySnapshot.docs.map((doc) => doc.data());

        // Log fetched data for debugging
        console.log("Fetched recipes data:", recipesData);

        // Ensure data is correctly fetched and processed
        if (recipesData.length > 0) {
          const categories = recipesData.map(
            (recipe) => recipe.title || "Unnamed Recipe"
          );
          const cookingTimes = recipesData.map(
            (recipe) => recipe.cookingTime + "minutes"
          );

          // Log processed data for debugging
          console.log("Processed categories:", categories);
          console.log("Processed cooking times:", cookingTimes);

          setOptions((prevOptions) => ({
            ...prevOptions,
            xaxis: {
              categories: categories,
            },
          }));

          setSeries([
            {
              name: "Cooking Time",
              data: cookingTimes,
            },
          ]);
        } else {
          console.error("No data found in the recipes collection.");
        }
      } catch (error) {
        console.error("Error fetching recipes data:", error);
      }
    };

    fetchRecipes();
  }, []);

  return (
    <div className="app">
      <h2 className="font-bold">Cooking times statistic, (in minutes)</h2>
      <div className="row">
        <div className="mixed-chart">
          <Chart options={options} series={series} type="bar" width="480" />
        </div>
      </div>
    </div>
  );
};

export default BarChart;
