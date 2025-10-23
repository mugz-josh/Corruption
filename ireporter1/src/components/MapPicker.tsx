import React from 'react';

export interface MapPickerProps {
  lat: number;
  lng: number;
  onLocationChange: (lat: number, lng: number) => void;
}

const MapPicker: React.FC<MapPickerProps> = ({ lat, lng, onLocationChange }) => {
  return (
    <div>
      <p>Latitude: {lat}, Longitude: {lng}</p>
      {/* Example interaction */}
      <button onClick={() => onLocationChange(lat + 0.001, lng + 0.001)}>
        Move Slightly
      </button>
    </div>
  );
};

export default MapPicker;
