import { useState, useEffect } from "react";

function useDepartments() {
    const [departments, setDepartments] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);

    useEffect(() => {


        fetch("https://localhost:7068/api/Department")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setDepartments(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setLoading(false);
                }
            });


    }, []);


    return { departments, loading, error };
}

export default useDepartments;
