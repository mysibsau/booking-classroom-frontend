import React from "react";
import { CSSTransition } from "react-transition-group";

import styles from "./styles.module.scss";
import animation from "./animation.module.scss";
import useExpandableWrapper from "./useExpandableWrapper";

interface IProps {
    isExpanded: boolean;
    children: React.ReactNode;
}

const ExpandableWrapper: React.FC<IProps> = ({ children, isExpanded }) => {
    const { onEnter, onEntered, onExit, onExiting, state } = useExpandableWrapper(isExpanded);
    const { childHeight } = state;

    return (
        <div style={{ height: childHeight }} className={styles.wrapper}>
            <CSSTransition
                in={isExpanded}
                timeout={300}
                classNames={animation}
                onEnter={onEnter}
                onEntered={onEntered}
                onExit={onExit}
                onExiting={onExiting}
                mountOnEnter
                unmountOnExit
            >
                {children}
            </CSSTransition>
        </div>
    );
};

export default ExpandableWrapper;