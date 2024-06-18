import moment from "moment"

export const getDate = ( date?: string ): string => {
  if(date){
    const srt = date.split('-');
    return `${srt[2]}/${srt[1]}/${srt[0]}`
  }

  return `${moment().format('DD')}/${moment().format('MM')}/${moment().format('YYYY')}`;
}
