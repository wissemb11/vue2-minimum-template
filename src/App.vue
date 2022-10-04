<template>
    <div id="app">
        <Navigation />
        <h1>-----------------------WBLink-----------------------</h1>
        <WBLink
            to="http://stackoverflow.com"
            text="Link-text"
            style="
                 {
                    color: 'red';
                }
            "
            class="cls0 cls1"
        ></WBLink>
        <br />
        <WBLink
            v-bind="{ to: 'http://stackoverflow.com', text: 'Link', style: { color: 'red' }, class: 'cls0 cls1' }"
        ></WBLink>
        <br />
        <WBLink
            v-bind="{
                to: 'subUrl',
                text: 'Link',
                style: { color: 'red' },
                class: 'cls0 cls1',
                target: '_blank',
            }"
        ></WBLink>
        <h1>-----------------------WBHtml-----------------------</h1>
        <WBHtml html="dsfadfadsfsassssssssssssssssssssssss"></WBHtml><br />
        <WBHtml html="[[<b>dsfadfadsfsassssssssssssssssssssssss</b>|cl0]]"></WBHtml><br />
        <WBHtml html="[[subUrl+stylish-text|cl0|subUrl]]"></WBHtml><br />
        <WBHtml html="[[github url|cl0|https://github.com]]"></WBHtml><br />
        <WBHtml html="[[dsfadfadsfsasssssssssssss||555[[skkkkss|]]ssssssss|cl0|sssss]]"></WBHtml><br />
        <WBHtml html="dsfadfadsfsassssssssssssssssssssssss"></WBHtml><br />
        <h1>-----------------------WBC -----------------------</h1>
        <WBC :item="true" :props="{ type: 'date', value: 'dddddd' }" wrap="input"></WBC>
        <!-- <WBC :item="[1, 2, 3]" :props="{ type: 'checkbox' }" wrap="li"></WBC> -->
        <!--         <WBC
            :item="{ comp: 'div', props: { html: 'ddddd' } }"
            :props="{ hide: true, type: 'checkbox' }"
            wrap="div"
        ></WBC> -->
        <h1>-----------------------testcomponent -----------------------</h1>
        ++++++++++vue2 rendering component +++++++++++
        <test></test>
        <test1></test1>

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
