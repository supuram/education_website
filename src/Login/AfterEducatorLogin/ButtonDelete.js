import React from "react";

export default function ButtonDelete({ count, onClick }) {
    return (
      <button onClick={onClick}>
        {count} 
      </button>
    );
  }