<script>
export default {
    props: {
        label: {
            type: String,
            required: false
        },
        value: {
            type: String,
            required: false
        },
        name: {
            type: String,
            required: true
        },
        styleLabel: {
            type: String,
            required: false
        },
        styleInput: {
            type: String,
            required: false
        }
    },
    emits: [ 'update:value' ]
};
</script>

<template>
    <label :class="styleLabel" v-if="label" :for="name" class="text-sm mb-1" v-text="label"></label>
    <input :id="name" :class="styleInput" @input="$emit('update:value', $event.target.value)" :value="value" type="text"
        :name="name" class="rounded-md border-2 px-2 py-1 text-sm focus:outline-blue-500">
</template>