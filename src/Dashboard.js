import React, { useEffect, useState } from "react";
import useAuth from "./useAuth";
import SpotifyWebApi from "spotify-web-api-node";
import { Collapse } from "./Collapse";
import axios from "axios";

const spotifyApi = new SpotifyWebApi({
  clientId: "24ef595ffeb94dc3947acdba4e428e42",
});

export default function Dashboard({ code }) {
  const accessToken = useAuth(code);
  const [user, setUser] = useState({});
  const [playlist, setPlaylist] = useState([]);
  const [trackPlaylist, setTrackPlaylist] = useState([]);

  useEffect(() => {
    if (!accessToken) return;
    spotifyApi.setAccessToken(accessToken);
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      spotifyApi.getMe().then(data => {
        setUser(data.body);
      });
      
      axios.get("https://api.spotify.com/v1/me/playlists?limit=1", {
        headers: {
          Authorization: "Bearer "+accessToken,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }).then(res => {
        setPlaylist(res.data)
      });
    }
  }, [accessToken]);
  
  useEffect(() => {
    if(playlist && playlist.items){
      spotifyApi.getPlaylist(playlist.items[0].id)
      .then((data) => {
        setTrackPlaylist(data.body.tracks.items);
      });
    }
  }, [playlist]);
  return (
    <div className="px-5 sm:px-10">
      <p className="text-center text-4xl py-5 sm:py-10">Profile</p>
      <div className="flex items-center flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
        <img
          src={user.images && user.images[0].url}
          alt={user.display_name}
          className="w-40 h-40 rounded"
        />
        <div className="text-sm">
          <p>Name: {user.display_name}</p>
          <p>Email: {user.email}</p>
          <p>Id: {user.id}</p>
        </div>
      </div>
      <div className="py-8">
        <p className="text-2xl pb-2">Playlist</p>
        <div className="flex space-y-3 sm:space-y-0 sm:space-x-3 flex-col sm:flex-row">
          {playlist && playlist.items && playlist.items.map(e => (
            <Collapse 
              key={e.id}
              title={e.name} 
              playlistId={e.id} 
              snapshotId={e.snapshot_id}
              bgImage={e.images && e.images[0].url}
              trackPlaylist={trackPlaylist}
              accessToken={accessToken}
            />
          ))}
        </div>
        
      </div>
    </div>
  );
}
