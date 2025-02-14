"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import AddCourt from "../components/AddCourt";
import AddPlayers from "../components/AddPlayers";

const CreateTeam = () => {
  const [formData, setFormData] = useState({
    name: "",
    players: [],
    captain: null,
    courts: [],
    leagues: [],
    wins: 0,
  });

  const [existingPlayers, setExistingPlayers] = useState([]);
  const [existingCourts, setExistingCourts] = useState([]);

  const handleChange = (e) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [e.target.name]: e.target.value,
    }));
    console.log(formData);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const teamRes = await axios.post(`${process.env.SERVER}/teams`, {
        name: formData.name,
        players: formData.players,
        captain: formData.captain,
        courts: formData.courts,
        leagues: formData.leagues,
      });

      console.log(teamRes.data);

      setFormData({
        name: "",
        players: [],
        captain: null,
        courts: null,
        leagues: "",
        wins: 0,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchExistingCourts();
  }, []);

  const fetchExistingPlayers = async () => {
    try {
      const res = await axios.get(`${process.env.SERVER}/players`);
      setExistingPlayers(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchExistingCourts = async () => {
    try {
      const res = await axios.get(`${process.env.SERVER}/courts`);
      setExistingCourts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-4 flex flex-col bg-white mb-14">
      <h1 className="text-2xl font-bold mb-4 mx-3">Create Team</h1>
      <form onSubmit={handleSubmit}>
        {/* Name */}

        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Team Name</label>
            <input
              type="text"
              placeholder="The Super-Ultra-Awesome-Paddle Squad"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            />
          </div>
        </div>

        {/* Home Court */}

        <AddCourt
          setFormData={setFormData}
          fetchExistingCourts={fetchExistingCourts}
          existingCourts={existingCourts}
        />

        {/* Invite Players */}

        <AddPlayers
          setFormData={setFormData}
          fetchExistingPlayers={fetchExistingPlayers}
          existingPlayers={existingPlayers}
        />

        {/* Wins */}

        <div className="flex justify-start mx-3">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Team Wins</label>
            <input
              type="number"
              placeholder="How many wins do they have"
              name="wins"
              value={formData.wins}
              onChange={handleChange}
              className="input border mr-3 grow"
              required
            />
          </div>
        </div>

        {/* Leagues */}

        {/*

        <div className="flex justify-start mx-3 mt-6">
          <div className="flex flex-col w-full">
            <label className="font-bold mb-3">Leagues</label>
            <input
              type="text"
              name="leagues"
              value={formData.leagues}
              onChange={handleChange}
              className="input border mr-3 grow"
            />
          </div>
        </div>

        */}

        {/* Submit Button */}

        <div className="flex justify-center items-center">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded mt-4"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTeam;
