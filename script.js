
// mean logic version 1
const getMean =(array)=>{
    // takes an array and applies a callback function to condense array into a single value
    // callback function takes two params, accumulator and the current el in array
    // return value becomes the value of accumulator on next iteration
    // reduce takes TWO arguements
    // set initial value to 0 to avoid unexpected results
    const sum = array.reduce((acc, el) => acc + el, 0);

    // calculates the mean by dividing the sum of numbers by count of numbers in list
    const mean = sum/array.length

    return mean
}
// mean logic version 2 using implicit return of arrow function
// const getMean = (array) => array.reduce((acc, el) => acc + el, 0) / array.length;


const getMedian =(array)=>{

    // sort from least to greatest
    // by default converts el of array into strings, then sort alphabetically
    // pass callback with 2 agruements being compared 
    // func returns val lessthan 0 if 1st el should come before 2nd
    // a val greater than 0 if 1st el come after 2nd
    // & 0 if both el should remain in current positions
    // sort() mutates array and is bad pratice to do so on function params
    // slice() makes a shallow copy of array, which we are free to mutate
    const sorted = array.slice().sort((a,b)=>{
        return a-b
    })

    // checks if array has even amount of #
    if(sorted.length % 2 === 0){
        // finds the 2 middle #'s
        const firstMiddleNumber  = sorted[sorted.length / 2 - 1]
        const secondMiddleNumber  = sorted[sorted.length / 2]
        // returns the #'s passed into the getMean(), as a SINGLE array
        return getMean([firstMiddleNumber,secondMiddleNumber])
    }else{
        // if odd amount of #'s in array, this finds and returns it
        return sorted[Math.floor(sorted.length / 2)]
    }

    // 2nd possibility using tenary option
    // const median = array.length % 2 === 0
    //     ? getMean([sorted[array.length / 2], sorted[array.length / 2 - 1]])
    //     : sorted[Math.floor(array.length / 2)];
    // return median;

}

const getMode = (array) => {

    const counts = {};

    // loop counts frequency of occurence 
    array.forEach((el)=>{
        // checks if el is found inside array, if so it increments by 1
        if(counts[el]){
            counts[el] += 1;

        // if el not in el, it basically adds to array
        } else {
            counts[el] = 1;
        }
    })

    // a Set is a data structure that only allows unique values
    // if passed an array Set construcor will remove duplicates
    // size property being = 1 tells every value appears same # of times
    if(new Set(Object.values(counts)).size === 1 ){
        return null
    }

    const highest = Object.keys(counts).sort((a,b)=>{
        return counts[b]-counts[a]
        
    })[0]

    const mode = Object.keys(counts).filter((el)=>{
        return counts[el] === counts[highest]
    })

    return mode.join(', ')

}

const getRange =(array)=>{
    return Math.max(...array) - Math.min(...array) 
}

const getVariance =(array)=>{
    const mean = getMean(array)

    const variance = array.reduce((acc,el)=>{
        // calculate how far each element is from mean
        const difference = el - mean

        // square each of the differences
        const squared = difference ** 2

        // take the sum of the squared differences
        return acc + squared

        

    }, 0)/array.length; // set inital value to 0 & divides variance by length of array

    return variance

}

const getStandardDeviation =(array)=>{
    const variance = getVariance(array)

    //.pow() is used to calculate exponents
    // const standardDeviation = Math.pow(variance, 1/2)

    //.sqrt() specifically for finding the square root of a number
    const standardDeviation = Math.sqrt(variance)

    return standardDeviation
}

// calculate logic version 1
const calculate = () => {
    const value = document.querySelector("#numbers").value;
  
    // split() method takes string and splits it into an array of strings
    // you can pass it characters or a RegEx ti uses as a separator
    const array = value.split(/,\s*/g)

    // value of an input el is ALWAYS a string, EVEN if the input type is number
    // map() converts array of strings to array of numbers
    // map() creates a NEW array, instead of mutating the original
    // map() takes callback funciton as its FIRST argument
    const numbers = array.map((el)=>{
        return Number(el) // Return the converted number

        // filter() is a array method,
        // allows you to filter el or of array, creating a new array
    }).filter((el)=>{

        // isNaN() returns true if arguement is NaN
        return !isNaN(el) // Return the result of the check
    })

    const mean = getMean(numbers)
    const median = getMedian(numbers);
    const mode = getMode(numbers)
    const range = getRange(numbers)
    const variance = getVariance(numbers)
    const standardDeviation  = getStandardDeviation(numbers)

    // sets text in html to the value of mean, median
    document.querySelector('#mean').textContent = mean 
    document.querySelector("#median").textContent = median;
    document.querySelector("#mode").textContent = mode;
    document.querySelector("#range").textContent = range;
    document.querySelector("#variance").textContent = variance;
    document.querySelector("#standardDeviation").textContent = standardDeviation;
}
// calculate logic version 2 using implicit return of arrow function
// const calculate = () => {
//     const value = document.querySelector("#numbers").value;
//     const array = value.split(/,\s*/g);
//     const numbers = array.map(el => Number(el)).filter(el => !isNaN(el));
    
//     const mean = getMean(numbers);
  
//     document.querySelector("#mean").textContent = mean;
// }