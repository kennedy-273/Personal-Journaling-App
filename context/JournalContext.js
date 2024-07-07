import React, { createContext } from "react";

const defaultValue = {
  journals: [],
  loading: false,
  fetchJournals: () => {},
};

export const JournalContext = createContext(defaultValue);
