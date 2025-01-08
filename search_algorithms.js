
// returns index of found value, else returns -1
function linearSearch(arr, value){
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === value){
            return i;
        }
    }
    return -1;
}

// returns index of found value, else returns -1
// arr must be a sorted array for function to work
function binarySearch(arr, low, high, value){
    if (low > high){
        return -1;
    }
    
    let midpoint = Math.floor((low + high)/2);
    if (value === arr[midpoint]){
        return midpoint;
    }
    else if (value < arr[midpoint]){
        return binarySearch(arr, low, midpoint-1, value);
    }
    else if (value > arr[midpoint]){
        return binarySearch(arr, midpoint+1, high, value);
    }

}


let a = [6, 12, 14, 18, 22, 39, 55, 182];
let index = binarySearch(a, 0, a.length -1, 55);
console.log(index);