/*
Grant Schumacher
07-21-21
The following code is a javascript solution using a quicksort based algorithm to sort dates under a specific format of
three character month, one or two digit day followed by a comma, and four digit year format.
*/

//String of dates in specified format
const data = ['Oct 2, 2009', 'Nov 10, 2011', 'Jan 10, 2001', 'Oct 2, 2010', 'Jun 21, 2021', 'Oct 3, 2010', 'Jan 01, 2000']

//Returns the year of an element in the specified date format
function getYear(date){
  return date.substr(date.length-5);
}

//Returns integer value of the day of an element in the specified date format
function getDay(date){
  var monthDay = date.substring(0, date.indexOf(','));
  var day = (monthDay.replace(/\D/g,'')); //Regex to remove any character that is not a digit.
  return day;
}

//Returns an integer value of the month of an element in the specified date format
function getMonth(date){
  //An integer value assigned to each month for comparison
  let months = {
    Jan: 1,
    Feb: 2,
    Mar: 3,
    Apr: 4,
    May: 5,
    Jun: 6,
    Jul: 7,
    Aug: 8,
    Sep: 9,
    Oct: 10,
    Nov: 11,
    Dec: 12
  };
  var monthDay = date.substring(0, date.indexOf(',')); //Get the first half of the string seperated by comma
  var month = monthDay.replace(/[^a-zA-Z]+/g, ''); //Regex to remove anything that is not an alphabet letter
  return months[month]; //Return the assocaited integer value for that month

}

//Returns array of dates sorted in descening date order (most recent date first)
function quick_sort_dates(arr){
  if(arr.length <= 1){ //Base case
    return arr;
  }else{
    var left = []; //Most recent dates first
    var right = []; //Oldest dates last
    var newArray = []; //New date array sorted from most recent date to least recent date (descending date order)
    var pivot = arr.pop(); //Abritrarily choose last element of array as pivot
    var length = arr.length; //Length of the date arrays

    for(var i = 0; i < length; i++){
      if(compare_dates(arr[i], pivot)){ //If the date is more recent push it into the recent date array
        left.push(arr[i]);
      }else{ //If date is less recent push it into the less recent date array
        right.push(arr[i]);
      }
    }

    //Recursivley call until all date elements have been properly placed
    return newArray.concat(quick_sort_dates(left), pivot, quick_sort_dates(right));
  }
}

//Returns true if the first date is more recent than the second date
function compare_dates(first, second){
  if(getYear(first) > getYear(second)){
    return true;
  }else if(getYear(first) < getYear(second)){
    return false;
  }else{ //If same year sort the date by month
    if(getMonth(first) > getMonth(second)){
      return true;
    }else if(getMonth(first) <getMonth(second)){
      return false;
    }else{ //If same month sort the date by day
      if(getDay(first) > getDay(second)){
        return true;
      }else if(getDay(first) < getDay(second)){
        return false;
      }else{ //If exact same date then swapping is irrelevant, so return true
        return true;
      }
    }
  }
}


console.log(quick_sort_dates(data));
