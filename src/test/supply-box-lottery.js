const data = require("../../data/blaze");
const SupplyBoxLottery = require("../controllers/supply-box-lottery");

const supplyBoxLottery = new SupplyBoxLottery(data, "rate");
const result = supplyBoxLottery.getResult(12);

console.log(result);
console.log(SupplyBoxLottery.getLevelTotal(result));
