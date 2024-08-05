import React from "react";

export const OverallScore = ({ score }) => {
  return (
    <div className="overall-score">
      <h2>Overall Score</h2>
      <p>{score.toFixed(2)}%</p>
    </div>
  );
};
