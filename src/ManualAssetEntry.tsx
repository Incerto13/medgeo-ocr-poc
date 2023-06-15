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
// import { parseGudid, ParsedUDI } from 'lib/gudid'
import { /* DateInput */ TextInput } from './components/mui'
import PageDisplay from './components/PageDisplay/PageDisplay'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import FormControl from '@mui/material/FormControl'
import Typography from '@mui/material/Typography'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
// import LoadingIndicator from 'components/LoadingIndicator/LoadingIndicator'
// import { captureWarning } from 'lib/monitoring'
// import { manualAssetInputSchema, validateForm } from 'lib/validation'
// import { deriveMetadataFromAssetForm } from 'utils/data'
// import { getUDIFormat, parseGS1 } from 'utils/udi'
// import dayjs from 'lib/dayjs'

interface Props {
  addProcedureAssetScanMutation: any
  procedureId: Procedure['_id']
  resetQueryAndMutation: () => void
  setAssetMetadata: (data: any) => void
}

// export const quickParseGS1ToFormData = (
//   data: GS1UDI
// ): Partial<ManualInputFormData> => {
//   let expirationDate = undefined
//   let manufacturingDate = undefined
//   if (data['17']) {
//     try {
//       expirationDate = dayjs(data['17'], 'YYMMDD').toISOString()
//     } catch (_) {}
//   }
//   if (data['11']) {
//     try {
//       manufacturingDate = dayjs(data['11'], 'YYMMDD').toISOString()
//     } catch (_) {}
//   }

//   return {
//     deviceId: data['01'],
//     lotBatch: data['10'],
//     expirationDate,
//     manufacturingDate,
//     serialNumber: data['21'],
//   }
// }

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

  // const navigate = useNavigate()
  // const location = useLocation()

  // @ts-ignore
  // const udi = location.state?.scan?.barcodeData
  // const parseGudidQuery = useQuery(
  //   ['parseGudid', { udi }],
  //   () => parseGudid(udi),
  //   {
  //     enabled: !!udi,
  //     retry: (failureCount, error: Error) =>
  //       failureCount <= 3 && !error.message.includes('NetworkError'),
  //     onError: (e) => captureWarning(e),
  //     refetchOnWindowFocus: false,
  //   }
  // )

  // const parsedGudid = parseGudidQuery.data

  // const handleSubmit = (e: any) => {
  //   e.preventDefault()

  //   validateForm({
  //     formData: manualAssetInputFormData,
  //     schema: manualAssetInputSchema,
  //   }).then((errors) => {
  //     if (Object.keys(errors ?? {}).length > 0) {
  //       setManualAssetInputFormErrors({ ...errors })
  //       return
  //     } else {
  //       setAssetMetadata(deriveMetadataFromAssetForm(manualAssetInputFormData))
  //       navigate(`../result/?mode=manual`)
  //     }
  //   })
  // }

  //Resets the query and mutation when the user navigates away from the page
  // useEffect(
  //   () => resetQueryAndMutation(),
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  //   [location]
  // )

  // useEffect(() => {
  //   if (parsedGudid) {
  //     setManualAssetInputFormData((currentFormData) => ({
  //       ...currentFormData,
  //       deviceId: parsedGudid.di ?? '',
  //       lotBatch: parsedGudid.lotNumber ?? '',
  //       expirationDate: parsedGudid.expirationDate ?? '',
  //       udi,
  //     }))
  //   }
  // }, [parsedGudid, udi])

  const handleChangeFormData = (e: any) => {
    setManualAssetInputFormData({
      ...manualAssetInputFormData,
      [e.target.name]: e.target.value,
    })
  }

  const handleChangeFormErrorField = (inputName: string, value: boolean) => {
    setManualAssetInputFormErrors({
      ...manualAssetInputFormErrors,
      [inputName]: value,
    })
  }

  // const handleUDIChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const udiValue = e.target.value
  //   const udiFormat = getUDIFormat(udiValue)

  //   if (!udiFormat) {
  //     const clearData: Partial<ManualInputFormData> = {}
  //     if (!udiValue) {
  //       clearData['deviceId'] = ''
  //       clearData['lotBatch'] = ''
  //       clearData['expirationDate'] = undefined
  //       clearData['manufacturingDate'] = undefined
  //       clearData['serialNumber'] = ''
  //     }
  //     setManualAssetInputFormData((currentData) => ({
  //       ...currentData,
  //       ...clearData,
  //       udi: udiValue,
  //     }))
  //     return
  //   }

  //   if (udiFormat === 'GS1') {
  //     const parsedGS1 = parseGS1(udiValue)
  //     setManualAssetInputFormData((currentData) => ({
  //       ...currentData,
  //       ...quickParseGS1ToFormData(parsedGS1),
  //       udi: udiValue,
  //     }))
  //   } else {
  //     parseGudid(udiValue)
  //       .then((data) => {
  //         if (data) {
  //           setManualAssetInputFormData((currentData) => ({
  //             ...currentData,
  //             ...parsedUDIToFormData(data),
  //             udi: udiValue,
  //           }))
  //         }
  //       })
  //       .catch((_) => {
  //         setManualAssetInputFormData((currentData) => ({
  //           ...currentData,
  //           udi: udiValue,
  //         }))
  //       })
  //   }
  // }

  const inputProps = {
    handleChangeFormData,
  }

  // if (parseGudidQuery.isLoading) {
  //   return <LoadingIndicator />
  // }

  return (
    <>
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
              {/* <DateInput
                {...inputProps}
                id="manufacturingDate"
                label="Manufacturing / Production Date (optional)"
                name="manufacturingDate"
                error={manualAssetInputFormErrors.manufacturingDate}
                value={manualAssetInputFormData.manufacturingDate}
                handleChangeFormErrorField={handleChangeFormErrorField}
                helperText={
                  <>
                    Please follow the required format (YYYY/MM/DD)
                    <br />
                    An asset's manufacturing / production date may be preceded
                    by (11)
                  </>
                }
              /> */}
              {/* <DateInput
                {...inputProps}
                id="expirationDate"
                label="Expiration Date (optional)"
                name="expirationDate"
                error={manualAssetInputFormErrors.expirationDate}
                value={manualAssetInputFormData.expirationDate}
                handleChangeFormErrorField={handleChangeFormErrorField}
                helperText={
                  <>
                    Please follow the required format (YYYY/MM/DD)
                    <br />
                    An asset's expiration date may be preceded by (17)
                  </>
                }
              /> */}
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
