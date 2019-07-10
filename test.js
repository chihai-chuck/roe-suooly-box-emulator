const data = require("./data/1.js");


class SupplyBoxLottery {
    constructor(list, key) {
        this.list = list.sort((a, b) => b[key] - a[key]);
        this.key = key;
        this.prizeGroup = {};
        this.setPrizeGroup();
    }

    setPrizeGroup() {
        for(let item of this.list) {
            if(this.prizeGroup[item[this.key]]) {
                this.prizeGroup[item[this.key]].push(item);
            } else {
                this.prizeGroup[item[this.key]] = [item];
            }
        }
    }

    getPrizeGroup(key) {
        const length = this.prizeGroup[key].length;
        let index = 0;
        if(length > 1) {
            index = Math.floor(Math.random() * length);
        }
        return this.prizeGroup[key][index];
    }

    calcRandomPrize() {
        let result = this.list[0][this.key];
        let sum = this.list.reduce((a, b) => a + b[this.key], 0);
        for(let item of this.list) {
            const rand = Math.random() * sum;
            const rate = item[this.key];
            if(rand <= rate) {
                result = rate;
                break;
            } else {
                sum -= rate;
            }
        }
        return this.getPrizeGroup(result);
    }

    getResult(num = 1) {
        const res = [];
        for(let i=0; i<num; i++) {
            res.push(this.calcRandomPrize());
        }
        return res;
    }
}


const testC = new SupplyBoxLottery(data, "rate");
console.log(testC.getResult(10));
