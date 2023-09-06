import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";
import type {Rootstate,AppDispatch} from './store'


export const useAppSelector:TypedUseSelectorHook<Rootstate>=useSelector
export const useAppDispatch=()=>useDispatch<AppDispatch>()