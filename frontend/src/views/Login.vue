<template>
    <div class="container mt-5">
        <div class="row d-flex justify-content-center">
            <div class="col-md-6">
                <div class="card px-5 py-5" id="form1">
                    <div class="form-data">
                        <div class="forms-inputs mb-4">
                            <span>Password</span>
                            <input
                                autocomplete="off"
                                type="password"
                                v-model="password"
                                v-bind:class="{ 'form-control': true }"
                                v-on:blur="passwordBlured = true"
                            />
                        </div>
                        <p v-if="err">Error Invalid Entry!</p>
                        <div class="mb-3">
                            <button
                                v-on:click.stop.prevent="submit"
                                class="btn btn-dark w-100"
                            >Login</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { server } from "../helper";
import axios from "axios";
import router from "../router";
export default {
    data() {
        return {
            err: false,
            password: "",
            passwordBlured: false
        };
    },
    methods: {
        submit: function () {
            axios
                .post(
                    `${server.baseURL}/login`,
                    { username: "Boss", password: this.password }
                )
                .then((res) => {
                    if (res.data.access_token) {
                        localStorage.token = res.data.access_token;
                        router.push({ name: "Home" });
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.err = true;
                });
        },
    }
};
</script>
<style scoped>
.card {
    border: none;
    height: 320px;
}

.forms-inputs {
    position: relative;
}

.forms-inputs span {
    position: absolute;
    top: -18px;
    left: 10px;
    background-color: #fff;
    padding: 5px 10px;
    font-size: 15px;
}

.forms-inputs input {
    height: 50px;
    border: 2px solid #eee;
}

.forms-inputs input:focus {
    box-shadow: none;
    outline: none;
    border: 2px solid #000;
}

.btn {
    height: 50px;
}
</style>