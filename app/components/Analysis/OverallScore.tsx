import { Flat } from "@alptugidin/react-circular-progress-bar";
import React from "react";

export const OverallScore = ({ score }) => {
  return (
    <div className="overall-score">
      <h2>Overall Score</h2>
      <p>
      <div className="w-20 h-20  rounded-full">
            <Flat
              progress={score.toFixed(2)}
              range={{ from: 0, to: 100 }}
              sign={{ value: "%", position: "end" }}
              text={"Overall Score"}
              showMiniCircle={true}
              showValue={true}
              sx={{
                strokeColor: "#ff0000",
                barWidth: 2,
                bgStrokeColor: "#ffffff",
                bgColor: { value: "#000000", transparency: "20" },
                // shape: "full",
                strokeLinecap: "round",
                valueSize: 20,
                valueWeight: "bold",
                valueColor: "#000000",
                valueFamily: "Trebuchet MS",
                textSize: 13,
                textWeight: "bold",
                textColor: "#000000",
                textFamily: "Trebuchet MS",
                loadingTime: 1000,
                miniCircleColor: "#ff0000",
                miniCircleSize: 5,
                valueAnimation: true,
                intersectionEnabled: true,
              }}
            />
          </div>
        {/* {score.toFixed(2)}% */}
        </p>
    </div>
  );
};
