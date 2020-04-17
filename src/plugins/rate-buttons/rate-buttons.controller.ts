import "./rate-buttons.scss";
import { RateButtonsModel } from "./rate-buttons.model";
import { RateButtonsOptionsModel } from "./rate-buttons-options.model";
import { createElement } from "../../shared/libs/createElement.function";
import { RATE_BUTTONS_STYLE_CLASSES } from "./rate-buttons.style-classes";

export class RateButtonsController implements RateButtonsModel{
    private _value: number = 1;
    private outer: HTMLDivElement;
    private currentStar: HTMLDivElement;

    get value(){
        return this._value;
    }

    private select: (value: number) => void

    constructor(root: HTMLDivElement, options?: RateButtonsOptionsModel){
        const outer = createElement<HTMLDivElement>("div", RATE_BUTTONS_STYLE_CLASSES.outer);
        const count = options?.count ?? 5;
        const rated = options?.rated ?? 1;

        for (let i = 0; i < count; ++i){
            const item = createElement<HTMLDivElement>("div", RATE_BUTTONS_STYLE_CLASSES.item);
            item.setAttribute("data-rate", String(i + 1));
            outer.appendChild(item);
        }
        this.currentStar = outer.children[rated - 1] as HTMLDivElement;
        this.currentStar.classList.add("chosen");

        outer.addEventListener("click", (e) => this.clickHandler(e));

        this.outer = outer;

        root.appendChild(outer);
    }

    clickHandler(event: MouseEvent){
        const element = event.target as HTMLElement;

        if (element.hasAttribute("data-rate")){
            const value = element.getAttribute("data-rate");
            this.currentStar.classList.remove("chosen");
            element.classList.add("chosen");
            this.currentStar = element as HTMLDivElement;
            this._value = +value;
            this.select && this.select(this.value);
        }
    }
    

    onSelect(cb){
        this.select = cb;
    }
}