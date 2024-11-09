import React from 'react';
import { Run } from '../types';

interface RunCardProps {
  run: Run;
  onClick: () => void;
}

const RunCard: React.FC<RunCardProps> = ({ run, onClick }) => {
  // Determine the border color based on the status
  const borderColor =
    run.status === 'Success'
      ? 'border-green-500'
      : run.status === 'Failed'
      ? 'border-red-500'
      : 'border-yellow-500';

  return (
    <div
      onClick={onClick}
      className={`border-2 mb-4 ${borderColor} p-10 rounded-lg shadow-md hover:shadow-lg cursor-pointer transition-all duration-300`}
    >
      <h2 className="text-xl font-semibold mb-2">{run.name}</h2>
      <p className="text-gray-600">Status: {run.status}</p>
      <p className="text-gray-600">Date: {new Date(run.date).toLocaleDateString()}</p>
      <p className="text-gray-600">Duration: {run.duration} minutes</p>
    </div>
  );
};

export default RunCard;
