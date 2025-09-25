import axios from 'axios';
import { toast } from 'react-toastify';
// require("dotenv").config();



// Set config defaults when creating the instance
//=====================================cofig url mặc định cho axios gọi tới serer
const instance = axios.create({
    baseURL: 'http://localhost:8686/api/v1'
    // baseURL: process.env.SERVER_URL
});

// cho phép set cookie từ phía server, khi gửi dữ liệu từ fe xuống be thì sẽ gửi kèm cookie
instance.defaults.withCredentials = true;

// // Alter defaults after instance has been created
// instance.defaults.headers.common['Authorization'] = AUTH_TOKEN;


// // Add a request interceptor
// instance.interceptors.request.use(function (config) {
//     // Do something before request is sent
//     return config;
// }, function (error) {
//     // Do something with request error
//     return Promise.reject(error);
// },
//     { synchronous: true, runWhen: () => /* This function returns true */}
// );

// Add a response interceptor
// ===================================config giá trị trả về của response - mặc định sẽ trả về nhiều dữ liệu thay vì chỉ data phía BE trả về, ở đây ta config chỉ lấy phần data của DB trả về mà thôi
instance.interceptors.response.use(function onFulfilled(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    // Any status codes that falls outside the range of 2xx cause this function to trigger

    return response.data;
}, function onRejected(err) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    const status = err.response?.status || 500;
    // we can handle global errors here
    switch (status) {
        // authentication (token related issues)
        case 401: {
            // toast.error("Bạn cần đăng nhập...")
            console.log(err.response.data);
            return err.response.data;
        }

        // forbidden (permission related issues)
        case 403: {
            toast.error("Bạn không có quyền này, hãy liên hệ admin...")
            return Promise.reject(err);
        }

        // bad request
        case 400: {
            toast.error("400")
            return Promise.reject(err);
        }

        // not found
        case 404: {
            toast.error("404")
            return Promise.reject(err);
        }

        // conflict
        case 409: {
            toast.error("409")
            return Promise.reject(err);
        }

        // unprocessable
        case 422: {
            toast.error("422")
            return Promise.reject(err);
        }

        // generic api error (server related) unexpected
        default: {
            toast.error("error from server")
            return Promise.reject(err);
        }
    }
    return Promise.reject(err);

});


export default instance;