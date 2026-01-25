import { useEffect, useState } from 'react';

export const useLocation = () => {
  const [location, setLocation] = useState<any>(null);

  useEffect(() => {
    // Location service stub - implement when needed
    setLocation(null);
  }, []);

  return { location };
};
