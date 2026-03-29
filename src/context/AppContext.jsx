import React, { createContext, useState, useContext, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [persona, setPersonaState] = useState('default'); 
  const [language, setLanguage] = useState('EN'); 
  const [profileId, setProfileId] = useState(null);
  const [theme, setThemeState] = useState(() => localStorage.getItem('et_theme') || 'light');

  // Initial Sync from Supabase and Theme setup
  useEffect(() => {
    async function loadProfile() {
      try {
        const { data } = await supabase
          .from('user_profiles')
          .select('*')
          .eq('name', 'Nusrath')
          .maybeSingle();

        if (data) {
          setPersonaState(data.persona);
          setProfileId(data.user_id);
        } else {
          const { data: newProf } = await supabase
             .from('user_profiles')
             .insert([{ name: 'Nusrath', persona: 'student' }])
             .select()
             .single();
          
          if (newProf) {
            setPersonaState(newProf.persona);
            setProfileId(newProf.user_id);
          }
        }
      } catch (err) {
        console.error("Profile sync failed", err);
      }
    }
    loadProfile();
    
    // Apply theme to document
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

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

  return (
    <AppContext.Provider value={{ persona, setPersona, language, setLanguage, profileId, theme, toggleTheme }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
