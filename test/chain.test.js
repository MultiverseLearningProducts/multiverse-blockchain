const {Chain} = require('../')

describe('Chain', () => {
    test('you can add blocks', () => {
        const chain = new Chain()
        const d1 = {type: 'data 1'}
        const d2 = {type: 'data 2'}
        chain.add(d1).add(d2)
        expect(chain.length).toBe(2)
    })

    test('you can mine the chain', () => {
        const chain = new Chain()
        const d1 = {val: 10}
        const d2 = {val: 20}
        const d3 = {val: 30}
        chain.add(d1).add(d2).add(d3)
        const sum = chain.reduce((sum, block) => {
            return sum + block.data.val
        }, 0)
        expect(sum).toBe(60)
    })

    test('you can validate the chain', () => {
        const chain = new Chain()
        const d1 = {val: 10}
        const d2 = {val: 20}
        const d3 = {val: 30}
        chain.add(d1).add(d2).add(d3)
        expect(chain.integrity()).toBeTruthy()
        chain[2].data = {val: 21}
        expect(chain.integrity()).toBe(false)
    })

    test('you can\'t break the chain', () => {
        const chain = new Chain()
        const d1 = {val: 10}
        const d2 = {val: 20}
        const d3 = {val: 30}
        chain.add(d1).add(d2).add(d3)
        expect(chain.copyWithin() instanceof Error).toBe(true)
        expect(chain.pop() instanceof Error).toBe(true)
        expect(chain.shift() instanceof Error).toBe(true)
        expect(chain.unshift() instanceof Error).toBe(true)
        expect(chain.reverse() instanceof Error).toBe(true)
        expect(chain.sort() instanceof Error).toBe(true)
        expect(chain.splice() instanceof Error).toBe(true)
        expect(chain.fill() instanceof Error).toBe(true)    
    })

    test('stringify the chain for storage', () => {
        const chain = new Chain()
        const d1 = {val: 10}
        chain.add(d1)
        expect(chain.stringify().length).toBe(168)
    })

    test('you can initialize a chain from a base64 encoded string', () => {
        const _chain = new Chain()
        const d1 = {type: 'data 1'}
        const d2 = {type: {of: {value: {very: 'nested'}}}}
        _chain.add(d1).add(d2)
        const base64 = _chain.stringify()
        const chain = new Chain(base64)
        expect(chain[1].data.type.of.value.very).toBe('nested')    
    })
})