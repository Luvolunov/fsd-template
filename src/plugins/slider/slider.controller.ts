import "./slider.scss";
import { SliderModel } from "./slider.model";
import { SliderOptionsModel } from "./slider-options.model";
import { createElement } from "../../shared/libs/createElement.function";
import { SLIDER_STYLE_CLASSES } from "./slider.style-classes";
import { RunnerModel } from "./runner.model";

export class SliderController implements SliderModel{
    private first: Partial<RunnerModel> = {}
    private second: Partial<RunnerModel> = {}
    private slider: HTMLDivElement;
    private progress: HTMLDivElement;
    private change: (value: number) => void;

    get firstValue(){
        return this.first.value;
    }

    get secondValue(){
        return this.second.value;
    }

    constructor(root: HTMLDivElement, options?: SliderOptionsModel){
        const slider = createElement<HTMLDivElement>("div", SLIDER_STYLE_CLASSES.slider);
        const firstRunner = createElement<HTMLDivElement>("div", [SLIDER_STYLE_CLASSES.runner, "left"]);
        const secondRunner = createElement<HTMLDivElement>("div", [SLIDER_STYLE_CLASSES.runner, "right"]);
        const progress = createElement<HTMLDivElement>("div", SLIDER_STYLE_CLASSES.progress);

        slider.addEventListener("dragstart", (e) => e.preventDefault())

        firstRunner.setAttribute("data-runner-first", "");
        secondRunner.setAttribute("data-runner-second", "");

        this.first.element = firstRunner;
        this.second.element = secondRunner;

        slider.appendChild(firstRunner);
        slider.appendChild(progress);
        slider.appendChild(secondRunner);

        slider.addEventListener("mousedown", (e) => this.mouseDownHandler(e));
        slider.addEventListener("touchstart", (e) => this.touchHandler(e))
        this.slider = slider;
        this.progress = progress;

        root.appendChild(slider);
    }

    touchHandler(event: TouchEvent){
        const element = event.target as HTMLElement;
        const firstTouch = event.touches[0];
        const initX = firstTouch.clientX - this.slider.offsetLeft - element.offsetLeft - 2;
        
        if (!element.hasAttribute("data-runner-first") && !element.hasAttribute("data-runner-second"))
            return;

        const move = (e: TouchEvent) => {
            const secondTouch = e.touches[0];
            let value = secondTouch.clientX - this.slider.offsetLeft - initX;
            if (element.hasAttribute("data-runner-first")){
                value = value < -1 ? 
                            -1: value;
                value = value > this.second.element.offsetLeft - element.offsetWidth ? 
                            this.second.element.offsetLeft - element.offsetWidth:
                            value;
                element.style.left = value + "px";
            }

            if (element.hasAttribute("data-runner-second")){
                value = value + element.offsetWidth > this.slider.offsetWidth ? 
                            this.slider.offsetWidth - element.offsetWidth:
                            value;

                value = value < this.first.element.offsetLeft + this.first.element.offsetWidth ?
                            this.first.element.offsetLeft + this.first.element.offsetWidth:
                            value;
                element.style.left = value + "px";
            }

            this.progress.style.left = this.first.element.offsetLeft + this.first.element.offsetWidth - 4 + "px";
            this.progress.style.right = this.slider.offsetWidth - this.second.element.offsetLeft - 4 + "px";
            
        }

        const up = () => {
            document.removeEventListener("touchmove", move);
            document.removeEventListener("touchend", up);
        }

        document.addEventListener("touchmove", move);
        document.addEventListener("touchend", up);
    }

    mouseDownHandler(event: MouseEvent){
        const element = event.target as HTMLElement;
        const initX = event.clientX - this.slider.offsetLeft - element.offsetLeft - 2;
        
        if (!element.hasAttribute("data-runner-first") && !element.hasAttribute("data-runner-second"))
            return;

        const move = (e: MouseEvent) => {
            let value = e.clientX - this.slider.offsetLeft - initX;
            if (element.hasAttribute("data-runner-first")){
                value = value < -1 ? 
                            -1: value;
                value = value > this.second.element.offsetLeft - element.offsetWidth ? 
                            this.second.element.offsetLeft - element.offsetWidth:
                            value;
                element.style.left = value + "px";
            }

            if (element.hasAttribute("data-runner-second")){
                value = value + element.offsetWidth > this.slider.offsetWidth ? 
                            this.slider.offsetWidth - element.offsetWidth:
                            value;

                value = value < this.first.element.offsetLeft + this.first.element.offsetWidth ?
                            this.first.element.offsetLeft + this.first.element.offsetWidth:
                            value;
                element.style.left = value + "px";
            }

            this.progress.style.left = this.first.element.offsetLeft + this.first.element.offsetWidth - 4 + "px";
            this.progress.style.right = this.slider.offsetWidth - this.second.element.offsetLeft - 4 + "px";
            
        }

        const up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }


    onChange(cb){
        this.change = cb;
    }

}