import Vue from "vue";
import { h, render } from "vue";
import App from "./App.vue";
import WBC from "./components/WBC.js";
import WBHtml from "./components/WBHtml";
import WBLink from "./components/WBLink.js";

console.log(3333333, WBC);
Vue.config.productionTip = false;

Vue.component("testcomponent", {
    render: function (createElement) {
        var a = this.elementtype.split(",");
        return createElement(
            a[0],
            {
                attrs: {
                    id: a[3],
                    style: "color:" + a[1] + ";font-size:" + a[2] + ";",
                },
            },
            this.$slots.default
        );
    },
    props: {
        elementtype: {
            attributes: String,
            required: true,
        },
    },
});

Vue.component("test", {
    render() {
        return h("input", { type: "checkbox", attrs: { type: "checkbox" } });
        // return h("div", ["Welcome to GeeksforGeeks", "Welcome to GeeksforGeeks", h("b", "Welcome to GeeksforGeeks")]);
    },
    props: {},
});

Vue.component("test1", {
    render() {
        return h("div", ["Welcome to GeeksforGeeks", "Welcome to GeeksforGeeks", "Welcome to GeeksforGeeks"]);
    },
    props: {},
});

Vue.component("WBLink", WBLink);
Vue.component("WBHtml", WBHtml);
Vue.component("WBC", WBC);

new Vue({
    render: (h) => h(App),
}).$mount("#app");
