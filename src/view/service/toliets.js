import UserService from './user';
import ajax from './ajax';

const getToilets = function getToilets (building = 'A') {
  return UserService.getUserInfo().then(userInfo => {
    return Promise.all([ajax.request(`/v1/toilets?&toilet_type=${userInfo.sex}`), ajax.request('/v1/stalls')])
      .then(([toilets, stalls]) => {
      toilets = toilets.result;
      stalls = stalls.result;
        // TODO 混合数据
        // 格式 floor => stalls, 先不考虑多 toilets
        let floors = {};
        for (let i = 0, len = toilets.length; i < len; i++) {
          let floor = toilets[i].floor;
          let toilet_id = toilets[i].toilet_id;
          if (toilets[i].building === building && !floors[floor]) {
            floors[floor] = [];

            for (let j = 0, len = stalls.length; j < len; j++) {
              if (stalls[j].toilet_id === toilet_id) {
                floors[floor].push(stalls[j]);
              }
            }

            if(!floors[floor].length) {
              delete floors[floor];
            }
          }
        }

        // let keys = Object.keys(floors);
        // let revertFloor = {};
        // keys.sort((a, b) => b - a);
        // console.log(keys);
        // for (let i = 0; i < keys.length; i++) {
        //   revertFloor[keys[i]] = floors[keys[i]];
        // }
        //
        // console.log(revertFloor)
        return floors;
      });
  });
};


export default {
  getToilets
};
