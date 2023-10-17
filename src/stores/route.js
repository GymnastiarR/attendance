import { defineStore } from "pinia";

export const useRouteStore = defineStore( 'route', {
    state: () => ( {
        route: ""
    } ),

    actions: {
        setRoute( route ) {
            this.route = route;
        }
    }
} );