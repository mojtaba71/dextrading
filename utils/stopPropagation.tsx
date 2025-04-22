import { MouseEvent } from "react";

export const stopPropagation = (e: MouseEvent) => {
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
};