const submit = document.querySelector("#submit");
const output = document.querySelector("#output");
const bod= document.querySelector("#bod");
const waiting = document.querySelector("#waiting")

function findPalindrome(date)
{
  for(let i = 0 ;i<date.length;i++)
  {
      //last no. -> length - 1 ,(i.e length - (i+1))
      if(date[i] != date[date.length-(i+1)])
      {
          return false;
      }
  }
  return true;
}

function nearestPalindrome(dd,mm,yy)
{
//to count the gap
  var counter =0;
  var date={
      day:dd,
      month:mm,
      year:yy
  }
  var nextDate = getNextDate(date)
  while(true)
  {
    counter = counter +1;
    //Because in GetNextDate the values are in number , so instead of 02 it would be 2 . 
    //So that is why adding a 0 manually
    if(nextDate.day<10)
    {
        nextDate.day ="0"+nextDate.day;
    }
    if(nextDate.month<10)
    {
        nextDate.month ="0"+nextDate.month;
    }
    //1st is made string so that they join and donot actually get added
    newDate= nextDate.day.toString() + nextDate.month+nextDate.year;

    var flag = findPalindrome(newDate)
    if(flag)
    {
        break;
    }
    date={
        day:nextDate.day,
      month:nextDate.month,
      year:nextDate.year
    }
    nextDate = getNextDate(date)
    
  
  }
  return [nextDate,counter];

}

function getNextDate(date)
{
    var day = Number(date.day)+1;
    var month = Number(date.month);
    var year = Number(date.year);

    var daysOfMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]
    if (month === 2) {
        if (leapYear(year)) {
          if (day > 29) {
            day = 1;
            month++;
          }
        }
    
    
        else {
          if (day > 28) {
            day = 1;
            month++;
          }
        }
      }
      else {
        if (day > daysOfMonth[month - 1]) {
          day = 1;
          month++
        }
      }
    
      if (month > 12) {
        month = 1;
        year++;
      }
      
      return {
        day: day,
        month: month,
        year: year
      };
    
}

function leapYear(year) {

    if (year % 400 === 0) {
      return true;
    } else
      if (year % 100 === 0) {
        return false;
      } else
        if (year % 4 === 0) {
          return true;
        } else {
          return false;
        }
  }

function checkDate()
{
    setTimeout(function(){
    waiting.style.display = "none"
    if(bod.value)
    {
      const array = bod.value.split("-");
      let dd = array[2];
      let mm = array[1];
      let yy = array[0];

      /*sending this and not directly bod.value , as 
      bod.value is yyyymmdd , but to find palindrome
      we need ddmmyyyy(same as input)
      */

      let isPalindrome = findPalindrome(dd+mm+yy)
      if(isPalindrome)
      {
        output.innerText ="Yeah! Your Birthdate is a Palindrome" 
      }
      else
      {
        var nextDate = nearestPalindrome(dd,mm,yy)
        output.innerText ="Oh! Your Birthdate is Not a Palindrome. You missed by " +nextDate[1] +" days. Next Palindrome date is on " +nextDate[0].day+"-"+nextDate[0].month +"-"+nextDate[0].year; 
      }
    }
    else
    {
        output.innerText ="Enter the Date to Find Out whether it's a Palindrome"
    }
},2000)
output.innerText="";
waiting.style.display = "block"
}


submit.addEventListener("click",checkDate)

