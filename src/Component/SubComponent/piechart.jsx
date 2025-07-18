
import { Chart } from "react-google-charts";

const Piechart = ({hr,it,finance,sales}) => {

    const data = [
        ["Department", "Employees"],
        ["HR", hr],
        ["IT", it],
        ["Finance", finance],
        ["Sales", sales],
    ];

    const options = {
title: "Departments Distribution of Employees",
titleTextStyle: {
    color: "#808080",    
    fontSize: 16,        
         
  },
        pieHole: 0.4, 
        legend: { position: "right" },
        chartArea: { width: "90%", height: "80%" },
    };

    return (
        <Chart
            chartType="PieChart"
            data={data}
            options={options}
            width={"100%"}
            height={"400px"}
        />
    );
};

export default Piechart;