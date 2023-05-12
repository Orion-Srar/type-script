import React, {FC} from 'react';
import {ICar} from "../interfaces";
import {useAppDispatch} from "../hooks";
import {carActions} from "../redux";

interface IProps {
    car: ICar
}

const Car: FC<IProps> = ({car}) => {
    const {id,brand,price,year} = car;
    const dispatch = useAppDispatch();

    return (
        <div>
            <div>id:{id}</div>
            <div>brand:{brand}</div>
            <div>price:{price}</div>
            <div>year:{year}</div>
            <div>
                <button onClick={()=>dispatch(carActions.setCarForUpdate(car))}>Update</button>
                <button onClick={()=>dispatch(carActions.deleteCar({id}))}>Delete</button>
            </div>
            <br/>
        </div>
    );
};

export {
    Car
}





