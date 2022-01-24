<template>
    <span>
        <div v-if="token.length < 1">
            <span class="d-flex justify-content-center">
                <h2>Please Login to view your Tasks</h2>
            </span>
            <h4 class="text-center mt-20">
                <small>
                    <button class="btn btn-success" v-on:click="goToLogin()">Login</button>
                </small>
            </h4>
        </div>
        <div v-else>
            <div class="col-md-12 form-wrapper">
                <form id="create-post-form" @submit.prevent="editTask">
                    <span class="d-flex justify-content-between">
                        <h2>Edit Task</h2>
                        <div class="form-group">
                            <button class="btn btn-success" type="submit">Edit Task</button>
                        </div>
                    </span>
                    <div class="form-group col-md-12">
                        <label for="title">Title</label>
                        <input
                            type="text"
                            id="title"
                            v-model="task.title"
                            name="title"
                            class="form-control"
                            placeholder="Enter Title"
                        />
                    </div>
                    <div class="form-group col-md-12">
                        <label for="description">Description</label>
                        <textarea
                            type="text"
                            id="description"
                            v-model="task.description"
                            name="description"
                            class="form-control"
                            placeholder="Enter Description"
                        />
                    </div>
                </form>
            </div>
            <h4 class="text-center mt-20">
                <small>
                    <button class="btn btn-success" v-on:click="navigate()">View All Tasks</button>
                </small>
            </h4>
        </div>
    </span>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
import router from "../router";
export default {
    data() {
        return {
            id: 0,
            task: {},
            token: '',
        };
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
            this.id = this.$route.params.id;
            this.getTask();
        }
    },
    methods: {
        editTask() {
            let taskData = {
                title: this.task.title,
                description: this.task.description,
            };
            axios
                .put(
                    `${server.baseURL}/task/update?taskID=${this.id}`,
                    taskData,
                    { headers: { Authorization: `Bearer ${this.token}` } }
                )
                .then(() => {
                    router.push({ name: "Home" });
                });
        },
        getTask() {
            axios
                .get(`${server.baseURL}/task/task/${this.id}`, { headers: { Authorization: `Bearer ${this.token}` } })
                .then(data => (this.task = data.data));
        },
        navigate() {
            router.push({ name: "Home" });
        },
        goToLogin() {
            router.push({ name: "Login" });
        }
    }
};
</script>
<style scoped>
.form-group {
    margin: 20px 0;
}
</style>