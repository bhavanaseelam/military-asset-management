import React from "react";
import Purchases from "./components/Purchases";
import Dashboard from "./components/Dashboard";

function App() {
  return (
    <div style={{
      fontFamily: "Arial",
      backgroundColor: "#f4f6f8",
      minHeight: "100vh",
      padding: "20px"
    }}>
      <h1 style={{
        textAlign: "center",
        color: "#2c3e50"
      }}>
        Military Asset Management System
      </h1>

      <div style={{
        display: "flex",
        justifyContent: "space-around",
        marginTop: "30px"
      }}>
        <div style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "45%"
        }}>
          <Purchases />
        </div>

        <div style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          boxShadow: "0 0 10px rgba(0,0,0,0.1)",
          width: "45%"
        }}>
          <Dashboard />
        </div>
      </div>
    </div>
  );
}

export default App;