import { createElement, PropsWithChildren } from "react";
import de from "./languages/de-DE.json";
import es from "./languages/es-ES.json";
import it from "./languages/it-IT.json";
import ru from "./languages/ru-RU.json";
import template from "./languages/template.json";
import tr from "./languages/tr-TR.json";

const replace = (string: string, replacements: string[]): string => {
  const r = replacements.pop();
  if (r) {
    return replace(string.replace("{}", r), replacements);
  } else {
    return string;
  }
};

export const t = (string: string, replacements = []) => {
  const lang = navigator.language;
  const txs = translations(lang);
  if (txs) {
    const tx = replace(txs[string], replacements.reverse());
    if (!tx) txs[string] = "";
    return tx || string;
  }
  return string;
};

const translations = (language: string): Record<string, string> => {
  switch (language) {
    case "de":
    case "de-DE":
      return de;
    case "tr":
    case "tr-TR":
      return tr;
    case "es":
    case "es-ES":
      return es;
    case "it":
    case "it-IT":
      return it;
    case "ru":
    case "ru-RU":
      return ru;
    default:
      return template;
  }
};

const comp =
  (tag: string): React.FC<PropsWithChildren<{}>> =>
  (props) =>
    createElement(
      tag,
      props,
      typeof props.children === "string"
        ? t(props.children)
        : props.children
    );

export const a: React.FC<JSX.IntrinsicElements["a"]> = comp("a");
export const strong: React.FC<JSX.IntrinsicElements["strong"]> =
  comp("strong");
export const label: React.FC<JSX.IntrinsicElements["label"]> =
  comp("label");
export const li: React.FC<JSX.IntrinsicElements["li"]> = comp("li");
export const h1: React.FC<JSX.IntrinsicElements["h1"]> = comp("h1");
export const h2: React.FC<JSX.IntrinsicElements["h2"]> = comp("h2");
export const h3: React.FC<JSX.IntrinsicElements["h3"]> = comp("h3");
export const h4: React.FC<JSX.IntrinsicElements["h4"]> = comp("h4");
export const th: React.FC<JSX.IntrinsicElements["th"]> = comp("th");
export const td: React.FC<JSX.IntrinsicElements["td"]> = comp("td");
export const div: React.FC<JSX.IntrinsicElements["div"]> =
  comp("div");
export const span: React.FC<JSX.IntrinsicElements["span"]> =
  comp("span");
export const small: React.FC<JSX.IntrinsicElements["small"]> =
  comp("small");
export const p: React.FC<JSX.IntrinsicElements["p"]> = comp("p");
export const button: React.FC<JSX.IntrinsicElements["button"]> =
  comp("button");

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
