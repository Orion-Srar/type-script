import {ICar, IError} from "../../interfaces";
import {createAsyncThunk, createSlice, isFulfilled, isRejectedWithValue} from "@reduxjs/toolkit";
import {carService} from "../../services";
import {AxiosError} from "axios";

interface IState {
    cars: ICar[],
    errors: IError | null,
    trigger: boolean,
    carForUpdate: ICar | null
}

const initialState: IState = {
    cars: [],
    errors: null,
    trigger: false,
    carForUpdate: null
};

const getAll = createAsyncThunk<ICar[], void>(
    'carSlice/getAll',
    async (_, {rejectWithValue}) => {
        try {
            const {data} = await carService.getAll();
            return data
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response)
        }
    }
)

const save = createAsyncThunk<void, { car: ICar }>(
    'carSlice/save',
    async ({car}, {rejectWithValue,getState}) => {
        try {
            await carService.create(car)
        } catch (e) {
            const err = e as AxiosError
            return rejectWithValue(err.response)

        }
    }
)

const update = createAsyncThunk<void, { car: ICar, id: number }>(
    'carSlice/update',
    async ({car, id}, {rejectWithValue}) => {
        try {
            await carService.updateById(id, car)
        } catch (e) {
            const err: AxiosError = e as any
            return rejectWithValue(err.response)
        }
    }
)

const deleteCar = createAsyncThunk<void, {id: number}>(
    'carSlice/delete',
    async ({id}, {rejectWithValue}) => {
        try {
            await carService.deleteById(id)
        }catch (e) {
            const err: AxiosError = e as any
            return rejectWithValue(err.response)
        }
    }
)

let slice = createSlice({
    name: 'carSlice',
    initialState,
    reducers: {
        setCarForUpdate: (state, action) => {
            state.carForUpdate = action.payload
        }
    },
    extraReducers: builder =>
        builder
            .addCase(getAll.fulfilled, (state, action) => {
                state.cars = action.payload
            })
            .addCase(update.fulfilled, state => {
                state.carForUpdate = null
            })
            .addMatcher(isFulfilled(save, update, deleteCar), state => {
                state.trigger = !state.trigger
            })
            .addMatcher(isRejectedWithValue(), (state, action) => {
            })
});

const {reducer: carReducer, actions} = slice;

const carActions = {
    ...actions,
    getAll,
    save,
    update,
    deleteCar
}

export {
    carReducer,
    carActions
}