import React, {useState} from "react";
import style from "./RegistrationForm.module.css"
import mail from '../../../../assets/images/mail-outline.svg'
import lock from '../../../../assets/images/lock-closed-outline.svg'
import unlock from '../../../../assets/images/lock-open-outline.svg'
import user from '../../../../assets/images/person-outline.svg'
import phone from '../../../../assets/images/call-outline.svg'
import {useForm,SubmitHandler} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup";
import * as yup from 'yup'
interface IRegistrationForm {
    email: string
    password: string
    repeatPassword:string
    remember: boolean
    firstName: string
    lastName: string
    number: string

}

type PropsType = {
    toggleRegistration: () => void
    loginUser: (email: string, password: string, rememberMe: boolean) => void
}

const atLeastOneUppercase = /[A-Z]/g; // capital letters from A to Z
const atLeastOneLowercase = /[a-z]/g; // small letters from a to z
const atLeastOneNumeric = /[0-9]/g; // numbers from 0 to 9
const withoutSpace= /^\S+$/;

const schema = yup.object({
    email: yup.string().required('Please enter your Email').email('Email is not valid'),
    password: yup.string().required('Please enter your Password')
        .min(6, 'Min length is 6 symbols')
        .max(14, 'Max length is 14 symbols')
        .matches(atLeastOneUppercase, 'Must contain uppercase')
        .matches(atLeastOneLowercase, 'Must contain lowercase')
        .matches(atLeastOneNumeric,'Must contain number')
        .matches(withoutSpace, 'Dont use space'),
    firstName: yup.string().required('Please enter your Name').matches(/^[a-zA-Z]+$/,  'Name is not valid'),
    lastName: yup.string().required('Please enter your Last Name').matches(/^[a-zA-Z]+$/,  'Last Name is not valid'),
    number: yup.string().required('Please enter your Phone Number').matches(/^[\+]?[(]?[0-9]{3}[)]?[-\&\.]?[0-9]{3}[-\&\.]?[0-9]{4,6}$/,'Phone Number is not valid'),
    repeatPassword: yup.string().required('Please repeat your Password').oneOf([yup.ref('password')],'Wrong password')
});

const RegistrationForm: React.FC<PropsType> = ({toggleRegistration,loginUser}) => {

    const {
        register, handleSubmit, formState: {
            errors
        }
    } = useForm<IRegistrationForm>({
        resolver: yupResolver(schema),
        mode: 'all'
    });

    const onSubmit: SubmitHandler<IRegistrationForm> = data => {
        loginUser(data.email, data.password, data.remember)
        toggleRegistration()
    }

    const [isPasswordShown, setPasswordShown] = useState(false);
    const [isPasswordRepeatShown, setPasswordRepeatShown] = useState(false);

    const togglePassword = () => {
        setPasswordShown(!isPasswordShown);
    }

    const togglePasswordRepeat = () => {
        setPasswordRepeatShown(!isPasswordRepeatShown);
    }




    return (
        <section>
            <div className={style.formBox} onClick={e => e.stopPropagation()}>
                <div className={style.formValue}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2>Registration</h2>
                        <div className={style.inputBox}>
                            <img src={user} alt=""/>
                            <input id={'firstName'} {...register(`firstName`)}/>
                            <label>First Name</label>
                        </div>
                        {errors.firstName && <label className={style.errorLabel}>{errors.firstName?.message}</label>}
                        <div className={style.inputBox}>
                            <img src={user} alt=""/>
                            <input id={'lastName'} {...register(`lastName`)}/>
                            <label>Last Name</label>
                        </div>
                        {errors.lastName && <label className={style.errorLabel}>{errors.lastName?.message}</label>}
                        <div className={style.inputBox}>
                            <img src={mail} alt=""/>
                            <input id={'email'} {...register(`email`)}/>
                            <label>Email</label>
                        </div>
                        {errors.email && <label className={style.errorLabel}>{errors.email?.message}</label>}
                        <div className={style.inputBox}>
                            <img src={phone} alt=""/>
                            <input id={'number'} {...register(`number`)}/>
                            <label>Your Number</label>
                        </div>
                        {errors.number && <label className={style.errorLabel}>{errors.number?.message}</label>}
                        <div className={style.inputBox}>
                            <img onClick={togglePassword} src={isPasswordShown ? unlock : lock} alt=""/>
                            <input type={isPasswordShown ? "text" : "password"} id={'password'} {...register(`password`)}/>
                            <label>Password</label>
                        </div>
                        {errors.password && <label className={style.errorLabel}>{errors.password?.message}</label>}
                        <div className={style.inputBox}>
                            <img onClick={togglePasswordRepeat} src={isPasswordRepeatShown ? unlock : lock} alt=""/>
                            <input type={isPasswordRepeatShown ? "text" : "password"} id={'repeatPassword'} {...register(`repeatPassword`)}/>
                            <label>Repeat Password</label>
                        </div>
                        {errors.repeatPassword && <label className={style.errorLabel}>{errors.repeatPassword?.message}</label>}
                        <button className={style.button}>Registration</button>
                    </form>
                </div>
            </div>
        </section>
    );
}

export default RegistrationForm;