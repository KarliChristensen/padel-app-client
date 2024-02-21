"use client";

import React, { useState, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AuthContext } from "../context/auth.context";
import { useEffect } from "react";

export default function loginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(undefined);
  const router = useRouter();
  const { storedToken, authenticatePlayer, player, isLoggedIn } =
    useContext(AuthContext);

  useEffect(() => {
    if (isLoggedIn && router.pathname !== "/player") {
      router.push("/player");
    }
  }, [isLoggedIn, router.pathname]);

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/player");
  }, [router]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const body = {
      email,
      password,
    };

    axios
      .post(`${process.env.SERVER}/auth/login`, body)
      .then((response) => {
        console.log("JWT token", response.data.authToken);
        storedToken(response.data.authToken);
        authenticatePlayer();
        router.push("/player");
      })
      .catch((error) => {
        const errorDescription = error.message;
        setErrorMessage(errorDescription);
      });

    setEmail("");
    setPassword("");
  };

  return (
    <div className="bg-gray-100 pt-10 flex justify-center h-screen w-full">
      <form onSubmit={handleSubmit} className="w-4/5 ">
        <div className="box-border flex flex-col items-center gap-10 bg-white shadow-sm md:mx-20 p-5">
          <h2 className="mt-6 text-neutral text-xl font-bold">Welcome back!</h2>

          <div className="flex flex-col ">
            <label className="text-md font-medium mb-2 text-neutral">
              Email:
            </label>
            <input
              className="input bg-gray-100 shadow-md rounded-md text-neutral"
              placeholder="Email@gmail.com"
              type="text"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="flex flex-col ">
            <label className="text-md font-medium mb-2 text-neutral">
              Password:
            </label>
            <input
              className="input bg-gray-100 shadow-md rounded-md text-neutral"
              placeholder="**********"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            className="btn btn-primary hover:bg-primary-focus font-bold py-2 px-10 rounded mt-3 text-white shadow-lg"
            type="submit"
          >
            Login
          </button>

          {errorMessage && <p className="error-message">{errorMessage}</p>}
          <div className="flex flex-col ">
            <p>Don't have an account yet?</p>
            <button
              className="btn btn-info font-bold py-2 px-8 text-center rounded mt-5 mb-10 text-white shadow-lg"
              href="/createPlayer"
            >
              {" "}
              Sign Up
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
