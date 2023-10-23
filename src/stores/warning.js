import { defineStore } from "pinia";

export const useWarningStore = defineStore( 'warning', {
    state: () => ( {
        warning: null,
        callBack: null
    } ),

    actions: {
        callWarning( warning, callBack ) {
            this.warning = warning;
            this.callBack = callBack;
        }
    }
} );