"use client";

import { useState, useEffect } from "react";
import axios from "axios";

const AdminPlayersCreate = () => {
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    age: "",
    gender: "",
    nationality: "",
    height: "",
    weight: "",
    dominantHand: "",
    backhandType: "",
    playingStyle: "",
    experienceLevel: "",
    coach: "",
  });

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://ih-countries-api.herokuapp.com/countries"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

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
      const res = await axios.post(`${process.env.SERVER}/players`, formData);
      console.log(res.data);
      setFormData({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        age: "",
        gender: "",
        nationality: "",
        height: "",
        weight: "",
        dominantHand: "",
        backhandType: "",
        playingStyle: "",
        experienceLevel: "",
        coach: "",
      });
    } catch (error) {
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of  2xx
        console.error("Server responded with an error:", error.response.data);
      } else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in Node.js
        console.error("No response received from the server:", error.request);
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error("Error setting up the request:", error.message);
      }
      console.error("Config:", error.config);
    }
  };

  return (
    <div className="flex justify-center items-center bg-white md:bg-base-100 lg:bg-base-100">
      <div className="bg-white rounded-lg w-full md:w-full lg:w-5/6 my-12 px-3 lg:px-0">
        <div className="lg:mx-0">
          <form onSubmit={handleSubmit}>
            <h1 className="text-2xl text-primary-focus font-bold mt-6 mx-3">
              Create Player
            </h1>
            {/* Email / Password */}
            <div className="flex flex-col justify-start mt-6 lg:flex-row">
              <div className="flex flex-col w-full">
                <label className="font-semibold mb-3">Email</label>
                <input
                  type="text"
                  placeholder="Your email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  required
                />
              </div>
              <div className="flex flex-col w-full mt-3 lg:mt-0">
                <label className="font-semibold mb-3">Password</label>
                <input
                  type="text"
                  placeholder="New password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  required
                />
              </div>
            </div>

            {/* First Name / Last Name */}

            <div className="flex flex-col justify-start mt-3 lg:flex-row">
              <div className="flex flex-col w-full">
                <label className="font-semibold mb-3">First Name</label>
                <input
                  type="text"
                  placeholder="Jane"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  required
                />
              </div>
              <div className="flex flex-col w-full">
                <label className="font-semibold mb-3">Last Name</label>
                <input
                  type="text"
                  placeholder="Smith"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  required
                />
              </div>
            </div>

            {/* Age / Height / Weight */}

            <div className="mt-6">
              <div className="flex justify-start mt-3">
                <div className="flex flex-col w-1/6 grow">
                  <label className="font-semibold mb-3">Age</label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="0"
                    className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  />
                </div>
                <div className="flex flex-col w-1/6 grow">
                  <label className="font-semibold mb-3">Height</label>
                  <input
                    placeholder="Cm"
                    type="number"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  />
                </div>
                <div className="flex flex-col w-1/6 grow">
                  <label className="font-semibold mb-3">Weight</label>
                  <input
                    placeholder="Kg"
                    type="number"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3"
                  />
                </div>
              </div>
            </div>

            {/* Gender */}

            <div className="mt-6">
              <label className="font-semibold">Gender</label>
              <div className="flex justify-start mt-3">
                <input
                  type="radio"
                  name="gender"
                  value="Male"
                  onChange={handleChange}
                  className="radio radio-success checked:bg-gray-200"
                  checked={formData.gender === "Male"}
                />
                <label className="font-semibold mr-8 ml-2 align-super">
                  Male
                </label>
                <input
                  type="radio"
                  name="gender"
                  value="Female"
                  onChange={handleChange}
                  className="radio radio-success"
                  checked={formData.gender === "Female"}
                />
                <label className="font-semibold mr-8 ml-2 align-super">
                  Female
                </label>
                <input
                  type="radio"
                  name="gender"
                  value="Prefer not to say"
                  onChange={handleChange}
                  className="radio radio-success"
                  checked={formData.gender === "Prefer not to say"}
                />
                <label className="font-semibold mr-8 ml-2 align-super">
                  Non-specific
                </label>
              </div>
            </div>

            {/* Nationality */}

            <div className="mt-6">
              <label className="font-semibold">Nationality</label>
              <div className="flex justify-start mt-3">
                <select
                  className="input bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3 w-full"
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                >
                  <option value="">Select a country</option>
                  {countries.map((country) => (
                    <option
                      key={country.alpha3Code}
                      value={country.name.common}
                    >
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Accordion */}

            <div className="mt-6 pr-3">
              <div className="collapse bg-base-100 rounded-lg">
                <input type="checkbox"
                  className="w-full"
                />
                <div className="collapse-title text-xl font-medium bg-gray-100 placeholder:text-gray-500">
                  Advanced
                </div>
                <div className="collapse-content bg-gray-100 shadow-md placeholder:text-gray-500">
                  {/* Handedness */}

                  <div className="mt-6 mx-3">
                    <label className="font-semibold">Handedness</label>
                    <div className="flex justify-start mt-3">
                      <input
                        type="radio"
                        name="dominantHand"
                        value="Right"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={formData.dominantHand === "Right"}
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        Right
                      </label>
                      <input
                        type="radio"
                        name="dominantHand"
                        value="Left"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={formData.dominantHand === "Left"}
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        Left
                      </label>
                      <input
                        type="radio"
                        name="dominantHand"
                        value="Ambidextrous"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={formData.dominantHand === "Ambidextrous"}
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        Ambidextreous
                      </label>
                    </div>
                  </div>

                  {/* Backhand */}

                  <div className="mt-6 mx-3">
                    <label className="font-semibold">Backhand Style</label>
                    <div className="flex justify-start mt-3">
                      <input
                        type="radio"
                        name="backhandType"
                        value="One-handed backhand"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={
                          formData.backhandType === "One-handed backhand"
                        }
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        One-handed
                      </label>
                      <input
                        type="radio"
                        name="backhandType"
                        value="Two-handed backhand"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={
                          formData.backhandType === "Two-handed backhand"
                        }
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        Two-handed
                      </label>
                    </div>
                  </div>

                  {/* Playing Style */}

                  <div className="mt-7 mx-3">
                    <label className="font-semibold">Play Style</label>
                    <div className="flex justify-start mt-3">
                      <input
                        type="radio"
                        name="playingStyle"
                        value="Offensive"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={formData.playingStyle === "Offensive"}
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        Offensive
                      </label>
                      <input
                        type="radio"
                        name="playingStyle"
                        value="Control"
                        onChange={handleChange}
                        className="radio radio-success"
                        checked={formData.playingStyle === "Control"}
                      />
                      <label className="font-semibold mr-8 ml-2 align-super">
                        Control
                      </label>
                    </div>
                  </div>

                  {/* Coach */}

                  <div className="flex flex-col justify-start mt-6 mx-3">
                    <label className="font-semibold align-super">Coach</label>
                    <input
                      type="string"
                      name="coach"
                      value={formData.coach}
                      onChange={handleChange}
                      className="input border-gray-300 bg-gray-100 shadow-md rounded-md placeholder:text-gray-500 mr-3 w-full"
                    />
                  </div>

                  {/* Experience Level */}

                  <div className="flex flex-col justify-center items-center mt-6 mx-3">
                    <label className="text-lg font-semibold align-super">
                      Experience
                    </label>
                    <div className="rating rating-lg rating-half mt-3 mb-3">
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="1"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-1"
                        checked={formData.experienceLevel === "1"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="2"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-2"
                        checked={formData.experienceLevel === "2"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="3"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-1"
                        checked={formData.experienceLevel === "3"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="4"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-2"
                        checked={formData.experienceLevel === "4"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="5"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-1"
                        checked={formData.experienceLevel === "5"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="6"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-2"
                        checked={formData.experienceLevel === "6"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="7"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-1"
                        checked={formData.experienceLevel === "7"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="8"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-2"
                        checked={formData.experienceLevel === "8"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="9"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-1"
                        checked={formData.experienceLevel === "9"}
                      />
                      <input
                        type="radio"
                        name="experienceLevel"
                        value="10"
                        onChange={handleChange}
                        className="bg-gray-500 mask mask-star-2 mask-half-2"
                        checked={formData.experienceLevel === "10"}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}

              <div className="flex justify-center items-center">
                <button
                  type="submit"
                  className="btn btn-primary text-white font-bold py-3 px-8 rounded mt-10"
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminPlayersCreate;
