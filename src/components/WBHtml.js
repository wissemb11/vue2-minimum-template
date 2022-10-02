import { createApp, h, ref, watch, watchEffect, watchSyncEffect } from "vue";
import WBLink from "./WBLink.js";
import { strToObj, getRandomColor, randomKey } from "./tools.js";
///////////////////////Component WBHtml:Component/////////////////////////
let WBHtml = {
    props: { html: null },
    setup({ html }, context) {
        const html_ = ref(html);
        if (typeof html_.value !== "string") {
            return () => JSON.stringify(html_.value);
        } else {
            if (html_.value.includes("[[") && html_.value.includes("]]")) {
                let htmlArray = html_.value
                    .replace(/\[\[/g, "**")
                    .replace(/\]\]/g, "**")
                    .split("**")
                    .map((h) => h.split("|"));

                let htmlArrayOutput = htmlArray.map((aHtml) => {
                    let theText = aHtml?.[0];
                    let theTo = aHtml?.[2];
                    let theProps = aHtml?.[1];

                    if (["null", "undefined"].includes(aHtml[0])) {
                        theText = null;
                    }
                    if (typeof strToObj(theProps) == "string") {
                        theProps = { class: strToObj(theProps) };
                    } else if (strToObj(aHtml[1]) instanceof Object) {
                        theProps = strToObj(theProps);
                    }

                    if (theText.includes("<") && theText.includes(">")) {
                        return h(WBLink, { to: theTo, text: h("span", { innerHTML: theText }), props: theProps });
                    } else return h(WBLink, { to: theTo, text: theText, props: theProps });
                });

                return () => htmlArrayOutput;
            } else if (html_.value.includes("<") && html_.value.includes(">")) {
                return () => h("span", { innerHTML: html_.value });
            } else {
                return () => html_.value;
            }
        }
    },
};

export default WBHtml;
