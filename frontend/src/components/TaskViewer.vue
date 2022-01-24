<template>
    <div class="TaskViewer">
        <h2 class="title">Task Viewer</h2>
        <div class="d-flex justify-content-between flex-wrap">
            <button
                v-on:click="buttonClick($event)"
                class="btn btn-success"
                value="showComplete"
            >Show Complete</button>
            <button
                v-on:click="buttonClick($event)"
                class="btn btn-danger"
                value="showIncomplete"
            >Show Incomplete</button>
            <button
                v-on:click="buttonClick($event)"
                v-if="buttons.showComplete || buttons.showIncomplete"
                class="btn btn-secondary"
                value="hideAll"
            >Hide All</button>
        </div>
        <div class="task-list" v-if="buttons.showIncomplete && !buttons.hideAll && !parentHide">
            <div v-for="task in incompleteTasks" :key="task._id">
                <Task :task="{ ...task }" key="key" :showCheckbox="false" />
            </div>
        </div>
        <div class="task-list" v-else-if="buttons.showComplete && !buttons.hideAll && !parentHide">
            <div v-for="task in completedTasks" :key="task._id">
                <Task :task="{ ...task }" key="key" :showCheckbox="false" />
            </div>
        </div>
    </div>
</template>
<script>
import Task from "./Task.vue";
import { server } from "../helper";
import axios from "axios";
export default {
    name: "TaskViewer",
    components: {
        Task,
    },
    data() {
        return {
            buttons: {
                showComplete: false,
                showIncomplete: false,
                hideAll: true,
            },
            completedTasks: [],
            incompleteTasks: [],
            showCheckbox: Boolean,
            token: '',
        };
    },
    props: {
        parentHide: Boolean
    },
    mounted() {
        if (localStorage.token) {
            this.token = localStorage.token;
        }
    },
    methods: {
        buttonClick(event) {
            this.$emit('clicked', true);
            this.fetchTasks();
            const value = event.target.value;
            this.buttons = {
                showComplete: false,
                showIncomplete: false,
                hideAll: false,
            };
            this.buttons[value] = true;
        },
        fetchTasks() {
            axios.get(`${server.baseURL}/task/tasks`, { headers: { Authorization: `Bearer ${this.token}` } }).then((data) => {
                this.completedTasks = [];
                this.incompleteTasks = [];
                data.data.forEach(task => {
                    if (task.complete) {
                        this.completedTasks.push(task);
                    } else {
                        this.incompleteTasks.push(task);
                    }
                });
            });
        },
        hide() {
            this.buttons = {
                showComplete: false,
                showIncomplete: false,
                hideAll: true,
            };
        }
    },
};
</script>
<style scoped>
.TaskViewer {
    margin: 40px 0;
    padding: 20px;
    background-color: #eeeeee;
}

.title {
    margin: 10px 0 20px;
}

.task-list {
    padding: 20px;
    margin: 20px auto;
    border: 2px solid #000;
    border-radius: 20px;
    height: 70vh;
    overflow-y: scroll;
    background-color: #fff;
}

.task-list::-webkit-scrollbar {
    height: 80%; /* width of the entire scrollbar */
}

.task-list::-webkit-scrollbar-track {
    background: rgb(238, 238, 238, 0); /* color of the tracking area */
    z-index: -1;
}

.task-list::-webkit-scrollbar-thumb {
    background-color: #d6d6d6; /* color of the scroll thumb */
    border-radius: 5px; /* roundness of the scroll thumb */
}

.btn {
    margin: 10px 0;
}
</style>