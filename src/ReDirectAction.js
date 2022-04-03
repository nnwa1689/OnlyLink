import React from "react";
import { useState } from "react";
import { db } from './firebase';
import { getDoc, doc } from "firebase/firestore";
import { useParams } from "react-router-dom";
import { Layout, Spin } from 'antd';
const { Content } = Layout;

const ReDirectAction = () => {
    let { uid } = useParams();
    const [loading, setLoading] = useState(true);
    const [targetUrl, setTargetUrl] = useState();
    getDoc(doc(db, "links", uid)).then(
      (docSnap) => {
        if (docSnap.exists()) {
          setTargetUrl(window.location.href = docSnap.data().url);
        } else {
          setTargetUrl(window.location.href = "/404")
        }
        setLoading(false);
      }
    )

    return(
        <Content style={ { background: "white", marginTop: "50px" } }>
            <Spin size="large" tip={ "稍後就會將您帶去新世界！" } />
            <br/><br/>
            { !loading && (window.location.href = targetUrl) }
        </Content>
    )
}
export default ReDirectAction;
