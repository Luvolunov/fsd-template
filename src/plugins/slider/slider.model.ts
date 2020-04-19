export interface SliderModel{
    // will take hook when value will be changed
    onChange: (cb: (value: number) => void) => void;
    // the first slider item
    firstValue: number;
    // the second slider item
    secondValue: number;
}