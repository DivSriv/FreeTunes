export interface User {
    id:          number          
    createdAt?:  Date   
    updatedAt?:  Date   
    email:       string
    password?:    string
}

export interface Song {
    id:          number          
    createdAt?:  Date   
    updatedAt?:  Date   
    title:       string
    duration:    number
    url:         string
}

export interface Artist {
    id:          number          
    createdAt?:  Date   
    updatedAt?:  Date   
    name:        string
}

export interface Playlist {
    id:          number          
    createdAt?:  Date   
    updatedAt?:  Date   
    name:        string
}