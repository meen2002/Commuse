import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FetchAllUserData = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // GETリクエストを送信
        const response = await axios
        .get(
          'https://wb8xg4edgd.execute-api.ap-northeast-1.amazonaws.com/dev/insert_userdata?user_name=sample_name&latitude=26.6537&longitude=134.75546&music_id=samplemusicid123'
        );

        setData(response.data);
        console.log("取得したデータ:", response.data);
      } catch (err) {
        // エラー処理
        setError(err.message || 'データの取得に失敗しました');
        console.error("エラー:", err);
      }
    };

    fetchData();
  }, []);

  return (
null
  );
};

export default FetchAllUserData;
