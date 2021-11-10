import axios from "axios";
import { useState } from "react";

export function Collapse({
  title,
  bgImage,
  trackPlaylist,
  playlistId,
  snapshotId,
  accessToken,
}) {
  const [collapse, setCollapse] = useState(false);
  const [modal, setModal] = useState(false);

  return (
    <div>
      <div
        className="bg-gray-500 p-2 inline-block w-40 sm:w-60 font-bold drop-shadow-2xl capitalize sm:text-2xl space-y-3"
        onClick={() => setCollapse(!collapse)}
      >
        <p>{title}</p>
        <img src={bgImage} alt="playlist" />
      </div>
      {collapse && (
        <div>
          {trackPlaylist &&
            trackPlaylist.map(e => (
              <div className="bg-gray-400 p-2 border-b flex justify-between space-x-3">
                <p>{e.track.name}</p>
                <button
                  className="bg-red-500 px-2"
                  onClick={() => setModal(!modal)}
                >
                  <i class="fa fa-trash-o"></i>
                </button>
                {modal ? (
                  <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                      <div className="relative w-auto my-6 mx-auto max-w-3xl">
                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none text-gray-900 p-3">
                          <p>Are you sure want to delete ?</p>
                          <div className="space-x-3 pt-4">
                            <button onClick={() => setModal(!modal)}>No</button>
                            {console.log(e.track.uri)}
                            <button
                              className="bg-red-500 text-white px-3"
                              onClick={() => {
                                axios(
                                  {
                                    url: `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
                                    method: "delete",
                                    headers: {
                                      Authorization: "Bearer " + accessToken,
                                      Accept: "application/json",
                                      "Content-Type": "application/json"
                                    },
                                    data: {
                                      "tracks": [
                                        {"uri": e.track.uri}
                                      ],
                                      "snapshot_id": snapshotId,
                                    },
                                    
                                  }
                                ).then(() => {
                                  window.location.reload();
                                }).catch(err => console.error(err));
                              }}
                            >
                              Yes
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                  </>
                ) : null}
              </div>
            ))}
        </div>
      )}
    </div>
  );
}
