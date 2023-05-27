import {useAppSelector} from "../store/store";

export function useAuthHook() {
    const isAuth: boolean = Boolean(useAppSelector(state => state.authSlice.data?.accessToken));

    return {
        isAuth
    }
}