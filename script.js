// Import classes dynamically
import { DoublyLinkedList } from './classes/doublyLinkedList.js';
import { LinkedList } from './classes/linkedList.js';
import { Hashtable } from './classes/hashTable.js';
// Import other classes as needed

// Function to demonstrate Doubly Linked List
function showDoublyLinkedListDemo() {
  const list = new DoublyLinkedList();
  list.append(10);
  list.append(20);
  list.append(30);
  document.getElementById('doubly-linked-list-output').textContent = `List after appends: ${list.toString()}`;
}

// Function to demonstrate Linked List
function showLinkedListDemo() {
  const list = new LinkedList();
  list.append(5);
  list.append(15);
  list.append(25);
  document.getElementById('linked-list-output').textContent = `List after appends: ${list.toString()}`;
}

// Function to demonstrate Hashtable
function showHashtableDemo() {
  const table = new Hashtable();
  table.set('key1', 'value1');
  table.set('key2', 'value2');
  document.getElementById('hashtable-output').textContent = `Hashtable contents: ${table.toString()}`;
}

// Add similar functions for other classes
