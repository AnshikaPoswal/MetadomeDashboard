import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { runs } from '../data/runs';

const DetailsPage: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const run = runs.find((r) => r.id === Number(id));
  const [color, setColor] = useState<string>('green');

  // If the run is not found, display an error message
  if (!run) {
    return <p>Run not found</p>;
  }

  // Handle color change to dynamically change 3D text color
  const handleColorChange = (newColor: string) => {
    setColor(newColor);
    
  };

  return (
    <div className="container mx-auto p-6">
      {/* Button to navigate back to the ListPage (main tasks page) */}
      <button
        onClick={() => navigate('/')} // Navigate to the list page
        className="mb-4 bg-blue-500 text-white p-2 rounded-md"
      >
        Back to Run
      </button>

      {/* Main Content for Details Page */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold">{run.name}</h1>
        <p><strong>Status:</strong> {run.status}</p>
        <p><strong>Date:</strong> {run.date}</p>
        <p><strong>Description:</strong> {run.description}</p>
        <p><strong>Duration:</strong> {run.duration} minutes</p>

        {/* Back button (navigates one step back in browser history) */}
        <button
          onClick={() => navigate(-1)} // Go back one step in browser history
          className="mt-4 bg-gray-500 text-white p-2 rounded-md"
        >
          Back to previous Animation
        </button>

        {/* Color buttons to trigger color change */}
        <div className="mt-4">
          <button
            onClick={() => handleColorChange('green')}
            className="mr-2 p-2 bg-green-500 text-white rounded-md"
          >
            Green
          </button>
          <button
            onClick={() => handleColorChange('yellow')}
            className="mr-2 p-2 bg-yellow-500 text-white rounded-md"
          >
            Yellow
          </button>
          <button
            onClick={() => handleColorChange('red')}
            className="p-2 bg-red-500 text-white rounded-md"
          >
            Red
          </button>
        </div>

        {/* The iframe that displays 3D text (using Babylon.js) */}
        <iframe
          src={`/3d-view.html?color=${color}&text=${run.name}`}
          style={{ width: '100%', height: '500px', border: 'none' }}
        ></iframe>
      </div>
    </div>
  );
};

export default DetailsPage;
