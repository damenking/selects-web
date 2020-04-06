import React, { createContext, useContext, useState, useEffect } from 'react';

const WindowDimensionsCtx = createContext({ height: 0, width: 0 });

const WindowDimensionsProvider: React.FunctionComponent = ({ children }) => {
  const [dimensions, setDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    setDimensions({ width: window.innerWidth, height: window.innerHeight });
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <WindowDimensionsCtx.Provider value={dimensions}>
      {children}
    </WindowDimensionsCtx.Provider>
  );
};

export default WindowDimensionsProvider;

export const useWindowDimensions = () => useContext(WindowDimensionsCtx);

export const checkIsMobile = () => useContext(WindowDimensionsCtx).width < 800;
