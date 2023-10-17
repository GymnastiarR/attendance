<script setup>
import { IconArrowLeft, IconArrowRight } from '../components/icons';
import SideMenu from '../components/SideMenu.vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { onBeforeMount } from 'vue';
import { useStudentStore } from '../stores/student';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';
import { ref } from 'vue';

const $route = ref( useRoute() );

const id = $route.value.params.id;

const studentStore = useStudentStore();

const { detailStudent } = storeToRefs( studentStore );

const solveNameClass = ( student ) => {
    if ( student.ClassStudent?.length > 0 ) {
        return `${student.ClassStudent[ 0 ].Class.Year.name} ${student.ClassStudent[ 0 ].Class.Major.name} ${student.ClassStudent[ 0 ].Class.name}`;
    }

    return "Belum ada kelas";
};

onBeforeMount( () => {
    studentStore.getStudent( $route.value.params.id );
} )

</script>
<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <p>{{ detailStudent.name }}</p>
                <p>{{ solveNameClass(detailStudent) }}</p>
                <p>{{ detailStudent.AttendanceStudent }}</p>
                <a :href="`http://localhost:80/api/siswa/${id}/presence/download`">Unduh Presensi</a>
            </div>
            <div class="bg-white p-8 rounded-md drop-shadow-md mb-2 overflow-auto">
                <div class="border-b-2 pb-4 mb-3">
                    <h1 class="text-sm font-semibold">Presensi</h1>
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
                        <tr v-for="(attendance, index) of detailStudent.AttendanceStudent">
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