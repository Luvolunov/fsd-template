export interface RateButtonsModel {
    // current value
    value: number;
    // takes hook when rate was selected
    onSelect: (cb: (value: number) => void) => void
}