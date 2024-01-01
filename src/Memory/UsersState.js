import React, { useState } from 'react'
import UsersContext from './UsersContext'

const UsersState = ({children})=> {
    const [users,setUsers] = useState({
        1:{
            name:"Raza",
            email:"raza@gmail.com"
        },
        2:{
            name:"Mohiyaddeen",
            email:"Mohiyaddeen@gmail.com"
        }
    })
    return(
        <UsersContext.Provider value={{users}}>
            {children}
        </UsersContext.Provider>
    )
}

export default UsersState