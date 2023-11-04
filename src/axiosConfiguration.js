import axios from "axios";

const instance = axios.create( {
    baseURL: import.meta.env.VITE_API,
} );

export const setHeaderAxios = () => {
    instance.defaults.headers.common.Authorization = `Bearer ${localStorage.getItem( 'token' )}`;
};

const getAxios = () => {
    if ( localStorage.getItem( 'token' ) ) {
        setHeaderAxios();
    }

    return instance;
};

export default getAxios();
