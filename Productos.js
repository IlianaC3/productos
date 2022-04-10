const fs = require('fs');

class Productos {
    constructor(nameFile) {
        this.nameFile = nameFile;
        this.productsArr = [];
    }

    async productos() {
        try {
            let findAll = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.productsArr = JSON.parse(findAll);
            return this.productsArr
        } catch {
            return undefined
        }
    }

    async productoRandom(id) {
        try {
            let findId = await fs.promises.readFile(`./${this.nameFile}`, 'utf-8');
            this.productsArr = JSON.parse(findId);
            let result = this.productsArr.find(obj => {
                return obj.id === parseInt(id)
            })
            return result === undefined ? null : result
        } catch {
            return undefined
        }
    }

}

module.exports = Productos;