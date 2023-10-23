<script setup>
import { storeToRefs } from 'pinia';
import { IconSuccess } from './icons';
import { useSuccessStore } from '../stores/success';

const successStore = useSuccessStore();

const { success } = storeToRefs( successStore );
</script>

<template>
    <Transition name="fade">
        <div v-if="success.status"
            class="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 flex justify-center items-center">
            <div class="overflow-hidden bg-white rounded-md w-[90%] md:w-1/2 lg:w-1/3 flex-col relative">
                <div class="bg-[#3D71EB] w-full h-[80px]  flex items-center px-4 relative">
                    <span class="mb-4 absolute -top-12 right-0">
                        <IconSuccess />
                    </span>
                    <p class="text-xl text-white font-semibold">Berhasil</p>
                </div>
                <div class="px-8 py-6 flex flex-col justify-between box-border h-2/3">
                    <div>
                        <p>{{ success.messages }}</p>
                    </div>
                    <div class="flex justify-end">
                        <button class="rounded-md bg-blue-500 px-4 py-2 text-white text-sm"
                            @click="successStore.clear">Close</button>
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