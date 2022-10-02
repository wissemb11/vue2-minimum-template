import { createApp, h, ref, watch, watchEffect, watchSyncEffect } from "vue";

///////////////////////Component WBLink:Component/////////////////////////
let WBLink = {
    // props: ["to", "text", "props"],
    props: { to: null, text: null, props: null },
    setup({ to, text, props }, context) {
        const to_ = ref(to);
        const text_ = ref(text);
        const props_ = ref(props);

        // ---------slots setup---------
        console.log(context.slots);
        let slotDefault = context.slots.default?.();

        let htmlProp = {};
        if (props_.value instanceof Object) htmlProp = props_.value;
        if (to_.value instanceof Object) {
            htmlProp.to = to_.value;
        } else {
            htmlProp.href = to_.value;
        }
        // ---------The Rendered output---------
        if (!to_.value && text_.value) {
            if (props_.value) {
                return () => h("span", htmlProp, text_.value);
            } else if (typeof text_.value == "string" && text_.value.includes("<") && text_.value.includes(">")) {
                return () => h("span", { innerHTML: text_.value });
            } else {
                return () => text_.value;
            }
        } else if (typeof to_.value === "string") {
            return () => h("a", htmlProp, text_.value);
        } else if (to_.value instanceof Object) {
            return () => h("router-link", htmlProp, text_.value);
        } else {
            return () => text_.value;
        }
    },
};

export default WBLink;
