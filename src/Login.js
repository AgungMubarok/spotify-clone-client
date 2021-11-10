import React from 'react';

const AUTH_URL = `https://accounts.spotify.com/authorize?client_id=24ef595ffeb94dc3947acdba4e428e42&response_type=code&redirect_uri=http://localhost:3000&scope=user-read-private%20user-read-email%20playlist-modify`;

export default function Login() {
  return (
    <div className="absolute inset-0 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-gray-800 shadow-lg rounded px-12 pt-6 pb-8 mb-4 text-white">
          <div className="text-2xl flex justify-center border-b-2 py-2 mb-4">
            Login
          </div>
          <div className="flex items-center justify-between">
            <a
              className="px-4 py-2 rounded w-full text-center text-white inline-block shadow-lg bg-gray-500 tra hover:bg-gray-600 focus:bg-gray-700"
              href={AUTH_URL}
            >
              Login With Spotify
            </a>
          </div>
        </div>
        <p className="text-center text-gray-500 text-xs">
          &copy;{new Date().getFullYear()} Spotifyfy Corp. All rights reserved.
        </p>
      </div>
    </div>
  )
}
