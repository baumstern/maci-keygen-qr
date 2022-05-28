
import fs from 'fs'
import {
    Keypair,
} from 'maci-domainobjs'

import QRcode from 'qrcode'


class MACIKeyPair {
    public privateKey: string
    public publicKey: string

    constructor () {
        const keyPair = new Keypair()

        this.privateKey = keyPair.privKey.serialize()
        this.publicKey = keyPair.pubKey.serialize()
    }


    public toFiles(dirPath: string, baseName: string) {
        this.toQRCodeFile(dirPath, baseName + '_sk', this.privateKey)
        this.toQRCodeFile(dirPath, baseName + '_pk', this.publicKey)

        this.toQRCodeFile(dirPath, baseName + '_sk', this.privateKey, 'svg')
        this.toQRCodeFile(dirPath, baseName + '_pk', this.publicKey, 'svg')

        this.toQRCodeFile(dirPath, baseName + '_sk', this.privateKey, 'utf8')
        this.toQRCodeFile(dirPath, baseName + '_pk', this.publicKey, 'utf8')

        this.toTextFile(dirPath, baseName + '_sk', this.privateKey)
        this.toTextFile(dirPath, baseName + '_pk', this.publicKey)
    }

    // File format is
    //  dirPath + baseName +  keyType + extension
    // e.g.: /home/ubuntu/key/001_sk.png
    private toQRCodeFile(dirPath: string, fileName: string, key: string, type?: string) {
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

    private toTextFile(dirPath: string, fileName: string, key: string) {
        const file = dirPath + '/' + fileName + '.' + 'txt'
        fs.writeFile(file, key, function (err) {
            if (err) {
                throw err
            }
        })
    }
}

// TODO: error correction level high
async function main() {
    const dirPath = process.cwd()
    console.log(dirPath)

    const mkp = new MACIKeyPair()
    mkp.toFiles(dirPath, 'qr')



}


main()
