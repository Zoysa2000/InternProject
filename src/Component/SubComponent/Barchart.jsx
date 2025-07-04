import React from 'react';
import { Chart } from "react-google-charts";

const Barchart = ({ hr = 0, it = 0, finance = 0, sales = 0 }) => {
    const data = [
        ["Label", "HR", "IT", "Finance", "Sales"],
        ["Employees", hr, it, finance, sales],
    ];

    const options = {
        chart: {
            title: "Employee Distribution",
            subtitle: "Number of Employees per Department",
        },
        bars: "horizontal",
        colors: ["#4285F4", "#DB4437", "#F4B400", "#0F9D58"],
        chartArea: { width: "70%", height: "60%" }, // reduce height of chart area
        legend: { position: "top", alignment: "center" },
        isStacked: false,

    };

    return (
        <Chart
            chartType="Bar"
            width="100%"
            height="300px"    // lower total height too
            data={data}
            options={options}
        />
    );
};

export default Barchart;
