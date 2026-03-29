import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [persona, setPersonaState] = useState('default'); 
  const [language, setLanguage] = useState('EN'); 
  const [profileId, setProfileId] = useState(null);
  const [userName, setUserName] = useState(() => localStorage.getItem('et_user_name') || 'Guest');
  const [theme, setThemeState] = useState(() => localStorage.getItem('et_theme') || 'light');

  // Initial Sync from Supabase and Theme setup
  useEffect(() => {
    async function loadProfile() {
      if (!userName || userName === 'Guest') return;
      try {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('name', userName)
          .maybeSingle();

        if (data) {
          setPersonaState(data.persona);
          setProfileId(data.user_id);
        } else {
          try {
            const { data: newProf } = await supabase
               .from('user_profiles')
               .insert([{ name: userName, persona: persona || 'student' }])
               .select()
               .single();
            
            if (newProf) {
              setPersonaState(newProf.persona);
              setProfileId(newProf.user_id);
            }
          } catch (e) {
            console.warn("Could not create profile automatically, using default guest state.");
          }
        }
      } catch (err) {
        console.error("Profile sync failed", err);
      }
    }
    loadProfile();
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme, userName, persona]);

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setThemeState(newTheme);
    localStorage.setItem('et_theme', newTheme);
    document.documentElement.setAttribute('data-theme', newTheme);
  };

  const setPersona = async (newPersona) => {
    setPersonaState(newPersona);
    if (profileId) {
      try {
        await supabase
          .from('user_profiles')
          .update({ persona: newPersona })
          .eq('user_id', profileId);
      } catch (err) {
        console.error("Failed to sync persona to DB", err);
      }
    }
  };

  const updateUserName = (name) => {
    setUserName(name);
    localStorage.setItem('et_user_name', name);
  };

  return (
    <AppContext.Provider value={{ persona, setPersona, language, setLanguage, profileId, userName, updateUserName, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAppContext = () => useContext(AppContext);
