class Map {
    constructor() {
        // Initialize the map storage
        this.map = [];
        this.size = 0;
    }

    // Adds a key-value pair to the map
    set(key, value) {
        // Implement this
        for(let i = 0; i < this.map.length; i++){
            if (this.map[i][0] === key){
                this.map[i][1] = value;
                return;
            }
        }
        this.map.push([key, value]);
        this.size++;
    }

    // Retrieves the value associated with a key
    get(key) {
        // Implement this
        for(let i = 0; i < this.map.length; i++){
            if (this.map[i][0] === key){
                return this.map[i][1];
            }
        }
        return undefined;
    }

    // Checks if a key exists in the map
    has(key) {
        // Implement this
        for(let i = 0; i < this.map.length; i++){
            if (this.map[i][0] === key){
                return true;
            }
        }
        return false;
    }

    // Removes a key-value pair from the map
    delete(key) {
        // Implement this
        for(let i = 0; i < this.map.length; i++){
            if (this.map[i][0] === key){
                this.map.splice(i, 1);
                this.size--;
                return true;
            }
        }
        return false;
    }

    // Returns the number of key-value pairs in the map
    getSize() {
        // Implement this
        return this.size;
    }

    // Clears all key-value pairs in the map
    clear() {
        // Implement this
        this.map = [];
        this.size = 0;
    }

    // Returns all keys in the map
    keys() {
        return this.map.map(entry => entry[0]);
    }

    // Returns all values in the map
    values() {
        return this.map.map(entry => entry[1]);
    }

    // Returns all entries (key-value pairs) in the map
    entries() {
        // Implement this
        return this.map.slice();
    }

    // Applies a callback function to each key-value pair
    forEach(callback) {
        // Implement this
        if (this.size > 0){
            for(let i = 0; i < this.map.length; i++){
                callback(this.map[i][1], this.map[i][0]);
            }
        }
    }
}

// Example usage skeleton:
const myMap = new Map();
myMap.set('name', 'John'); // Add a key-value pair
console.log(myMap.get('name')); // Retrieve a value: John
console.log(myMap.has('name')); // Check if a key exists: true
console.log(myMap.getSize()); // Get size: 1
myMap.set('age', 30); // Add another key-value pair
console.log(myMap.keys()); // ['name', 'age']
console.log(myMap.values()); // ['John', 30]
console.log(myMap.entries()); // [['name', 'John'], ['age', 30]]
myMap.forEach((value, key) => console.log(`${key}: ${value}`)); // name: John, age: 30
myMap.delete('name'); // Remove a key-value pair
console.log(myMap.getSize()); // 1
myMap.clear(); // Clear the map
console.log(myMap.getSize()); // 0

