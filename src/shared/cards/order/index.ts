import "./index.scss";
import "../../components/small-filter-date/index";
import "../../components/button_arrow/index";
import { DropdownController } from "../../../plugins/dropdown/dropdown.controller";

const dropdowns = Array.from(document.querySelectorAll(".js-order .js-dropdown"))
                       .map(
                           (el) => new DropdownController(el as HTMLDivElement, 
                                                          {
                                                              withActions: true, 
                                                              viewText: "3 гостя"
                                                           }
                                                         )
                       )