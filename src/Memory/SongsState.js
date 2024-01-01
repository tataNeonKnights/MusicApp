import React, { useState } from "react";
import SongsContext from "./SongsContext";

const SongsState = ({ children }) => {
  const [songs, setSongs] = useState({
    "song-1": {
      name: "Heartbreak anniversary",
      audio:
        "https://drive.google.com/uc?export=download&id=16fFZ9UmNQU9PKU50hz3VO89qs0jDURy6",
      image:
        "https://drive.google.com/file/d/1DMDspHFihmBKwbuPoDFvvuER6t_V4Ibp/view?usp=sharing",
      lyrics: "lyrics-file-link-or-full-lyrics",
      user: 1,
      bgm: "bgm-src",
      duration: "4:08",
    },
    "song-2": {
      name: "Ordinary person",
      audio:
        "https://drive.google.com/uc?export=download&id=1k9Kp0cV6Q8GUyVcL5DQu24LWWoWW95w4",
      image:
        "https://drive.google.com/file/d/17ZPiomFrioTsECVxFfjICkzquMBOAuUS/view?usp=sharing",
      lyrics: "lyrics-file-link-or-full-lyrics",
      user: 1,
      bgm: "bgm-src",
      duration: "2:18",
    },
    "song-3": {
      name: "Thank you",
      audio:
        "https://drive.google.com/uc?export=download&id=19B6Sb4Gmit5yB7kc3EFm-vSj67V8xv1H",
      image:
        "https://drive.google.com/file/d/1k8SrfRDSGc4fy6wKUG-IYJRntCFwU1WF/view?usp=sharing",
      lyrics: "lyrics-file-link-or-full-lyrics",
      user: 1,
      bgm: "bgm-src",
      duration: "4:20",
    },
  });

  return (
    <SongsContext.Provider value={{ songs }}>{children}</SongsContext.Provider>
  );
};

export default SongsState;
