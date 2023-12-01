<script setup>
import { onBeforeMount, ref, watch } from 'vue';
import { useAcademicYearStore } from '../../../stores/academicYear';
import { useClassStore } from '../../../stores/class';
import { storeToRefs } from 'pinia';
import { Call } from '../../../services/Calling';
import { useStudentStore } from '../../../stores/student';

const academicYearStore = useAcademicYearStore();
const classStore = useClassStore();
const studentStore = useStudentStore();

const { academicYears } = storeToRefs( academicYearStore );
const { classDetail } = storeToRefs( classStore );

const classes = ref( [] );
const selectedStudent = ref( [] );
const selectedAcademicYear = ref( '' );

onBeforeMount( () => {
    academicYearStore.getAcademicYears();
} );

const handleClick = ( classId ) => {
    classStore.getClass( classId );
};

const handleSelectAll = () => {
    selectedStudent.value = classDetail.value.ClassStudent.map( ( student ) => student.Student.id );
};

watch( selectedAcademicYear, ( newSelected, oldSelected ) => {
    Call.get( `/kelas?tahunAjaran=${newSelected}`, ( error, response ) => {
        if ( error ) {
            return;
        }
        classes.value = response.data.data;
    } );
    classDetail.value = {};
    selectedStudent.value = [];
} );
</script>

<template>
    <form action="" class="w-full">
        <div>
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
                <label for="" class="inline-block mb-2">Pilih Kelas</label>
                <div v-for="clss in classes" class="flex items-center justify-between w-1/4">
                    <label for="">{{ clss.Year.name }} {{ clss.Major.name }} {{ clss.name }}</label>
                    <button @click.prevent="handleClick(clss.id)"
                        class="px-4 py-2 text-sm text-white bg-blue-500 rounded-lg">Pilih</button>
                </div>
            </div>
            <div class="w-1/2 max-w-2xl px-4 py-4 mb-3 overflow-y-auto border-2">
                <div class="flex items-center justify-between">
                    <h2 class="mb-2 font-semibold">Pilih Siswa</h2>
                    <button @click.prevent="handleSelectAll"
                        class="px-4 py-2 text-xs text-white bg-green-500 rounded-lg ">Pilih
                        Semua</button>
                </div>
                {{ selectedStudent }}
                <table>
                    <thead>
                        <tr>
                            <th class="px-2 py-1 text-left">Nama</th>
                            <th class="px-2 py-1 text-left">NIS</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="student in classDetail.ClassStudent">
                            <td class="w-64 px-2 py-1">{{ student.Student.name }}</td>
                            <td class="px-2 py-1">{{ student.Student.nis }}</td>
                            <td class="px-2 py-1">
                                <input name="students" :value="student.Student.id" type="checkbox"
                                    v-model="selectedStudent">
                            </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <p v-for="clss in classes">{{ clss }}</p> -->
            </div>
            <button @click.prevent="studentStore.duplicate(selectedStudent)"
                class="px-4 py-2 text-white bg-blue-500 rounded-md">Duplikat</button>
        </div>
    </form>
</template>