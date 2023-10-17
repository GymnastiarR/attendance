<script>
import SideMenu from '../components/SideMenu.vue';
import axios from 'axios';
export default {
    components: { SideMenu },
    data() {
        return {
            listSiswa: [],
            selectedSiswa: [],
            data: {}
        };
    },
    methods: {
        getAllSiswa: function () {
            axios.get( '/siswa?search=%7B%22SiswaKelas%22%3A%7B%22none%22%3A%20%7B%7D%7D%7D' )
                .then( response => {
                    this.listSiswa = response.data.data;
                } )
                .catch( error => {
                    console.log( error.message );
                } );
        },
    },
    beforeMount() {
        this.getAllSiswa();
        axios.get( '/kelas/create' )
            .then( response => {
                this.data = response.data.data;
                console.log( response.data.data );
            } )
            .catch( error => {
                console.log( error.message );
            }
            );
    }
};
</script>

<template>
    <div class="flex">
        <SideMenu />
        <main class="bg-[#f5f5f5] w-4/5 p-8">
            <div class="bg-white rounded-md drop-shadow-md px-8 py-6">
                <div class="border-b-2 pb-3 mb-3">
                    <h2 class="font-semibold">Buat Kelas Baru</h2>
                </div>
                <div class="flex">
                    <div class="w-1/2 pr-4">
                        <div class="flex flex-col mb-3">
                            <label for="">Indentifier</label>
                            <input type="text" class="border-2 rounded-md px-2 py-1">
                        </div>
                        <div class="flex flex-col mb-3">
                            <label for="">Tingkat</label>
                            <select name="" id="" class="border-2 rounded-md px-2 py-1">
                                <option value="">10</option>
                                <option value="">11</option>
                                <option value="">12</option>
                            </select>
                        </div>
                        <div class="flex flex-col mb-3">
                            <label for="">Jurusan</label>
                            <select name="" id="" class="border-2 rounded-md px-2 py-1">
                                <option value="" disabled selected>Pilih Jurusan</option>
                                <option v-for="i in data.jurusan" value="">{{ i.nama }}</option>
                            </select>
                        </div>
                        <div class="flex flex-col mb-3">
                            <label for="">Ruangan</label>
                            <select name="" id="" class="border-2 rounded-md px-2 py-1">
                                <option value="" disabled selected>Pilih Ruangan</option>
                                <option value="0">Biarkan Kosong</option>
                                <option v-for="i in data.ruangKelas" value="">{{ i.nama }}</option>
                            </select>
                        </div>
                        <div>
                            <button class="text-white py-2 bg-blue-500 px-4 rounded-md text-xs">Buat Kelas</button>
                        </div>
                    </div>
                    <div class="w-1/2">
                        <h3>Pilih Siswa</h3>
                        <div class="border-2 px-3 py-2 overflow-y-scroll h-[200px]">
                            <table class="w-full">
                                <thead class="h-10">
                                    <tr>
                                        <th class="text-left px-2">No</th>
                                        <th class="text-left px-2">Nama</th>
                                        <th class="text-left px-2">NIS</th>
                                        <th class="text-left px-2">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(siswa, index) in listSiswa" class="px-3 py-2">
                                        <td class="px-2 py-1">{{ index + 1 }}</td>
                                        <td class="px-2 py-1">{{ siswa.nama }}</td>
                                        <td class="px-2 py-1">{{ siswa.nis }}</td>
                                        <td class="px-2 py-1">
                                            <input type="checkbox" v-model="selectedSiswa" :value="siswa.id">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>