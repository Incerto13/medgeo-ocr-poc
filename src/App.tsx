import React, { useState } from 'react';
import Camera from 'react-html5-camera-photo';
import dataUriToBuffer from 'data-uri-to-buffer';
import axios from 'axios';
import { ViewFinderOverlayModal } from './ViewFinderOverlayModal'
import './ViewFinderOverlayModal.css';


function App (props: any) {

  async function handleTakePhoto (dataUri: string) {
    // Do stuff with the photo...
    let imgBuffer = dataUriToBuffer(dataUri);

    const base64Image = imgBuffer.toString('base64')
    // console.log(base64Image)
    await axios.post('http://localhost:8000', {
      imageData: base64Image
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
    }).then((result) => {
      console.log(result)
    })
  }

  return (
    <>
      <ViewFinderOverlayModal />
        <Camera 
          // isFullscreen
          imageType={'png'}
          // imageCompression={1}
          sizeFactor={0.5}
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
    </>
  );
}

export default App;