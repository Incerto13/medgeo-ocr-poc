import React, { useState } from 'react';
import OpticalCharacterRecognition from './OpticalCharacterRecognition'
import './Form.css'

export const Form = () => {
  const [activeOcrFormField, setActiveOcrFormField] = useState<string>('')
  const [runOcr, setRunOcr] = useState(false)

  const [formState, setFormState] = useState<any>({
    serialNumber: '',
    lotNumber: '',
    modelVersionNumber: ''
  })

  const handleOnchange = (event: any, fieldName: string) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [fieldName]: event?.target.value
    }))
  }

  const handleSubmit = () => {
    alert('form submitted')
  }

  const handleOcrOpen = (event: any, formField: string) => {
    setActiveOcrFormField(formField)
    event.preventDefault();
    setRunOcr(true)
  }

  const handleOcrCompletion = (text: string) => {
    setFormState((prevState: any) => ({
      ...prevState,
      [activeOcrFormField]: text
    }))
    setRunOcr(false)
  }


  return (
    <>
    { runOcr &&
       <OpticalCharacterRecognition 
       onCompletion={handleOcrCompletion}
       fieldName={activeOcrFormField}
       />
    }
      <form className={!runOcr ? 'center' : ''} onSubmit={handleSubmit}>

          <div
            className="field"
          >   
            <input 
              type="text" 
              name="serialNumber"
              placeholder="Enter Serial Number" 
              value={formState.serialNumber}
              onChange={(event) => handleOnchange(event, 'serialNumber')}
              required 
            /> <button className='ocr-btn'
                onClick={(event) => handleOcrOpen(event, 'serialNumber')}>OCR
              </button>
          </div>

          <div
            className="field"
          >
            <input 
              type="text" 
              name="lotNumber"
              placeholder="Enter Lot Number" 
              value={formState.lotNumber}
              onChange={(event) => handleOnchange(event, 'lotNumber')}
              required 
            /> <button className='ocr-btn'
                onClick={(event) => handleOcrOpen(event, 'lotNumber')}>OCR
              </button>
          </div>

          <div
            className="field"
          >
            <input 
              type="text" 
              name="modelVersionNumber"
              placeholder="Enter Model Version Number" 
              value={formState.modelVersionNumber}
              onChange={(event) => handleOnchange(event, 'modelVersionNumber')}
              required 
            /> <button className='ocr-btn'
                onClick={(event) => handleOcrOpen(event, 'modelVersionNumber')}>OCR
              </button>
          </div>

          <button className="submit">Submit</button>
      </form>
    </>
  );
}