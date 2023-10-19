import { defineStore } from "pinia";

export const useSuccessStore = defineStore( 'success', {
    state: () => ( {
        success: {
            status: "",
            messages: ""
        }
    } ),

    actions: {
        setSuccess( response ) {
            this.success = {
                status: response.status,
                messages: response.data.message
            };
        },

        clear() {
            this.success = {
                status: "",
                messages: ""
            };
        },

    }
} );