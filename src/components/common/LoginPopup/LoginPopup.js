import React from "react";
import ReactDOM from "react-dom";
import style from "./LoginPopup.module.css"
import LoginContainer from "./LoginForm/LoginContainer";

interface LoginPopupProps {
    isModalVisible: boolean;
    onBackdropClick: () => void;
    resultCodeAPI: number | null
    toggleRegistration: () => void
}

const LoginPopup:React.FC<LoginPopupProps> = ({isModalVisible,onBackdropClick, resultCodeAPI,toggleRegistration}) => {
    if(!isModalVisible){
        return null;
    }

    return ReactDOM.createPortal(
        <div  className={style.overlay} onClick={onBackdropClick}>
            <div onClick={e => e.stopPropagation()}>
                <LoginContainer toggleRegistration={toggleRegistration} onBackdropClick={onBackdropClick} resultCodeAPI={resultCodeAPI}/>
            </div>
        </div>
        , document.getElementById('modal-root')!);
}
export default LoginPopup;