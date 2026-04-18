import React, { useState } from "react";
import Layout from "../Layout/Layout";

const API_KEY = "K24eycEZLdVlKugLWCm9eon9K6GaWuUxUxi9OrzV";

const FoodInfo = () => {
  const [query, setQuery] = useState("");
  const [food, setFood] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchFood = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&dataType=Foundation,SR%20Legacy&pageSize=1&api_key=${API_KEY}`
      );

      const data = await res.json();

      if (!data.foods || data.foods.length === 0) {
        alert("No food found");
        setFood(null);
      } else {
        setFood(data.foods[0]);
      }
    } catch (err) {
      console.error(err);
      alert("Error fetching data");
    }

    setLoading(false);
  };

  // 🔍 Extract nutrient
  const getNutrient = (name) => {
    const n = food?.foodNutrients?.find((nut) =>
      nut.nutrientName.toLowerCase().includes(name)
    );
    return n ? `${n.value} ${n.unitName}` : "N/A";
  };

  return (
    <Layout>
        <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">
        🍎 Food Nutrition Info
      </h1>

      {/* SEARCH */}
      <div className="flex gap-3 max-w-xl mx-auto mb-8">
        <input
          className="flex-1 p-3 rounded-xl border focus:outline-none focus:ring-2 focus:ring-green-400"
          placeholder="Search food (banana, rice, chicken)"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && fetchFood()}
        />

        <button
          onClick={fetchFood}
          className="bg-green-500 text-white px-6 rounded-xl hover:bg-green-600"
        >
          {loading ? "..." : "Search"}
        </button>
      </div>

      {/* RESULT */}
      {food && (
        <div className="max-w-xl mx-auto bg-white p-6 rounded-2xl shadow">
          <h2 className="text-xl font-bold mb-4 capitalize">
            {food.description}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-blue-100 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Calories</p>
              <p className="text-xl font-bold">
                {getNutrient("energy")}
              </p>
            </div>

            <div className="bg-orange-100 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Protein</p>
              <p className="text-xl font-bold">
                {getNutrient("protein")}
              </p>
            </div>

            <div className="bg-yellow-100 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Carbs</p>
              <p className="text-xl font-bold">
                {getNutrient("carbohydrate")}
              </p>
            </div>

            <div className="bg-red-100 p-4 rounded-xl text-center">
              <p className="text-sm text-gray-500">Fat</p>
              <p className="text-xl font-bold">
                {getNutrient("fat")}
              </p>
            </div>
          </div>

          <p className="text-xs text-gray-400 mt-4">
            Values are per 100g (approx)
          </p>
        </div>
      )}
    </div>
    </Layout>
  );
};

export default FoodInfo;