

export interface Debts {
  _id:string,
  type?:DebtsType,
  money?:number,
  date?:string,
  description?:string,
  owner?:string
}


export interface DebtsType{
  _id?:string,
 name?:string;
 status?:boolean;
}
