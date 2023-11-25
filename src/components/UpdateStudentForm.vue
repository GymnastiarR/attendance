<script setup>
import IconMore from './icons/IconMore.vue';
import { useClassStore } from '../stores/class';
import { storeToRefs } from 'pinia';
import { onBeforeMount, onUnmounted, ref } from 'vue';
import { useStudentStore } from '../stores/student';
import { useRoute } from 'vue-router';

const $route = useRoute();

const studentStore = useStudentStore();

const { detailStudent } = storeToRefs( studentStore );

const { newStudentInformation } = ref( {
    name: detailStudent.value.name,
    nis: detailStudent.value.nis,
} );

defineProps( [ 'show', 'studentInformation' ] );
defineEmits( [ 'update:show' ] );

const handleUpdate = () => {
    studentStore.update( $route.params.id, detailStudent );
    // $emit( 'update:show', false );
};

</script>
<template>
    <div v-if="show" class="bg-white rounded-md drop-shadow-md mb-3 py-6">
        <div class="mb-2 px-8 pb-3 flex justify-between cursor-pointer">
            <button>
                <h1 class="text-sm font-semibold ">Update Informasi Siswa</h1>
            </button>
        </div>
        <Transition name="slide">
            <div class="flex px-8">
                <form action="" class="w-full lg:w-1/2">
                    <div class="flex flex-col mb-3">
                        <label for="name" class="text-sm">Nama Siswa</label>
                        <input v-model="detailStudent.name" type="text" name="name"
                            class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
                    </div>
                    <div class="flex flex-col mb-3">
                        <label for="nis" class="text-sm">NIS Siswa</label>
                        <input v-model="detailStudent.nis" type="text" name="nis" id="nis"
                            class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
                    </div>
                    <button @click.prevent="() => {
                        handleUpdate();
                        $emit('update:show', false);
                        studentStore.getStudent($route.params.id);
                    }" class="bg-blue-500 px-5 py-2 rounded-md text-white text-xs">
                        Simpan Perubahan
                    </button>
                    <button @click="() => {
                        $emit('update:show', false);
                        studentStore.getStudent($route.params.id);
                    }" class="bg-blue-500 px-5 py-2 rounded-md text-white text-xs">
                        Batalkan Perubahan
                    </button>
                </form>
            </div>
        </Transition>
    </div>
</template>