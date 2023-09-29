import { DEPATURE_DATE, NORMAL_DATE } from "../type"

export const depatureDateAction = (departureDate)=>async dispatch=>{
dispatch({type : DEPATURE_DATE, payload: departureDate})
}
export const dateAction = (dateAction)=>async dispatch=>{
dispatch({type : NORMAL_DATE, payload: dateAction})
}