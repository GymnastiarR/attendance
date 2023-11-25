<script setup>
import { ref } from 'vue';

const open = ref( true );

const props = defineProps( {
    title: {
        type: String,
        default: 'Hello World'
    },
    callback: {
        type: Function,
        default: () => { }
    }
} )

</script>

<template>
    <Transition name="fade">
        <div v-show="open" class="fixed top-0 bottom-0 left-0 right-0 z-30 flex items-center justify-center bg-black/50">
            <div class="overflow-hidden bg-white rounded-md w-[90%] md:w-1/2 lg:w-1/3 flex-col relative">
                <p>Hello Dunia</p>
            </div>
            <slot>

            </slot>
            <div>
                <div>

                </div>
                <div class="flex justify-end">
                    <button class="px-4 py-2 text-sm text-white bg-red-500 rounded-md" @click="open = false">Close</button>
                    <button class="px-4 py-2 text-sm text-white bg-blue-500 rounded-md" @click="callback">Simpan
                        Perubahan</button>
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