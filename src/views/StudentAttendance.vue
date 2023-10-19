<script setup>
import { IconArrowLeft, IconArrowRight, IconMail, IconPerson, IconSick, IconCloseFill } from '../components/icons';
import SideMenu from '../components/SideMenu.vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { useStudentStore } from '../stores/student';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const API = import.meta.env.VITE_API;

const $route = ref( useRoute() );

const id = $route.value.params.id;

const studentStore = useStudentStore();

const { detailStudent } = storeToRefs( studentStore );

onBeforeMount( () => {
    studentStore.getStudent( $route.value.params.id );
} );

const solveNameClass = ( clss ) => {
    if ( !clss ) return "Belum Memiliki kelas";
    return `${clss.Year.name} ${clss.Major.name} ${clss.name}`;
};

const presence = ( attendance, status ) => {
    const result = attendance?.find( ( item ) => item.status === status );
    if ( result ) return result;
    return { status: status, _count: { status: 0 } };
};

</script>
<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto flex">
                <div>

                    <h2 class=" font-semibold mb-4">Informasi Siswa</h2>
                    <table class="mb-3">
                        <tbody>
                            <tr>
                                <td class="py-1">Nama</td>
                                <td class="py-1 w-3 text-center">:</td>
                                <td class="py-1">{{ detailStudent?.name }}</td>
                            </tr>
                            <tr>
                                <td class="py-1">NIS</td>
                                <td class="py-1 w-3 text-center">:</td>
                                <td class="py-1">{{ detailStudent?.nis }}</td>
                            </tr>
                            <tr>
                                <td class="py-1">Kelas</td>
                                <td class="py-1 w-3 text-center">:</td>
                                <td class="py-1">{{ solveNameClass(detailStudent?.Class) }}</td>
                            </tr>
                        </tbody>
                    </table>
                    <a class="bg-blue-500 text-white py-2 rounded-md text-sm flex w-fit justify-center items-center px-4"
                        :href="`${API}/siswa/${id}/presence/download`">
                        <span class="px-2">
                            <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                fill="white">
                                <path
                                    d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                            </svg>
                        </span>
                        <span class="pr-3">
                            UnduhPresensi
                        </span>
                    </a>
                </div>
            </div>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <p class="font-semibold mb-4">Ringkasan Presensi</p>
                <div class="flex justify-between flex-wrap">
                    <div class="bg-green-500 w-60 grow mx-2 h-40 rounded-md mb-2 flex items-center px-8">
                        <IconPerson />
                        <div class="w-full">
                            <p class="text-center text-white font-semibold text-xl mb-2">
                                {{ presence(detailStudent.attendance, 'Hadir').status }}
                            </p>
                            <p class="text-center text-white text-3xl font-semibold">
                                {{ presence(detailStudent.attendance, 'Hadir')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-blue-500 w-60 grow mx-2 h-40 rounded-md mb-2 flex items-center px-8">
                        <IconSick />
                        <div class="w-full">
                            <p class="text-center text-white font-semibold text-xl mb-2">
                                {{ presence(detailStudent.attendance, 'Sakit').status }}
                            </p>
                            <p class="text-center text-white text-3xl font-semibold">
                                {{ presence(detailStudent.attendance, 'Sakit')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-orange-500 w-60 grow mx-2 h-40 rounded-md mb-2 flex items-center px-8">
                        <IconMail />
                        <div class="w-full">
                            <p class="text-center text-white font-semibold text-xl mb-2">
                                {{ presence(detailStudent.attendance, 'Izin').status }}
                            </p>
                            <p class="text-center text-white text-3xl font-semibold">
                                {{ presence(detailStudent.attendance, 'Izin')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="bg-red-500 w-60 grow mx-2 h-40 rounded-md mb-2 flex items-center px-8">
                        <IconCloseFill />
                        <div class="w-full">
                            <p class="text-center text-white font-semibold text-xl mb-2">
                                {{ presence(detailStudent.attendance, 'Alpa').status }}
                            </p>
                            <p class="text-center text-white text-3xl font-semibold">
                                {{ presence(detailStudent.attendance, 'Alpa')._count.status }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <div class="border-b-2 pb-4 mb-3">
                    <h1 class="font-semibold ">Presensi</h1>
                </div>
                <!-- <SearchForm @replace-listSiswa="(newListSiswa) => { listSiswa = newListSiswa }" /> -->
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="text-left px-3 text-sm">No</th>
                            <th class="text-left px-3 text-sm">Tanggal</th>
                            <th class="text-left px-3 text-sm">Status Kehadiran</th>
                            <th class="text-left px-3 text-sm">Ubah Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(attendance, index) of detailStudent?.AttendanceStudent">
                            <td class="px-3 h-12 text-sm">{{ index + 1 }}</td>
                            <td class="px-3 h-12 text-sm">{{ new
                                Date(attendance.Attendance.date).toLocaleDateString('id-ID', {
                                    weekday: 'long', day:
                                        "2-digit", "month": "long", year: "numeric"
                                }) }}</td>
                            <td class="px-3 h-12 text-sm">{{ attendance.status }}</td>
                            <!-- <td class="px-3 h-12 text-sm">{{ attendance.status }}</td>
                            <td class="px-3 h-12 text-sm">{{ student.nis }}</td>
                            <td class="px-3 h-12 text-sm min-w-[100px]">{{ solveName(student) }}</td>
                            <td class="px-3 h-12 text-sm" v-text="solveName(siswa)"></td>
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
                                <RouterLink to="/siswa/"
                                    class="bg-blue-400 px-4 py-2 text-white rounded-lg text-xs mx-1 mb-2">
                                    Lihat
                                    Presensi
                                </RouterLink>
                            </td> -->
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