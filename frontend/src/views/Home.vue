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
      <div class="Home">
        <div class="text-center">
          <h1>
            <strong>Task Planner</strong>
          </h1>
        </div>
        <AddTask />
        <h2>Task List</h2>
        <div class="task-list">
          <div v-if="tasks.length === 0" class="d-flex justify-content-center">
            <h2>You have no tasks to do!</h2>
          </div>
          <span>
            <div v-for="task in tasks" :key="task._id">
              <Task :task="{ ...task }" key="key" :showCheckbox="true" @clicked="onClickChild" />
            </div>
          </span>
        </div>
        <TaskViewer :parentHide="hide" @clicked="onTaskViewerClicked" />
      </div>
    </div>
  </span>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
import router from "../router";
import AddTask from "../components/AddTask.vue"
import Task from "../components/Task.vue";
import TaskViewer from "../components/TaskViewer.vue";

export default {
  name: "Home",
  components: {
    Task,
    TaskViewer,
    AddTask
  },
  data() {
    return {
      tasks: [],
      token: '',
      hide: false
    };
  },
  mounted() {
    if (localStorage.token) {
      this.token = localStorage.token;
      this.fetchTasks();
    }
  },
  methods: {
    fetchTasks() {
      axios.get(`${server.baseURL}/task/tasks`, { headers: { Authorization: `Bearer ${this.token}` } }).then((data) => {
        this.tasks = data.data;
      });
    },
    onClickChild() {
      this.hide = true;
    },
    onTaskViewerClicked() {
      this.hide = false;
    },
    goToLogin() {
      router.push({ name: "Login" });
    }
  },
};
</script>
<style scoped>
.task-list {
  padding: 20px;
  margin: 20px auto;
  border: 2px solid #eeeeee;
  border-radius: 20px;
  height: 70vh;
  overflow-y: scroll;
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
</style>