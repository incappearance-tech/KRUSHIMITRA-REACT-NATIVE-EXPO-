import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Location service stub - implement when needed
    setLocation(null);
  }, []);

  return { location, error };
};
