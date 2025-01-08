// Node Class
class Node {
    constructor(value) {
        this.next = null;
        this.value = value;
    }
}

// LinkedList Class
class LinkedList {
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value) {
        const newNode = new Node(value);
        if (this.head === null) {
            this.head = newNode;
        } else {
            let current = this.head;
            while (current.next !== null) {
                current = current.next;
            }
            current.next = newNode;
        }
        this.size++;
    }

    prepend(value) {
        const newNode = new Node(value);
        newNode.next = this.head;
        this.head = newNode;
        this.size++;
    }

    insertAt(index, value) {
        if (index < 0 || index > this.size) {
            throw new Error(`Cannot insert at index ${index}: Out of bounds`);
        }
        if (index === 0) {
            this.prepend(value);
        } else if (index === this.size) {
            this.append(value);
        } else {
            const newNode = new Node(value);
            let current = this.head;
            for (let i = 1; i < index; i++) {
                current = current.next;
            }
            newNode.next = current.next;
            current.next = newNode;
            this.size++;
        }
    }

    removeAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error(`Cannot remove at index ${index}: Out of bounds`);
        }
        if (index === 0) {
            this.head = this.head.next;
        } else {
            let current = this.head;
            for (let i = 1; i < index; i++) {
                current = current.next;
            }
            current.next = current.next.next;
        }
        this.size--;
    }

    find(value) {
        let current = this.head;
        let index = 0;
        while (current !== null) {
            if (current.value === value) return index;
            current = current.next;
            index++;
        }
        return -1;
    }

    getAt(index) {
        if (index < 0 || index >= this.size) {
            throw new Error(`Index ${index} out of range`);
        }
        let current = this.head;
        for (let i = 0; i < index; i++) {
            current = current.next;
        }
        return current.value;
    }

    print() {
        let current = this.head;
        const result = [];
        while (current !== null) {
            result.push(current.value);
            current = current.next;
        }
        console.log(result.join(" -> "));
    }

    getSize() {
        return this.size;
    }

    reverse() {
        let prev = null;
        let current = this.head;
        while (current !== null) {
            const next = current.next;
            current.next = prev;
            prev = current;
            current = next;
        }
        this.head = prev;
    }

    isEmpty() {
        return this.size === 0;
    }

    clear() {
        this.head = null;
        this.size = 0;
    }

    toArray() {
        const array = [];
        let current = this.head;
        while (current !== null) {
            array.push(current.value);
            current = current.next;
        }
        return array;
    }

    fromArray(array) {
        if (!Array.isArray(array)) {
            throw new Error("Input must be an array");
        }
        array.forEach((value) => this.append(value));
    }
}

// Example Usage
const list = new LinkedList();
list.append(10);        // 10
list.append(20);        // 10 -> 20
list.prepend(5);        // 5 -> 10 -> 20
list.insertAt(1, 15);   // 5 -> 15 -> 10 -> 20
list.print();
console.log(list.find(20)); // 3
list.removeAt(2);           // 5 -> 15 -> 20
list.print();
console.log(list.toArray());
list.reverse();        // 20 -> 15 -> 5
list.print();
console.log(list.getAt(2)); // 5
