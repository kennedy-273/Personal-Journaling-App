import { JournalContext } from "./JournalContext";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const JournalProvider = ({ children }) => {
  const [journals, setJournals] = useState();
  const [loading, setLoading] = useState();

  useEffect(() => {
    fetchJournals();
  }, []);

  const fetchJournals = async (filter='all') => {
    if (loading) return;
    setLoading(true);

    try {
      const token = await AsyncStorage.getItem("token");
      const response = await fetch(
        `https://journal-backend-x445.onrender.com/journals/${filter}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status !== 200) {
      } else {
        const journalsResponse = await response.json();
        setJournals(journalsResponse.journals);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <JournalContext.Provider value={{ journals, loading, fetchJournals , }}>
      {children}
    </JournalContext.Provider>
  );
};
