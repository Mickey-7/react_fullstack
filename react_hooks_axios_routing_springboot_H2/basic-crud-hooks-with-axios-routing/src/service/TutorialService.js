// snippet : imp + tab
import http from '../axios/http-common';

// snippet : nfn
const getAll = () => {
    return http.get("/tutorials");
}

const get = (id) => {
    // note that we used backticks here
    return http.get(`/tutorials/${id}`);
}

const create = (data) => {
    return http.post("/tutorials",data);
}

const update = (id,data) => {
    console.log(id);
    return http.put(`/tutorials/${id}`,data);
}

const remove = (id) => {
    return http.delete(`/tutorials/${id}`);
}

const removeAll = () => {
    return http.delete(`/tutorials`);
}

const findByTitle = (title) => {
    return http.get(`/tutorials?title=${title}`);
}

// snippet : exp + tab
export default {
    getAll,
    get,
    create,
    update,
    remove,
    removeAll,
    findByTitle
}





