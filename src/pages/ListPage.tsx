import React, { useState, useEffect } from 'react';
import RunCard from '../components/RunCard';
import { Run } from '../types';
import { runs as sampleData } from '../data/runs';
import { useNavigate } from 'react-router-dom';

const ListPage: React.FC = () => {
  const [runs, setRuns] = useState<Run[]>([]);  // All runs data
  const [displayedRuns, setDisplayedRuns] = useState<Run[]>([]);  // Runs being displayed
  const [page, setPage] = useState(1);  // Track the current page
  const [loading, setLoading] = useState<boolean>(false);  // Loading state to show loading indicator
  const navigate = useNavigate();

    // // Sample data (replace with actual JSON data if needed)
    // const sampleData: Run[] = Array.from({ length: 50 }, (_, i) => ({
    //     id: i + 1,
    //     name: `Run ${i + 1}`,
    //     status: ['Success', 'Failed', 'In Progress'][i % 3],
    //     date: new Date().toISOString(),
    //     description: `Description for Run ${i + 1}`,
    //     duration: (i + 1) * 5,
    //   }));
    
      useEffect(() => {
        // Load initial data
        setRuns(sampleData);
        setDisplayedRuns(sampleData.slice(0, 12));
      }, []);
    
      const loadMore = () => {
        setDisplayedRuns((prevDisplayedRuns) => [
          ...prevDisplayedRuns,
          ...runs.slice(prevDisplayedRuns.length, prevDisplayedRuns.length + 10),
        ]);
        setPage((prevPage) => prevPage + 1);
      };
    
      // Infinite scroll handler
      useEffect(() => {
        const handleScroll = () => {
          if (
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 500 &&
            displayedRuns.length < runs.length
          ) {
            loadMore();
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
      }, [displayedRuns, runs]);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Runs</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {displayedRuns.map((run) => (
          <RunCard
            key={run.id}
            run={run}
            onClick={() => navigate(`/run/${run.id}`)}
          />
        ))}
      </div>

      {/* Loading Indicator */}
      {loading && (
        <div className="text-center mt-4">
          <span>Loading more runs...</span>
        </div>
      )}
    </div>
  );
};

export default ListPage;
