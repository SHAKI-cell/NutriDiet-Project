import React, { useState, useEffect } from "react";
import Layout from "../Layout/Layout";

const API_KEY = "K24eycEZLdVlKugLWCm9eon9K6GaWuUxUxi9OrzV";

const DietPlan = () => {
  const [query, setQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [dietList, setDietList] = useState([]);
  const [loading, setLoading] = useState(false);

  // ✅ LOAD FROM LOCAL STORAGE
  useEffect(() => {
    const saved = localStorage.getItem("dietList");
    if (saved) {
      setDietList(JSON.parse(saved));
    }
  }, []);

  // ✅ SAVE TO LOCAL STORAGE
  useEffect(() => {
    localStorage.setItem("dietList", JSON.stringify(dietList));
  }, [dietList]);

  // 🔍 FETCH FOOD
  const fetchFood = async () => {
    if (!query.trim()) return;

    setLoading(true);
    try {
      const res = await fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?query=${query}&dataType=Foundation,SR%20Legacy&pageSize=1&api_key=${API_KEY}`
      );

      const data = await res.json();

      if (!data.foods || data.foods.length === 0) {
        alert("No food found. Try 'banana' or 'chicken'");
        setSearchResult(null);
      } else {
        setSearchResult(data.foods[0]);
      }
    } catch (err) {
      console.error(err);
      alert("API error");
    }
    setLoading(false);
  };

  // 📊 GET NUTRIENT
  const getNutrient = (food, name) => {
    const n = food.foodNutrients?.find((nut) =>
      nut.nutrientName.toLowerCase().includes(name)
    );
    return n ? n.value : 0;
  };

  // ➕ ADD ITEM (WITH TIME)
  const addToPlan = () => {
    if (!searchResult) return;

    const exists = dietList.find(
      (item) => item.id === searchResult.fdcId
    );

    if (exists) {
      alert("Already added!");
      return;
    }

    const item = {
      id: searchResult.fdcId,
      name: searchResult.description,
      calories: getNutrient(searchResult, "energy"),
      protein: getNutrient(searchResult, "protein"),
      time: new Date().toLocaleString(), // ✅ time added
    };

    setDietList((prev) => [...prev, item]);
  };

  // ❌ REMOVE
  const removeItem = (id) => {
    setDietList((prev) => prev.filter((item) => item.id !== id));
  };

  // 📊 TOTALS
  const totalCalories = dietList.reduce((sum, i) => sum + i.calories, 0);
  const totalProtein = dietList.reduce((sum, i) => sum + i.protein, 0);

  return (
    <Layout>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-3xl font-bold text-center mb-6 text-green-600">
          🍽️ Diet Planner
        </h1>

        {/* SEARCH */}
        <div className="flex gap-2 max-w-xl mx-auto mb-6">
          <input
            className="flex-1 border p-2 rounded"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search food (banana, chicken)"
            onKeyDown={(e) => e.key === "Enter" && fetchFood()}
          />
          <button
            onClick={fetchFood}
            className="bg-green-500 text-white px-4 rounded"
          >
            {loading ? "..." : "Search"}
          </button>
        </div>

        <div className="grid md:grid-cols-2 gap-6">

          {/* LEFT */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">Search Result</h2>

            {searchResult ? (
              <>
                <h3 className="font-semibold">{searchResult.description}</h3>
                <p>🔥 {getNutrient(searchResult, "energy")} kcal</p>
                <p>💪 {getNutrient(searchResult, "protein")} g</p>

                <button
                  onClick={addToPlan}
                  className="mt-3 bg-green-500 text-white px-3 py-1 rounded"
                >
                  Add
                </button>
              </>
            ) : (
              <p className="text-gray-400">Search something...</p>
            )}
          </div>

          {/* RIGHT */}
          <div className="bg-white p-4 rounded shadow">
            <h2 className="font-bold mb-2">My Diet</h2>

            {dietList.length === 0 && (
              <p className="text-gray-400">No items added</p>
            )}

            {dietList.map((item) => (
              <div
                key={item.id}
                className="flex justify-between border-b py-2"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm">
                    🔥 {item.calories} | 💪 {item.protein}
                  </p>
                  <p className="text-xs text-gray-400">
                    ⏱ {item.time}
                  </p>
                </div>

                <button
                  onClick={() => removeItem(item.id)}
                  className="text-red-500"
                >
                  ✕
                </button>
              </div>
            ))}

            {/* TOTAL */}
            {dietList.length > 0 && (
              <div className="mt-4 border-t pt-2 font-bold">
                <p>Total Calories: {totalCalories}</p>
                <p>Total Protein: {totalProtein}</p>
              </div>
            )}
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default DietPlan;