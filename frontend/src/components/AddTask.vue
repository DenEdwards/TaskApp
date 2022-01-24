<template>
    <div class="col-md-12 form-wrapper addTask-container">
        <form id="create-post-form" @submit.prevent="createTask">
            <span class="d-flex justify-content-between flex-wrap">
                <h2>Create Task</h2>
                <div class="form-group">
                    <button class="btn btn-success" type="submit">Create Task</button>
                </div>
            </span>
            <div class="form-group col-md-12 form-input">
                <label for="title">Title</label>
                <input
                    type="text"
                    id="title"
                    v-model="title"
                    name="title"
                    class="form-control"
                    placeholder="Enter Task Title"
                    @keydown="inputHandler"
                />
            </div>
            <div class="form-group col-md-12 form-input">
                <label for="description">Description</label>
                <textarea
                    type="text"
                    id="description"
                    v-model="description"
                    name="description"
                    class="form-control"
                    placeholder="Enter Description"
                    @keydown="inputHandler"
                />
            </div>
        </form>
    </div>
</template>

<script>
import axios from "axios";
import { server } from "../helper";
export default {
    data() {
        return {
            title: "",
            description: "",
            token: '',
        };
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
        }
    },
    methods: {
        createTask() {
            let taskData = {
                title: this.title,
                description: this.description,
            };
            this.__submitToServer(taskData);
        },
        inputHandler(e) {
            if (e.keyCode === 13 && e.shiftKey) {
                this.createTask();
            }
        },
        __submitToServer(data) {
            axios.post(`${server.baseURL}/task/create`, data, { headers: { Authorization: `Bearer ${this.token}` } }).then(() => {
                window.location.reload();
            });
        }
    }
};
</script>

<style scoped>
.addTask-container {
    margin: 40px 0;
    padding: 20px;
    background-color: #eeeeee;
}
.form-input {
    margin: 20px 0;
}
</style>