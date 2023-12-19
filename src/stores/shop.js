import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import axios from "../axiosConfiguration";
import { useSuccessStore } from "./success";
import { useErrorStore } from "./error";
import { Call } from "../services/Calling";

export const useShopStore = defineStore( 'shop', {
    state: () => ( {
        shop: {
            name: ""
        },
        show: null,
        shops: []
    } ),

    actions: {
        store() {
            useLoadingStore().loading = true;

            axios.post( '/kantin', this.shop )
                .then( response => {
                    useSuccessStore().setSuccess( response );
                    this.shop = {
                        name: "",
                        menus: []
                    };
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    this.getAll();
                    useLoadingStore().loading = false;
                } );
        },

        getAll() {
            useLoadingStore().loading = true;

            axios.get( '/kantin' )
                .then( response => {
                    this.shops = response.data.data;
                } )
                .catch( error => {
                    useErrorStore().setError( error );
                } )
                .finally( () => {
                    useLoadingStore().loading = false;
                } );
        },

        get( canteenId ) {
            Call.get( `/kantin/${canteenId}`, ( error, response ) => {
                if ( error ) {
                    return;
                }
                this.show = response.data.data;
            } );
        },

        updateName( menuId, data, canteenId ) {
            return () => {
                Call.put( `/kantin/${canteenId}/menus/${menuId}/name`, { name: data }, ( error, response ) => {
                    if ( error ) {
                        return;
                    }

                    useSuccessStore().setSuccess( response, () => {
                        this.get( canteenId );
                        // this.clear();
                    } );
                } );
            };
        },

        updatePrice( menuId, data, canteenId ) {
            return () => {
                Call.put( `/kantin/${canteenId}/menus/${menuId}/price`, { price: data }, ( error, response ) => {
                    if ( error ) {
                        this.get( canteenId );
                        return;
                    }

                    useSuccessStore().setSuccess( response, () => {
                        this.get( canteenId );
                    } );
                } );
            };
        },

        withdraw( canteenId ) {
            Call.get( `/kantin/${canteenId}/withdrawal`, ( error, response ) => {
                if ( error ) {
                    return;
                }

                useSuccessStore().setSuccess( response, () => {
                    this.get( canteenId );
                } );
            } );
        },

        getHistory( canteenId ) {
            return new Promise( ( resolve, reject ) => {
                Call.get( `/kantin/${canteenId}/history`, ( error, response ) => {
                    if ( error ) {
                        resolve( [] );
                        return;
                    }
                    resolve( response.data.data );
                    // console.log( response.data.data );
                    // return response.data.data;
                } );
            } );
        },

        destroyMenu( canteenId, menuId ) {
            return () => {
                Call.delete( `/kantin/${canteenId}/menus/${menuId}`, ( error, response ) => {
                    if ( error ) {
                        return;
                    }

                    useSuccessStore().setSuccess( response, () => {
                        this.get( canteenId );
                    } );
                } );
            };
        },

        destroyCanteen( canteenId ) {
            return () => {
                Call.delete( `/kantin/${canteenId}`, ( error, response ) => {
                    if ( error ) {
                        return;
                    }

                    useSuccessStore().setSuccess( response, () => {
                        this.getAll();
                    } );
                } );
            };
        },

        storeMenu( canteenId, data ) {
            Call.post( `/kantin/${canteenId}`, data, ( error, response ) => {
                if ( error ) {
                    return;
                }
                useSuccessStore().setSuccess( response, () => {
                    this.get( canteenId );
                } );
            } );
        }
    }
} );