import { DropdownModel } from "./dropdown.model";
import { DropdownOptionsModel } from "./dropdown-options.model";
import { DROPDOWN_STYLE_CLASSES } from "./dropdown.style-classes";
import { createElement } from "../../shared/libs/createElement.function";

export class DropdownController implements DropdownModel{
    private viewText = "";
    public isOpen = false;

    private _counters = {};

    get counters(){
        return this._counters;
    }

    constructor(
        private root: HTMLDivElement, 
        private options: DropdownOptionsModel
    ){
        this._counters = options.counters ?? {"rooms": 0};

        const input = createElement<HTMLInputElement>("input", DROPDOWN_STYLE_CLASSES.input);
        input.readOnly = true;

        const outerRows = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.outerRows);

        // for (const prop in this.counters){
        //     const row = createElement("div", DROPDOWN_STYLE_CLASSES.row);
        // }

    }

    setCounter(key: string): void{
        if (key in this._counters) throw new Error("Such counter yet exists");

        this._counters[key] = 0;
    }

    removeCounter(key: string): void{
        if (key in this._counters) {
            delete this._counters[key];
            return;
        }

        new Error("Such counter does not exists");
    }

    toggle(): void{
        this.isOpen = !this.isOpen;
    }

    inc(key: string): void{
        if (key in this._counters) {
            this._counters[key] += 1;
            return;
        }

        new Error("Such counter does not exists");
    }

    dec(key: string): void{
        if (key in this._counters) {
            this._counters[key] -= 1;
            return;
        }

        new Error("Such counter does not exists");
    }


}