const {createHash} = require('crypto')
class Block {
    constructor(pblock, data) {
        this.ts = new Date().getTime()
        this.data = data
        this.phash = pblock && pblock.hash || "0"
        this.hash = this.createHash()
        return this
    }

    createHash() {
        return createHash('sha256')
        .update(this.ts + JSON.stringify(this.data) + this.phash)
        .digest('hex')
    }

    verifyBlock() {
        return createHash('sha256')
        .update(this.ts + JSON.stringify(this.data) + this.phash)
        .digest('hex') === this.hash
    }
}

module.exports = Block