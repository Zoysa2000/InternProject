import React, {useState} from 'react';
import Piechart from "./SubComponent/piechart";

import {useEffect} from "react";

import Pdf from './SubComponent/Pdf';


function Chart()  {
    const [count, setCount] = useState(null);
    const [countIT, setCountIT] = useState(null)
    const [countHR, setCountHR] = useState(null)
    const [countFinance, setCountFinance] = useState(null)
    const [countSales, setCountSales] = useState(null)
    const [error,setError]= useState(null)
    const [employees, setEmployees] = useState([]);

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
        <div >

            
            <div className="grid grid-cols-1 gap-4 p-4 md:grid-cols-2">
             
                 <div className="p-6 bg-white shadow-xl rounded-xl ring-1 ring-gray-300">
             
                    <dl>
                        <dt className="pb-1 text-base font-normal text-gray-800">Number of Total Employee</dt>
                        <dd className="p-5 text-3xl font-bold leading-none text-white bg-gray-600">{count} Employees</dd>
                    </dl>
                   <div className="flex p-6 py-3 mt-5 mb-3 space-x-20 bg-gray-800 ">

                    <div className="grid grid-cols-2 space-x-10">
                        <dl>
                            <dt className="pb-1 text-base font-normal text-white">HR</dt>
                            <dd className="text-3xl font-bold leading-none text-[#4285F4] ">{countHR} </dd>
                        </dl>
                        <dl>
                            <dt className="pb-1 text-base font-normal text-white">IT</dt>
                            <dd className="text-3xl font-bold leading-none text-red-600 dark:text-red-500">{countIT} </dd>
                        </dl>
                    </div>


                    <div className="grid grid-cols-2 space-x-10">
                        <dl>
                            <dt className="pb-1 text-base font-normal text-white">Sales</dt>
                            <dd className="text-3xl font-bold leading-none text-[#F4B400]">{countSales} </dd>
                        </dl>
                        <dl>
                            <dt className="pb-1 text-base font-normal text-white">Finance</dt>
                            <dd className="text-3xl font-bold leading-none text-[#0F9D58]">{countFinance} </dd>
                        </dl>
                    </div>
                </div>

            </div>
             <div className="p-4 bg-white shadow-xl rounded-xl ring-1 ring-gray-300">
                    <Piechart
                        hr={countHR}
                        it={countIT}
                        finance={countFinance}
                        sales={countSales}/>
                </div>

                </div>

                <div className='mt-5 '>
 <Pdf   />
                </div>

               
            </div>

    );
};

export default Chart;