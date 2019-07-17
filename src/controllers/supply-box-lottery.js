class SupplyBoxLottery {
    constructor(list, key) {
        this.list = list;
        this.key = key;
    }

    calcRandomPrize() {
        let result = this.list[0][this.key];
        let sum = this.list.reduce((a, b) => a + b[this.key], 0);
        for(let item of this.list) {
            const rate = item[this.key];
            if(Math.random() * sum <= rate) {
                result = item;
                break;
            } else {
                sum -= rate;
            }
        }
        return result.index;
    }

    getResult(num = 1) {
        return Array(num).fill().map(() => this.calcRandomPrize());
    }

    getLevelTotal(list) {
        const total = {
            1: 0,
            2: 0,
            3: 0
        };
        if(!list.length) {
            return {
                total,
                probability: total
            }
        }
        for(let i of list) {
            const item = this.list[i];
            total[item.level]++;
        }
        const probability = {};
        for(let j of Object.keys(total)) {
            probability[j] = total[j] / list.length;
        }
        return {
            total,
            probability
        };
    }
}

if(typeof module !== "undefined") module.exports = SupplyBoxLottery;
