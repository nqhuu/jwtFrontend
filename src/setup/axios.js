import axios from 'axios';
// require("dotenv").config();



// Set config defaults when creating the instance
//=====================================cofig url mặc định cho axios gọi tới serer
const instance = axios.create({
    baseURL: 'http://localhost:8686'
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
    return response.data;
}, function onRejected(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error);
});


export default instance;