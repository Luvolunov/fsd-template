export interface DropdownOptionsModel{
    // Will actions be in dropdown (clear, accept)
    withActions?: boolean;

    // counters object as state
    counters?: {[key: string]: {name: string, value: number}};

    // initial string in input
    viewText?: string;
}