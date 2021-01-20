import axios from 'axios'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Vue from 'vue'

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API,
  // baseURL: process.env.NODE_ENV === 'production' ? process.env.VUE_APP_BASE_URL : process.env.VUE_APP_BASE_API,
  timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    // config.headers['Content-Type'] = 'application/json;charset=UTF-8';
    // config.headers['withCredentials'] = true
    // do something before request is sent
    if (getToken()) {
      // let each request carry token
      // ['X-Token'] is a custom headers key
      // please modify it according to the actual situation
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    // if the custom code is not 20000, it is judged as an error.
    if (response.request.responseURL.indexOf('login') > 1) {
      return res
    }
    if (res.code !== 200) {
      if (res.code === 401) {
        localStorage.clear()
        sessionStorage.clear()
        location.reload() // 为了重新实例化vue-router对象 避免bug
        this.$router.push('/login')
        return Promise.reject(new Error(res.msg || 'Error'))
      }
      Vue.prototype.$message({
        message: res.message || 'Error',
        type: 'error',
        duration: 5 * 1000
      })
      if (res.code === 50008 || res.code === 50012 || res.code === 50014) {
        // to re-login
        Vue.prototype.$messageBox.confirm('You have been logged out, you can cancel to stay on this page, or log in again', 'Confirm logout', {
          confirmButtonText: 'Re-Login',
          cancelButtonText: 'Cancel',
          type: 'warning'
        }).then(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        })
      }
      return res
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Vue.prototype.$message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
