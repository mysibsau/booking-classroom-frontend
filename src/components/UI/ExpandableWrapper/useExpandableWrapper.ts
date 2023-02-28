import { useState } from "react";

const useExpandableWrapper = (isExpanded: boolean) => {
    const [childHeight, setChildHeight] = useState<string | number>(isExpanded ? "auto" : 0);

    const onEnter = (element: HTMLElement) => {
        const height = element.offsetHeight;
        setChildHeight(height);
    };

    const onEntered = () => {
        setChildHeight("auto");
    };

    const onExit = (element: HTMLElement) => {
        const height = element.offsetHeight;
        setChildHeight(height);
    };

    const onExiting = () => {
        const height = 0;
        setChildHeight(height);
    };

    const state = {
        childHeight,
    };

    return {
        onEnter,
        onEntered,
        onExit,
        onExiting,
        state,
    };
};

export default useExpandableWrapper;