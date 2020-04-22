import "./index.scss";
import "../../components/small-filter-date/index";
import "../../components/button_arrow/index";
import { DropdownController } from "../../../plugins/dropdown/dropdown.controller";
import { CalendarController } from "../../../plugins/calendar/calendar.controller";

const dropdowns = Array.from(document.querySelectorAll(".js-search-form .js-dropdown"))
                       .map((el) => new DropdownController(el as HTMLDivElement, 
                                        {
                                            viewText: "Сколько гостей", 
                                            withActions: true,
                                            counters: {
                                                men: {
                                                    name: "Взрослые",
                                                    value: 0
                                                },
                                                children: {
                                                    name: "Дети",
                                                    value: 0
                                                },
                                                babies: {
                                                    name: "Младенцы",
                                                    value: 0
                                                }
                                            }
                                        }
                       ));

const forms = document.querySelectorAll(".js-search-form");

const calendars = Array.from(document.querySelectorAll(".js-search-form .js-calendar"))
                       .map((el, index) => {
                            const c = new CalendarController(el as HTMLDivElement)
                            forms[index].addEventListener("click", (e) => {
                                const el = e.target as HTMLElement;
                                if (el.hasAttribute("data-calendar-toggle")){
                                    c.toggle();
                                }
                            })
                            c.onApply((first: Date, second: Date) => {
                                const f = forms[index].querySelector(".js-calendar-from") as HTMLInputElement;
                                const t = forms[index].querySelector(".js-calendar-to") as HTMLInputElement;

                                f.value = first.toLocaleDateString();
                                t.value = second.toLocaleDateString();
                                c.toggle();
                            })
                            return c;
                       })