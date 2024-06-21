import React from "react";
import ReactDOM from "react-dom";
import style from "./RegistrationPopup.module.css"
import RegistrationContainer from "./RegistrationForm/RegistrationContainer";

interface RegistrationPopupProps {
    isRegistrationVisible: boolean
    toggleRegistration: () => void;
}


const RegistrationPopup:React.FC<RegistrationPopupProps> = ({isRegistrationVisible,toggleRegistration}) => {
    if(!isRegistrationVisible){
        return null;
    }

    return ReactDOM.createPortal(
        <div  className={style.overlay} onClick={toggleRegistration}>
            <div onClick={e => e.stopPropagation()}>
                <RegistrationContainer toggleRegistration={toggleRegistration}/>
            </div>
        </div>
        , document.getElementById('modal-root')!);
}
export default RegistrationPopup;