import { VoidProcedure } from "../../shared/models/void-procedure/void-procedure.model";

export interface CalendarModel{
    onSelect: (cb: (first: Date, second: Date) => void) => void;
    onApply: (cb: (first: Date, second: Date) => void) => void;
    onClear: (cb: VoidProcedure) => void;
    firstDate: Date;
    lastDate: Date;
    isOpen: boolean;
    toggle: VoidProcedure;
}