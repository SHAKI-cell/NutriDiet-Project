import React, { useEffect, useState } from "react";

const DashBoard = () => {
  const [dietPlans, setDietPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchDietPlans = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dietplans");
      const data = await res.json();
      setDietPlans(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching diet plans:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDietPlans();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>🍽️ Your Diet Dashboard</h2>

      {loading ? (
        <p>Loading diet plans...</p>
      ) : dietPlans.length === 0 ? (
        <p>No diet plans added yet.</p>
      ) : (
        <div style={{ display: "grid", gap: "15px" }}>
          {dietPlans.map((plan) => (
            <div
              key={plan._id}
              style={{
                padding: "15px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              }}
            >
              <h3>{plan.foodName}</h3>

              <p><b>Calories:</b> {plan.calories}</p>
              <p><b>Protein:</b> {plan.protein}g</p>
              <p><b>Carbs:</b> {plan.carbs}g</p>
              <p><b>Fats:</b> {plan.fats}g</p>
              <p><b>Time:</b> {plan.mealTime}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default DashBoard;