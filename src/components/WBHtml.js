import { createApp, h, ref, watch, watchEffect, watchSyncEffect } from "vue";
global.h = h;
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
                    .replace(/^\*+/, "")
                    .replace(/\*+$/, "")
                    .split("**")
                    .map((h) => h.split("|"));

                let theProps = {};
                let htmlArrayOutput = htmlArray.map((aHtml) => {
                    let theText = aHtml?.[0];
                    let theTo = aHtml?.[2];
                    theProps = aHtml?.[1];

                    if (["null", "undefined"].includes(aHtml[0])) {
                        theText = null;
                    }
                    if (typeof strToObj(theProps) == "string") {
                        theProps = { class: strToObj(theProps) };
                    } else if (strToObj(aHtml[1]) instanceof Object) {
                        theProps = strToObj(theProps);
                    }

                    // if (theText.includes("<") && theText.includes(">")) {
                    //     return h(WBLink, { to: theTo, text: h("span", theText), props: theProps });
                    // } else {

                    return h(WBLink, { props: { to: theTo, text: theText, props: theProps } });
                    // }
                });
                // htmlArrayOutput.innerHTML = "htmlArrayOutput.innerText";
                if (htmlArrayOutput.length == 1) {
                    return () => htmlArrayOutput;
                } else {
                    return () => h("span", htmlArrayOutput);
                }
            } else if (html_.value.includes("<") && html_.value.includes(">")) {
                return () => h("span", { innerHTML: html_.value });
            } else {
                return () => h("span", html_.value);
            }
        }
    },
};

export default WBHtml;
