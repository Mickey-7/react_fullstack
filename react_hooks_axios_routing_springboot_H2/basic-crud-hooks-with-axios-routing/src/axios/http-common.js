// snippet : imp + tab
import axios from 'axios';


// snippet : exp + tab
export default axios.create({
    baseURL : "http://localhost:8080/api",
    headers : {
        "Content-type" : "application/json"
    }
});