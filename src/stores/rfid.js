import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import axios from "../axiosConfiguration";
import { useErrorStore } from "./error";
import { useSuccessStore } from "./success";

export const useRfidStore = defineStore( 'rfid', {
    state: () => ( {
        rfid: ""
    } ),

    actions: {
        store( studentId, rfid ) {
            useLoadingStore().loading = true;

            axios.post( `/siswa/${studentId}/rfid`, { rfid: rfid } )
                .then( response => {
                    useSuccessStore().setSuccess( response );
                    this.rfid = {};
                } )
                .catch( error => {
                    console.log( error );
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        }
    }
} );