export interface CalendarModel{
    onSelect: (cb: (first: Date, second: Date) => void) => void;
    onApply: (cb: (first: Date, second: Date) => void) => void;
    onClear: (cb: (first: Date, second: Date) => void) => void;
}