import "./search-room.scss";
import "../../shared/components/big-filter-date/index";
import "../../shared/components/standart-checkbox/index";
import "../../shared/components/checkbox-list/index";
import "../../shared/cards/room-preview/index";
import "../../shared/components/pagination/index";
import { CalendarController } from "../../plugins/calendar/calendar.controller";
import { DropdownController } from "../../plugins/dropdown/dropdown.controller";
import { SliderController } from "../../plugins/slider/slider.controller";


const filters = Array.from(document.querySelectorAll(".js-room-filter"));

filters.forEach((filter) => {
    const calendar = new CalendarController(filter.querySelector(".js-calendar") as HTMLDivElement);
    const menDropdown = new DropdownController(filter.querySelector(".js-dropdown-men") as HTMLDivElement);
    const slider = new SliderController(filter.querySelector(".js-range-slider"))

    calendar.onApply(calendar.toggle);

    const roomsDropdown = new DropdownController(filter.querySelector(".js-dropdown-room") as HTMLDivElement);
    
    filter.addEventListener("click", (e) => {
        const element = e.target as HTMLElement;

        if (element.hasAttribute("data-calendar-toggle")){
            calendar.toggle();
        }

    })
})


