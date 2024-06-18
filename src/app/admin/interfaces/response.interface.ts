import { Debts, DebtsType } from "./debts.interface"
import { Sale } from "./sales.interface"


export interface DebtsTypeResult {
  success: boolean
  api_message: string,
  data: Debts
}

export interface getDebtsTypeResult {
  success: boolean
  api_message: string,
  data: DebtsType[]
}

export interface DeleteDebtsTypeResult {
  success: boolean
  api_message: string,
  data: DebtsType
}


export interface getSalesResult {
  success: boolean
  api_message: string,
  data: Sale[]
}

export interface getDebtsResult {
  success: boolean
  api_message: string,
  data: Debts[]
}
