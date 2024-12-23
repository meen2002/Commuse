import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TrackInfo = ({ trackID }) => {
  const [trackData, setTrackData] = useState(null);

  useEffect(() => {
    const tempToken = localStorage.getItem("spotify_token_temp");

    if (!tempToken) {
      return (null)
    }

    const fetchTrackData = async () => {
      try {
        const response = await axios.get(`https://api.spotify.com/v1/tracks/${trackID}`, {
          headers: {
            Authorization: `Bearer ${tempToken}`,
          },
        });

        if (response.status === 200) {
          setTrackData(response.data);
        } 
      } catch (err) {
      }
    };

    if (trackID) {
      fetchTrackData();
    }
  }, [trackID]);


  return (
 trackData && (
    null
)
    // <div className="track-info">
    //   <h2>{trackData.name}</h2>
    //   <p>{trackData.artists.map(artist => artist.name).join(', ')}</p>
    //   <img
    //     className="album-image"
    //     src={trackData.album.images[0].url}
    //     alt={trackData.album.name}
    //     width="100"
    //     height="100"
    //   />
    // </div>
  );
};

export default TrackInfo;
