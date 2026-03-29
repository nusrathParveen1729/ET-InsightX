import React, { createContext, useState, useContext } from 'react';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [persona, setPersona] = useState('default'); // 'default', 'investor', 'founder', 'student'
  const [language, setLanguage] = useState('EN'); // 'EN', 'HI', 'TA', 'TE', 'BN'

  return (
    <AppContext.Provider value={{ persona, setPersona, language, setLanguage }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
