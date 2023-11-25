<script setup>
// import { defineProps } from 'vue';
import { IconSave } from '../../icons';
import { ref, defineEmits } from 'vue';

const input = ref( null );
const showInput = ref( false );

defineEmits( [ 'update:value' ] );

defineProps( {
    value: {
        type: String,
        default: ''
    },
    callback: {
        type: Function,
        default: () => { }
    }
} );
</script>

<template>
    <span @click="showInput = true" :class="[showInput && 'hidden']">{{ value }}</span>
    <div class="flex" :class="[!showInput && 'hidden']">
        <input @input="$emit('update:value', $event.target.value)" class="w-3/4" ref="input" type="text" :value="value">
        <button @click="() => { callback(); showInput = false; }">
            <IconSave size="22" />
        </button>
    </div>
</template>