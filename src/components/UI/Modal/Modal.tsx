import React, { useEffect, useRef, useState } from "react";
import { CSSTransition } from "react-transition-group";
import useMount from "./useMount";
import { IconCloseX } from "../Icons";
import Portal from "../Portal";
import { modalAnimation, overlayAnimation, ANIMATION_TIME } from "./consts";
import "./Modal.scss";
import "./ModalAnimation.scss";

interface IProps {
    isShow: boolean;
    setIsShow: React.Dispatch<React.SetStateAction<boolean>>;
    children: React.ReactNode;
    title?: string;
}

const ModalContent: React.FC<IProps> = ({ children, isShow, setIsShow, title }) => {
    const overlayRef = useRef(null);
    const modalRef = useRef(null);

    const [animationIn, setAnimationIn] = useState(false);

    useEffect(() => {
        document.body.style.overflow = isShow ? "hidden" : "";
        setAnimationIn(isShow);
    }, [isShow]);

    useEffect(() => {
        return () => {
            document.body.style.overflow = "";
        }
    }, [])

    return (
        <div className={"modal-container"}>
            <CSSTransition
                in={animationIn}
                nodeRef={overlayRef}
                timeout={ANIMATION_TIME}
                mountOnEnter
                unmountOnExit
                classNames={overlayAnimation}
            >
                <div ref={overlayRef} className={"modal-overlay"} onClick={() => setIsShow(false)}></div>
            </CSSTransition>

            <CSSTransition
                in={animationIn}
                nodeRef={modalRef}
                timeout={ANIMATION_TIME}
                mountOnEnter
                unmountOnExit
                classNames={modalAnimation}
            >
                <div ref={modalRef} className={"modal-content"}>
                    <div className={"modal-control"}>
                        {title && <div className={"modal-title"}>{title}</div>}

                        <div className={"close"} onClick={() => setIsShow(false)}>
                            <IconCloseX size={25} />
                        </div>
                    </div>

                    <div className={"modal-body"}>
                        {children}
                    </div>
                </div>
            </CSSTransition>
        </div>
    );
};

const Modal: React.FC<IProps> = ({ title, children, isShow, setIsShow }) => {
    const { mounted } = useMount(isShow, ANIMATION_TIME);

    if (!mounted) {
        return null;
    }

    return (
        <Portal>
            <ModalContent isShow={isShow} title={title} setIsShow={setIsShow} >
                {children}
            </ModalContent>
        </Portal>
    );
};

export default Modal;