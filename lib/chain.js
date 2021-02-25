const Block = require('./block')
const btoa = require('btoa')

class Chain extends Array {
    constructor(base64) {
        super()
        const self = this
        self._push = this.push
        ;[
            'copyWithin',
            'pop',
            'push',
            'shift',
            'unshift',
            'reverse',
            'sort',
            'splice',
            'fill'
        ].map(mutable => {
            self[mutable] = () => new Error('this array function would break the blockchain')
        })
        
        if (base64) {
            try {
                Object.assign(this, JSON.parse(atob(base64)))
            } catch(err) {
                throw(err)
            }
        }
    }

    add(data) {
        const pblock = this[this.length - 1] || null
        this._push(new Block(pblock, data))
        return this
    }

    integrity() {
        for(let i = 0; i < this.length - 1; i++) {
            const cannotVerifyBlock = !this[i].verifyBlock()
            const chainIsBroken = this[i + 1].phash !== this[i].hash
            if (cannotVerifyBlock || chainIsBroken) return false
        }
        const finalBlockIsVerifiable = this[this.length - 1].verifyBlock()
        const finalBlockHasIntegrity = this[this.length - 1].phash === this[this.length - 2].hash
        return finalBlockIsVerifiable && finalBlockHasIntegrity
    }

    stringify() {
        return btoa(JSON.stringify(this))
    }
}

module.exports = Chain