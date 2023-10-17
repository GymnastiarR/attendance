<script>
import SideMenu from "../components/SideMenu.vue";
import IconLink from "../components/icons/IconLink.vue";
import socket from "../socket";
import { store } from "../store";
import axios from "axios";

export default {
    components: {
        SideMenu, IconLink
    },
    data() {
        return {
            rfid: "",
            student: {},
            store
        };
    },
    beforeMount() {
        socket.on( 'RFID', ( data ) => {
            this.rfid = data;
        } );
        axios.get( `/siswa/${this.$route.params.id}` )
            .then( response => {
                this.student = response.data.data;
            } )
            .catch( error => {
                console.log( error );
            } );
    },
    computed: {
        isDisabled() {
            return this.rfid === "";
        }
    },
    methods: {
        submit: function () {
            axios.post( `/siswa/${this.$route.params.id}/rfid`, { rfid: this.rfid } )
                .then( ( response ) => {
                    this.$router.push( '/siswa' );
                } )
                .catch( function ( error ) {
                    store.error = error.response.data;
                } );
        }
    }
};
</script>
<template>
    <div class="min-h-screen flex">
        <SideMenu />
        <main class="bg-[#F5F5F5] w-4/5 flex justify-center items-center">
            <div class="bg-white w-1/2 rounded-md drop-shadow-md p-8 py-6">
                <div class="border-b-2 mb-4">
                    <h2 class="font-semibold mb-4">Menghubungkan Kartu</h2>
                </div>
                <div class="flex flex-col items-center">
                    <div class="flex flex-col items-center mb-3">
                        <p>{{ student.name }}</p>
                        <p>{{ student.nis }}</p>
                    </div>
                    <IconLink />
                    <div class="mb-3">
                        <p v-if="rfid === ''" class="text-lg font-semibold">Silahkan Tap Kartu</p>
                        <p v-else class="text-lg font-semibold">{{ rfid }}</p>
                    </div>
                    <button @click="submit" class="px-3 py-2 bg-blue-600 text-white rounded-md text-sm disabled:opacity-30"
                        :disabled="isDisabled">Hubungkan</button>
                </div>
            </div>
        </main>
    </div>
</template>