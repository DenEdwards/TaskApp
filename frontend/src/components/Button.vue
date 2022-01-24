<template>
    <button @click="addTask()" class="btn btn-success">{{ message }}</button>
</template>

<script>
export default {
    name: "Button",
    props: {
        message: String,
    },
    methods: {
        addTask() {
            console.log("add task")
        }
    }
}
</script>

<style scoped>
</style>