import React, { useState, useEffect } from 'react';
import axios from 'axios'
import Manifest from './Manifest'
import './App.css'
import AddManifest from './AddManifest';

function App() {

  const [manifest, setManifest] = useState([])
  
  const getManifest = (() => {
      axios.get("http://localhost:5000/get")
          .then(res => setManifest(res.data))
          .catch(err => console.log(err))
  })

  const addManifest = ((newManifest) => {
    axios.post("http://localhost:5000/post", newManifest)
        .then(res => {
            setManifest(prevManifest => [...prevManifest, res.data])
        })
        .catch(err => console.log(err))
  })

  const deleteManifest = ((id) => {
    axios.delete(`http://localhost:5000/delete/${id}`)
        .then(res => {
            setManifest(prevManifest => prevManifest.filter(manifest => manifest.id !== id ))
        })
        .catch(err => console.log(err))
  })

  const editManifest = ((updates, id) => {
    axios.put(`http://localhost:5000/edit/${id}`, updates)
        .then(res => {
            setManifest(prevManifest => prevManifest.map (manifest => manifest.id !== id ? manifest : res.data))
        })
        .catch(err => console.log(err))
  })


useEffect(() => {
      getManifest()
  }, [])


return (
    <div>
        <h1>Luxury Air Manifest</h1>
        
        <AddManifest 
            submit={addManifest}
            buttonText="Submit"
        />
       <h2>Manifest List:</h2> 
      {
        manifest.map(manifest => 
        {
          return <Manifest
            {...manifest}
            id={manifest.id}
            firstName={manifest.firstName}
            lastName={manifest.lastName}
            seatNum={manifest.seatNum}
            checkIn={manifest.checkIn}
            deleteManifest={deleteManifest}
            editManifest={editManifest}
          />}) 
        }
    </div>
  )
}

export default App;