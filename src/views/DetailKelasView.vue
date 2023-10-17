<script setup>
import SideMenu from '../components/SideMenu.vue';
import SearchForm from '../components/SearchForm.vue';
import AppLayout from '../layouts/AppLayout.vue';
import { useStudentStore } from '../stores/student';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const $route = ref( useRoute() );
const keyword = ref( "" );

const studentStore = useStudentStore();
const classStore = useClassStore();

const { students } = storeToRefs( studentStore );
const { classDetail } = storeToRefs( classStore );


watch( $route.value, ( newVal, oldVal ) => {
    classStore.getClass( newVal.params.id );
} );

onBeforeMount( () => {
    studentStore.getUser( '?tanpa_kelas=true' );
    classStore.getClass( $route.value.params.id );
} );
</script>

<template>
    <div class="flex min-h-screen">
        <SideMenu />
        <AppLayout>
            <div class="bg-white rounded-md drop-shadow-md px-8 py-6 mb-4">
                <div class="border-b-2 pb-3 mb-3">
                    <h2 class="font-semibold">Siswa Tanpa Kelas</h2>
                </div>
                <div class="mb-2">
                    <form class="h-8">
                        <input type="text" placeholder="NIM / Nama" v-model="keyword"
                            class="border-2 px-2 rounded-md h-full mr-2">
                        <button @click.prevent="studentStore.getUser('?tanpa_kelas=true&search=' + keyword)"
                            class="text-white h-full bg-blue-500 px-4 rounded-md text-xs mr-2">
                            Cari
                        </button>
                        <button @click.prevent="studentStore.getUser('?tanpa_kelas=true')"
                            class="text-white h-full bg-blue-500 px-4 rounded-md text-xs">
                            Reset
                        </button>
                    </form>
                </div>
                <div class="overflow-auto">
                    <table class="w-[100%] min-w-[700px]">
                        <thead>
                            <tr class="h-10">
                                <th class="text-left px-3 text-sm">No</th>
                                <th class="text-left px-3 text-sm">Nama</th>
                                <th class="text-left px-3 text-sm">NIS</th>
                                <!-- <th class="text-left px-3 text-sm">Kelas</th> -->
                                <th class="text-left px-3 text-sm">RFID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student, index) of students">
                                <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                                <td class="px-3 h-12 text-sm">{{ student.name }}</td>
                                <td class="px-3 h-12 text-sm">{{ student.nis }}</td>
                                <!-- <td class="px-3 h-12 text-sm" v-text="solveName(siswa)"></td> -->
                                <td class="px-3 h-12 text-sm" v-text="student.rfid ? student.rfid : 'BELUM PUNYA'"></td>
                                <td class="text-center">
                                    <button @click="studentStore.assignStudent($route.params.id, student.id)"
                                        class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1">
                                        Assign Siswa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="bg-white p-8 rounded-md drop-shadow-md overflow-auto">
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3">No</th>
                            <th class="text-left px-3">Nama</th>
                            <th class="text-left px-3">NIS</th>
                            <th class="text-left px-3">RFID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) of classDetail.ClassStudent">
                            <!-- <td>{{ student }}</td> -->
                            <td class="px-3 h-12">{{ index + 1 }}</td>
                            <td class="px-3 h-12">{{ student.Student.name }}</td>
                            <td class="px-3 h-12">{{ student.Student.nis }}</td>
                            <td class="px-3 h-12">
                                <template v-if="student.Student.rfid">
                                    {{ student.Student.rfid }}
                                </template>
                                <template v-else>
                                    <RouterLink :to="{ name: 'siswa-rfid', params: { id: student.Student.id } }"
                                        class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-1">
                                        Assign RFID
                                    </RouterLink>
                                </template>
                            </td>
                            <td class="flex flex-wrap justify-center">
                                <button @click="classStore.removeStudent($route.params.id, student.Student.id)"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-1">
                                    Keluarkan
                                </button>
                                <RouterLink to="/siswa/"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-1">
                                    Hapus
                                </RouterLink>
                                <RouterLink to="/siswa/"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-1">
                                    Lihat
                                    Detail
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </AppLayout>
    </div>
</template>