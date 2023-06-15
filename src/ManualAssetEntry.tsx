// import type { GS1UDI } from 'utils/udi'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { useQuery } from 'react-query'
import {
  GenericObject,
  ManualInputFormData,
  Procedure,
} from './types'
import { TextInput } from './components/mui'
import PageDisplay from './components/PageDisplay/PageDisplay'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import OpticalCharacterRecognition from './OpticalCharacterRecognition'
import './ManualAssetEntry.css'

interface Props {
  addProcedureAssetScanMutation: any
  procedureId: Procedure['_id']
  resetQueryAndMutation: () => void
  setAssetMetadata: (data: any) => void
}

export const parsedUDIToFormData = (
  data: any
): Partial<ManualInputFormData> => ({
  deviceId: data.di ?? undefined,
  lotBatch: data.lotNumber ?? undefined,
  expirationDate: data.expirationDate ?? undefined,
  manufacturingDate: data.manufacturingDate ?? undefined,
  serialNumber: data.serialNumber ?? undefined,
})

const initialFormData = {
  companyName: '',
  deviceDescription: '',
  deviceId: '',
  deviceCount: 1,
  lotBatch: '',
  serialNumber: '',
  expirationDate: undefined,
  manufacturingDate: undefined,
  udi: '',
} as ManualInputFormData

