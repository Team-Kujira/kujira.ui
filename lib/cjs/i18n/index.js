"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.button = exports.p = exports.small = exports.span = exports.div = exports.td = exports.th = exports.h4 = exports.h3 = exports.h2 = exports.h1 = exports.li = exports.label = exports.strong = exports.a = exports.t = void 0;
const react_1 = require("react");
const de_DE_json_1 = __importDefault(require("./languages/de-DE.json"));
const es_ES_json_1 = __importDefault(require("./languages/es-ES.json"));
const it_IT_json_1 = __importDefault(require("./languages/it-IT.json"));
const ru_RU_json_1 = __importDefault(require("./languages/ru-RU.json"));
const template_json_1 = __importDefault(require("./languages/template.json"));
const tr_TR_json_1 = __importDefault(require("./languages/tr-TR.json"));
const replace = (string, replacements) => {
    const r = replacements.pop();
    if (r) {
        return replace(string.replace("{}", r), replacements);
    }
    else {
        return string;
    }
};
const t = (string, replacements = []) => {
    const lang = navigator.language;
    const txs = translations(lang);
    if (txs) {
        const tx = replace(txs[string], replacements.reverse());
        if (!tx)
            txs[string] = "";
        return tx || string;
    }
    return string;
};
exports.t = t;
const translations = (language) => {
    switch (language) {
        case "de":
        case "de-DE":
            return de_DE_json_1.default;
        case "tr":
        case "tr-TR":
            return tr_TR_json_1.default;
        case "es":
        case "es-ES":
            return es_ES_json_1.default;
        case "it":
        case "it-IT":
            return it_IT_json_1.default;
        case "ru":
        case "ru-RU":
            return ru_RU_json_1.default;
        default:
            return template_json_1.default;
    }
};
const comp = (tag) => (props) => (0, react_1.createElement)(tag, props, typeof props.children === "string"
    ? (0, exports.t)(props.children)
    : props.children);
exports.a = comp("a");
exports.strong = comp("strong");
exports.label = comp("label");
exports.li = comp("li");
exports.h1 = comp("h1");
exports.h2 = comp("h2");
exports.h3 = comp("h3");
exports.h4 = comp("h4");
exports.th = comp("th");
exports.td = comp("td");
exports.div = comp("div");
exports.span = comp("span");
exports.small = comp("small");
exports.p = comp("p");
exports.button = comp("button");
document.onkeyup = function (e) {
    if (e.ctrlKey && e.shiftKey && e.key == "E") {
        const lang = navigator.language;
        const txs = translations(lang);
        var a = document.createElement("a");
        var file = new Blob([JSON.stringify(txs, null, 2)], {
            type: "application/json",
        });
        a.href = URL.createObjectURL(file);
        a.download = `${lang}.json`;
        a.click();
    }
};
