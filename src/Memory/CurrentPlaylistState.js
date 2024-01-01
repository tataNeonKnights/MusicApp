import React, { useState } from 'react'
import CurrentPlaylistContext from './CurrentPlaylistContext'

const  CurrentPlaylistState = ({children})=> {
  const [playlist, setPlaylist] = useState([""]);

  return (
    <CurrentPlaylistContext.Provider value={{playlist,setPlaylist}}>
      {children}
    </CurrentPlaylistContext.Provider>
  )
}

export default CurrentPlaylistState