<template>
    <div>
        <component v-for="(item, index) in componentItems"
                   :is="item.component"
                   :key="index"
                   v-bind="item.props">
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
                /*
                   item: {
                    component,
                    props
                   }
                 */
                componentItems: [],
                event: new Vue()
            }
        },
        mounted() {
            //register event handler
            this.event.$on('efm-category-change', this.onChange);

            if (this.componentItems.length === 0) {
                for (let i = 0; i < this.level; i++) {
                    this.componentItems.push({
                        component: this.itemComponent,
                        props: {
                            level: i + 1,
                            initParentCode: this.value.codes[i - 1] === undefined ? null : this.value.codes[i - 1],
                            initCode: this.value.codes[i] === undefined ? null : this.value.codes[i],
                            event: this.event
                        }
                    });
                }
            }
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
        }
    }
</script>

<style scoped>

</style>