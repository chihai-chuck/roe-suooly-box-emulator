window.rsbe = new Vue({
    el: ".supply-box-emulator",
    data() {
        return {
            config: {
                version: "{{replace-version}}",
                localDataVersion: 1,
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
                result: false,
                about: false
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
        this.localDataCacheClear();
        this.data.record = JSON.parse(localStorage[`roeSupplyBoxEmulatorRecord_${this.config.version}_${this.config.localDataVersion}`]||"[]");
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
            localStorage[`roeSupplyBoxEmulatorRecord_${this.config.version}_${this.config.localDataVersion}`] = JSON.stringify(this.data.record);
        },
        closeResult(event) {
            event.stopPropagation();
            this.visible.result = false;
        },
        loadImgCache() {
            for(let i of this.data.boxItem) {
                const $img = document.createElement("img");
                $img.src = i.img;
            }
        },
        localDataCacheClear() {
            for(let i=0; i<this.config.localDataVersion; i++) {
                if(i === 0) {
                    localStorage.removeItem(localStorage[`roeSupplyBoxEmulatorRecord_${this.config.version}`]);
                } else {
                    localStorage.removeItem(localStorage[`roeSupplyBoxEmulatorRecord_${this.config.version}_${i}`]);
                }
            }
        },
        showAbout() {
            this.visible.about = true;
        },
        closeAbout(event) {
            if(event.target === this.$refs.aboutPopup || event.target === this.$refs.aboutPopupContent) {
                this.visible.about = false;
            }
        },
        toUser(id) {
            location.href = "heybox://" + encodeURIComponent(JSON.stringify({
                "protocol_type": "openUser",
                "user_id": id.toString()
            }));
        }
    }
});
