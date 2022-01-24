<template>
    <span>
        <span class="d-flex justify-content-center">
            <h2>Please Login to view your Tasks</h2>
        </span>
        <h4 class="text-center mt-20">
            <small>
                <button class="btn btn-success" v-on:click="goToLogin()">Login</button>
            </small>
        </h4>
    </span>
</template>
<script>
import router from "../router";
export default {
    methods: {
        goToLogin() {
            router.push({ name: "Login" });
        }
    }
};
</script> 