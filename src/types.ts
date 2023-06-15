// import { MutationResult } from '@apollo/client'
// import { UseQueryResult } from 'react-query/types/react'
// import { User as Auth0User } from '@auth0/auth0-react'


export type GenericObject = { [s: string]: any }
export interface ManualInputFormData {
  deviceId: AssetData['deviceId']
  deviceCount: AssetData['deviceCount']
  lotBatch?: string
  serialNumber?: Scan['serialNumber']
  expirationDate?: Scan['expirationDate'] | null
  manufacturingDate?: Scan['manufacturingDate'] | null
  deviceDescription?: Scan['deviceDescription'] | null
  companyName?: Scan['companyName'] | null
  udi?: string | null
}
export interface Procedure {
  _id: string
  assetGroups: AssetData[]
  dateTime: string
  name: string
  trays: string[]
  activeTray?: string | null
  status: ProcedureStatus
  statuses: ProcedureStatus[]
  surgery: Surgery
  authorizedCompanies: Company[]
  authorizedScanCompanies: Company[]
  authorizedProductReps: string[]
  isTestProcedure: boolean
}


// END types neede for manuel asset entry...


export interface AssetData {
  _id: string
  catalogNumber?: string | null
  deviceDescription: string
  deviceId: string
  deviceCount: number
  tray?: string | null
  versionModelNumber: string
  name: string
  sizeText?: string | null
  sizeString?: string | null
  scans: Scan[]
  total: number
  in: number
  out: number
  wasted: number
  implanted: number
  groupIds?: Set<string>
  bidAssetId: number
  bidAssetInstanceId: number
}

export interface Facility {
  _id: string
  name: string
  assetTypes: OptionObjectPair[]
  implantSiteList: string[]
  useImplantSite: boolean
  hasWastedReasons: boolean
  wastedReasons: OptionObjectPair[]
}

export interface Company {
  name: string
  emailDomain?: string
  _id: string
}

export type OptionObjectPair = {
  value: string
  label: string
}

export type ProcedureStatus = {
  name: 'SCANNING' | 'SUBMITTED'
  user: string
  dateTime: string
}



export interface DerivedProcedureStatus {
  name: 'SCANNING' | 'PRE_APPROVAL' | 'APPROVED' | 'SUBMITTED'
  workflow: 'rep' | 'no-rep'
  totalScanned: number
  hasImplantableHardware: boolean
  scans: Scan[]
  implantableScans: Scan[]
  implantableScansByStatus: {
    SCANNED: Scan[]
    PRE_APPROVAL: Scan[]
    APPROVED: Scan[]
  }
  implantableScanIdsByStatus: {
    SCANNED: Scan['_id'][]
    PRE_APPROVAL: Scan['_id'][]
    APPROVED: Scan['_id'][]
  }
}

export interface Surgery {
  _id: string
  patient: Patient
  procedures: Procedure[]
  attendingSurgeon?: {
    provider: Provider
  }
}

export interface Provider {
  _id: string
  firstName: string
  lastName: string
}

export interface Patient {
  _typename: string
  dateOfBirth: string
  firstName: string
  lastName: string
  middleName: string
}

// export type AssetQuery = UseQueryResult<GenericObject | null, unknown>

export interface AssetDisposition {
  finalDisposition?: string
  implantSite?: string
  wastedReason?: string
  consumableCount?: string
}

export interface AssetFormData {
  assetType?: string
  dispositions: Record<number, AssetDisposition>
  tray?: string
}

export interface RepApprovalFormData {
  repName: string
  approvedAt: string
}



export interface FormValidationProps {
  formData: GenericObject
  schema: any
}


// export type DeleteProcedureAssetGroupsMutation = MutationResult

export type AssetsGroupedByCategory = {
  plates: AssetData[]
  mesh: AssetData[]
  screws: AssetData[]
  other: AssetData[]
  consumables?: AssetData[]
}

export interface AssetsGroupedBySubCategory {
  [s: string]: GenericObject
}

export interface AssetsGroupedByAssetType {
  [s: string]: AssetData[]
}

export interface ScansGroupedBySubCategory {
  [s: string]: {
    [s: string]: number
  }
}

export interface Scan {
  _id: string
  betterId: number
  assetType: string
  category: string | null
  catalogNumber?: string | null
  deviceDescription: string | null
  expirationDate: string | null
  implantSite: string | null
  implantStatus: 'IMPLANTED' | 'WASTED' | 'ASSOCIATED_ASSET'
  implantTime: string
  companyName: string
  manufacturingDate: string | null
  versionModelNumber: string
  name: string | null
  serialNumber: string | null
  sizeText?: string | null
  sizeString?: string | null
  wastedReason: string | null
  count: number | null
  status: AssetStatus
  statuses: AssetStatus[]
  bidAssetId: number
  bidAssetInstanceId: number
}

export type AssetStatus = {
  name: 'SCANNED' | 'PRE_APPROVAL' | 'APPROVED'
  companyName: string | null
  userName: string
  userId: string
  signature: {
    signature: string
    date: string
  } | null
  sendToCompany: string | null
}

export interface Company {
  _id: string
  name: string
  emailDomain?: string
  authorizedProcedures?: Procedure[]
}

export type UserMetadata = {
  first_name?: string
  last_name?: string
  mobile_number?: string
}

export type AppMetadata = {
  company?: string
  inviteCode?: string
  invitePending?: boolean
}

export type Role = 'MGAT_NURSE' | 'MGAT_REP' | 'MGAT_NURSEADMIN'

export interface AuthUser extends Auth0User {
  // These optional properties are required, see defaults here: https://github.com/auth0/auth0-spa-js/blob/master/src/global.ts
  email: string
  sub: string

  // These properties are added within Auth.tsx by parsing custom claims
  user_metadata: UserMetadata
  app_metadata: AppMetadata
  roles: Role[]
  facility?: string
}

export interface User extends AuthUser {
  userName: string
  _id: string
  firstName: string
  lastName: string
  mobileNumber: string
  isRep: boolean
  isNurse: boolean
  isNurseAdmin: boolean
  companyName?: string
  company?: Company
  provider?: Provider
  isAccountCreated: boolean
}

export interface UserInput {
  firstName: string
  lastName: string
  email: string
  mobileNumber?: string
  companyName: String
}

export interface SalesRep {
  _id: string
  auth0id: string
  firstName: string
  lastName: string
  email: string
  mobileNumber: string
  companyName: string
  kind: string
}

export type LocationState = {
  isNewRep?: boolean
  from: {
    pathname: string
  }
}

export type Workflow = 'rep' | 'no-rep'

export type AlertTypes = 'error' | 'errorInfo' | 'success' | 'info' | 'warning'

export interface PageInfo {
  totalCount?: number
  currentPage: number
  hasNextPage: boolean
  hasPreviousPage: boolean
  count: number
}

export interface PagedQuery<T> {
  results: T[]
  pageInfo: PageInfo
}

export type AccessLogPage = PagedQuery<AccessLog>

export interface AccessLog {
  _id: string
  user: User
  operation: string
  inputData: string
  outputData: string
  createdAt: string
  updatedAt: string
}

export interface AccessLogFilterInput {
  user?: string
  before?: string
  after?: string
}
