import { Counter } from "./counter.model";

export interface DropdownOptionsModel{
    // Will actions be in dropdown (clear, accept)
    withActions?: boolean;

    // counters object as state
    counters?: {[key: string]: Counter};

    // initial string in input
    viewText?: string;
}