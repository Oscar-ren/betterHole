// user info store

let userInfo = {
  sex: 'male',
  building: 'A',
  floor: 7,
};

const updateUserInfo = function updateUserInfo (data) {
  userInfo = {...userInfo, ...data}
}

const getUserInfo = function getUserInfo () {
  return new Promise((resolve, reject) => {
    resolve({...userInfo})
  })
}

export default {
  updateUserInfo,
  getUserInfo
}
