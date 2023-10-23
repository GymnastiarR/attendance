<script setup>
import IconError from './icons/IconError.vue';
import { useWarningStore } from '../stores/warning';
import { storeToRefs } from 'pinia';

const warningStore = useWarningStore();

const { warning, callBack } = storeToRefs( warningStore );

</script>

<template>
    <Transition name="fade">
        <div v-show="warning" class="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 flex justify-center items-center">
            <div class="overflow-hidden bg-white rounded-md w-[90%] md:w-1/2 lg:w-1/3 flex-col relative">
                <div class="bg-[#d45659] w-full h-[80px] flex items-center px-4 relative">
                    <span class="mb-4 absolute -top-12 right-0">
                        <IconError />
                    </span>
                    <p class="text-xl text-white ">Peringatan</p>
                </div>
                <div class="px-8 py-6 flex flex-col justify-between box-border h-2/3">
                    <div class="">
                        <p class="text-red-500 italic">
                            {{ warning }}
                        </p>
                    </div>
                    <div class="flex justify-end">
                        <button class="rounded-md bg-blue-500 px-4 py-2 text-white text-sm"
                            @click="warning = null">Batalkan</button>
                        <button @click="callBack()" class="rounded-md bg-red-500 px-4 py-2 text-white text-sm">
                            Hapus
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </Transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>