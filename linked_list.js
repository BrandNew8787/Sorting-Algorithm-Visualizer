// // Node structure
// NODE
//     data: Any
//     next: NODE

class Node {
    constructor(value) {
        this.value = value;
        this.next = null;
    }
}

// // Linked List class
// LINKED_LIST
//     head: NODE

class linked_list {
    
    constructor() {
        this.head = null;
        this.size = 0;
    }

    append(value){
        const newNodew = new Node(value)
        
    }

}

//     // Constructor
//     FUNCTION init()
//         head = NULL

//     // Append a node to the end of the list
//     FUNCTION append(data)
//         newNode = NEW NODE
//         newNode.data = data
//         newNode.next = NULL

//         IF head is NULL
//             head = newNode
//         ELSE
//             current = head
//             WHILE current.next is not NULL
//                 current = current.next
//             current.next = newNode

//     // Prepend a node to the beginning of the list
//     FUNCTION prepend(data)
//         newNode = NEW NODE
//         newNode.data = data
//         newNode.next = head
//         head = newNode

//     // Insert a node at a specific index
//     FUNCTION insert(data, index)
//         IF index is 0
//             prepend(data)
//         ELSE
//             current = head
//             count = 0
//             WHILE count < index - 1 and current is not NULL
//                 current = current.next
//                 count = count + 1

//             IF current is NULL
//                 RETURN "Index out of bounds"
//             ELSE
//                 newNode = NEW NODE
//                 newNode.data = data
//                 newNode.next = current.next
//                 current.next = newNode

//     // Remove a node at a specific index
//     FUNCTION remove(index)
//         IF head is NULL
//             RETURN "List is empty"

//         IF index is 0
//             head = head.next
//         ELSE
//             current = head
//             count = 0
//             WHILE count < index - 1 and current is not NULL
//                 current = current.next
//                 count = count + 1

//             IF current is NULL or current.next is NULL
//                 RETURN "Index out of bounds"
//             ELSE
//                 current.next = current.next.next

//     // Print the list
//     FUNCTION print()
//         current = head
//         WHILE current is not NULL
//             PRINT current.data
//             current = current.next