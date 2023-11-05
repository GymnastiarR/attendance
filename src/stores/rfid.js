import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import { useErrorStore } from "./error";
import { useSuccessStore } from "./success";
import { useRouter } from "vue-router";
import { Call } from "../services/Calling";

export const useRfidStore = defineStore( 'rfid', {
    state: () => ( {
        rfid: ""
    } ),

    actions: {
        store( studentId, rfid ) {
            Call.post( `/siswa/${studentId}/rfid`, { rfid: rfid }, ( error, response ) => {
                if ( error ) {
                    return;
                }
                useSuccessStore().setSuccess( response, () => {
                    this.$router.push( { name: 'siswa' } );
                } );
            } );
        }
    }
} );