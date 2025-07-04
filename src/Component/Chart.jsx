import React, {useState} from 'react';
import Piechart from "./SubComponent/piechart";
import Barchart from "./SubComponent/Barchart";
import {useEffect} from "react";

function Chart()  {
    const [count, setCount] = useState(null);
    const [countIT, setCountIT] = useState(null)
    const [countHR, setCountHR] = useState(null)
    const [countFinance, setCountFinance] = useState(null)
    const [countSales, setCountSales] = useState(null)
    const [error,setError]= useState(null)

    useEffect(() => {

        fetch("https://localhost:7068/api/count/employeeCount")
            .then(res => res.json())
            .then(data => setCount(data.count))
            .catch(err => setError("Failed to fetch employee count"));


        fetch("https://localhost:7068/api/Count/employeeCountIT")
            .then(res => res.json())
            .then(data => setCountIT(data.count))
            .catch(err => setError("Failed to fetch department count"));


        fetch("https://localhost:7068/api/Count/employeeCountHR")
            .then(res => res.json())
            .then(data => setCountHR(data.count))
            .catch(err => setError("Failed to fetch project count"));


        fetch("https://localhost:7068/api/Count/employeeCountFinance")
            .then(res => res.json())
            .then(data => setCountFinance(data.count))
            .catch(err => setError("Failed to fetch vacancy count"));


        fetch("https://localhost:7068/api/Count/employeeCountSales")
            .then(res => res.json())
            .then(data => setCountSales(data.count))
            .catch(err => setError("Failed to fetch vacancy count"));
    }, []);

    return (
        <div>

            <div className=" w-full sm:w-1/2 rounded-lg shadow-sm bg-gray-800 p-4 md:p-6">
                <div className="flex justify-between border-gray-200 border-b dark:border-gray-700 pb-3">
                    <dl>
                        <dt className="text-base font-normal text-gray-400 pb-1">Total Employee</dt>
                        <dd className="leading-none text-3xl font-bold text-white">{count} Employees</dd>
                    </dl>
                    <div>

                    </div>
                </div>


                <div className="flex space-x-20 py-3">

                    <div className="grid grid-cols-2 space-x-10">
                        <dl>
                            <dt className="text-base font-normal text-white pb-1">HR</dt>
                            <dd className="leading-none text-2xl font-bold text-green-500 dark:text-green-400">{countHR} </dd>
                        </dl>
                        <dl>
                            <dt className="text-base font-normal text-white pb-1">IT</dt>
                            <dd className="leading-none text-2xl font-bold text-red-600 dark:text-red-500">{countIT} </dd>
                        </dl>
                    </div>


                    <div className="grid grid-cols-2 space-x-10">
                        <dl>
                            <dt className="text-base font-normal text-white pb-1">Sales</dt>
                            <dd className="leading-none text-2xl font-bold text-green-500 dark:text-green-400">{countSales} </dd>
                        </dl>
                        <dl>
                            <dt className="text-base font-normal text-white pb-1">Finance</dt>
                            <dd className="leading-none text-2xl font-bold text-red-600 dark:text-red-500">{countFinance} </dd>
                        </dl>
                    </div>
                </div>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 mt-3">
                <div className="bg-white rounded-xl shadow-xl ring-1 ring-gray-300 p-4">
                    <Piechart
                        hr={countHR}
                        it={countIT}
                        finance={countFinance}
                        sales={countSales}/>
                </div>
                <div className="bg-white rounded-xl shadow-xl ring-1 ring-gray-300 p-4">
                    <Barchart
                        hr={countHR}
                        it={countIT}
                        finance={countFinance}
                        sales={countSales}/>
                </div>
            </div>

        </div>
    );
};

export default Chart;