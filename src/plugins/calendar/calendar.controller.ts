import "./calendar.scss"
import { CalendarOptionsModel } from "./calendar-options.model";
import { DayModel } from "./day.model";
import { createElement } from "../../shared/libs/createElement.function";
import { CALENDAR_STYLE_CLASSES } from "./calendar.style-classes";
import { MONTHS } from "./months.const";
import { DAY_OF_WEEK } from "./day-of-week-short.const";
import { CalendarModel } from "./calendar.model";

const DAY = 1000 * 60 * 60 * 24;

export class CalendarController implements CalendarModel{

    //hooks
    private select: (first: Date, second: Date) => void;
    private apply: (first: Date, second: Date) => void;
    private clear: (first: Date, second: Date) => void;

    
    private now = new Date();
    private currentDate = new Date(this.now.getFullYear(), this.now.getMonth());
    private days: Array<DayModel> = []
    private daysControllers: Array<HTMLDivElement> = [];

    private title: HTMLDivElement;
    private block: HTMLDivElement;

    constructor(root: HTMLDivElement, options?: CalendarOptionsModel){
        this.setDays();
        const calendar = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.calendar);
        const info = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.info);

        const leftArrow = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.leftArrow);
        const title = createElement<HTMLDivElement>("h2");
        const rightArrow = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.rightArrow);

        const weekDaysOuter = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.weekDaysOuter);

        leftArrow.setAttribute("data-left-arrow", "");
        rightArrow.setAttribute("data-right-arrow", "");

        for (let i = 0; i < DAY_OF_WEEK.length; ++i){
            const weekDay = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.weekDay);

            weekDay.textContent = DAY_OF_WEEK[i];
            weekDaysOuter.appendChild(weekDay);            
        }

        const block = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.block);
        this.block = block;
        this.title = title;

        this.render();

        info.appendChild(leftArrow);
        info.appendChild(title);
        info.appendChild(rightArrow);

        calendar.appendChild(info);
        calendar.appendChild(weekDaysOuter);
        calendar.appendChild(block)

        calendar.addEventListener("click", (e) => this.clickHandler(e));
        calendar.addEventListener("mousedown", (e) => this.mouseDownHandler(e));
        

        root.appendChild(calendar)
    }

    setDays(){
        let firstDay = this.currentDate;
        const beforeDays: Array<DayModel> = [];
        const afterDays: Array<DayModel> = [];

        while (firstDay.getDay() !== 1){
            firstDay = new Date(+firstDay - DAY);
            beforeDays.push({
                day: firstDay.getDate(),
                month: firstDay.getMonth(),
                year: firstDay.getFullYear()
            });
        }

        firstDay = new Date(+this.currentDate);

        while (firstDay.getMonth() === this.currentDate.getMonth()){
            afterDays.push({
                day: firstDay.getDate(),
                month: firstDay.getMonth(),
                year: firstDay.getFullYear()
            });
            firstDay = new Date(+firstDay + DAY);
        }

        firstDay = new Date(+firstDay - DAY);


        if (firstDay.getDay() !== 0) {
            while (firstDay.getDay() !== 0 ){
                firstDay = new Date(+firstDay + DAY);
                afterDays.push({
                    day: firstDay.getDate(),
                    month: firstDay.getMonth(),
                    year: firstDay.getFullYear()
                });
            }
        }

        this.days = Array.prototype.concat([], beforeDays.reverse(), afterDays);


    }

    render(){
        for (let i = 0; i < this.daysControllers.length; ++i){
            this.block.removeChild(this.daysControllers[i]);
        }

        this.daysControllers = [];

        for (let i = 0; i < this.days.length; ++i){
            const day = createElement<HTMLDivElement>("div", CALENDAR_STYLE_CLASSES.day);

            day.textContent = String(this.days[i].day);

            if (this.days[i].month !== this.currentDate.getMonth()) 
                day.classList.add("disabled")

            if (this.days[i].month === this.now.getMonth() &&
                this.days[i].day === this.now.getDate() &&
                this.days[i].year === this.now.getFullYear())
                day.classList.add("current")

            if (this.days[i].month === this.now.getMonth() && 
                this.days[i].day >= this.now.getDate() &&
                this.days[i].month === this.currentDate.getMonth() ||
                this.currentDate.getMonth() > this.now.getMonth() &&
                this.days[i].month === this.currentDate.getMonth() &&
                this.days[i].day >= this.currentDate.getDate()){
                day.setAttribute("data-day", String(i))
            }
                

            this.daysControllers.push(day);

            this.block.appendChild(day);
        }

        this.title.textContent = `${MONTHS[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }

    nextMonth(){
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1);
        this.setDays();
        this.render();
    }

    previousMonth(){
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1);
        this.setDays();
        this.render();
    }

    clickHandler(e: MouseEvent){
        const element = event.target as HTMLElement;
        if (element.hasAttribute("data-left-arrow") && 
            (this.currentDate.getMonth() - 1 >= this.now.getMonth() &&
            this.currentDate.getFullYear() === this.now.getFullYear() ||
            this.currentDate.getFullYear() > this.now.getFullYear())){
            this.previousMonth();
        } else if (element.hasAttribute("data-right-arrow")){
            this.nextMonth()
        }
    }

    mouseDownHandler(e: MouseEvent){
        const self = this;
        const element = e.target as HTMLElement;

        if (!element.hasAttribute("data-day")) return;

        this.daysControllers.forEach((el) => {
            el.classList.remove("chosen", "first", "gap", "second")
        })

        const firstKey = +element.getAttribute("data-day");

        element.classList.add("chosen");

        let lastElement: HTMLElement;

        const move = (e: MouseEvent) => {
            const el = e.target as HTMLElement;

            if (!el.hasAttribute("data-day") || el === element) return;
            if (lastElement) {
                lastElement.classList.remove("chosen");
                lastElement.classList.remove("second");
            }

            if (!element.classList.contains("first")) element.classList.add("first")

            const secondKey = +el.getAttribute("data-day");

            lastElement = el;
            el.classList.add("chosen", "second");

            this.daysControllers.forEach((gap) => {
                if (gap.classList.contains("gap")){
                    gap.classList.remove("gap")
                }
            })

            if (firstKey < secondKey){
                this.daysControllers[firstKey].classList.remove("second");
                this.daysControllers[secondKey].classList.remove("first");
                this.daysControllers[firstKey].classList.add("first");
                this.daysControllers[secondKey].classList.add("second");
                for (let i = firstKey; i < secondKey; ++i){
                    if (this.daysControllers[i] === element) continue;
                    this.daysControllers[i].classList.add("gap")
                }
            } else {
                this.daysControllers[firstKey].classList.remove("first");
                this.daysControllers[secondKey].classList.remove("second");
                this.daysControllers[firstKey].classList.add("second");
                this.daysControllers[secondKey].classList.add("first");
                for (let i = secondKey; i < firstKey; ++i){
                    if (this.daysControllers[i] === el) continue;
                    this.daysControllers[i].classList.add("gap")
                }
            }

        }

        const up = () => {
            document.removeEventListener("mousemove", move);
            document.removeEventListener("mouseup", up);
            const f = self.days[firstKey];
            if (lastElement) {
                const s = self.days[+lastElement.getAttribute("data-day")]
                self.select && 
                self.select(
                    new Date(f.year, f.month, f.day),
                    new Date(s.year, s.month, s.day)
                ) 
                return;
            }
            self.select && 
            self.select(
                new Date(f.year, f.month, f.day),
                new Date(f.year, f.month, f.day)
            ) 
        }

        document.addEventListener("mousemove", move);
        document.addEventListener("mouseup", up);
    }

    onSelect(cb){
        this.select = cb;
    }

    onApply(cb){
        this.apply = cb;
    }

    onClear(cb){
        this.clear = cb;
    }
}