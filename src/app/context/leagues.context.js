"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { createContext } from "react";

export const LeaguesContext = createContext({
  leagues: [],
  updateLeagues: () => {},
});

export default function LeaguesProviderWrapper({ children }) {
  const [leagues, setLeagues] = useState([]);

  useEffect(() => {
    updateLeagues();
  }, []);

  const updateLeagues = () => {
    axios.get(`${process.env.SERVER}/leagues`).then((response) => {
      console.log("Leagues data", response.data);
      setLeagues(response.data);
    });
  };

  return (
    <LeaguesContext.Provider
      value={{
        leagues,
        updateLeagues,
      }}
    >
      {children}
    </LeaguesContext.Provider>
  );
}
