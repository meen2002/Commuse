import axios from 'axios';
import { getTokenFromUrl } from './getToken.js';

const username = localStorage.getItem(getTokenFromUrl().access_token+"userName")

// const sendUserData = () => {
//   const userData = {
//     user_name:(username) ,          // ユーザー名
//     latitude: Marker.latitude,            // 緯度
//     longitude: Marker.longitude,         // 経度
//     artist_name: 'name',          // アーティスト名
//     music_title: 'title',         // 曲名
//     music_genre: 'genre',         // 音楽のジャンル
//     music_album: 'album'          // アルバム名
//   };

//   axios.get('https://wb8xg4edgd.execute-api.ap-northeast-1.amazonaws.com/dev/insert_userdata', {
//     params: userData
//   })
//   .then(response => {
//     console.log('データ送信成功:', response.data);
//   })
//   .catch(error => {
//     console.error('エラー:', error);
//   });
// };
