import "./dropdown.scss";

import { DropdownModel } from "./dropdown.model";
import { DropdownOptionsModel } from "./dropdown-options.model";
import { DROPDOWN_STYLE_CLASSES } from "./dropdown.style-classes";
import { createElement } from "../../shared/libs/createElement.function";
import { Counter } from "./counter.model";
import { OnChange } from "./onchange-handler.model";

export class DropdownController implements DropdownModel{
    // dropdown
    private dropdown: HTMLDivElement = null;
    // key list with views counters
    private valueControllers: {[key: string]: HTMLDivElement} = {};
    // dropdown elements
    private _input: HTMLInputElement = null;
    private _clearBtn: HTMLSpanElement = null;
    // hooks
    private changeValue: OnChange;
    private clearValue: () => void;
    private applyValue: OnChange;

    // getter takes value from input
    public get viewText(){
        return this._input.value;
    }
    // setter sets value to input
    public set viewText(value: string){
        this._input.value = value;
    }
    // private status
    private _isOpen = false;
    // setter with rendering
    public set isOpen(value: boolean){
        this._isOpen = value;
        if (value){
            this.dropdown.classList.add("open");
            return;
        }
        this.dropdown.classList.remove("open");
    }
    // just getter
    public get isOpen(): boolean{
        return this._isOpen;
    }
    // private counters
    private _counters: {[key: string]: {name: string, value: number}} = {};
    // public getter without references
    get counters(){
        return {...this._counters};
    }
    
    private get isEmpty(){
        for (let prop in this._counters){
            if (this._counters[prop].value){
                return false;
            }
        }
        return true;
    }

    constructor(
        // placement where dropdown will be
        private root: HTMLDivElement, 
        // options
        private options?: DropdownOptionsModel
    ){
        const dropdown = createElement<HTMLDivElement>("div",  DROPDOWN_STYLE_CLASSES.dropdown);
        const input = createElement<HTMLInputElement>("input", DROPDOWN_STYLE_CLASSES.input);
        const outerRows = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.outerRows);

        dropdown.addEventListener("click", (e) => this.clickHandler(e));
        this._input = input;
        this.dropdown = dropdown;
        this._counters = {...options?.counters ?? {"rooms": {name: "Комнаты", value: 0}}};
        input.value = options?.viewText ?? "";
        input.readOnly = true;
        input.setAttribute("data-input", "");

        for (const prop in this._counters){
            outerRows.appendChild(this.createRow(prop, this._counters[prop]));
        }

        dropdown.appendChild(input);
        dropdown.appendChild(outerRows);

        if (options?.withActions){
            const outerActions = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.outerActions);
            const clear = createElement<HTMLSpanElement>("span", DROPDOWN_STYLE_CLASSES.clear);
            const apply = createElement<HTMLSpanElement>("span", DROPDOWN_STYLE_CLASSES.apply);

            this._clearBtn = clear;
            clear.setAttribute("data-clear", "");
            clear.textContent = "Очистить";

            apply.setAttribute("data-apply", "");
            apply.textContent = "Применить";

            outerActions.appendChild(clear);
            outerActions.appendChild(apply);

            outerRows.appendChild(outerActions);

            if (this.isEmpty) {
                this._clearBtn.classList.add("hidden")
            } 
        }

        

        root.appendChild(dropdown);

    }

    private clickHandler(event: MouseEvent){
        const element = event.target as HTMLElement;

        if (element.hasAttribute("data-input")){
            this.toggle()
            return;
        } else if (element.hasAttribute("data-dec")) {
            const key = element.getAttribute("data-dec");
            const valueController = this.valueControllers[key];
            const value = this._counters[key].value;
            if (value === 1){
                this._counters[key].value = 0;
                valueController.textContent = String(0);
                (element as HTMLInputElement).disabled = true;
            } else if (value > 1) {
                this._counters[key].value = value - 1;
                valueController.textContent = String(value - 1);
            }
            this.changeValue && this.changeValue(this.counters);
            if (this.isEmpty) {
                this._clearBtn.classList.add("hidden")
            } 

        } else if (element.hasAttribute("data-inc")) {
            const key = element.getAttribute("data-inc");
            const valueController = this.valueControllers[key];
            const value = this._counters[key].value;
            

            if (value === 0) {
                (element.previousElementSibling.previousElementSibling as HTMLInputElement).disabled = false;
                this._counters[key].value = 1;
                valueController.textContent = String(1);
            } else {
                this._counters[key].value = value + 1;
                valueController.textContent = String(value + 1);
            }

            this.changeValue && this.changeValue(this.counters);
            this._clearBtn.classList.remove("hidden");
        } else if (element.hasAttribute("data-clear")) {
            for (let prop in this._counters){

                this._counters[prop].value = 0;
                this.valueControllers[prop].textContent = "0";
                (this.valueControllers[prop].previousElementSibling as HTMLInputElement).disabled = true;
            }
            this._clearBtn.classList.add("hidden");
        } else if (element.hasAttribute("data-apply")){
            // some code, request, etc
            this.toggle()
        }

        
    }

    private toggle(): void{
        this.isOpen = !this.isOpen;
    }

    onChange(cb){
        this.changeValue = cb;
    }

    onClear(cb){
        this.clearValue = cb;
    }

    onApply(cb){
        this.applyValue = cb;
    }

    private createRow(key: string, counter: Counter): HTMLDivElement{
        const row = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.row);
        const lefthand = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.lefthand);
        const righthand = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.righthand);
        const btnDec = createElement<HTMLInputElement>("input", DROPDOWN_STYLE_CLASSES.btn);
        const count = createElement<HTMLDivElement>("div", DROPDOWN_STYLE_CLASSES.text);
        const btnInc = createElement<HTMLInputElement>("input", DROPDOWN_STYLE_CLASSES.btn);
    
        lefthand.textContent = counter.name;
        btnDec.value = "-";
        btnDec.type = "button";
        btnDec.disabled = counter.value <= 0;
        btnDec.setAttribute("data-dec", key);
    
        btnInc.value = "+";
        btnInc.type = "button";
        btnInc.setAttribute("data-inc", key);
    
        count.textContent = String(counter.value);
        count.setAttribute("data-count", "");

        this.valueControllers[key] = count;
    
        righthand.appendChild(btnDec);
        righthand.appendChild(count);
        righthand.appendChild(btnInc);
    
        row.appendChild(lefthand);
        row.appendChild(righthand);
    
        return row;
    }



}
