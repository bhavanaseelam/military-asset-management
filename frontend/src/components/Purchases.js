import React, { useState, useEffect } from "react";
import axios from "axios";

function Purchases() {
  const [assetName, setAssetName] = useState("");
  const [base, setBase] = useState("");
  const [quantity, setQuantity] = useState("");
  const [data, setData] = useState([]);
  const [editId, setEditId] = useState(null);

  // ✅ GET DATA
  const getData = async () => {
    try {
      const res = await axios.get("http://localhost:5000/get");
      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  // ✅ ADD OR UPDATE
  const addOrUpdateData = async () => {
    try {
      if (editId) {
        // UPDATE
        await axios.put(`http://localhost:5000/update/${editId}`, {
          assetName,
          base,
          quantity,
        });
        setEditId(null);
      } else {
        // ADD
        await axios.post("http://localhost:5000/add", {
          assetName,
          base,
          quantity,
        });
      }

      // CLEAR INPUTS
      setAssetName("");
      setBase("");
      setQuantity("");

      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ DELETE
  const deleteData = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/delete/${id}`);
      getData();
    } catch (error) {
      console.log(error);
    }
  };

  // ✅ EDIT (LOAD INTO INPUTS)
  const editData = (item) => {
    setAssetName(item.assetName);
    setBase(item.base);
    setQuantity(item.quantity);
    setEditId(item._id);
  };

  return (
    <div>
      <h2>Purchases</h2>

      {/* INPUT SECTION */}
      <div style={{ marginBottom: "15px" }}>
        <input
          placeholder="Asset Name"
          value={assetName}
          onChange={(e) => setAssetName(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          placeholder="Base"
          value={base}
          onChange={(e) => setBase(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <input
          placeholder="Quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
          style={{ marginRight: "10px", padding: "8px" }}
        />

        <button
          onClick={addOrUpdateData}
          style={{
            padding: "8px 15px",
            backgroundColor: "#3498db",
            color: "white",
            border: "none",
            borderRadius: "5px",
          }}
        >
          {editId ? "Update" : "Add"}
        </button>
      </div>

      {/* DISPLAY DATA */}
      {data.map((item) => (
        <div
          key={item._id}
          style={{
            marginBottom: "10px",
            padding: "10px",
            backgroundColor: "#ecf0f1",
            borderRadius: "5px",
          }}
        >
          {item.assetName} - {item.base} - {item.quantity}

          <button
            onClick={() => editData(item)}
            style={{ marginLeft: "10px" }}
          >
            Edit
          </button>

          <button
            onClick={() => deleteData(item._id)}
            style={{
              marginLeft: "10px",
              color: "white",
              backgroundColor: "red",
              border: "none",
              padding: "5px 10px",
              borderRadius: "5px",
            }}
          >
            Delete
          </button>
        </div>
      ))}
    </div>
  );
}

export default Purchases;