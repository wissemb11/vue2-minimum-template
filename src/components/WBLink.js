import { createApp, h, ref, watch, watchEffect, watchSyncEffect } from "vue";

///////////////////////Component WBLink:Component/////////////////////////
let WBLink = {
    // props: ["to", "text", "props"],
    props: { to: null, text: null, props: null },
    setup(props, context) {
        const to_ = ref(props.to);
        const text_ = ref(props.text);
        const props_ = ref(props.props);

        if (text_.value == null) return () => h("li", ["nullllllll", JSON.stringify(props)]);
        // ---------slots setup---------

        let slotDefault = context.slots.default?.();

        let htmlProp = {};
        if (props_.value instanceof Object) {
            htmlProp = props_.value;
        }
        if (to_.value instanceof Object) {
            htmlProp.to = to_.value;
        } else {
            htmlProp.href = to_.value;
        }
        // ---------The Rendered output---------
        if (!to_.value && text_.value) {
            if (props_.value) {
                return () => h("span", { attrs: htmlProp }, text_.value);
            } else if (typeof text_.value == "string" && text_.value.includes("<") && text_.value.includes(">")) {
                return () => h("span", { attrs: htmlProp, innerHTML: "text_.value" });
            } else {
                return () => h("span", { attrs: htmlProp }, text_.value);
            }
        } else if (typeof to_.value === "string") {
            return () => h("a", { attrs: htmlProp }, text_.value);
        } else if (to_.value instanceof Object) {
            return () => h("router-link", { attrs: htmlProp }, text_.value);
        } else {
            return () => h("li", text_.value);
        }
    },
};

export default WBLink;
