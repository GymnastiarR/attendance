<script setup>

import { storeToRefs } from 'pinia';
import { useLoadingStore } from '../stores/loading';

const loadingStore = useLoadingStore();

const { loading } = storeToRefs( loadingStore );

</script>

<template>
    <Transition name="fade">
        <div v-show="loading" class="bg-black/30 fixed top-0 left-0 bottom-0 right-0 z-20 flex justify-center items-center">
            <div class="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status">
                <span
                    class="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">Loading...</span>
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