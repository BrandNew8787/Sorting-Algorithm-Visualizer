// Node Class
class Node {
    constructor(value) {
        this.value = value; // Value of the node
        this.next = null;   // Pointer to the next node
        this.prev = null;   // Pointer to the previous node
    }
}

// DoublyLinkedList Class
class DoublyLinkedList {
    constructor() {
        this.head = null;   // First node in the list
        this.tail = null;   // Last node in the list
        this.size = 0;      // Number of nodes in the list
    }

    // Add a node to the end of the list
    append(value) {
        // Implement this function
    }

    // Add a node to the beginning of the list
    prepend(value) {
        // Implement this function
    }

    // Insert a node at a specific index
    insertAt(index, value) {
        // Implement this function
    }

    // Remove a node at a specific index
    removeAt(index) {
        // Implement this function
    }

    // Search for a value and return its index, or -1 if not found
    find(value) {
        // Implement this function
    }

    // Get the value of the node at a specific index
    getAt(index) {
        // Implement this function
    }

    // Print the values of the list from head to tail
    printForward() {
        // Implement this function
    }

    // Print the values of the list from tail to head
    printBackward() {
        // Implement this function
    }

    // Reverse the order of the nodes in the list
    reverse() {
        // Implement this function
    }

    // Return the size of the list
    getSize() {
        // Implement this function
    }

    // Check if the list is empty
    isEmpty() {
        // Implement this function
    }

    // Remove all nodes from the list
    clear() {
        // Implement this function
    }

    // Convert the doubly linked list into an array
    toArray() {
        // Implement this function
    }

    // Populate the doubly linked list with values from an array
    fromArray(array) {
        // Implement this function
    }
}

// Example usage (skeleton demonstration)
const list = new DoublyLinkedList();
// list.append(10);
// list.prepend(5);
// list.insertAt(1, 7);
// list.printForward();
// list.printBackward();
