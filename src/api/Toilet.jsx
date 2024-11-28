import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MapComponent from './../components/MapComponent';

const ToiletMap = () => {
    const [toilets, setToilets] = useState([]);

    useEffect(() => {
        axios.get('https://toilet-map-api.vercel.app/api/toilets')
            .then(response => setToilets(response.data))
            .catch(error => console.error('Error fetching data:', error));
    }, []);

    return <MapComponent toilets={toilets} />;
};

export default ToiletMap;
