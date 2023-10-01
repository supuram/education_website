import React from "react";

export default function ButtonAdd({ count, onClick }) {
    return (
      <button onClick={onClick}>
        {count} 
      </button>
    );
  }