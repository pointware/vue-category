<template>
  <select :disabled="isDisabled" v-model="selectedCode" @change="changeCategory">
    <option v-for="(category, index) in categories" :key="index" :value="category.code">
      {{ category.name }}
    </option>
  </select>
</template>

<script>
  import EfmCategoryBase from './efm-category-item-base'

  var dummyData = function (level, parentCode) {
    let data = [];
    const prefix = parentCode ? parentCode : '';
    for (let i = 1; i < 10; i++) {
      data.push({
        code: prefix + i,
        name: prefix + i
      });
    }
    return data;
  };

  export default {
    name: "efm-category-item",
    mixins: [EfmCategoryBase],
    methods: {
      //override
      getCategoryInfo() {
        //axios 리턴하면 됩니다(promise)
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            resolve(dummyData(this.level, this.parentCode));
          }, Math.round(Math.random() * 1000));
        });
      }
    }
  }
</script>

<style scoped>

</style>