<script setup>
import { IconArrowLeft, IconArrowRight, IconMail, IconPerson, IconSick, IconCloseFill, IconCard, IconEdit } from '../components/icons';
import SideMenu from '../components/SideMenu.vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { useStudentStore } from '../stores/student';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import UpdateStudentForm from '../components/UpdateStudentForm.vue';

const API = import.meta.env.VITE_API;

const $route = ref( useRoute() );

const id = $route.value.params.id;

const studentStore = useStudentStore();

const { detailStudent } = storeToRefs( studentStore );

const showUpdateForm = ref( false );

onBeforeMount( () => {
    studentStore.getStudent( $route.value.params.id );
} );

const solveNameClass = ( clss ) => {
    if ( clss && clss.length > 0 ) {
        return `${clss[ 0 ].Class.Year.name} ${clss[ 0 ].Class.Major?.name} ${clss[ 0 ].Class.name}`;
    }
    return `Belum Memiliki Kelas`;
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
            <UpdateStudentForm v-model:show="showUpdateForm" :studentInformation="detailStudent" />
            <div v-if="!showUpdateForm" class="relative flex p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <button @click="showUpdateForm = true" class="absolute top-4 right-4">
                    <IconEdit />
                </button>
                <div>
                    <h2 class="mb-4 font-semibold ">Informasi Siswa</h2>
                    <table class="mb-3">
                        <tbody>
                            <tr>
                                <td class="py-1">Nama</td>
                                <td class="w-3 py-1 text-center">:</td>
                                <td class="py-1">{{ detailStudent?.name }}</td>
                            </tr>
                            <tr>
                                <td class="py-1">NIS</td>
                                <td class="w-3 py-1 text-center">:</td>
                                <td class="py-1">{{ detailStudent?.nis }}</td>
                            </tr>
                            <tr>
                                <td class="py-1">Kelas</td>
                                <td class="w-3 py-1 text-center">:</td>
                                <td class="py-1">{{ solveNameClass(detailStudent?.ClassStudent) }}</td>
                            </tr>
                            <tr>
                                <td class="py-1">RFID</td>
                                <td class="w-3 py-1 text-center">:</td>
                                <td class="py-1">{{ detailStudent.rfid ? detailStudent.Rfid.rfid : 'Belum Memiliki RFID' }}
                                </td>
                            </tr>
                            <tr v-if="detailStudent.rfid">
                                <td class="py-1">Saldo</td>
                                <td class="w-3 py-1 text-center">:</td>
                                <td class="py-1">Rp. {{ detailStudent?.Rfid?.balance }}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="flex">
                        <a class="flex items-center justify-center px-4 py-2 mr-2 text-xs text-white bg-blue-500 rounded-md w-fit"
                            :href="`${API}/siswa/${id}/presence/download`">
                            <span class="px-2">
                                <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"
                                    fill="white">
                                    <path
                                        d="M480-320 280-520l56-58 104 104v-326h80v326l104-104 56 58-200 200ZM240-160q-33 0-56.5-23.5T160-240v-120h80v120h480v-120h80v120q0 33-23.5 56.5T720-160H240Z" />
                                </svg>
                            </span>
                            <span class="pr-3">
                                Unduh Presensi
                            </span>
                        </a>
                        <RouterLink :to="{ name: 'siswa-rfid', params: { id: detailStudent.id } }"
                            class="flex items-center justify-center px-4 py-2 mr-2 text-xs text-white bg-blue-500 rounded-md w-fit">
                            <span class="px-2 ">
                                <IconCard />
                            </span>
                            <span class="pr-3">
                                {{ detailStudent.rfid ? 'Ganti RFID' : 'Assign RFID' }}
                            </span>
                        </RouterLink>
                    </div>
                </div>
            </div>
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <p class="mb-4 font-semibold">Ringkasan Presensi</p>
                <div class="flex flex-wrap justify-between">
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-green-500 rounded-md w-60 grow">
                        <IconPerson />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Hadir').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Hadir')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-blue-500 rounded-md w-60 grow">
                        <IconSick />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Sakit').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Sakit')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-orange-500 rounded-md w-60 grow">
                        <IconMail />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Izin').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Izin')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-red-500 rounded-md w-60 grow">
                        <IconCloseFill />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Alpa').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(detailStudent.attendance, 'Alpa')._count.status }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <div class="pb-4 mb-3 border-b-2">
                    <h1 class="font-semibold ">Presensi</h1>
                </div>
                <!-- <SearchForm @replace-listSiswa="(newListSiswa) => { listSiswa = newListSiswa }" /> -->
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="px-3 text-sm text-left">No</th>
                            <th class="px-3 text-sm text-left">Tanggal</th>
                            <th class="px-3 text-sm text-left">Status Kehadiran</th>
                            <th class="px-3 text-sm text-left">Ubah Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(attendance, index) of detailStudent.AttendanceStudent">
                            <td class="h-12 px-3 text-sm">{{ index + 1 }}</td>
                            <td class="h-12 px-3 text-sm">{{ new
                                Date(attendance.Attendance.date).toLocaleDateString('id-ID', {
                                    weekday: 'long', day:
                                        "2-digit", "month": "long", year: "numeric"
                                }) }}</td>
                            <td class="h-12 px-3 text-sm">{{ attendance.status }}</td>
                            <!-- <td class="h-12 px-3 text-sm">{{ attendance.status }}</td>
                            <td class="h-12 px-3 text-sm">{{ student.nis }}</td>
                            <td class="px-3 h-12 text-sm min-w-[100px]">{{ solveName(student) }}</td>
                            <td class="h-12 px-3 text-sm" v-text="solveName(siswa)"></td>
                            <td class="px-3 h-12 text-sm min-w-[150px]">
                                <template v-if="student.rfid">
                                    {{ student.rfid }}
                                </template>
                                <template v-else>
                                    <RouterLink :to="{ name: 'siswa-rfid', params: { id: student.id } }"
                                        class="px-4 py-2 mx-1 mb-1 text-xs text-white bg-blue-400 rounded-lg">
                                        Assign RFID
                                    </RouterLink>
                                </template>
                            </td>
                            <td class="flex flex-wrap items-center justify-center lg:h-12">
                                <RouterLink to="/siswa/"
                                    class="px-4 py-2 mx-1 mb-2 text-xs text-white bg-blue-400 rounded-lg">
                                    Pindah Kelas
                                </RouterLink>
                                <RouterLink to="/siswa/"
                                    class="px-4 py-2 mx-1 mb-2 text-xs text-white bg-blue-400 rounded-lg">
                                    Hapus
                                </RouterLink>
                                <RouterLink to="/siswa/"
                                    class="px-4 py-2 mx-1 mb-2 text-xs text-white bg-blue-400 rounded-lg">
                                    Lihat
                                    Presensi
                                </RouterLink>
                            </td> -->
                        </tr>
                    </tbody>
                </table>
            </div>
            <div class="flex justify-center">
                <div class="flex px-4 py-2 bg-white rounded-md drop-shadow-md">
                    <div class="">
                        <IconArrowLeft />
                    </div>
                    <div class="">
                        <IconArrowRight />
                    </div>
                </div>
            </div>
        </AppLayout>
    </div>
</template>