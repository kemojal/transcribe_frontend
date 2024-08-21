import React from "react";
import { Flat, Heat, Nested } from "@alptugidin/react-circular-progress-bar";

export const MetricsEvaluation = ({ metrics }) => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-xl font-bold border-b-[1px] border-gray-200 pb-2">Metrics Evaluation</h2>
      <ul className="flex flex-wrap items-center gap-4">
        <li className="flex gap-2 items-center text-sm ">
          {/* <strong>Shareability:</strong> */}
          <div className="w-20 h-20  rounded-full">
            <Flat
              progress={metrics.shareability}
              range={{ from: 0, to: 100 }}
              sign={{ value: "%", position: "end" }}
              text={"Shareability"}
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

          {/* {metrics.shareability}% */}
        </li>
        <li>
          {/* <strong>Clickability:</strong> {metrics.clickability}% */}
          <div className="w-20 h-20  rounded-full">
            <Flat
              progress={metrics.clickability}
              range={{ from: 0, to: 100 }}
              sign={{ value: "%", position: "end" }}
              text={"clickability"}
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
        </li>
        <li>
          {/* <strong>Virality:</strong> {metrics.virality}% */}
          <div className="w-20 h-20  rounded-full">
            <Flat
              progress={metrics.virality}
              range={{ from: 0, to: 100 }}
              sign={{ value: "%", position: "end" }}
              text={"virality"}
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
        </li>
        <li>
          {/* <strong>Engagement:</strong> {metrics.engagement}% */}
          <div className="w-20 h-20  rounded-full">
            <Flat
              progress={metrics.engagement}
              range={{ from: 0, to: 100 }}
              sign={{ value: "%", position: "end" }}
              text={"engagement"}
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
        </li>
      </ul>
    </div>
  );
};
