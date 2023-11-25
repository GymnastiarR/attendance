<script setup>
import { IconAdd, IconMore, IconArrowLeft, IconArrowRight } from '../components/icons';
import SideMenu from '../components/SideMenu.vue';
import SearchForm from '../components/SearchForm.vue';
import CreateSiswa from '../components/CreateSiswa.vue';
import { RouterLink } from 'vue-router';
import AppLayout from '../layouts/AppLayout.vue';
import { onBeforeMount, ref, watch } from 'vue';
import { useStudentStore } from '../stores/student';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { useWarningStore } from '../stores/warning';
import { useAcademicYearStore } from '../stores/academicYear';
import SectionView from '../components/SectionView.vue';

const studentStore = useStudentStore();
const classStore = useClassStore();
const warningStore = useWarningStore();
const academicYearStore = useAcademicYearStore();


const { students } = storeToRefs( studentStore );
const { academicYears } = storeToRefs( academicYearStore );
const { classes } = storeToRefs( classStore );

const selectedAcademicYear = ref( '' );
const classesId = ref( [] );

watch( selectedAcademicYear, ( newSelected, oldSelected ) => {
    classStore.getClasses( `?tahunAjaran=${newSelected}` );
} );

const solveName = ( clss ) => {
    if ( clss.length > 0 ) {
        return `${clss[ 0 ].Class.Year.name} ${clss[ 0 ].Class.Major.name} ${clss[ 0 ].Class.name}`;
    }
    return 'Belum Memiliki Kelas';
};

onBeforeMount( () => {
    studentStore.getUser();
    academicYearStore.getAcademicYears();
} );

</script>
<template>
    <div class="flex">
        <SideMenu />
        <AppLayout>
            <CreateSiswa />
            <SectionView title="Duplikasi Siswa">
                <form action="" class="w-full">
                    <div class="flex flex-col mb-4">
                        <label for="" class="mb-2">Pilih Tahun Ajaran</label>
                        <select v-model="selectedAcademicYear" name="" id=""
                            class="w-1/2 px-2 py-1 text-sm border-2 rounded-md focus:outline-blue-500">
                            <option value="" disabled selected>Pilih Tahun Ajaran</option>
                            <option v-for="academicYear in academicYears" :value="academicYear.id">{{ academicYear.year }}
                                {{ academicYear.semester }}
                            </option>
                        </select>
                    </div>
                    <div class="mb-4">
                        {{ classesId }}
                        <label for="" class="inline-block mb-2">Pilih Kelas</label>
                        <div v-for="clss in classes" class="flex items-center justify-between w-1/4">
                            <label for="">{{ clss.Year.name }} {{ clss.Major.name }} {{ clss.name }}</label>
                            <input :id="clss.id" v-model="classesId" :value="clss.id" type="checkbox">
                        </div>
                    </div>
                    <button @click.prevent="studentStore.duplicate()"
                        class="px-4 py-2 text-white bg-blue-500 rounded-md">Duplikat</button>
                </form>
            </SectionView>
            <div class="p-8 mb-2 overflow-auto bg-white rounded-md drop-shadow-md">
                <div class="pb-4 mb-3 border-b-2">
                    <h1 class="text-sm font-semibold">Daftar Siswa</h1>
                </div>
                <!-- <SearchForm @replace-listSiswa="(newListSiswa) => { listSiswa = newListSiswa }" /> -->
                <table class="w-[100%] min-w-[840px]">
                    <thead>
                        <tr class="h-10">
                            <th class="px-3 text-sm text-left">No</th>
                            <th class="px-3 text-sm text-left">Nama</th>
                            <th class="px-3 text-sm text-left">NIS</th>
                            <th class="px-3 text-sm text-left">Kelas</th>
                            <th class="px-3 text-sm text-left">RFID</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody v-if="students !== null">
                        <tr v-for="(student, index) of students">
                            <td class="h-12 px-3 text-sm">{{ index + 1 }}</td>
                            <td class="h-12 px-3 text-sm">{{ student.name }}</td>
                            <td class="h-12 px-3 text-sm">{{ student.nis }}</td>
                            <td>{{ solveName(student.ClassStudent) }}</td>
                            <td class="px-3 h-12 text-sm min-w-[150px]">
                                <template v-if="student.rfid">
                                    {{ student.Rfid.rfid }}
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
                                <button
                                    @click="warningStore.callWarning('Apakah Anda Yakin Akan Menghapus Siswa?', studentStore.destroy(student.id))"
                                    class="px-4 py-2 mx-1 mb-2 text-xs text-white bg-blue-400 rounded-lg">
                                    Hapus
                                </button>
                                <RouterLink :to="'/siswa/' + student.id + '/presensi'"
                                    class="px-4 py-2 mx-1 mb-2 text-xs text-white bg-blue-400 rounded-lg">
                                    Lihat
                                    Presensi
                                </RouterLink>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <div v-if="students === null" class="w-full mt-4">
                    <p class="text-xl font-semibold text-center text-gray-800">
                        Tidak Ada Siswa Yang Terdaftar
                    </p>
                </div>
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
            <!-- <ErrorAlert v-if="store.error" /> -->
        </AppLayout>
    </div>
</template>