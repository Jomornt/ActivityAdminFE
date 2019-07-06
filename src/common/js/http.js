import axios from 'axios'
import Qs from 'qs'
axios.defaults.timeout = 5000
axios.defaults.baseURL = 'http://localhost:8080/Woola_admin_war_exploded/'

// http request 拦截器
axios.interceptors.request.use(
  config => {
    if (config.method === 'post' || config.method === 'put' || config.method === 'patch' || config.method === 'delete') {
      config.data = Qs.stringify(config.data)
    }
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

//  http response 拦截器
axios.interceptors.response.use(
  response => {
    if (response.data.code === 200 || response.data.code === 400) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    return Promise.reject(error)
  }
)
// 封装get方法
// @param url
// @param data
// @returns {Promise}
export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

// /**
//  * 封装post请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function post (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

export function MyDelete (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.delete(url, {
      params: params
    }).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

//  /**
//  * 封装patch请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function patch (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.patch(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}

//  /**
//  * 封装put请求
//  * @param url
//  * @param data
//  * @returns {Promise}
//  */

export function put (url, data = {}) {
  return new Promise((resolve, reject) => {
    axios.put(url, data).then(response => {
      resolve(response.data)
    }, err => {
      reject(err)
    })
  })
}
