<template>
    <div class="Task" :class="[complete ? 'complete' : 'incomplete']">
        <span class="header">
            <h2 class="title flex-wrap">
                <input
                    class="form-check-input mt-0 checkbox"
                    type="checkbox"
                    aria-label="Checkbox for following text input"
                    :checked="task.complete"
                    @change="onChange"
                    v-if="showCheckbox"
                />
                {{ task.title }}
            </h2>
            <img @click="displayDetails()" :src="arrowSvg" :id="task._id" class="arrow" />
        </span>
        <p>{{ new Date(task.created_at).toLocaleDateString() }}</p>
        <collapse>
            <span v-show="open" class="information">
                <p>{{ task.description }}</p>

                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group" style="margin-bottom: 20px;">
                        <router-link
                            :to="{ name: 'Edit', params: { id: task._id } }"
                            class="btn btn-sm btn-outline-secondary"
                        >Edit Task</router-link>
                    </div>
                </div>
            </span>
        </collapse>
    </div>
</template>

<script>
import { server } from "../helper";
import axios from "axios";

export default {
    name: "Task",
    props: {
        task: {
            type: Object
        },
        showCheckbox: Boolean,
    },
    data() {
        return {
            arrowSvg: require('../../assets/arrow.svg'),
            open: false,
            complete: this.task.complete,
            token: '',
        }
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
        }
    },
    methods: {
        onChange() {
            this.complete = !this.complete;
            let taskData = {
                title: this.task.title,
                description: this.task.description,
                complete: this.complete,
            };
            axios
                .put(
                    `${server.baseURL}/task/update?taskID=${this.task._id}`,
                    taskData, { headers: { Authorization: `Bearer ${this.token}` } }
                )
        },
        displayDetails() {
            this.open = !this.open;
            document.getElementById(this.task._id).classList.toggle("rotate");
        }
    }
}
</script>

<style scoped>
.Task {
    margin: 10px;
    padding: 20px;
    border-radius: 20px;
}

.complete {
    background-color: #9dd498;
}

.incomplete {
    background-color: #eeeeee;
}

.header {
    display: flex;
    justify-content: space-between;
}

.title {
    display: flex;
    align-items: center;
}

.title input {
    margin: 0 10px;
    min-width: 32px;
}

.arrow {
    width: 20px;
    height: auto;
    transition: transform 0.3s;
    cursor: pointer;
}

.rotate {
    -webkit-transform: rotate(180deg);
    -moz-transform: rotate(180deg);
    -o-transform: rotate(180deg);
    -ms-transform: rotate(180deg);
    transform: rotate(180deg);
}
</style>