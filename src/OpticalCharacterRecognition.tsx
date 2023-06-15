import React, { useState, useEffect } from 'react';
import Camera from 'react-html5-camera-photo';
import dataUriToBuffer from 'data-uri-to-buffer';
import axios from 'axios';
import { ViewFinderOverlayModal } from './ViewFinderOverlayModal'
import Modal from 'react-modal';
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import 'react-html5-camera-photo/build/css/index.css';
import CircleButton from './CircleButton'
import './OpticalCharacterRecognition.css';

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    // marginRight: '-50%',
    width: '40%',
    transform: 'translate(-50%, -50%)',
  },
};

interface props {
    fieldName?: string
    onCompletion: (text: string, fieldName?: string) => void
    onClose: () => void
    onRetry: () => void
}

function OpticalCharacterRecognition ({ fieldName, onCompletion, onClose, onRetry }: props) {
  const [displayConfirmModal, setDisplayConfirmModal] = useState(false)
  const [ocrData, setOCrData] = useState<string[]>([]);
  const [initialAttempt, setInitialAttempt] = useState(true)
  const [error, setError] = useState(false)

  const closeModal = () => {
    // setIsOpen(false);
  }

  const confirmDesiredText = (text: string) => {
    console.log(`will use the following text: ${text}`)
    onCompletion(text, fieldName)
  }


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
      setInitialAttempt(false)
      console.log(res)
      const uniqueDataSet = new Set(res.data)
      console.log(uniqueDataSet)
      const uniqueDataArr = Array.from(uniqueDataSet) as unknown as string[]
      setOCrData(uniqueDataArr)
      console.log(uniqueDataArr)
      setDisplayConfirmModal(true)
      if (!res?.data[0]) {
        setError(true)
        alert('No characters recognized, please try again.')
      }
    } catch(err) {
      console.log(err)
      alert('There was a problem reading the text.')
    }
 
  }

  return (
    <>
    {  !error &&
         <div>
            <Modal
            isOpen={displayConfirmModal}
            onRequestClose={closeModal}
            style={customStyles}
            contentLabel="Example Modal"
            >
            <h4>The following text was recognized. <br/>Please confirm the text you want to use.</h4>
            <ul>
                { ocrData.map( text  => (
                <>
                    <button className="button"
                    style={{ marginTop: '.5em', display: 'block' }}
                    key={text}
                    onClick={() => confirmDesiredText(text)}
                    >
                    {text}
                    </button>
                </>
                ))
                }
            </ul>
            </Modal>
        </div>
    }
    {
        <Button style={{ position: 'fixed', top: '5%', left: '5%', zIndex: 600 }}
            type="submit" variant="contained" 
            onClick={onClose}
        >
            Close OCR
        </Button>
    }

    { !initialAttempt &&
        <Button style={{ position: 'fixed', top: '15%', left: '5%', zIndex: 600 }}
            type="submit" variant="contained" 
            onClick={() => {
                setError(false)
                setDisplayConfirmModal(false)
            }}
        >
            Retry OCR
        </Button>
    }


    { displayConfirmModal === false &&
           <ViewFinderOverlayModal />
    }
      {/* <CircleButton onClick={function (...args: any[]) {
        throw new Error('Function not implemented.')
      } } isClicked={false} /> */}
        <Camera 
          isFullscreen
          imageType={'png'}
          // imageCompression={1}
          sizeFactor={0.5}
          onTakePhoto = { (dataUri) => { handleTakePhoto(dataUri); } }
        />
    </>
  );
}

export default OpticalCharacterRecognition;