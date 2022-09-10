import { Chart, ArcElement } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import {} from "@material-tailwind/react";
import Label from "../components/Label";

Chart.register(ArcElement);

export default function Graph({ dataObj, config }) {
  const total = dataObj.reduce((acc, curr) => acc + curr.amount, 0);
  return (
    <div className="flex justify-content max-w-xs mx-auto">
      <div className="item">
        <div className="chart relative">
          {config && <Doughnut {...config}></Doughnut>}
          <h3 variant="h3" className="mb-4 text-center font-bold title">
            Total{" "}
            <span className="block text-3xl text-emerald-400">${total}</span>
          </h3>
        </div>
        <div className="flex flex-col py-10 gap-4">
          {dataObj && <Label obj={dataObj} />}
        </div>
      </div>
    </div>
  );
}
