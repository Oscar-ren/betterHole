// user info store

let userInfo = {
  sex: 'male',
  building: 'B',
  floor: 7,
};

const updateUserInfo = function updateUserInfo (data) {
  userInfo = {...data, floor: data.floor ? +data.floor[0] : userInfo.floor}
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
