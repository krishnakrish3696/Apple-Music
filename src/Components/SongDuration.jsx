import React, { useState, useEffect } from 'react';

const SongDurationComponent = ({ audioUrl }) => {
  const [duration, setDuration] = useState(null);

  useEffect(() => {
    const audioElement = new Audio(audioUrl);
    audioElement.addEventListener('loadedmetadata', () => {
      setDuration(audioElement.duration);
    });
    return () => {
      audioElement.removeEventListener('loadedmetadata', () => {});
    };
  }, [audioUrl]);

  return (
    <div>
      {duration != null ? (
        <p>{Math.floor(duration)} seconds</p>
      ) : (
        <p>Loading duration...</p>
      )}
    </div>
  );
};

export default SongDurationComponent;
