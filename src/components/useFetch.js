import {useEffect, useState} from "react";
import api from "../api";

export default function useFetch(url) {
    const [ data, setData ] = useState();
    const [ loading, setLoading ] = useState(true);

    useEffect(function() {
        setLoading(true);

        api(url)
            .then(function(data) {
                setData(data);
            })
            .finally(function() {
                setLoading(false);
            });
    }, [url, setData, setLoading]);

    return [ data, loading ];
}