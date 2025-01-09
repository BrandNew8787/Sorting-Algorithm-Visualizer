class HashTable {
    constructor(size = 53) {
        // Initialize the hash table with a fixed size (prime number recommended)
        this.table = new Array(size);
        this.size = size; // Total capacity of the table
    }

    // A helper function to generate hash values
    _hash(key) {
        let total = 0;
        const WEIRD_PRIME = 31;
        for (let i = 0; i < Math.min(key.length, 100); i++) {
            let char = key[i];
            let value = char.charCodeAt(0);
            total = (total * WEIRD_PRIME + value) % this.size;
        }
        return total;
    }

    // Adds a key-value pair to the hash table
    set(key, value) {
        // Hint: Hash the key to determine the index in the table.
        // Handle collisions using separate chaining (e.g., an array of key-value pairs at each index).
        let hash = this._hash(key);
        if (!this.table[hash]) {
            this.table[hash] = [];
        }
        for (let pair of this.table[hash]) {
            if (pair[0] === key) {
                pair[1] = value;
                return;
            }
        }
        this.table[hash].push([key, value]);
    }

    // Retrieves the value associated with a key
    get(key) {
        // Hint: Hash the key to determine the index.
        // Search through the chain at the index for the key.
        let hash = this._hash(key);
        let chain = this.table[hash];
        if (chain) {
            for (let [k, v] of chain) {
                if (k === key) {
                    return v;
                }
            }
        }
        return undefined; // Key not found
    }

    // Removes a key-value pair from the hash table
    delete(key) {
        // Hint: Hash the key to determine the index.
        // Search through the chain and remove the key-value pair if found.
        let hash = this._hash(key);
        let chain = this.table[hash];
        if (chain) {
            for (let i = 0; i < chain.length; i++) {
                if (chain[i][0] === key) {
                    chain.splice(i, 1);
                    return true;
                }
            }
        }
        return false; // Key not found
    }

    // Checks if a key exists in the hash table
    has(key) {
        // Hint: Use the same logic as the `get` method to check if the key exists.
        let hash = this._hash(key);
        let chain = this.table[hash];
        if (chain) {
            for (let [k] of chain) {
                if (k === key) {
                    return true;
                }
            }
        }
        return false;
    }

    // Returns all keys in the hash table
    keys() {
        // Hint: Iterate through the table and collect all keys from each chain.
        let keys = [];
        for (let chain of this.table) {
            if (chain) {
                for (let [key] of chain) {
                    keys.push(key);
                }
            }
        }
        return keys;

    }

    // Returns all values in the hash table
    values() {
        // Hint: Iterate through the table and collect all values from each chain.
        let values = [];
        for (let chain of this.table) {
            if (chain) {
                for (let [, value] of chain) {
                    values.push(value);
                }
            }
        }
        return values;
    }

    // Applies a callback function to each key-value pair
    forEach(callback) {
        for (let chain of this.table) {
            if (chain) {
                for (let [key, value] of chain) {
                    callback(key, value);
                }
            }
        }
    }
    
}


const hashTable = new HashTable();

// Adding key-value pairs
hashTable.set('name', 'Alice');
hashTable.set('age', 25);

// Retrieving values
console.log(hashTable.get('name')); // Alice

// Checking keys
console.log(hashTable.has('age')); // true

// Deleting keys
hashTable.delete('name');
console.log(hashTable.get('name')); // undefined

// Iterating keys and values
console.log([...hashTable.keys()]); // ['age']
console.log([...hashTable.values()]); // [25]
