import { h, render } from "vue";
import WBHtml from "./WBHtml";
import WBLink from "./WBLink.js";

let WBC = {
    components: {},
    props: {
        item: {
            // type: Object,
            default: () => "sssssssssssssss",
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
            default: () => "randomKey()",
        },
        mode: {
            // type: String,
            default: () => "prod",
        },
    },
    render() {
        let item_ = this.item;
        let wrap_ = this.wrap;
        let props_ = this.props;
        let key_ = this.key;
        let mode_ = this.mode;
        let globalWrap;
        //-------------------- ~ operator in Array-------------------------

        // globalWrap = wrap_;
        if (
            Array.isArray(item_) &&
            item_.findIndex((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">") >= 0
        ) {
            let k = item_.findIndex((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">");
            let arrayWrap = item_.find((e) => typeof e == "string" && e[0] == "<" && e[e.length - 1] == ">");

            wrap_ = arrayWrap?.replace("<", "")?.replace(">", "");
            item_.splice(k, 1);
        }

        // -----Vnodes to render------
        var wrapRend;

        var mainRend = h("div", [item_, "To CHECKKKKKKKKKKKKKKKKKKk", typeof item_]);
        let localWrap;
        let rendItem = h(WBHtml, { html: item_ });
        if ([null, undefined].includes(item_)) {
        } else if (typeof item_ == "boolean") {
            localWrap = "input";
            rendItem = {
                type: "checkbox",
                checked: item_,
                disabled: true,
                ...props_,
            };
            if (wrap_ == "input") {
                rendItem.disabled = false;
                rendItem.onChange = (e) => {
                    alert("msg");
                    item_ = e.target.checked;
                };
            } else if (!wrap_?.includes("~")) {
                globalWrap = wrap_;
                // globalWrap = wrap_.replace("~", "");
            }
        } else if (["string", "number"].includes(typeof item_)) {
            if (wrap_ == "input") {
                alert(item_);
                localWrap = "input";
                rendItem = {};
                rendItem.value = item_;
                rendItem.type = typeof item_;
                rendItem.disabled = false;

                rendItem.onInput = (e) => {
                    alert("msg");
                    item_ = e.target.value;

                    // displayRend =h('u', { title: item_ }, `${item_}`);
                };
                rendItem = { ...rendItem, ...props_ };
                alert(JSON.stringify(rendItem));
                return h("div", rendItem);
                +++
            } else if (!wrap_?.includes("~")) {
                globalWrap = wrap_;
                // globalWrap = wrap_.replace("~", "");
            }
            // mainRend = h("input", rendItem);
        } else if (Array.isArray(item_)) {
            globalWrap = wrap_?.replace("~", "");
            if (item_.length == 0) {
                rendItem = h(null);
            } else {
                /*if (Array.isArray(item_[0])) {
                rendItem = h(WBC, { item: item_[0], wrap: wrap_ });
            } else if (item_[0].length == 1) {
                rendItem = h(WBC, { item: item_[0] });
            } else*/ if (wrap_?.includes("~")) {
                    // globalWrap = wrap_?.replace("~", "");

                    rendItem = h(
                        WBC,
                        { item: item_[0], wrap: wrap_ },
                        item_.length >= 2 ? { footer: () => h(WBC, { item: item_.slice(1), wrap: wrap_ }) } : null
                    );
                } else {
                    // globalWrap = wrap_?.replace("~", "");
                    rendItem = item_.map((e) => {
                        return h(WBC, { item: e, wrap: wrap_ });
                    });
                }
            }
        } else if (!Array.isArray(item_) && item_ instanceof Object) {
            if (wrap_) {
                globalWrap = wrap_?.replace("~", "");
            }
            if (item_.wrap) {
                localWrap = item_.wrap?.replace("~", "");
            }

            // //////////////component onBeforeMount////////////////////

            onBeforeMount(() => {
                item_?.initial?.(item_, context);
                // forceRerender();
            });

            // ---------charging event listener of the component---------

            // console.log(555555555555, instance, instance.proxy);
            // instance.root.subTree.el.addEventListener("click", () => {
            //     console.log("click");
            // });

            for (let k in item_.events || {}) {
                instance.root.subTree.el.addEventListener(k, () => {
                    item_?.events[k](item_);
                });
            }

            /////////////////////////////////////////////////////

            if (!item_.comp) {
                let { props, wrap, ...itemsWitoutProp } = item_;
                rendItem = [
                    !item_.props?.hide || false
                        ? h(WBC, {
                              item: Object.values(itemsWitoutProp),

                              wrap: item_.wrap || null,
                              props: item_.props || {},
                          })
                        : null,
                ];
            } else {
                if (Array.isArray(item_.comp)) {
                    rendItem = [!item_?.props?.hide || false ? h(WBC, compsListToObject(item_)) : null];
                } else {
                    let itemProps = {};
                    if (item_.props) {
                        itemProps = item_.props;
                    }
                    itemProps.onInput = (event) => {
                        if (item_.props.type == "checkbox" || item_.comp == "VCheckbox") {
                            item_.props.val = event.target.checked;
                        } else {
                            item_.props.val = event.target.value;
                        }
                        this.emit("update:item", event.target.value);
                    };
                    ///////////////////// Vuetify Components////////////////////////
                    let itemComp = item_.comp;
                    let itemHtml = item_?.props?.html ? [h(WBHtml, { html: item_.props.html })] : null;
                    if (item_.comp in WBC.components) {
                        itemComp = WBC.components[item_.comp];

                        // rendItem = h("div", "habra cadabra");
                        // special cases of external components for example vuetify or bootstrap-vue
                        // ---------item.comp=='VCheckbox'---------
                        if (item_.comp == "VCheckbox") {
                            itemHtml = null;
                        } else if (item_.comp == "VTextField") {
                            itemHtml = null;
                        } else if (item_.comp == "VSelect") {
                            itemHtml = null;
                            itemProps["onUpdate:modelValue"] = (v) => {
                                item_.props.val = v;
                                if (item_.props.to || item_.props.to_) {
                                    if (typeof item_.props.to === "function") {
                                        vSelectChange(item_.props.to(item_.props.val));
                                    } else {
                                        vSelectChange(item_.props.to) || {};
                                    }
                                    if (typeof item_.props["to_"] === "function") {
                                        vSelectChange(item_.props.to_(item_.props.val), "aaa");
                                    } else {
                                        vSelectChange(item_.props.to_, "aaa") || {};
                                    }
                                }
                            };
                        }

                        //     rendItem = [
                        //         !item_?.props?.hide || false
                        //             ? h(
                        //                   WBC.components[item_.comp],
                        //                   itemProps
                        //                   // item_?.props?.html
                        //                   //     ? [h(WBHtml, { html: item_.props.html })]
                        //                   //     : null
                        //               )
                        //             : null,
                        //     ];
                        // }
                    }
                    // else {

                    // item_.props.key = randomKey("key-");
                    itemProps.key = item_.props?.key || randomKey("key-");
                    // console.log("zzzzzzzzzzzzzz", key_);

                    // itemProps.key = key_;

                    rendItem = [
                        !item_?.props?.hide || false
                            ? h(
                                  WBC.components[item_.comp],
                                  itemProps,
                                  item_?.props?.html ? [h(WBHtml, { html: item_.props.html })] : null
                              )
                            : null,
                    ];
                    // }
                    // }
                    ///////////////////////////////////////////////////////////////
                    // else {
                    rendItem = [
                        !item_?.props?.hide || false
                            ? h(
                                  // item_.comp,
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
            if (item_?.href) {
                let hrefProps = {};
                if (typeof item_?.href == "string") {
                    hrefProps.to = item_?.href;
                } else {
                    hrefProps = item_?.href || {};
                }
                hrefProps.text = rendItem;
                rendItem = h(WBLink, hrefProps);
            }
            if (item_.props?.headers) {
                rendItem = [h(WBC, { item: item_.props.headers }), ...rendItem];
            }
            if (item_.props?.footers) {
                rendItem = [...rendItem, h(WBC, { item: item_.props.footers })];
            }
        } else if (!item_ instanceof Object) {
            rendItem = `"${JSON.stringify(item_)}" is ${typeof item_}. It must be taken into consideration`;
            globalWrap = wrap_?.replace("~", "");
        }

        //////////////Taking account of external registred component like personal component or Vuetify components or bootstrap-vu/////////////////
        let wrapToUse = wrap_ in WBC.components ? wrap_ in WBC.components : wrap_;
        if (wrap_ && wrap_.replace("~", "") in WBC.components) {
            globalWrap = WBC.components[wrap_.replace("~", "")];
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

        if (WBC.mode == "dev" || WBC.mode == "all" || mode_ == "all" || mode_ == "dev") {
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

        // --------------  props of globalWrap: props_ -----------------
        let styleGlobalWrapBackGround = props_ || myStyleGlobalWrapBackGround;
        // ---------slots setup---------
        console.log(this.slots);
        let slotHeader = this.slots?.header?.();
        let slotFooter = this.slots?.footer?.();
        let slotDefault = this.slots?.default?.();

        ////////////////////////////////////

        return mainRend;
        ////////////////////////////////////

        // ---------The Rendered output ---------
        // item = item_;
        if (slotDefault) {
            return () => [slotHeader, slotDefault, slotFooter]; //the rendered output
        } else {
            if (globalWrap) {
                return () => [
                    slotHeader,
                    h(globalWrap, styleGlobalWrapBackGround, [
                        mainRend,
                        WBC.mode == "all" || mode_ == "all"
                            ? [
                                  h("br"),
                                  h(
                                      "b",
                                      {
                                          title: item_,
                                          style: { "font-size": "70%" },
                                      },
                                      `-->( item=${JSON.stringify(item_)}|wrap=${wrap_})<--`
                                  ),
                              ]
                            : null,
                    ]),
                    slotFooter,
                ];
            } else {
                return () => [
                    slotHeader,
                    mainRend,
                    WBC.mode == "all" || mode_ == "all"
                        ? [
                              h("br"),
                              h(
                                  "b",
                                  { title: item_, style: { "font-size": "70%" } },
                                  `-->( item=${JSON.stringify(item_)}|wrap=${wrap_})<--`
                              ),
                          ]
                        : null,
                    slotFooter,
                ];
            }
        }
    },
};
export default WBC;
