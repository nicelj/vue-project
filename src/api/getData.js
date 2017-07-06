const token = '44b57d68-2d98-4d6e-bcab-474f17ad9573'
// 登陆
export const login = (user) => {
  let url = '/accesstoken'
  return fetchData(url, 'POST', {accesstoken: token})
}
// 注册
export const register = (user) => {
  return true
}
// 获取全部主题
export const getTopics = (params = {}) => {
  let url = '/topics'
  return fetchData(url, 'GET', params)
}
// 获取主题详情
export const getTopicDetail = (id) => {
  let url = '/topic/' + id
  return fetchData(url, 'GET')
}
// 加入收藏
export const collect = (id) => {
  let url = '/topic/collect'
  return fetchData(url, 'POST', {topic_id: id, accesstoken: token})
}
// 取消收藏
export const cancelCollect = (id) => {
  let url = '/topic/de_collect'
  return fetchData(url, 'POST', {topic_id: id, accesstoken: token})
}
// 获取用户详情
export const getUser = (username) => {
  let url = '/user/' + username
  return fetchData(url, 'GET')
}
// 新建主题
export const addTopic = (payload) => {
  let url = '/topics'
  return fetchData(url, 'POST', {...payload, ...{accesstoken: token}})
}
const fetchData = (url, method = 'GET', options = {}) => {
  url = '/api' + url + '?'
  let body = {
    method,
    headers: {
      'Content-Type': 'application/json'
    }
  }
  if (method === 'GET') {
    for (let k in options) {
      url += `&${k}=${options[k]}`
    }
  }
  if (method === 'POST') {
    body.body = JSON.stringify(options)
  }
  return new Promise((resolve, reject) => {
    fetch(url, {
      ...body
    }).then(response => {
      if (response.status === 200) {
        return response.json()
      } else {
        resolve(response.json())
      }
    }).then((json) => {
      resolve(json)
    }).catch((e) => {
      resolve(e.message)
    })
  })
}
