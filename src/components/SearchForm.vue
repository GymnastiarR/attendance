<script>
import IconMore from './icons/IconMore.vue';
import axios from 'axios';
export default {
    components: {
        IconMore
    },
    data() {
        return {
            isShow: false,
            siswa: {
                name: "",
                nis: "",
                RFID: false,
            }
        };
    },
    methods: {
        submit: function () {
            axios.get( '/siswa' )
                .then( Response => {
                    this.$emit( 'replaceListSiswa', Response.data.data );
                } )
                .catch( error => {
                    console.log( error.message );
                } );
        }
    }
};
</script>
<template>
    <div class="w-full md:w-1/2 my-2">
        <div class="flex justify-between" @click="isShow = !isShow">
            <h1 class="text-sm">Pencarian Khusus</h1>
            <IconMore />
        </div>
        <form action="" class="my-2" v-show="isShow">
            <div class="flex">
                <div class="flex flex-col mr-3">
                    <label for="" class="text-xs">Nama Siswa</label>
                    <input v-model="siswa.name" type="text" class="border-2 px-2 rounded-md h-full mb-2">
                </div>
                <div class="flex flex-col mr-3">
                    <label for="" class="text-xs">NIS Siswa</label>
                    <input v-model="siswa.nis" type="text" class="border-2 px-2 rounded-md h-full mb-2">
                </div>
            </div>
            <div class="flex mb-2">
                <label for="" class="text-xs mr-2">Belum Memiliki RFID</label>
                <input type="checkbox" class="mr-2 h-4 w-4 border-2 rounded-md" value="null" v-model="siswa.RFID">
            </div>
            <button @click.prevent="submit" class="bg-blue-500 text-xs px-3 py-2 rounded-md">Temukan</button>
        </form>
    </div>
</template>