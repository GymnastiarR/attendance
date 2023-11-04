import { defineStore } from "pinia";
import { useLoadingStore } from "./loading";
import axios from "../axiosConfiguration";
import { useSuccessStore } from "./success";
import { useErrorStore } from "./error";

export const useShopStore = defineStore( 'shop', {
    state: () => ( {
        shop: {
            name: "",
            menus: []
        },

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
        }
    }
} );