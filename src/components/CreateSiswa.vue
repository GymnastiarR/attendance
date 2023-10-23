<script setup>
import IconMore from './icons/IconMore.vue';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onUnmounted } from 'vue';
import { ref } from 'vue';
import { useStudentStore } from '../stores/student';

const classStore = useClassStore();
const studentStore = useStudentStore();

const { classes } = storeToRefs( classStore );
const { student } = storeToRefs( studentStore );

const isShow = ref( false );

onBeforeMount( () => {
    classStore.getClasses();
} );

onUnmounted( () => {
    studentStore.$reset();
} );

</script>
<template>
    <div class="bg-white rounded-md drop-shadow-md mb-3 py-6">
        <div class="mb-2 border-b-2 px-8 pb-3 flex justify-between cursor-pointer" @click="isShow = !isShow">
            <button>
                <h1 class="text-sm font-semibold ">Tambah Siswa</h1>
            </button>
            <IconMore />
        </div>
        <Transition name="slide">
            <div v-show="isShow" class="flex px-8">
                <form action="" class="w-full lg:w-1/2">
                    <div class="flex flex-col mb-3">
                        <label for="name" class="text-sm">Nama Siswa</label>
                        <input v-model="student.name" type="text" name="name"
                            class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
                    </div>
                    <div class="flex flex-col mb-3">
                        <label for="nis" class="text-sm">NIS Siswa</label>
                        <input v-model="student.nis" type="text" name="nis" id="nis"
                            class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
                    </div>
                    <div class="flex flex-col mb-3">
                        <label for="classId" class="text-sm">Kelas Siswa</label>
                        <select v-model="student.classId" required name="classId" id="classId"
                            class="rounded-md border-2 w-1/2 px-2 py-1 text-sm focus:outline-blue-500">
                            <option value="" disabled selected>Masukkan Kelas</option>
                            <option value="0">Biarkan Kosong</option>
                            <option v-for="clss in classes" :value="clss.id">{{ clss.Year.name }} {{ clss.Major.name
                            }} {{ clss.name }}</option>
                        </select>
                    </div>
                    <button @click.prevent="studentStore.storeStudent(student)"
                        class="bg-blue-500 px-5 py-2 rounded-md text-white text-xs">
                        AddSiswa
                    </button>
                </form>
            </div>
        </Transition>
    </div>
</template>