import { Counter } from "./counter.model";
import { OnChange } from "./onchange-handler.model";

export interface DropdownModel{
    // Status
    isOpen: boolean;

    // store of the counters
    counters: {[key: string]: Counter};

    // take hook when values at counters changed
    onChange: (fn: OnChange) => void;

    // take hook when values was cleared
    onClear: (fn: () => void) => void;

    // take hook when values applied
    onApply: (fn: OnChange) => void;
}