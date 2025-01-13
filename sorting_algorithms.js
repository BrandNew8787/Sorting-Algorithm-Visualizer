/*
A simple sorting algorithm that repeatedly iterates through a list, 
comparing adjacent elements and swapping them if they are in the wrong order.
Can be inefficient for large datasets due to its time complexity of O(n^2).
*/
function bubble_sort(arr) {
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

// Example usage:
let a = [5, 2, 6, 9, 8, 1, 3, 7, 4];
console.log("Original array:", a);
console.log("Heap Sort:", heap_sort([...a]));
