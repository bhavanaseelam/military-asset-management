import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:5000/get")
      .then(res => setData(res.data))
      .catch(err => console.log(err));
  }, []);

  // TOTAL ASSETS
  const totalAssets = data.length;

  // TOTAL QUANTITY
  const totalQuantity = data.reduce((sum, item) => sum + item.quantity, 0);

  // GROUP BY BASE
  const baseData = {};
  data.forEach(item => {
    if (baseData[item.base]) {
      baseData[item.base] += item.quantity;
    } else {
      baseData[item.base] = item.quantity;
    }
  });

  return (
    <div style={{ marginTop: "30px" }}>
      <h2>Dashboard</h2>

      <p><b>Total Assets:</b> {totalAssets}</p>
      <p><b>Total Quantity:</b> {totalQuantity}</p>

      <h3>Assets per Base</h3>
      {Object.keys(baseData).map((base, index) => (
        <p key={index}>
          {base} : {baseData[base]}
        </p>
      ))}
    </div>
  );
}

export default Dashboard;