import {reactive} from "vue";

const store = reactive({
    state: {
        scroll: false,
        search: "",
    }
})
export default store