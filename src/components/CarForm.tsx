import React, {FC, useEffect} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {ICar} from "../interfaces";
import {useAppDispatch, useAppSelector} from "../hooks";
import {carActions} from "../redux";

interface IProps {

}

const CarForm: FC<IProps> = () => {
    const {register, reset, handleSubmit, setValue} = useForm<ICar>();
    const dispatch = useAppDispatch();
    const {carForUpdate} = useAppSelector(state => state.carReducer);

    const saveCar: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.save({car}))
        reset();
    }

    const update: SubmitHandler<ICar> = async (car) => {
        await dispatch(carActions.update({car,id:carForUpdate!.id}))
        reset()
    }

    useEffect(() => {
        if (carForUpdate) {
            setValue('brand', carForUpdate.brand)
            setValue('price', carForUpdate.price)
            setValue('year', carForUpdate.year)
        }
    }, [carForUpdate])

    return (
        <form onSubmit={handleSubmit(carForUpdate ? update: saveCar)}>
            <input type="text" placeholder={'brand'} {...register('brand')}/>
            <input type="text" placeholder={'price'} {...register('price')}/>
            <input type="text" placeholder={'year'} {...register('year')}/>
            <button>{carForUpdate? 'Update': 'Save'}</button>
        </form>
    );
};

export {
    CarForm
}





