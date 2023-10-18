<script setup>
import IconError from './icons/IconError.vue';
import { useErrorStore } from '../stores/error';
import { storeToRefs } from 'pinia';

const errorStore = useErrorStore();

const { error } = storeToRefs( errorStore );
</script>

<template>
    <Transition name="fade">
        <div v-show="error.status"
            class="fixed top-0 right-0 bottom-0 left-0 bg-black/50 z-30 flex justify-center items-center">
            <div class="overflow-hidden bg-white rounded-md w-[90%] md:[70%] md:1/2 lg:w-1/3 lg:h-1/3 flex-col relative">
                <div class="bg-[#d45659] w-full h-1/3 flex items-center px-4 relative">
                    <span class="mb-4 absolute -top-12 right-0">
                        <IconError />
                    </span>
                    <p class="text-xl text-white ">Kesalahan</p>
                </div>
                <div class="px-8 py-6 flex flex-col justify-between box-border h-2/3">
                    <div class="">
                        <ul v-if="error.status === 'ERR_BAD_REQUEST'">
                            <li class="text-red-500 italic" v-for="message in error.messages" v-text="message.message">
                            </li>
                        </ul>
                        <p v-else>
                            {{ error.messages }}
                        </p>
                    </div>
                    <div class="flex justify-end">
                        <button class="rounded-md bg-red-500 px-4 py-2 text-white text-sm"
                            @click="errorStore.clear">Close</button>
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