import UserService from './user';
import ajax from './ajax';

const getToilets = function getToilets() {
  return UserService.getUserInfo().then(userInfo => {
    return ajax.request(`/v1/toilets?building=${userInfo.building}&toilet_type=${userInfo.sex}`)
      .then(data => {
        return data.result;
      })
  });
}


export default {
  getToilets
}