function ManualAssetEntry({
  procedureId,
  resetQueryAndMutation,
  setAssetMetadata,
}: Props) {
  const [manualAssetInputFormData, setManualAssetInputFormData] =
    useState<ManualInputFormData>(initialFormData)
  const [manualAssetInputFormErrors, setManualAssetInputFormErrors] =
    useState<GenericObject>({})

    const [activeOcrFieldName, setActiveOcrFieldName] = useState<string>('')
    const [runOcr, setRunOcr] = useState(false)

  
    // const handleOnchange = (event: any, fieldName: string) => {
    //   setFormState((prevState: any) => ({
    //     ...prevState,
    //     [fieldName]: event?.target.value
    //   }))
    // }
  
    const handleOcrOpen = (event: any, fieldName: string) => {
      setActiveOcrFieldName(fieldName)
      event.preventDefault();
      setRunOcr(true)
    }
  
    const handleOcrCompletion = (text: string) => {
      setManualAssetInputFormData({
        ...manualAssetInputFormData,
        [activeOcrFieldName]: text
      })
      setRunOcr(false)
    }

  const handleChangeFormData = (e: any) => {
    setManualAssetInputFormData({
      ...manualAssetInputFormData,
      [e.target.name]: e.target.value,
    })
  }

  useEffect(() => {
    console.log('manualAssetInputFormErrors: ', manualAssetInputFormErrors)
  })


  const inputProps = {
    handleChangeFormData,
  }

  return (
    <>
      { runOcr &&
        <OpticalCharacterRecognition 
        onCompletion={handleOcrCompletion}
        onClose={() => setRunOcr(false)}
        onRetry={() => {
          setRunOcr(false)
          setRunOcr(true)
        }}
        fieldName={activeOcrFieldName}
        />
      }

      <Helmet>
        <title>Manual</title>
      </Helmet>
      <PageDisplay>
        <Box>
          <Button
            sx={{ mb: 2, width: 'fit' }}
            startIcon={<ArrowBackIcon />}
            // onClick={() => navigate(`/procedure/${procedureId}`)}
          >
            Back to scan
          </Button>
          <Typography variant="h5"><strong>Add Asset</strong></Typography>
        </Box>

        <Box>
          <form /* onSubmit={handleSubmit} */ >
            <FormControl fullWidth sx={{ mb: 2 }}>
              <TextInput
                {...inputProps}
                id="deviceDescription"
                label="Device Description"
                name="deviceDescription"
                InputLabelProps={{ shrink: true }}
                value={manualAssetInputFormData.deviceDescription}
                error={manualAssetInputFormErrors.deviceDescription}
                required
              />
              <span className="ocr-enabled-field">
                <TextInput
                  {...inputProps}
                  id="companyName"
                  label="Company Name"
                  name="companyName"
                  InputLabelProps={{ shrink: true }}
                  value={manualAssetInputFormData.companyName}
                  error={manualAssetInputFormErrors.companyName}
                  required
                />
                <div>
                  <div style={{ height: '3em' }}></div>
                  <Button variant="outlined" className="ocr-btn"
                    onClick={(event) => handleOcrOpen(event, 'companyName')}>OCR
                  </Button>
                </div>
              </span>
              <span className="ocr-enabled-field">
                <TextInput
                  {...inputProps}
                  id="udi"
                  label="Universal Device Identifier (UDI)"
                  name="udi"
                  InputLabelProps={{ shrink: true }}
                  value={manualAssetInputFormData.udi}
                  error={manualAssetInputFormErrors.udi}
                  // handleChangeFormData={handleUDIChange}
                  helperText="By entering a UDI we will try to automatically populate the fields below"
                />
                <div>
                <div style={{ height: '3em' }}></div>
                  <Button variant="outlined" className="ocr-btn"
                    onClick={(event) => handleOcrOpen(event, 'udi')}>OCR
                  </Button>
                </div>
              </span>
              <span className="ocr-enabled-field">
                <TextInput
                  {...inputProps}
                  id="serialNumber"
                  label="Stock / Serial Number (optional)"
                  name="serialNumber"
                  delimiter="21"
                  error={manualAssetInputFormErrors.serialNumber}
                  value={manualAssetInputFormData.serialNumber}
                  helperText={`An asset's serial number may be preceded by SN or (21)`}
                />
                <div>
                <div style={{ height: '3em' }}></div>
                  <Button variant="outlined" className="ocr-btn"
                    onClick={(event) => handleOcrOpen(event, 'serialNumber')}>OCR
                  </Button>
                </div>
              </span>
              <span className="ocr-enabled-field">
                  <TextInput
                    {...inputProps}
                    id="deviceId"
                    label="Device Identifier"
                    name="deviceId"
                    delimiter="01"
                    error={
                      // Show initial error only onBlur but once input is touched validate on input change
                      manualAssetInputFormData.deviceId?.length === 14 ||
                      !manualAssetInputFormErrors.deviceId
                        ? false
                        : true
                    }
                    value={manualAssetInputFormData.deviceId}
                    inputMode="numeric"
                    required
                    helperText={
                      'An asset’s device identifier may be preceded by (01)'
                    }
                  />
                  <div>
                    <div style={{ height: '3em' }}></div>
                    <Button variant="outlined" className="ocr-btn"
                      onClick={(event) => handleOcrOpen(event, 'deviceId')}>OCR
                    </Button>
                </div>
              </span>
              <TextInput
                id="deviceCount"
                label="Device Count"
                name="deviceCount"
                error={!manualAssetInputFormErrors.deviceCount ? false : true}
                value={manualAssetInputFormData.deviceCount}
                inputMode="numeric"
                handleChangeFormData={(e) => {
                  let count = parseInt(e.target.value, 10)
                  handleChangeFormData({
                    target: {
                      name: 'deviceCount',
                      value: isNaN(count) ? '' : count,
                    },
                  })
                }}
                required
              />
              <span className="ocr-enabled-field">
                <TextInput
                  {...inputProps}
                  id="lotBatch"
                  label="Lot Number (optional)"
                  name="lotBatch"
                  delimiter="10"
                  error={manualAssetInputFormErrors.lotBatch}
                  value={manualAssetInputFormData.lotBatch}
                  helperText={`An asset's lot number may be preceded by LOT or (10)`}
                />
                <div>
                  <div style={{ height: '3em' }}></div>
                  <Button variant="outlined" className="ocr-btn"
                    onClick={(event) => handleOcrOpen(event, 'lotBatch')}>OCR
                  </Button>
                </div>
              </span>
              <Box sx={{ mt: 1.5 }}>
                <Button type="submit" variant="contained" fullWidth>
                  Add Asset
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setManualAssetInputFormData(initialFormData)}
                  fullWidth
                  sx={{
                    my: 1.5,
                    '&:disabled': {
                      color: 'primary.disabled',
                      borderColor: 'primary.disabled',
                    },
                  }}
                >
                  Clear form
                </Button>
              </Box>
            </FormControl>
          </form>
        </Box>
      </PageDisplay>
    </>
  )
}
export default ManualAssetEntry
