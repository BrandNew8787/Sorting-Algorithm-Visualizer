// Stack Class
class Stack {
    constructor() {
        this.items = []; // Array to store stack elements
    }

    // Add an element to the end of the queue
    enqueue(element) {
        // TODO: Implement enqueue
        this.items.push(element);
    }

    // Remove and return the element at the front of the queue
    dequeue() {
        // TODO: Implement dequeue
        return this.items.shift();
        
    }

    // Add an element to the top of the stack
    push(element) {
        // TODO: Implement push
        this.items.push(element);
    }

    // Remove and return the top element of the stack
    pop() {
        // TODO: Implement pop
        this.items.pop();
    }

    // Return the top element without removing it
    peek() {
        // TODO: Implement peek
        return this.items[this.items.length - 1];
    }

    // Check if the stack is empty
    isEmpty() {
        // TODO: Implement isEmpty
        return this.items.length === 0;
    }

    // Return the number of elements in the stack
    size() {
        // TODO: Implement size
        return this.items.length;
    }

    // Remove all elements from the stack
    clear() {
        // TODO: Implement clear
        this.items = [];
    }

    // Print all elements in the stack
    print() {
        // TODO: Implement print
        console.log(this.items);
    }
}

// // Example Usage (empty implementation)
// const stack = new Stack();

// stack.push(10);          // Push 10 onto the stack
// stack.push(20);          // Push 20 onto the stack
// stack.push(30);          // Push 30 onto the stack

// stack.print();           // Output: 10 -> 20 -> 30
// console.log(stack.peek()); // Output: 30

// stack.pop();             // Removes 30
// stack.print();           // Output: 10 -> 20

// console.log(stack.size()); // Output: 2
// console.log(stack.isEmpty()); // Output: false

// stack.clear();           // Clears the stack
// console.log(stack.isEmpty()); // Output: true


let a = Math.round((310-50)/50);
a = a * 50;
a = a + 50;
a = 350 - a;