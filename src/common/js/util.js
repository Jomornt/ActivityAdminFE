import { Message } from 'element-ui'
export function ShowMessage (code, msg) {
  if (code === 200) {
    Message({
      showClose: true,
      message: msg,
      type: 'success'
    })
  } else {
    Message({
      showClose: true,
      message: msg,
      type: 'error'
    })
  }
}

export function getTbl (url, _this) {
  _this.$fetch('/user' + sessionStorage.account)
    .then((response) => {
      console.log(response)
      _this.nickname = response.data.userInfo[0].nickname
    }).catch((error) => {
      console.log(error)
    })
}
