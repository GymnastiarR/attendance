import { defineStore } from "pinia";

export const useSuccessStore = defineStore( 'success', {
    state: () => ( {
        success: {
            status: "",
            messages: ""
        },
        callBack: null
    } ),

    actions: {
        setSuccess( response, callBack ) {
            this.success = {
                status: response.status,
                messages: response.data.message
            };

            this.callBack = callBack;
        },

        clear() {
            this.success = {
                status: "",
                messages: ""
            };
        },

        close() {
            this.clear();
            if ( this.callBack ) {
                this.callBack();
            }
        }
    }
} );