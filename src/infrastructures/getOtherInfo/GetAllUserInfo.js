import React, { useEffect, useState } from "react";
import axios from "axios";

const FetchAllUserData = ({ url, setUserData  }) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(url); // プロップで渡されたURLを使用
        setData(response.data); // データをステートに保存
        setUserData(response.data);
        console.log("取得したデータ:", response.data);
      } catch (err) {
        setError(err.message || "データの取得に失敗しました");
        console.error("エラー:", err);
      }
    };

    if (url) {
      fetchData();
    }
  }, [url, setUserData ]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!data) {
    return <div>Loading...</div>;
  }

  return (null
    // <div>
    //   <h1>データ取得成功</h1>
    //   <pre>{JSON.stringify(data, null, 2)}</pre>
    // </div>
  );
};

export default FetchAllUserData;