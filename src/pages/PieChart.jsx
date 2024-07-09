import React, { useState, useEffect } from "react";
import ReactApexChart from "react-apexcharts";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

const PieChart = () => {
  const [series, setSeries] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipies"));
      const recipesData = querySnapshot.docs.map((doc) => doc.data());

      // Count the number of recipes in each category
      const categoryCounts = {};
      recipesData.forEach((recipe) => {
        const category = recipe.category; // Ensure 'category' matches the field name in your Firestore documents
        if (categoryCounts[category]) {
          categoryCounts[category]++;
        } else {
          categoryCounts[category] = 1;
        }
      });

      // Extract categories and their counts
      const categories = Object.keys(categoryCounts);
      const counts = Object.values(categoryCounts);

      setCategories(categories);
      setSeries(counts);
    };

    fetchRecipes();
  }, []);

  const options = {
    chart: {
      width: 580,
      type: "pie",
    },
    labels: categories,
    responsive: [
      {
        breakpoint: 1440,
        options: {
          chart: {
            width: 400,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  return (
    <div className="mb-10">
      <h2 className="font-bold text-lg">Foods categories statistic</h2>
      <div id="chart">
        <ReactApexChart
          options={options}
          series={series}
          type="pie"
          width={480}
        />
      </div>
      <div id="html-dist"></div>
    </div>
  );
};

export default PieChart;
