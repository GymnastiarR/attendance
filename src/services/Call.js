import axios from "../axiosConfiguration";
import { useLoadingStore } from "../stores/loading";
import { useErrorStore } from "../stores/error";


export class Call {
    static async delete( url, callback ) {
        try {
            useLoadingStore().loading = true;
            const data = await axios.delete( url );
            callback( null, data );
        } catch ( error ) {
            useErrorStore().setError( error );
            callback( error, null );
        }
        useLoadingStore().loading = false;
    }
    static async put( url, body, callback ) {
        try {
            useLoadingStore().loading = true;
            const data = await axios.put( url, body, callback );
            callback( null, data );
        } catch ( error ) {
            useErrorStore().setError( error );
            callback( error, null );
        }
        useLoadingStore().loading = false;
    }
    static async get( url, callback ) {
        try {
            useLoadingStore().loading = true;
            const data = await axios.get( url );
            callback( null, data );
        } catch ( error ) {
            useErrorStore().setError( error );
            callback( error, null );
        }
        useLoadingStore().loading = false;
    }

    static async post( url, body, callback ) {
        try {
            useLoadingStore().loading = true;
            const data = await axios.post( url, body, callback );
            callback( null, data );
        } catch ( error ) {
            console.log( error );
            useErrorStore().setError( error );
            callback( error, null );
        }
        useLoadingStore().loading = false;
    }
}