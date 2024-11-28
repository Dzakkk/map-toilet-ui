import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const MapComponent = ({ toilets }) => {
    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [userLocation, setUserLocation] = useState(null);

    useEffect(() => {
        // Inisialisasi peta hanya sekali
        if (mapRef.current === null && mapContainerRef.current) {
            mapRef.current = L.map(mapContainerRef.current, {
                center: [-6.857841, 107.554097], // Koordinat default
                zoom: 12,
                layers: [
                    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                        attribution: '© OpenStreetMap contributors'
                    })
                ]
            });
        }

        // Menampilkan marker untuk setiap toilet yang diambil dari props
        toilets.forEach(toilet => {
            const { latitude, longitude, place, review } = toilet;
            L.marker([latitude, longitude]).addTo(mapRef.current)
                .bindPopup(`<b>${place}</b><br/>${review}`);
        });

        // Gunakan Geolocation API untuk mendapatkan lokasi pengguna
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                const { latitude, longitude } = position.coords;
                setUserLocation([latitude, longitude]);

                // Update tampilan peta untuk memusatkan ke lokasi pengguna
                mapRef.current.setView([latitude, longitude], 14);

                // Tambahkan marker untuk lokasi pengguna
                L.marker([latitude, longitude], { title: 'Your location' })
                    .addTo(mapRef.current)
                    .bindPopup('<b>You are here!</b>')
                    .openPopup();
            }, () => {
                console.error("Lokasi tidak dapat ditemukan.");
            });
        } else {
            console.error("Geolocation API tidak didukung di browser ini.");
        }

        // Membersihkan peta saat komponen di-unmount
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, [toilets]);

    return (
        <div
            ref={mapContainerRef}
            style={{
                height: '500px', // Atur tinggi peta
                width: '100%',   // Atur lebar peta
                position: 'relative',
            }}
        ></div>
    );
};

export default MapComponent;
