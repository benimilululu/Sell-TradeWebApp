
import { createContext, useEffect, useState } from 'react';


export const NightModeContext = createContext();

export const NightModeContextProvider = ({ children }) => {
  const [nightMode, setNightMode] = useState(true);

  return (
    <NightModeContext.Provider value={{ nightMode, setNightMode }}>
      {children}
    </NightModeContext.Provider>
  );
};
