// user info store

let userInfo = {
  sex: '',
  building: '',
  floor: '',
};

const updateUserInfo = function updateUserInfo (data) {
  userInfo = {...data, floor: data.floor ? +data.floor[0] : userInfo.floor}
}

const getUserInfo = function getUserInfo () {
  return {...userInfo};
}

export default {
  updateUserInfo,
  getUserInfo
}
