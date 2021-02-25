const {Block} = require('../')

describe('Block', () => {
    test('has previous blocks hash', () => {
        const gblock = new Block(null, {type: "genesis"})
        const block = new Block(gblock, {type: 'test'})
        expect(gblock.hash).toBe(block.phash)
    })

    test('can verify block', () => {
        const gblock = new Block(null, {type: "genesis"})
        const block = new Block(gblock, {type: 'test'})
        expect(block.verifyBlock()).toBeTruthy() 
    })

    test('can\'t tamper with blocks', () => {
        const gblock = new Block(null, {type: "genesis"})
        const block = new Block(gblock, {type: 'test'})
        const lastBlock = new Block(block, {type: 'last on chain'})
        block.data = {type: 'altered data'}
        expect(block.verifyBlock()).toBeFalsy()
        gblock.ts = new Date('1970-01-01').getTime()
        expect(gblock.verifyBlock()).toBeFalsy()
    })
})