<script>
export default {
    props: {
        size: {
            type: String,
            default: "30"
        }
    }
};
</script>
<template>
    <svg xmlns="http://www.w3.org/2000/svg" :height="size" viewBox="0 -960 960 960" :width="size">
        <path d="m249-207-42-42 231-231-231-231 42-42 231 231 231-231 42 42-231 231 231 231-42 42-231-231-231 231Z" />
    </svg>
</template>