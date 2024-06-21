import React, {useState} from "react";
import styles from "./LoginForm.module.css"
import mail from '../../../../assets/images/mail-outline.svg'
import lock from '../../../../assets/images/lock-closed-outline.svg'
import unlock from '../../../../assets/images/lock-open-outline.svg'
import {useForm,SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'

interface ILoginForm {
    email: string;
    password: string;
    remember: boolean;

}

type PropsType = {
    resultCodeAPI: number | null
    onBackdropClick: () => void
    loginUser: (email: string, password: string, rememberMe: boolean) => void
    toggleRegistration: () => void
}

const schema = yup.object({
    email: yup.string().required('Please enter your Email').email('Email is not valid'),
    password: yup.string().required('Please enter your Password')
});

const LoginForm: React.FC<PropsType> = ({onBackdropClick,loginUser, resultCodeAPI,toggleRegistration}) => {
    const {
        register, handleSubmit, formState: {
            errors
        }
    } = useForm<ILoginForm>({
        resolver: yupResolver(schema),
        mode: 'all'
    });

    const onSubmit: SubmitHandler<ILoginForm> = data => {
        loginUser(data.email, data.password, data.remember)
        onBackdropClick()
    }

    const ChangePopup = () => {
        toggleRegistration()
        onBackdropClick()
    }

    const [isPasswordShown, setPasswordShown] = useState(false)


    const togglePassword = () => {
        setPasswordShown(!isPasswordShown)
    }

    return (
        <section>
            <div className={styles.formBox} onClick={e => e.stopPropagation()}>
                <div className={styles.formValue}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Login</h2>
                        <div className={styles.inputBox}>
                            <img src={mail} alt=""/>
                            <input id={'email'} {...register(`email`)}/>
                            <label>Email</label>
                        </div>
                        {errors.email && <label className={styles.errorLabel}>{errors.email?.message}</label>}
                        <div className={styles.inputBox}>
                            <img onClick={togglePassword} src={isPasswordShown ? unlock : lock} alt=""/>
                            <input type={isPasswordShown ? "text" : "password"} id={'password'} {...register(`password`)}/>
                            <label>Password</label>
                        </div>
                        {errors.password && <label className={styles.errorLabel}>{errors.password?.message}</label>}
                        <div className={styles.forget}>
                            <label><input type="checkbox" id={"remember"} {...register(`remember`)}/>Remember me <a href="#">Forget Password</a></label>
                        </div>
                        <div className={styles.register}>
                            <p>Don`t have account <a onClick={ChangePopup}>Registration</a></p>
                        </div>
                        <button className={styles.button}>Log in</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default LoginForm;