import { VoidProcedure } from "../../shared/models/void-procedure/void-procedure.model";

export interface DropdownModel{
    // Status
    isOpen: boolean;

    // store of the counters
    counters: {[key: string]: number};

    // set counter at counters
    setCounter: (key: string) => void;

    // increment of counter
    inc: (key: string) => void;

    // decrement of counter
    dec: (key: string) => void;

    // remove counter at `counters`
    removeCounter: (key: string) => void;

    // Change Status
    toggle: VoidProcedure;
    
    // clear all values in `counters`
    clear?: VoidProcedure;

    // here can be request to server, calculating, etc.
    accept?: VoidProcedure;
}