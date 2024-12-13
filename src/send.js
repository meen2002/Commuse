// import axios from 'axios';
// import { getTokenFromUrl } from './getToken.js';



// const userData = (props) => {

//   const username = localStorage.getItem(getTokenFromUrl().access_token+"userName")

//   const userData = {
//     user_name:username,          // ユーザー名
//     latitude: props.marker.latitude,            // 緯度
//     longitude: props.marker.longitude,         // 経度
//     artist_name: 'name',          // アーティスト名
//     music_title: 'title',         // 曲名
//     music_genre: 'genre',         // 音楽のジャンル
//     music_album: 'album'          // アルバム名
//   };

//   axios.get('https://wb8xg4edgd.execute-api.ap-northeast-1.amazonaws.com/dev/insert_userdata?user_name=sample&latitude=26.6537&longitude=134.75546&artist_name=name&music_title=title&music_genre=genre&music_album=album', {
//     params: userData
//   })
//   .then(response => {
//     console.log('データ送信成功:', response.data);
//   })
//   .catch(error => {
//     console.error('エラー:', error);
//   });

//   return(
//   <div>
//   <p>{username}</p>
//   </div>
//   )

// };

// export default userData;
