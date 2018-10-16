<template>
  <div>
    <component v-for="(item, index) in componentItems"
               :is="item.component"
               :key="index"
               :level="index+1"
               :initParentCode="value.codes[index - 1] === undefined ? null : value.codes[index - 1]"
               :initCode="value.codes[index] === undefined ? null : value.codes[index]"
               :event="event"
    >
    </component>
  </div>
</template>

<script>
  import EfmCategoryItem from './efm-category-item.vue';
  import Vue from 'vue'

  export default {
    name: "efm-category",
    model: {
      props: 'options'
    },
    props: {
      value: {
        type: Object,
        default() {
          return {
            codes: [],
            names: []
          }
        }
      },
      options: {
        type: Object
      },
      level: {
        type: Number,
        required: false,
        default() {
          return 3;
        }
      },
      leafClose: {
        type: Boolean,
        required: false,
        default() {
          return true;
        }
      },
      itemComponent: {
        type: Object,
        default() {
          return EfmCategoryItem
        }
      }
    },
    data() {
      return {
        componentItems: [],
        event: new Vue()
      }
    },
    created() {
      for (let i = 0; i < this.level; i++) {
        this.componentItems.push({
          component: this.itemComponent
        });
      }
    },
    mounted() {
      //register event handler
      this.event.$on('efm-category.change', this.onChange);
    },
    methods: {
      onChange(level, code, name) {
        let newVal = Object.assign({}, this.value);
        newVal.codes = newVal.codes.slice(0, level - 1);
        newVal.names = newVal.names.slice(0, level - 1);

        if (code) {
          newVal.codes.push(code);
          newVal.names.push(name);
        }
        this.$emit('input', newVal);
      }
    },
    watch: {
      'value.codes'() {
        this.event.$emit('efm-category.setCode', this.value.codes);
      }
    }
  }
</script>

<style scoped>

</style>