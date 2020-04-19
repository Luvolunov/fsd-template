import "./index.scss";
import "../../components/small-filter-date/index";
import "../../components/button_arrow/index";
import { DropdownController } from "../../../plugins/dropdown/dropdown.controller";

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
                       ))