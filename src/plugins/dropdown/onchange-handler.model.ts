import { Counter } from "./counter.model";

export interface OnChange{
    (state: {[key: string]: Counter}): void
}