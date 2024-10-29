import React, { useState } from 'react';
import { socket } from '../utils';

export function MyForm() {
  const [value, setValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  function onSubmit(event) {
    event.preventDefault();
    setIsLoading(true);

    socket.timeout(2000).emit('events', value, (err, response) => {
      if (err) {
        console.error('Timeout or error:', err);
        setIsLoading(false);
      } else {
        console.log('Server response:', response);
        setIsLoading(false);
      }
    });
  }

  return (
    <form onSubmit={onSubmit}>
      <input onChange={(e) => setValue(e.target.value)} />

      <button type="submit" disabled={isLoading}>
        Submit
      </button>
    </form>
  );
}
