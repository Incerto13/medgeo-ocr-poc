import React, { useState, useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import dataUriToBuffer from 'data-uri-to-buffer';
import axios from 'axios';
import { ViewFinderOverlayModal } from './ViewFinderOverlayModal'
import 'react-html5-camera-photo/build/css/index.css';
import CircleButton from './CircleButton'


function App (props: any) {
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false)
  const [ocrData, setOCrData] = useState([])

  useEffect(() => {
    if (displayConfirmModal) {
      alert(ocrData[0])
    }
  },[displayConfirmModal, ocrData])



  const characterRec = async (base64Image: string) => {
    const res = await axios.post('http://localhost:8000', {
      imageData: base64Image
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
    })
    return res
  }


  async function handleTakePhoto (dataUri: string) {
    // Do stuff with the photo...
    let imgBuffer = dataUriToBuffer(dataUri);

    const base64Image = imgBuffer.toString('base64')

    try {
      const res = await characterRec(base64Image)
      console.log(res)
      setDisplayConfirmModal(true)
      setOCrData(res.data)
      if (!res.data[0]) {
        alert('No characters recognized, please try again.')
      }
    } catch(err) {
      console.log(err)
      alert('There was a problem reading the text.')
    }
 
  }

  return (
    <>
      <ViewFinderOverlayModal />
      <CircleButton onClick={function (...args: any[]) {
        throw new Error('Function not implemented.')
      } } isClicked={false} />
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