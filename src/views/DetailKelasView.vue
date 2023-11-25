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
            <div class="px-8 py-6 mb-4 bg-white rounded-md drop-shadow-md">
                <div class="pb-3 mb-3 border-b-2">
                    <h2 class="font-semibold">Siswa Tanpa Kelas</h2>
                </div>
                <div class="mb-2">
                    <form class="h-8">
                        <input type="text" placeholder="NIM / Nama" v-model="keyword"
                            class="h-full px-2 mr-2 border-2 rounded-md">
                        <button @click.prevent="studentStore.getUser('?tanpa_kelas=true&search=' + keyword)"
                            class="h-full px-4 mr-2 text-xs text-white bg-blue-500 rounded-md">
                            Cari
                        </button>
                        <button @click.prevent="studentStore.getUser('?tanpa_kelas=true')"
                            class="h-full px-4 text-xs text-white bg-blue-500 rounded-md">
                            Reset
                        </button>
                    </form>
                </div>
                <div class="overflow-auto">
                    <table class="w-[100%] min-w-[700px]">
                        <thead>
                            <tr class="h-10">
                                <th class="px-3 text-sm text-left">No</th>
                                <th class="px-3 text-sm text-left">Nama</th>
                                <th class="px-3 text-sm text-left">NIS</th>
                                <!-- <th class="px-3 text-sm text-left">Kelas</th> -->
                                <th class="px-3 text-sm text-left">RFID</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(student, index) of students">
                                <td class="h-12 px-3 text-sm">{{ index + 1 }}</td>
                                <td class="h-12 px-3 text-sm">{{ student.name }}</td>
                                <td class="h-12 px-3 text-sm">{{ student.nis }}</td>
                                <!-- <td class="h-12 px-3 text-sm" v-text="solveName(siswa)"></td> -->
                                <td class="h-12 px-3 text-sm" v-text="student.rfid ? student?.Rfid.rfid : 'BELUM PUNYA'">
                                </td>
                                <td class="text-center">
                                    <button @click="studentStore.assignStudent($route.params.id, student.id)"
                                        class="px-4 py-2 mx-1 text-xs text-white bg-blue-400 rounded-lg">
                                        Assign Siswa
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="p-8 overflow-auto bg-white rounded-md drop-shadow-md">
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="px-3 text-left">No</th>
                            <th class="px-3 text-left">Nama</th>
                            <th class="px-3 text-left">NIS</th>
                            <th class="px-3 text-left">RFID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) of classDetail.ClassStudent">
                            <!-- <td>{{ student }}</td> -->
                            <td class="h-12 px-3">{{ index + 1 }}</td>
                            <td class="h-12 px-3">{{ student.Student.name }}</td>
                            <td class="h-12 px-3">{{ student.Student.nis }}</td>
                            <td class="h-12 px-3">
                                <template v-if="student.Student.rfid">
                                    {{ student.Student.Rfid.rfid }}
                                </template>
                                <template v-else>
                                    <RouterLink :to="{ name: 'siswa-rfid', params: { id: student.Student.id } }"
                                        class="px-4 py-2 mx-1 mb-1 text-xs text-white bg-blue-400 rounded-lg">
                                        Assign RFID
                                    </RouterLink>
                                </template>
                            </td>
                            <td class="flex flex-wrap justify-center">
                                <button @click="classStore.removeStudent($route.params.id, student.Student.id)"
                                    class="px-4 py-2 mx-1 mb-1 text-xs text-white bg-blue-400 rounded-lg">
                                    Keluarkan
                                </button>
                                <RouterLink to="/siswa/"
                                    class="px-4 py-2 mx-1 mb-1 text-xs text-white bg-blue-400 rounded-lg">
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