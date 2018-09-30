export default {
    props: {
        level: {
            type: Number,
            required: true
        },
        event: {
            type: Object,
            required: true
        },
        initCode: {
            type: String,
            required: false,
            default() {
                return null
            }
        },
        initParentCode: {
            type: String,
            required: false,
            default() {
                return null
            }
        }
    },
    data() {
        return {
            categories: [{
                code: '',
                name: '선택하세요'
            }],
            selectedCode: '',
            parentCode: '',
            isLoading: false,
            isParentLoading: false,
            isInit: false
        };
    },
    mounted() {

        if (this.level === 1 || this.isExistInitCode) {
            this.parentCode = this.initParentCode;
            this.setCategoryInfo();
        }

        this.event.$on('efm-category-change', this.onChangeCategory);
        this.event.$on('efm-category-load', this.onLoad);
    },
    computed: {
        isDisabled() {
            return this.categories.length === 0 || this.isLoading || this.isParentLoading;
        },
        isExistInitCode() {
            return (this.level === 1 && this.initCode) || (this.initParentCode && this.initCode);
        }
    },
    methods: {
        setCategoryInfo() {
            this.isLoading = true;
            this.event.$emit('efm-category-load', true, this.level);
            this.categories = this.categories.slice(0, 1);
            this.getCategoryInfo().then( (success) => {
                this.categories = this.categories.concat(success);
                if (!this.isInit && this.isExistInitCode) {
                    this.selectedCode = this.initCode;
                    this.isInit = true;
                }
                this.isLoading = false;
                this.event.$emit('efm-category-load', false, this.level);
            }, (reject) => {
                //TODO: reject에 대해서 예외처리 필요
                console.log(reject);
            });
        },
        getCategoryInfo() {},
        changeCategory(e) {
            let selectedIndex = e.target.selectedIndex;
            let name = selectedIndex === -1 ? '' : e.target.options[selectedIndex].text;
            this.event.$emit('efm-category-change', this.level, this.selectedCode, name);
        },
        onChangeCategory(level, selectedCode) {
            if (level + 1 === this.level) {
                this.parentCode = selectedCode;
                if (this.parentCode) {
                    this.setCategoryInfo()
                } else {
                    this.categories = this.categories.slice(0, 1);
                }
            }
            if (level < this.level) {
                this.selectedCode = '';
            }
        },
        onLoad(state, level) {
            this.onPrevLoad();
            if (level < this.level) {
                this.isParentLoading = state;
            }
        },
        onPrevLoad() {},
    }
}