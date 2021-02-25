# Multiverse Blockchain

Simple blockchain in JS.

## Usage

```javascript
const { Chain } = require('multiverse-blockchain')

const chain = new Chain()
const d1 = {type: 'data 1'}
const d2 = {type: 'data 2'}
chain.add(d1).add(d2)

chain.length // 2
chain.integrity() // true
chain.stringify() // W3sidHMiOjE2MTQyNTM1NjU0NDEsImRhdGEiOnsidHlwZSI6ImRhdGEgMSJ9LCJ===
chain.pop() // Error "you can't break the blockchain calling pop"
```
Create a new instance of a `Chain`. You can pass a base64 encoded string that is the output of `chain.stringify()` to `new Chain(base64string)` and instantiate a chain with data (for example from a datastore). `chain` extends the `Array` class so you can treat it like an array, but some array functions that would mutate the array (like `pop` and `shift`) will error. You can verify the integrity of the blockchain, this function will check each block matches is own hash, and that each of the hashes in the chain match from block to block. You can add any valid JSON object to your blockchain using `chain.add(data)`
```javascript
chain[0]
/**
    Block {
        ts: 1614253657703,
        data: { val: 200 },
        phash: '19fc1e5a4b1731933ba1093dd7dc4aea7afec10e036261abd243d28492200134',
        hash: '2fafb10b4e9a5bad46660de310c907a66a84951858554c1fe6718ce21135360a'
    }
*/
chain.reduce((sum, block) => {
    return sum + block.data.val
}, 0)
/**
    200
*/
```
`phash` is the hash of the previous block. Because the chain is an Array object you can perform any of the non-mutating array functions; map, filter, reduce, sort.
