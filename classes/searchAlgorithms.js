
// returns index of found value, else returns -1
// finds a specific value within a list by sequentially checking each element one by one until the desired value is found or the end of the list is reached
function linear_Search(arr, value){
    for(let i = 0; i < arr.length; i++){
        if (arr[i] === value){
            return i;
        }
    }
    return -1;
}


// returns index of found value, else returns -1
// finds an item in a SORTED list by repeatedly dividing the list in half until the item is found
function binary_Search(arr, low, high, value){
    if (low > high){
        return -1;
    }
    
    let midpoint = Math.floor((low + high)/2);
    if (value === arr[midpoint]){
        return midpoint;
    }
    else if (value < arr[midpoint]){
        return binary_Search(arr, low, midpoint-1, value);
    }
    else if (value > arr[midpoint]){
        return binary_Search(arr, midpoint+1, high, value);
    }

}


// search algorithm that works by estimating the probable position of a target element 
// within a sorted array, based on the value of the target element and the values at the 
// boundaries of the search space
function interpolation_Search(arr, low, high, value){
    if (low === high || arr[low] === arr[high]){
        return -1;
    }
    
    let mid = Math.floor(low + ((high - low) / (arr[high] - arr[low])) * (value - arr[low])); 

    if (arr[mid] === value){
        return mid;
    }
    else if (arr[mid] < value){
        return interpolation_Search(arr, mid +1, high, value);
    }
    else if (arr[mid] > value){
        return interpolation_Search(arr, low, mid - 1, value);
    }
}


// searching algorithm used on sorted arrays where, instead of checking each element sequentially, 
// it "jumps ahead" by a fixed step size to quickly narrow down the search area, then performs 
// a linear search within that block to find the target element
function jump_search(arr, value){
    let blockSize = Math.floor(Math.sqrt(arr.length - 1));
    let start = 0;
    let end = blockSize;
    while (arr[end] <= value && end < arr.length){
        start = end;
        end += blockSize;
        if (end > arr.length - 1){
            end = arr.length;
        }
    }
    for (let i = start; i < end; i++){
        if(arr[i] === value){
            return i;
        }
    }
}


// search algorithm used to find a specific value within a sorted array, where it first rapidly jumps 
// through the array by doubling the search interval until it finds a range where the target value could potentially lie, 
// and then performs a binary search within that narrowed range to pinpoint the exact location of the target value
function exponetial_Search(arr, value){
    if (arr[0] === value){
        return 0;
    }

    let blockSize = 1;

    while (arr[blockSize] <= value && blockSize < arr.length){
        blockSize *= 2;
    }

    return binary_Search(arr, Math.floor(blockSize/2), Math.min(blockSize, arr.length), value);
}


// a divide-and-conquer algorithm used to search for an element within a sorted array by 
// dividing the search space into unequal parts based on Fibonacci numbers
function fibonacci_Search(arr, value){
    let offset = -1;
    let fm2 = 0;
    let fm1 = 1;
    let fm = fm2 + fm1;
    while (fm < arr.length){
        fm2 = fm1;
        fm1 = fm;
        fm = fm2 + fm1;
    }
    while (fm > 1){
        let i = Math.min(offset + fm2, arr.length - 1);
        if(arr[i] < value){
            fm = fm1;
            fm1 = fm2;
            fm2 = fm- fm1;
            offset = i;
        }
        else if (arr[i] > value){
            fm = fm2;
            fm1 = fm1 - fm2;
            fm2 = fm - fm1;
        }
        else{
            return i;
        }
    }
    if (fm1 == 1 && arr[offset + 1] == value){
        return offset + 1;
    }
    return -1;
}


// checks if a smaller list (called a sublist) exists within a larger list
function sublist_Search(arr1, arr2){
    if (arr1.length === 0 && arr2.length === 0){
        return true;
    }
    else if(arr1.length === 0 && arr2.length > 0){
        return false;
    }
    else if(arr2.length === 0 && arr1.length > 0){
        return false;
    }
    let list_ptr = 0;
    let ptr1 = list_ptr;
    let ptr2 = 0;
    while (arr2.length <= arr1.length - list_ptr && ptr2 < arr2.length){
        if(arr1[ptr1] === arr2[ptr2] && ptr2 === arr2.length - 1){
            return true;
        }
        else if (arr1[ptr1] === arr2[ptr2]){
            ptr1++;
            ptr2++;
        }
        else{
            list_ptr++;
            ptr1 = list_ptr;
            ptr2 = 0;
        }
    }
    return false;
}


let a = [6, 12, 14, 18, 22, 39, 55, 182];
let b = [12, 14, 18];
let bin_index = binary_Search(a, 0, a.length -1, 55);
let int_index = interpolation_Search(a, 0, a.length - 1, 6);
let jmp_index = jump_search(a, 12);
let exp_index = exponetial_Search(a, 182);
let fib_index = fibonacci_Search(a, 12);
let sub_bool = sublist_Search(a, b);
console.log(bin_index);
console.log(int_index);
console.log(jmp_index);
console.log(exp_index);
console.log(fib_index);
console.log(sub_bool);

