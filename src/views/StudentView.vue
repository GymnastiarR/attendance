<script setup>
import { IconAdd, IconMore, IconArrowLeft, IconArrowRight } from '../components/icons';
import SideMenu from '../components/SideMenu.vue';
import SearchForm from '../components/SearchForm.vue';
import CreateSiswa from '../components/CreateSiswa.vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import ErrorAlert from '../components/ErrorAlert.vue';
import { onBeforeMount } from 'vue';
import { useStudentStore } from '../stores/student';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';

const studentStore = useStudentStore();
const classStore = useClassStore();

const { students } = storeToRefs( studentStore );

const solveName = ( student ) => {
    if ( student.ClassStudent.length > 0 ) {
        return `${student.ClassStudent[ 0 ].Class.Year.name} ${student.ClassStudent[ 0 ].Class.Major.name} ${student.ClassStudent[ 0 ].Class.name}`;
    } else {
        return "Belum ada kelas";
    }
};

onBeforeMount( () => {
    studentStore.getUser();
} );

</script>
<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <div class="flex mb-4">
                <div class="bg-white drop-shadow-md w-full max-w-[160px] px-6 py-4 rounded-md">
                    <p class="text-center text-sm font-semibold mb-4">Jumlah Siswa</p>
                    <p class="text-center text-2xl">100</p>
                </div>
            </div>
            <CreateSiswa />
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <div class="border-b-2 pb-4 mb-3">
                    <h1 class="text-sm font-semibold">Daftar Siswa</h1>
                </div>
                <!-- <SearchForm @replace-listSiswa="(newListSiswa) => { listSiswa = newListSiswa }" /> -->
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Nama</th>
                            <th class="text-left px-3 text-sm">NIS</th>
                            <th class="text-left px-3 text-sm">Kelas</th>
                            <th class="text-left px-3 text-sm">RFID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(student, index) of students">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ student.name }}</td>
                            <td class="px-3 h-12 text-sm">{{ student.nis }}</td>
                            <td class="px-3 h-12 text-sm min-w-[100px]">{{ solveName(student) }}</td>
                            <!-- <td class="px-3 h-12 text-sm" v-text="solveName(siswa)"></td> -->
                            <td class="px-3 h-12 text-sm min-w-[150px]">
                                <template v-if="student.rfid">
                                    {{ student.rfid }}
                                </template>
                                <template v-else>
                                    <RouterLink :to="{ name: 'siswa-rfid', params: { id: student.id } }"
                                        class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-1">
                                        Assign RFID
                                    </RouterLink>
                                </template>
                            </td>
                            <td class="flex flex-wrap lg:h-12 justify-center items-center">
                                <RouterLink to="/siswa/"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-2">
                                    Pindah Kelas
                                </RouterLink>
                                <RouterLink to="/siswa/"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-2">
                                    Hapus
                                </RouterLink>
                                <RouterLink :to="'/siswa/' + student.id + '/presensi'"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-2">
                                    Lihat
                                    Presensi
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-center">
                <div class="px-4 bg-white drop-shadow-md rounded-md flex py-2">
                    <div class="">
                        <IconArrowLeft />
                    </div>
                    <div class="">
                        <IconArrowRight />
                    </div>
                </div>
            </div>
            <!-- <ErrorAlert v-if="store.error" /> -->
        </AppLayout>
    </div>
</template>