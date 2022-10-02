<template>
    <div id="app">
        <Navigation />
        ++++++++++vue2 rendering component +++++++++++
        <test1></test1>
        -----------------------
        <WBC item="true" :props="{ type: 'number', style: { backgroundColor: 'red' } }" wrap="input"></WBC>
        <!-- <WBC :item="[1, 2, 3]" :props="{ type: 'checkbox' }" wrap="li"></WBC> -->
        *****************************
        <testcomponent :elementtype="'div,red,25,div1'">Hello Jai</testcomponent>
        <testcomponent :elementtype="'h3,green,25,h3tag'">Hello Roy</testcomponent>
        <testcomponent :elementtype="'p,blue,25,ptag'">Hello Ria</testcomponent>
        <testcomponent :elementtype="'div,green,25,divtag'">Hello Ben</testcomponent>
        *****************************
        <Footer />
    </div>
</template>

<script>
import Navigation from "./components/Navigation.vue";
import Footer from "./components/Footer.vue";

export default {
    name: "App",
    components: {
        Navigation,
        Footer,
    },
};
</script>

<style>
#app {
    font-family: "Avenir", Helvetica, Arial, sans-serif;
    text-align: center;
    color: #2c3e50;
    padding: 30px;
}
</style>
