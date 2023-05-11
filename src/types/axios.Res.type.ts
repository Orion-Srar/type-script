import {AxiosResponse} from "axios";

type IRes<T> = Promise<AxiosResponse<T>>