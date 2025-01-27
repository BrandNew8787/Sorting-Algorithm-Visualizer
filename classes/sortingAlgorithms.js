/*
A simple sorting algorithm that repeatedly iterates through a list, 
comparing adjacent elements and swapping them if they are in the wrong order.
Can be inefficient for large datasets due to its time complexity of O(n^2).
*/
export function bubble_sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                let temp = arr[j];
                arr[j] = arr[i];
                arr[i] = temp;
            }
        }
    }
    return arr;
}

/*
A simple sorting algorithm that works by iteratively taking one element from 
an unsorted list and inserting it into its correct position within a growing sorted sublist.
Can be inefficient for large datasets due to its time complexity of O(n^2).
*/
function insertion_sort(arr) {
    for (let i = 1; i < arr.length; i++) {
        let key = arr[i];
        let j = i - 1;

        /* Move elements of arr[0..i-1], that are
           greater than key, to one position ahead
           of their current position */
        while (j >= 0 && arr[j] > key) {
            arr[j + 1] = arr[j];
            j -= 1;
        }
        arr[j + 1] = key;
    }
    return arr;
}

/*
A sorting algorithm that repeatedly finds the minimum element in the unsorted portion 
of an array and swaps it with the element at the beginning of the unsorted section.
Can be inefficient for large datasets due to its time complexity of O(n^2).
*/
function selection_sort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let min_j = i;
        let min = arr[i];
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[j] < min) {
                min_j = j;
                min = arr[j];
            }
        }
        arr[min_j] = arr[i];
        arr[i] = min;
    }
    return arr;
}

/*
A sorting algorithm that utilizes the "divide and conquer" strategy, where a list 
is repeatedly divided into smaller sublists until each sublist contains only one element, 
and then these sublists are merged back together in a sorted order, effectively sorting the entire list. 
Considered one of the most efficient sorting algorithms due to its time complexity of O(n log n).
*/
function merge_sort(arr) {
    if (arr.length == 1) {
        return arr;
    }
    let a1 = arr.slice(0, Math.floor(arr.length / 2));
    let a2 = arr.slice(Math.floor(arr.length / 2));
    a1 = merge_sort(a1);
    a2 = merge_sort(a2);
    return merge(a1, a2);
}

/*
A utility function used in merge sort to merge two sorted arrays (a1 and a2) into a single sorted array.
This function ensures that elements from both arrays are compared and placed in the correct order.

Time Complexity: O(n), where n is the total number of elements in a1 and a2.
Space Complexity: O(n), as it creates a new array to hold the merged result.
*/
function merge(a1, a2) {
    let arr = [];
    while (a1.length !== 0 && a2.length !== 0) {
        if (a1[0] > a2[0]) {
            arr.push(a2[0]);
            a2.splice(0, 1); // Remove the smallest element from a2
        } else {
            arr.push(a1[0]);
            a1.splice(0, 1); // Remove the smallest element from a1
        }
    }
    // Add any remaining elements from a1 or a2
    if (a1.length !== 0) {
        arr.push(...a1);
    }
    if (a2.length !== 0) {
        arr.push(...a2);
    }
    return arr;
}

/*
An improved version of insertion sort that compares elements far apart first, reducing the number of shifts 
needed when compared to simple insertion sort. Uses a gap sequence that decreases over time.

The choice of gap sequence affects its performance; common sequences include Shell's, Hibbard's, and Sedgewick's.

Time Complexity: Depends on the gap sequence, commonly O(n^(3/2)) or O(n log^2 n) for practical implementations.
*/
function shell_sort(arr) {
    let interval = Math.floor(arr.length / 2);
    while (interval > 0) {
        for (let i = interval; i < arr.length; i++) {
            let temp = arr[i];
            let j = i;
            while (j >= interval && arr[j - interval] > temp) {
                arr[j] = arr[j - interval];
                j -= interval;
            }
            arr[j] = temp;
        }
        interval = Math.floor(interval / 2);
    }
    return arr;
}

/*
A comparison-based sorting algorithm that utilizes a binary heap data structure to efficiently sort 
an array by repeatedly extracting the largest element (from the root of the heap) and placing it at 
the end of the array, effectively building a sorted sequence.

Results in a time complexity of O(n log n) for all cases.
*/
function heap_sort(arr) {
    const n = arr.length;

    // Step 1: Build the Max Heap
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        heapify(arr, n, i);
    }

    // Step 2: Extract elements from the heap one by one
    for (let i = n - 1; i > 0; i--) {
        // Move the current root (largest) to the end
        [arr[0], arr[i]] = [arr[i], arr[0]];

        // Heapify the reduced heap
        heapify(arr, i, 0);
    }

    return arr;
}

/*
A helper function for heap sort that ensures the subtree rooted at index `i` satisfies the max heap property.
This means the parent node is greater than or equal to its child nodes.

Parameters:
- arr: The array representing the heap.
- n: The size of the heap (may be smaller than arr.length during sorting).
- i: The index of the root node of the subtree to heapify.

Time Complexity: O(log n), as the height of the heap determines the number of recursive calls.
*/
function heapify(arr, n, i) {
    let largest = i;         // Assume the root is the largest
    const left = 2 * i + 1;  // Left child index
    const right = 2 * i + 2; // Right child index

    // Check if left child exists and is greater than root
    if (left < n && arr[left] > arr[largest]) {
        largest = left;
    }

    // Check if right child exists and is greater than largest so far
    if (right < n && arr[right] > arr[largest]) {
        largest = right;
    }

    // If the largest is not the root, swap and continue heapifying
    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        // Recursively heapify the affected subtree
        heapify(arr, n, largest);
    }
}


