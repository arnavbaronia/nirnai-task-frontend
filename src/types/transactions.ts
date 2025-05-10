export interface Transaction {
  id: number
  serialNumber: string | null
  documentNumber: string | null
  documentYear: string | null
  executionDate: string | null
  presentationDate: string | null
  registrationDate: string | null
  nature: string | null
  executants: string | null
  claimants: string | null
  volumeNumber: string | null
  pageNumber: string | null
  considerationValue: string | null
  marketValue: string | null
  prNumber: string | null
  propertyType: string | null
  propertyExtent: string | null
  village: string | null
  street: string | null
  surveyNumbers: string | null
  plotNumber: string | null
  remarks: string | null
  createdAt: string
}