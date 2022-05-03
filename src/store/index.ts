import {reactive} from "vue";

const store = reactive({
    state: {
        scroll: false,
        search: "",
        username: ""
    }
})
export default store