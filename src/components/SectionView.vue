<script setup>
import IconMore from './icons/IconMore.vue';
import { ref } from 'vue';

const props = defineProps( {
    title: {
        type: String,
        required: true
    }
} );

const isShow = ref( false );
</script>
<template>
    <div class="bg-white rounded-md drop-shadow-md mb-3 py-6">
        <div class="mb-2 border-b-2 px-8 pb-3 flex justify-between cursor-pointer" @click="isShow = !isShow">
            <button>
                <h1 class="text-sm font-semibold ">{{ title }}</h1>
            </button>
            <IconMore />
        </div>
        <Transition name="slide">
            <div v-show="isShow" class="flex px-8">
                <slot></slot>
            </div>
        </Transition>
    </div>
</template>