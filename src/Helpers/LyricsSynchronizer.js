// export default async function LyricsSynchronizer() {
//

//   return <div></div>;
// }

import React, { useEffect } from "react";

export default function LyricsSynchronizer() {
  const parseLyrics = (data) => {
    const lines = data.split("\n");
    let masterLrcData = {};
    for (let line of lines) {
      const match = line.match(/\[(\d+):(\d+\.\d+)\](.*)/);
      //   console.log("match : ", match);
      //   console.log("minutes : ",match[1])
      //   console.log("seconds : ",Math.round(match[2]))
      let totalT = match[1] * 60 + Math.round(match[2]);
      masterLrcData[totalT+2] = match[3];

      //   console.log("total time in seconds : ",totalT)
      //   console.log("text : ",match[3])
    }
    console.log(masterLrcData);

    // console.log("lines : ", lines);
  };
  useEffect(() => {
    const fetchFn = async () => {
      const lrcFile = await fetch(
        "./Assets/Songs-Raza/Song-1/Heartbreak-Anniversary.lrc"
      );
      const lrc = await lrcFile.text();
      parseLyrics(lrc);
      //   console.log(lrc);
    };
    fetchFn();
    const lyricsLrcFile = document.getElementById("lyricsLrcFile");
    lyricsLrcFile.innerHTML = "Lyrics generated, check Console";
  }, []);

  return <div id="lyricsLrcFile"></div>;
}
