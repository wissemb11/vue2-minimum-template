import { createApp, h, ref, toRefs, watch, watchEffect, watchSyncEffect, onBeforeMount, getCurrentInstance } from "vue";
import WBHtml from "./WBHtml";
import WBLink from "./WBLink.js";
import { getRandomColor, randomKey } from "./tools.js";

let WBC = {
    components: {},
    props: {
        item: {
            // type: Object,
            default: () => null,
        },
        wrap: {
            // type: String,
            default: () => null,
        },
        props: {
            // type: String,
            default: () => null,
        },
        key_: {
            // type: String,
            default: () => randomKey(),
        },
        mode: {
            // type: String,
            default: () => "all",
        },
    },
    // props:['items','wrap'],
    emits: ["update:item"],
    setup(props, context) {
        const instance = getCurrentInstance();

        // const item_ = toRefs(props).item;
        const item_ = ref(props.item);
        // let { wrap_, props_ } = props;
        //--------------- Scoped external variables------------------
        // const item_ = ref(item);
        const wrap_ = ref(props.wrap);
        const props_ = ref(props.props);
        const key_ = ref(props.key_);
        const mode_ = ref(props.mode);
        // key_.value += 1;
        let globalWrap;
        // let kkey_=ref(0)
        const forceRerender = () => {
            key_.value += 1;
            // key_.value.props.key += 1;
        };

        ///////////////////////////////
        // watchEffect(() => {
        //     item = item_.value;
        // });
        // watchSyncEffect(() => {
        //     item = item_.value;
        // });
        // watch(
        //     () => item_.value.props.val,
        //     (current, old) => {
        //         // context.emit("update:item", 99999999999);
        //     }
        // );
        /*        watch(
            () => item_.value,
            (v, o) => {
                // wrap_.value = "li";
                item_.value = v;
                context.emit("update:item", v);
                // context.emit("update:item", 9999999999);
            }
        );*/
        //-------------------- ~ operator in Array-------------------------

        // globalWrap = wrap_.value;
        if (
            Array.isArray(item_.value) &&
            item_.value.findIndex((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">") >= 0
        ) {
            let k = item_.value.findIndex((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">");
            let arrayWrap = item_.value.find((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">");

            wrap_.value = arrayWrap?.replace("<", "")?.replace(">", "");
            item_.value.splice(k, 1);
        }

        // -----Vnodes to render------
        var wrapRend;
        var mainRend = h("div", [item_.value, "To CHECKKKKKKKKKKKKKKKKKKk", typeof item_.value]);

        let localWrap;
        let rendItem = h(WBHtml, { html: item_.value });
        if ([null, undefined].includes(item_.value)) {
        } else if (typeof item_.value == "boolean") {
            localWrap = "input";
            rendItem = {
                type: "checkbox",
                checked: item_.value,
                disabled: true,
                attrs: props_.value,
            };
            if (wrap_.value == "input") {
                rendItem.disabled = false;
                rendItem.onChange = (e) => {
                    item_.value = e.target.checked;
                };
            } else if (!wrap_.value?.includes("~")) {
                globalWrap = wrap_.value;
                // globalWrap = wrap_.value.replace("~", "");
            }
        } else if (["string", "number"].includes(typeof item_.value)) {
            if (wrap_.value == "input") {
                localWrap = "input";
                rendItem = {};
                rendItem.value = item_.value;
                rendItem.type = typeof item_.value;
                rendItem.disabled = false;

                rendItem.onInput = (e) => {
                    item_.value = e.target.value;

                    // displayRend =h('u', { title: item_.value }, `${item_.value}`);
                };
                rendItem = { ...rendItem, ...props_.value };
            } else if (!wrap_.value?.includes("~")) {
                globalWrap = wrap_.value;
                // globalWrap = wrap_.value.replace("~", "");
            }
            // mainRend = h("input", rendItem);
        } else if (Array.isArray(item_.value)) {
            globalWrap = wrap_.value?.replace("~", "");
            if (item_.value.length == 0) {
                rendItem = h(null);
            } else {
                /*if (Array.isArray(item_.value[0])) {
                rendItem = h(WBC, { item: item_.value[0], wrap: wrap_.value });
            } else if (item_.value[0].length == 1) {
                rendItem = h(WBC, { item: item_.value[0] });
            } else*/ if (wrap_.value?.includes("~")) {
                    // globalWrap = wrap_.value?.replace("~", "");

                    rendItem = h(
                        WBC,
                        { item: item_.value[0], wrap: wrap_.value },
                        item_.value.length >= 2
                            ? { footer: () => h(WBC, { item: item_.value.slice(1), wrap: wrap_.value }) }
                            : null
                    );
                } else {
                    // globalWrap = wrap_.value?.replace("~", "");
                    rendItem = item_.value.map((e) => {
                        return h(WBC, { item: e, wrap: wrap_.value });
                    });
                }
            }
        } else if (!Array.isArray(item_.value) && item_.value instanceof Object) {
            if (wrap_.value) {
                globalWrap = wrap_.value?.replace("~", "");
            }
            if (item_.value.wrap) {
                localWrap = item_.value.wrap?.replace("~", "");
            }

            // //////////////component onBeforeMount////////////////////

            onBeforeMount(() => {
                item_.value?.initial?.(item_.value, context);
                // forceRerender();
            });

            // ---------charging event listener of the component---------

            // console.log(555555555555, instance, instance.proxy);
            // instance.root.subTree.el.addEventListener("click", () => {
            //     console.log("click");
            // });

            for (let k in item_.value.events || {}) {
                instance.root.subTree.el.addEventListener(k, () => {
                    item_.value?.events[k](item_.value);
                });
            }

            /////////////////////////////////////////////////////

            if (!item_.value.comp) {
                let { props, wrap, ...itemsWitoutProp } = item_.value;
                rendItem = [
                    !item_.value.props?.hide || false
                        ? h(WBC, {
                              item: Object.values(itemsWitoutProp),

                              wrap: item_.value.wrap || null,
                              props: item_.value.props || {},
                          })
                        : null,
                ];
            } else {
                if (Array.isArray(item_.value.comp)) {
                    rendItem = [!item_.value?.props?.hide || false ? h(WBC, compsListToObject(item_.value)) : null];
                } else {
                    let itemProps = {};
                    if (item_.value.props) {
                        itemProps = item_.value.props;
                    }
                    itemProps.onInput = (event) => {
                        if (item_.value.props.type == "checkbox" || item_.value.comp == "VCheckbox") {
                            item_.value.props.val = event.target.checked;
                        } else {
                            item_.value.props.val = event.target.value;
                        }
                        context.emit("update:item", event.target.value);
                    };
                    ///////////////////// Vuetify Components////////////////////////
                    let itemComp = item_.value.comp;
                    let itemHtml = item_.value?.props?.html ? [h(WBHtml, { html: item_.value.props.html })] : null;
                    if (item_.value.comp in WBC.components) {
                        itemComp = WBC.components[item_.value.comp];

                        // rendItem = h("div", "habra cadabra");
                        // special cases of external components for example vuetify or bootstrap-vue
                        // ---------item.comp=='VCheckbox'---------
                        if (item_.value.comp == "VCheckbox") {
                            itemHtml = null;
                        } else if (item_.value.comp == "VTextField") {
                            itemHtml = null;
                        } else if (item_.value.comp == "VSelect") {
                            itemHtml = null;
                            itemProps["onUpdate:modelValue"] = (v) => {
                                item_.value.props.val = v;
                                if (item_.value.props.to || item_.value.props.to_) {
                                    if (typeof item_.value.props.to === "function") {
                                        vSelectChange(item_.value.props.to(item_.value.props.val));
                                    } else {
                                        vSelectChange(item_.value.props.to) || {};
                                    }
                                    if (typeof item_.value.props["to_"] === "function") {
                                        vSelectChange(item_.value.props.to_(item_.value.props.val), "aaa");
                                    } else {
                                        vSelectChange(item_.value.props.to_, "aaa") || {};
                                    }
                                }
                            };
                        }

                        //     rendItem = [
                        //         !item_.value?.props?.hide || false
                        //             ? h(
                        //                   WBC.components[item_.value.comp],
                        //                   itemProps
                        //                   // item_.value?.props?.html
                        //                   //     ? [h(WBHtml, { html: item_.value.props.html })]
                        //                   //     : null
                        //               )
                        //             : null,
                        //     ];
                        // }
                    }
                    // else {

                    // item_.value.props.key = randomKey("key-");
                    itemProps.key = item_.value.props?.key || randomKey("key-");
                    // console.log("zzzzzzzzzzzzzz", key_);

                    // itemProps.key = key_.value;

                    rendItem = [
                        !item_.value?.props?.hide || false
                            ? h(
                                  WBC.components[item_.value.comp],
                                  itemProps,
                                  item_.value?.props?.html ? [h(WBHtml, { html: item_.value.props.html })] : null
                              )
                            : null,
                    ];
                    // }
                    // }
                    ///////////////////////////////////////////////////////////////
                    // else {
                    rendItem = [
                        !item_.value?.props?.hide || false
                            ? h(
                                  // item_.value.comp,
                                  itemComp,
                                  itemProps,
                                  itemHtml
                              )
                            : null,
                    ];
                    // }

                    // *****************************
                    // add some specific cases
                    // *****************************
                }
            }
            // *****************************
            // tacking account of headers and footers for case Objects when item.props.headers or item.props.footers is present
            // *****************************
            if (item_.value?.href) {
                let hrefProps = {};
                if (typeof item_.value?.href == "string") {
                    hrefProps.to = item_.value?.href;
                } else {
                    hrefProps = item_.value?.href || {};
                }
                hrefProps.text = rendItem;
                rendItem = h(WBLink, hrefProps);
            }
            if (item_.value.props?.headers) {
                rendItem = [h(WBC, { item: item_.value.props.headers }), ...rendItem];
            }
            if (item_.value.props?.footers) {
                rendItem = [...rendItem, h(WBC, { item: item_.value.props.footers })];
            }
        } else if (!item_.value instanceof Object) {
            rendItem = `"${JSON.stringify(item_.value)}" is ${typeof item_.value}. It must be taken into consideration`;
            globalWrap = wrap_.value?.replace("~", "");
        }
        //////////////Taking account of external registred component like personal component or Vuetify components or bootstrap-vu/////////////////
        let wrapToUse = wrap_.value in WBC.components ? wrap_.value in WBC.components : wrap_.value;
        if (wrap_.value && wrap_.value.replace("~", "") in WBC.components) {
            globalWrap = WBC.components[wrap_.value.replace("~", "")];
        }
        ////////////////////////////
        if (localWrap) {
            mainRend = h(localWrap, rendItem);
        } else {
            mainRend = rendItem;
        }

        ////////////Default production style ////////////////
        let myStyleGlobalWrapBackGround = {};

        ////////////Personal understanding dewveloppement style ////////////////

        if (WBC.mode == "dev" || WBC.mode == "all" || mode_.value == "all" || mode_.value == "dev") {
            myStyleGlobalWrapBackGround = {
                style: {
                    margin: "20px",
                    backgroundColor: getRandomColor(),
                    // 'backgroundColor': 'grey',
                    border: `2px dashed black`,
                    "font-size": "100%",
                },
            };
        }
        //////////////////////////////////////////

        // --------------  props of globalWrap: props_.value -----------------
        let styleGlobalWrapBackGround = props_.value || myStyleGlobalWrapBackGround;
        // ---------slots setup---------
        console.log(context.slots);
        let slotHeader = context.slots.header?.();
        let slotFooter = context.slots.footer?.();
        let slotDefault = context.slots.default?.();

        // ---------The Rendered output ---------
        // item = item_.value;
        if (slotDefault) {
            return () => [slotHeader, slotDefault, slotFooter]; //the rendered output
        } else {
            if (globalWrap) {
                return () => [
                    slotHeader,
                    h(globalWrap, styleGlobalWrapBackGround, [
                        mainRend,
                        WBC.mode == "all" || mode_.value == "all"
                            ? [
                                  h("br"),
                                  h(
                                      "b",
                                      {
                                          title: item_.value,
                                          style: { "font-size": "70%" },
                                      },
                                      `-->( item=${JSON.stringify(item_.value)}|wrap=${wrap_.value})<--`
                                  ),
                              ]
                            : null,
                    ]),
                    slotFooter,
                ];
            } else {
                return () =>
                    h("h1", [
                        slotHeader,
                        mainRend,
                        WBC.mode == "all" || mode_.value == "all"
                            ? [
                                  h("br"),
                                  h(
                                      "b",
                                      { title: item_.value, style: { "font-size": "70%" } },
                                      `-->( item=${JSON.stringify(item_.value)}|wrap=${wrap_.value})<--`
                                  ),
                              ]
                            : null,
                        slotFooter,
                    ]);
            }
        }

        // render(){return h(WBC,{item:true,wrap:'li'})},
        //////////////////////////////////////////
        ///////////////////Methods to put out or to treat///////////////////////
        //////////////////////////////////////////
        // function compsListToObject() {
        //     let compsList = item_.value.comp;
        //     let realObject = [];
        //     realObject = compsToObject(compsList, item_.value);
        //     // return realObject
        //     return {
        //         comps: realObject,
        //         linear: item_.value.linear || false,
        //     };
        // }
        function toLinear(ele, source) {
            // if(ele[0] == "<" && ele[ele.length - 1] == ">"){return ele}
            if (typeof ele == "string") {
                return source[ele] || ele;

                // else return [`<~${source[ele.replace("~", "")].comp}>`, source[ele]];
            } else if (Array.isArray(ele)) {
                // if (ele == []) {
                //     return [];
                // }
                /*   if (ele.length == 1) {
                    return source[ele[0]];
                } else*/ if (ele.length >= 1) return [toLinear(ele[0], source), ...toLinear(ele.slice(1), source)];
                else if (ele.length == 1) return source[ele[0]];
                else {
                    return [];
                }
            }
        }
        function compsListToObject(obj) {
            let theObjToReturn = { item: [], props: obj.props || {}, wrap: obj.wrap || "div" };
            if (Array.isArray(obj.comp)) {
                theObjToReturn.item = toLinear(obj.comp, obj);
                // for (let e of obj.comp) {
                //     let a = [];
                //     if (typeof e == "string") {
                //         a = obj[e];
                //     } else if (Array.isArray(e)) {
                //         a.push(obj[e[0]]);
                //     }
                //     theObjToReturn.item.push(a);
                // }
                // let realObject;
                // realObject = obj.comp.map((e) => {
                //     if (Array.isArray(e)) {
                //         // theObjToReturn = [compsListToObject(e)];

                //         return compsListToObject(e[0]);
                //     } else {
                //         let linear = false;
                //         let wrap = "div";
                //         // let obj.comp=obj[e.replace('~','')]||{comp:e.replace('~','')}
                //         // if(e.includes('~')){obj.comp.linear=true}
                //         let key = e.replace("~", "");

                //         // if (obj[key]) {
                //         if (!Array.isArray(obj[key]) && obj[key] instanceof Object) {
                //             let objToReturn = {};
                //             objToReturn = obj[key];
                //             objToReturn.wrap = `${obj[key]["comp"]}${e.includes("~") ? "~" : ""}`;
                //             // }
                //             return objToReturn;
                //             // return {
                //             //     props: {},
                //             //     ...obj[key],
                //             //     // ...{
                //             //     linear: !e.includes("~"),
                //             //     // wrap: `${obj[key]["comp"]}`,
                //             //     wrap: `${obj[key]["comp"]}${e.includes("~") ? "~" : ""}`,
                //             //     // }
                //             // };
                //         } else {
                //             return {
                //                 comp: "div",
                //                 props: {
                //                     html: obj[key],
                //                     key: randomKey("key-str-"),
                //                 },
                //                 // wrap: `span${e.includes("~") ? "~" : ""}`,
                //             };
                //         }
                //  else {
                //     return {
                //         comp: key,
                //         linear: !e.includes("~"),
                //         wrap: `${key}${e.includes("~") ? "~" : ""}`,
                //         props: {
                //             hide: !true,
                //             // key: this.randomKey("key-"),
                //             // html:'ddddddddddd'
                //         },
                //     };
                // }
                // }
                // return Array.isArray(e) ? this.compsListToObject(e, source) : source[e]||{comp:'template',html:'aaaaaaaaaaaaaaaaaaaa'}
                // });
                return theObjToReturn;
            }
        }
    },
};

function vSelectChange(generalAdress, self = null) {
    if (typeof generalAdress == "string") {
        // if (generalAdress.startsWith("https://") || generalAdress.startsWith("http://")) {
        // } else {
        // this.$router.push(generalAdress);
        if (!self) {
            window.open(generalAdress);
        } else {
            window.open(generalAdress, "_self");
        }
    } else {
        // let l = this.$router.resolve(generalAdress);
        // if (l.resolved.matched.length > 0) {
        //     this.$router.push(generalAdress);
        // }
    }
}
export default WBC;
