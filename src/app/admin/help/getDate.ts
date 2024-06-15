import moment from "moment"


export const getDate = ( date?: string ): string =>{




  if(date){
    const srt = date.split('-');
    return `${srt[2]}/${srt[1]}/${srt[0]}`
  }





  // console.log(moment("2024-05-29", "DD-MM-YYYY"));
  // const p =`${moment().format('DD')}/${moment().format('MM')}/${moment().format('YYYY')}`

  // console.log('date1:' +moment("10/06/2024", "DD-MM-YYYY") +'\n'+'date2:'+p);

  // console.log( moment("10/06/2024", "DD-MM-YYYY").isSame(moment(new Date() , "DD-MM-YYYY")));

  // if( moment("10/06/2024", "DD-MM-YYYY").isSame(moment(p , "DD-MM-YYYY"))) {
  //   console.log('siiiiiiiiiiiiiiiiiiiiii');

  // }

  return `${moment().format('DD')}/${moment().format('MM')}/${moment().format('YYYY')}`;
}
