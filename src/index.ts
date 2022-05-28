
import fs from 'fs'
import Wallet from 'ethereumjs-wallet'
import {
    Keypair,
} from 'maci-domainobjs'

import QRcode from 'qrcode'

class ETHKeyPair {
    public privateKey: string
    public publicKey: string
    public address: string

    constructor () {
        const keyPair = Wallet['default'].generate()

        this.privateKey = keyPair.getPrivateKeyString()
        this.publicKey = keyPair.getPublicKeyString()
        this.address = keyPair.getAddressString()
    }

    public toFiles(dirPath: string, baseName: string) {
        toQRCodeFile(dirPath, baseName + '_sk', this.privateKey)
        toQRCodeFile(dirPath, baseName + '_pk', this.publicKey)

        toQRCodeFile(dirPath, baseName + '_sk', this.privateKey, 'svg')
        toQRCodeFile(dirPath, baseName + '_pk', this.publicKey, 'svg')

        toQRCodeFile(dirPath, baseName + '_sk', this.privateKey, 'utf8')
        toQRCodeFile(dirPath, baseName + '_pk', this.publicKey, 'utf8')

        toTextFile(dirPath, baseName + '_sk', this.privateKey)
        toTextFile(dirPath, baseName + '_pk', this.publicKey)
    }
}
class MACIKeyPair {
    public privateKey: string
    public publicKey: string

    constructor () {
        const keyPair = new Keypair()

        this.privateKey = keyPair.privKey.serialize()
        this.publicKey = keyPair.pubKey.serialize()
    }


    public toFiles(dirPath: string, baseName: string) {
        toQRCodeFile(dirPath, baseName + '_sk', this.privateKey)
        toQRCodeFile(dirPath, baseName + '_pk', this.publicKey)

        toQRCodeFile(dirPath, baseName + '_sk', this.privateKey, 'svg')
        toQRCodeFile(dirPath, baseName + '_pk', this.publicKey, 'svg')

        toQRCodeFile(dirPath, baseName + '_sk', this.privateKey, 'utf8')
        toQRCodeFile(dirPath, baseName + '_pk', this.publicKey, 'utf8')

        toTextFile(dirPath, baseName + '_sk', this.privateKey)
        toTextFile(dirPath, baseName + '_pk', this.publicKey)
    }
}

    // File format is
    //  dirPath + baseName +  keyType + extension
    // e.g.: /home/ubuntu/key/001_sk.png
    function toQRCodeFile(dirPath: string, fileName: string, key: string, type?: string) {
        const fileType = type ? type : 'png'

        const opt = {
            type: fileType,

            // 'H' can resist the damage to symbol by ~30%
            errorCorrectionLevel: 'H'
        }
        const file = dirPath + '/' + fileName + '.' + fileType
        QRcode.toFile(file, key, opt, function (err) {
            if (err) {
                throw err
            }
        })
    }

    function toTextFile(dirPath: string, fileName: string, key: string) {
        const file = dirPath + '/' + fileName + '.' + 'txt'
        fs.writeFile(file, key, function (err) {
            if (err) {
                throw err
            }
        })
    }


// TODO: error correction level high
async function main() {
    const dirPath = process.cwd()
    console.log(dirPath)

    const mkp = new MACIKeyPair()
    const ekp = new ETHKeyPair()

    mkp.toFiles(dirPath, 'maci_key')
    ekp.toFiles(dirPath, 'eth_key')
}


main()
