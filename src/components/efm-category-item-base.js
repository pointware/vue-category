export default {
  props: {
    level: {
      type: Number,
      required: true
    },
    event: {
      type: Object,
      required: true
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
      isParentLoading: false
    };
  },
  mounted() {
    this.event.$on('efm-category.change', this.onChangeCategory);
    this.event.$on('efm-category.load', this.onLoad);
    this.event.$on('efm-category.setCode', this.setCategoryCode);
    //this.setCategoryCode();

    if(this.level === 1){
      this.setLoading(true);
      this.getCategoryInfo().then((success) => {
        this.categories = this.categories.concat(success);
        this.selectedCode = '';
      }).finally(() => {
        this.setLoading(false);
      });
    }
  },
  computed: {
    isDisabled() {
      return this.categories.length === 0 || this.isLoading || this.isParentLoading;
    }
  },
  methods: {
    setCategoryCode: function (codes) {
      let changedParent = this.level === 1 ? '' : codes[this.level - 2];
      let changedCode = codes.length > 0 && codes[this.level - 1] ? codes[this.level - 1] : '';

      if (this.level === 1) {
        if (this.selectedCode !== changedCode) {
          this.selectedCode = changedCode;
        }
        return;
      } else {
        if (!changedParent || this.selectedCode === changedCode && changedParent === this.parentCode) {
          return;
        }
      }
      this.parentCode = codes[this.level - 2];
      this.categories = this.categories.slice(0, 1);

      this.setLoading(true);
      this.getCategoryInfo().then((success) => {
        this.categories = this.categories.concat(success);
        this.selectedCode = changedCode;
      }).finally(() => {
        this.setLoading(false);
      });
    },
    setLoading(set){
      if(set){
        this.event.$emit('efm-category.load', true, this.level);
        this.isLoading = true;
      }else{
        this.isLoading = false;
        this.event.$emit('efm-category.load', false, this.level);
      }
    },
    getCategoryInfo() {
    },
    changeCategory(e) {
      if (this.isLoading)
        return;
      let selectedIndex = e.target.selectedIndex;
      let name = selectedIndex === -1 ? '' : e.target.options[selectedIndex].text;
      this.event.$emit('efm-category.change', this.level, this.selectedCode, name);
    },
    onChangeCategory(level, selectedCode) {
      if (level < this.level) {
        this.categories = this.categories.slice(0, 1);
        this.selectedCode = '';
      }
    },
    onLoad(state, level) {
      this.onPrevLoad();
      if (level < this.level) {
        this.isParentLoading = state;
      }
    },
    onPrevLoad() {
    },
  }
}