<template>
    <div id="app">
        <img alt="Vue logo" src="./assets/logo.png">
        <EfmCategory v-model="category"
        />
    </div>
</template>

<script>
    import EfmCategory from './components/efm-category.vue'

    export default {
        name: 'app',
        components: {
            EfmCategory
        },
        data(){
            return {
                category: {
                    codes: ['5','54','544'],
                    names: [],
                }
            }
        }
    }
</script>

<style>
    #app {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        text-align: center;
        color: #2c3e50;
        margin-top: 60px;
    }
</style>
