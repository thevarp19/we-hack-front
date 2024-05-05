"use client";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";
import { Button } from "antd";
import { useCallback, useState } from "react";

interface Location {
    lat: number;
    lng: number;
}

const containerStyle = {
    width: "100vw",
    height: "100vh",
};

interface MapComponentProps {
    apiKey: string;
}

const MapComponent: React.FC<MapComponentProps> = ({ apiKey }) => {
    const [isOk, setIsOk] = useState(false);
    const [duration, setDuration] = useState<string>("");
    const [center, setCenter] = useState<Location>({
        lat: -3.745,
        lng: -38.523,
    });
    const fetchDirections = useCallback((origin: Location) => {
        setCenter(origin);
        setIsOk(true);
    }, []);

    const kaskelenLocation = {
        lat: 43.2077,
        lng: 76.669,
    };
    // useEffect(() => {
    //     handleFetch();
    // }, [fetchDirections]);

    return (
        <div>
            <div className="px-4 flex items-center gap-4">
                <Button
                    onClick={() => {
                        fetchDirections(kaskelenLocation);
                    }}
                    type="primary"
                    className="my-2"
                >
                    Найти маршрут
                </Button>
                <div className="text-xl font-semibold">
                    Длительность маршрута:{" "}
                    <span className="text-blue-700">{15} минут</span>
                </div>
            </div>
            <LoadScript googleMapsApiKey={apiKey}>
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={isOk ? 15 : 10}
                >
                    {isOk && (
                        <Marker position={center} label={"Your location"} />
                    )}
                </GoogleMap>
            </LoadScript>
        </div>
    );
};

export default function MapPage({}) {
    return <MapComponent apiKey={`${process.env.NEXT_PUBLIC_MAP_KEY}`} />;
}
