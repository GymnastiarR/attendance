<script>
export default {
    props: {
        size: {
            default: 30,
            required: false,
            type: Number
        }
    }
};
</script>

<template>
    <svg xmlns="http://www.w3.org/2000/svg" :height="size" viewBox="0 -960 960 960" :width="size" style="color: white;"
        fill="white">
        <path d="M450-450H200v-60h250v-250h60v250h250v60H510v250h-60v-250Z" />
    </svg>
</template>