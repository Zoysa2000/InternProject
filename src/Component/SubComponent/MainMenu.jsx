import { useState, useEffect } from "react";

export function useMainMenu() {
    const [mainmenu, setMainMenu] = useState([]);
    const [loading, setLoading]       = useState(true);
    const [error, setError]           = useState(null);

    useEffect(() => {


        fetch("https://localhost:7068/api/MainMenu")
            .then((res) => {
                if (!res.ok) throw new Error(`HTTP ${res.status}`);
                return res.json();
            })
            .then((data) => {
                setMainMenu(data);
                setLoading(false);
            })
            .catch((err) => {
                if (err.name !== "AbortError") {
                    setError(err.message);
                    setLoading(false);
                }
            });
}, []);


    return { mainmenu, loading, error };
}