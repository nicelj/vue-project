const token = '44b57d68-2d98-4d6e-bcab-474f17ad9573'
export const login = (user) => {
  let url = '/accesstoken'
  return fetchData(url, 'POST', {accesstoken: token})
}
export const register = (user) => {
  return true
}
const fetchData = (url, method = 'GET', options = {}) => {
  url = '/api' + url
  return new Promise((resolve, reject) => {
    fetch(url, {
      method,
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(options)
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