/*
A sorting algorithm that works by dividing elements of a dataset into a set of "buckets" 
based on their value range, then sorting each bucket individually and finally combining 
them to produce a fully sorted list.

Best case: O(n) - when elements are uniformly distributed across buckets.
Average case: O(n + k)
Worst case: O(n²) - when all elements fall into one bucket
*/
function bucket_sort(arr) {
    if (arr.length <= 1) return arr;

    // Step 1: Find the minimum and maximum values
    let min = Math.min(...arr);
    let max = Math.max(...arr);

    // Step 2: Normalize and distribute into buckets
    let bucketCount = Math.ceil(Math.sqrt(arr.length)); // Number of buckets
    let buckets = Array.from({ length: bucketCount }, () => []);

    for (let i = 0; i < arr.length; i++) {
        let normalized = (arr[i] - min) / (max - min); // Normalize to [0, 1]
        let bucketIndex = Math.floor(normalized * (bucketCount - 1)); // Determine bucket
        buckets[bucketIndex].push(arr[i]);
    }

    // Step 3: Sort each bucket and concatenate
    let sortedArray = [];
    for (let bucket of buckets) {
        sortedArray.push(...insertion_sort(bucket)); // Use insertion sort for each bucket
    }

    return sortedArray;
}


/*
A sorting algorithm that efficiently sorts data by counting the occurrences of each distinct element 
within a given range, storing these counts in a separate array, and then using those counts to determine 
the final sorted position of each element.

The time complexity of Counting Sort is O(n + k), where "n" is the number of elements in the input array 
and "k" represents the range of values within the input data; essentially, it takes O(n) time to count 
elements and O(k) time to iterate through the range of possible values.
*/
function counting_sort(arr){
    if (arr.length <= 1){
        return arr;
    }
    
    let max = Math.max(...arr) + 1;

    let c = Array(max + 1).fill(0);
    for(let j = 0; j < arr.length; j++){
        c[arr[j]] += 1;
    }
    for(let i = 1; i < max; i++){
        c[i] = c[i] + c[i - 1];
    }
    let b = Array(arr.legnth).fill(0);
    for (let j = a.length - 1; j >= 0; j--){
        b[c[arr[j]] - 1] = arr[j];
        c[a[j]] -= 1;
    }
    return b;
}


/*
A non-comparison based sorting algorithm that sorts data by repeatedly grouping elements based on their individual 
digits (or "radix"), processing them digit by digit, starting from the least significant digit to the most significant 
digit, effectively organizing elements into buckets based on each digit's value at a specific place value.

The time complexity of Radix Sort is O(n * d), where "n" is the number of elements in the array and "d" is the number 
of digits in the largest number (or the maximum number of significant digits) in the input data.
*/
function radix_sort(arr){
    let max = arr[0];
    for (let i = 0; i < arr.length; i++){
        if (arr[i].toString().length > max.toString().length){
            max = arr[i];
        }
    }

    for (let pos = 1; max / pos > 0; pos*=10){
        radix_count_sort(arr, pos);
    }
    return arr;
}

function radix_count_sort(arr, pos){
    let output = Array(arr.length).fill(0);
    let c = Array(10).fill(0);

    for(let j = 0; j < arr.length; j++){
        let digit = Math.floor(arr[j] / pos) % 10;
        c[digit] += 1;
    }
    for(let i = 1; i < 10; i++){
        c[i] += c[i - 1];
    }
    for (let j = arr.length - 1; j >= 0; j--){
        let digit = Math.floor(arr[j] / pos) % 10;
        output[c[digit] - 1] = arr[j];
        c[digit] -= 1;
    }
    for(let i = 0; i < arr.length; i++){
        arr[i] = output[i];
    }
}


/*
A highly efficient sorting algorithm that uses a "divide and conquer" strategy to sort data by selecting a "pivot" element, 
partitioning the array into elements smaller and larger than the pivot, and then recursively sorting each partition until the entire array is ordered.

Best and average cases:
Quicksort's best and average-case time complexity is \(O(n\log n)\) because it uses a divide-and-conquer approach.  

Worst case:
Quicksort's worst-case time complexity is \(O(n^{2})\) when the pivot choice results in unbalanced partitions. 
This can happen when the array is already sorted or when the pivot is consistently the smallest or largest element. 
*/
function quick_sort(arr, left, right){
    if(right - left <= 0){
        return;
    }
    else{
        let partitionPoint = partition(arr, left, right);
        quick_sort(arr, left, partitionPoint-1);
        quick_sort(arr, partitionPoint + 1, right);
    }
    return arr;
}


function partition(arr, left, right) {
    let pivot = arr[right]; // Choose pivot as the rightmost element
    let i = left - 1; // Pointer for elements smaller than pivot

    for (let j = left; j < right; j++) {
        if (arr[j] <= pivot) {
            i++;
            swap(arr, i, j); // Swap smaller element to the left
        }
    }
    swap(arr, i + 1, right); // Place pivot in its correct position
    return i + 1; // Return pivot index
}

function swap(arr, i, j) {
    let temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
}


// Example usage:
let a = [5, 2, 6, 9, 8, 1, 3, 7, 4];
console.log("Original array:", a);
console.log("Sorted array:", quick_sort(a, 0, a.length - 1));
let b = [34, 3432, 543, 21, 7, 43, 378, 741]
