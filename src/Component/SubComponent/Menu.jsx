
import { useState, useEffect } from "react";

export function useMenu() {
    const [menu, setMenu] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);

    useEffect(() => {


        fetch("https://localhost:7068/api/Manage")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setMenu(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setLoading(false);
                }
            });
}, []);


    return { menu, loading, error };
}
