export interface Transaction {
  documentNumber: string
  date: string
  buyer: string
  seller: string
  houseNumber?: string
  surveyNumber?: string
  value: string
  [key: string]: string | undefined
}