<script setup>
import SideMenu from '../components/SideMenu.vue';
import SearchForm from '../components/SearchForm.vue';
import moment from 'moment-timezone';
import AppLayout from '../layouts/AppLayout.vue';
import { useStudentStore } from '../stores/student';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { onBeforeMount, ref, watch } from 'vue';
import { useRoute } from 'vue-router';
import { IconCloseFill, IconMail, IconPerson, IconSick } from '../components/icons';

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

moment.tz.setDefault( "Indonesia/Jakarta" );

const options = { year: 'numeric', month: '2-digit', day: '2-digit' };

const dateStart = ref( moment().format( "YYYY-MM-DD" ) );
const dateEnd = ref( moment().format( "YYYY-MM-DD" ) );

const API = import.meta.env.VITE_API;

const presence = ( attendance, status ) => {
    const result = attendance?.find( ( item ) => item.status === status );
    if ( result ) return result;
    return { status: status, _count: { status: 0 } };
};
</script>

<template>
    <div class="flex min-h-screen">
        <SideMenu />
        <AppLayout>
            <h2 class="font-semibold text-xl mb-4">
                {{ classDetail?.Year?.name }} {{ classDetail?.Major?.name }} {{ classDetail.name }}
            </h2>
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <p class="mb-4 font-semibold">Ringkasarn Kehadiran {{ (new Date()).toLocaleDateString('id-ID', {
                    weekday:
                        'long', day: 'numeric', year: 'numeric', month: 'long'
                }) }}</p>
                <div class="flex flex-wrap justify-between">
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-green-500 rounded-md w-60 grow">
                        <IconPerson />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Hadir').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Hadir')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-blue-500 rounded-md w-60 grow">
                        <IconSick />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Sakit').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Sakit')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-orange-500 rounded-md w-60 grow">
                        <IconMail />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Izin').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Izin')._count.status }}
                            </p>
                        </div>
                    </div>
                    <div class="flex items-center h-40 px-8 mx-2 mb-2 bg-red-500 rounded-md w-60 grow">
                        <IconCloseFill />
                        <div class="w-full">
                            <p class="mb-2 text-xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Alpa').status }}
                            </p>
                            <p class="text-3xl font-semibold text-center text-white">
                                {{ presence(classDetail.attendanceStatus, 'Alpa')._count.status }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
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
            <div class="p-8 overflow-auto bg-white rounded-md drop-shadow-md mb-4">
                <h3 class="font-semibold mb-2">Unduh Presensi Siswa</h3>
                <div class="flex gap-4 mb-2">
                    <div class="flex flex-col">
                        <label for="">Dari Tanggal</label>
                        <input type="date" class="border-2 border-gray-700 px-3 py-1 rounded-md" v-model="dateStart">
                        {{ dateStart }}
                    </div>
                    <div class="flex flex-col">
                        <label for="">Sampai Tanggal</label>
                        <input type="date" class="border-2 border-gray-700 px-3 py-1 rounded-md" v-model="dateEnd">
                    </div>
                </div>
                <a
                    :href="API + '/kelas/' + $route.params.id + '/download?dateStart=' + dateStart + '&dateEnd=' + dateEnd">Unduh</a>
            </div>
            <div class="p-8 overflow-auto bg-white rounded-md drop-shadow-md">
                <a href="">Unduh Daftar Siswa</a>
                <table class="w-[100%] min-w-[700px]">
                    <thead>
                        <tr class="h-10">
                            <th class="px-3 text-left">No</th>
                            <th class="px-3 text-left">Nama</th>
                            <th class="px-3 text-left">NIS</th>
                            <th class="px-3 text-left">RFID</th>
                            <th class="px-3 text-left">Status ({{ (new Date()).toLocaleDateString('id-ID', {
                                weekday:
                                    'long', year: 'numeric', month: 'long', day: 'numeric'
                            }) }})</th>
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
                            <td class="h-12 px-3">
                                {{ student.Student.AttendanceStudent.length > 0 ?
                                    student.Student.AttendanceStudent[0].status :
                                    "Absen Belum Dibuat" }}
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