new Vue({
    el: ".supply-box-emulator",
    data() {
        return {
            config: {
                version: "{{replace-version}}",
                color: {
                    1: "#abd33f",
                    2: "#62c8ff",
                    3: "#a770c7"
                }
            },
            data: {
                boxItem: "{{replace-data}}",
                result: {
                    single: -1,
                    multiple: []
                },
                record: []
            },
            visible: {
                result: false
            },
            supplyBoxLottery: {}
        }
    },
    computed: {
        levelTotal() {
            return this.supplyBoxLottery.getLevelTotal(this.data.record);
        },
        resultSingleItem() {
            return this.data.result.single > -1 ? this.data.boxItem[this.data.result.single] : {};
        }
    },
    created() {
        this.supplyBoxLottery = new SupplyBoxLottery(this.data.boxItem, "rate");
        this.data.record = JSON.parse(localStorage["roeSupplyBoxEmulatorRecord_"+this.config.version]||"[]");
        this.loadImgCache();
    },
    methods: {
        open(num) {
            const res = this.supplyBoxLottery.getResult(num);
            if(!num || num === 1) {
                this.data.result.single = res[0];
                this.visible.result = true;
            }
            this.data.record.unshift(...res);
            localStorage["roeSupplyBoxEmulatorRecord_"+this.config.version] = JSON.stringify(this.data.record);
        },
        popupTouch(event) {
            event.stopPropagation();
            if(event.target === this.$refs.popup || event.target === this.$refs.popupContent) {
                this.visible.result = false;
            }
        },
        loadImgCache() {
            for(let i of this.data.boxItem) {
                const $img = document.createElement("img");
                $img.src = i.img;
            }
        }
    }
});
