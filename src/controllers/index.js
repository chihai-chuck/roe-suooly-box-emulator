new Vue({
    el: ".supply-box-emulator",
    data() {
        return {
            data: {
                boxItem: "{{replace-data}}"
            }
        }
    },
    mounted() {
        const testC = new SupplyBoxLottery(this.data.boxItem, "rate");
        const testR = testC.getResult(100);
        console.log(testR);
        console.log(SupplyBoxLottery.getLevelTotal(testR));
    }
});
