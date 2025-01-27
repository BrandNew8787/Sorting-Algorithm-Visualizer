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
        // Adds a node to the tail
        const newNode = new Node(value);
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            this.tail.next = newNode;
            newNode.prev = this.tail;
            this.tail = newNode;
        }
        this.size++;
    }

    // Add a node to the beginning of the list
    prepend(value) {
        // Adds a node to the head
        const newNode = new Node(value);
        if(this.head === null){
            this.head = newNode;
            this.tail = newNode;
        }
        else{
            this.head.prev = newNode;
            newNode.next = this.head;
            this.head = newNode;
        }
        this.size++;
    }

    // Remove the last node from the list
    removeLast() {
        // Removes the node at the tail
        if (this.size === 0){
            throw new Error('The list is empty.')
        }
        if (this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            let prevNode = this.tail.prev;
            prevNode.next = null;
            this.tail = prevNode;
        }
        this.size--;
    }

    // Remove the first node from the list
    removeFirst() {
        // Removes the node at the head
        if (this.size === 0){
            throw new Error('The list is empty.')
        }
        if (this.head === this.tail){
            this.head = null;
            this.tail = null;
        }
        else{
            let nextNode = this.head.next;
            nextNode.prev = null;
            this.head = nextNode;
        }
        this.size--;
    }

    // Insert a node at a specific index
    insertAt(index, value) {
        // Inserts a node at a given index
        if (index < 0 || index > this.size) {
            throw new Error(`Cannot insert at index ${index}: Out of bounds`);
        }
        if (index === 0) {
            this.prepend(value);
        } else if (index === this.size) {
            this.append(value);
        } else {
            const newNode = new Node(value);
            let current;
            if(index < this.size/2){
                current = this.head;
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
            }
            else { // Traverse from tail
                current = this.tail;
                for (let i = this.size - 1; i > index; i--) {
                    current = current.prev;
                }
            }
            newNode.next = current.next;
            newNode.prev = current;
            current.next = newNode;
            newNode.next.prev = newNode;
            this.size++;
        }
    }

    // Remove a node at a specific index
    removeAt(index) {
        // Removes a node at a given index
        if (index < 0 || index >= this.size) {
            throw new Error(`Cannot remove at index ${index}: Out of bounds`);
        }
        if (index === 0) {
            this.removeFirst();
        } 
        else if (index === this.size -1) {
            this.removeLast();
        }
        else {
            let current;
            if(index < this.size/2){
                current = this.head;
                for (let i = 0; i < index; i++) {
                    current = current.next;
                }
            }
            else { // Traverse from tail
                current = this.tail;
                for (let i = this.size - 1; i > index; i--) {
                    current = current.prev;
                }
            }
            current.prev.next = current.next;
            current.next.prev = current.prev;
        }
        this.size--;
    }

    // Search for a value and return the first index, or -1 if not found
    find(value) {
        // Finds the value in the list
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.value === value) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    // Get the value of the node at a specific index
    getAt(index) {
        // Returns the value at the specified index
        if (index < 0 || index >= this.size) {
            throw new Error(`Index ${index} out of range`);
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
    }

    // Traverse the list and print all node values from head to tail
    printForward() {
        // Traverses from head to tail
        let current = this.head;
        const result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(" -> "));
    }

    // Traverse the list and print all node values from tail to head
    printBackward() {
        // Traverses from tail to head
        let current = this.tail;
        const result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.prev;
        }
        console.log(result.join(" -> "));
    }

    // Reverse the order of the nodes in the list
    reverse() {
        // Reverses the doubly linked list
        if (this.size <= 1) return; // No need to reverse an empty or single-node list
        let current = this.head;
        let temp = null;
        while (current !== null) {
            temp = current.prev;
            current.prev = current.next;
            current.next = temp;
            current = current.prev;
        }
        temp = this.head;
        this.head = this.tail;
        this.tail = temp;
    }

    // Return the size of the list
    getSize() {
        // Returns the total number of nodes
        return this.size;
    }

    // Check if the list is empty
    isEmpty() {
        // Checks if the list is empty
        return this.size === 0;
    }

    // Remove all nodes from the list
    clear() {
        // Clears the list completely
        this.head = null;
        this.tail = null;
        this.size = 0;
    }

    // Convert the doubly linked list into an array
    toArray() {
        // Converts the list into an array
        if (this.size === 0){
            return [];
        }
        const array = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }

    // Populate the doubly linked list with values from an array
    fromArray(array) {
        if (!Array.isArray(array)) {
            throw new Error("Input must be an array");
        }
        this.clear(); // Clear the list before populating
        array.forEach((value) => this.append(value));
    }
    
}

// Example usage (skeleton demonstration)
const list = new DoublyLinkedList();
list.append(10);        // Add 10 to the end
list.append(20);        // Add 20 to the end
list.prepend(5);        // Add 5 to the beginning
list.insertAt(1, 15);    // Insert 15 at index 1
list.printForward();    // Print values from head to tail
console.log(list.find(10));
list.removeAt(1);
list.printBackward();   // Print values from tail to head
list.reverse();         // Reverse the list
list.printForward();
list.removeLast();      // Remove the last node
list.printForward();
list.removeFirst();     // Remove the first node
list.printForward()
list.append(100);
list.clear();
list.printForward();
