import React from 'react';
import { useEffect, useState, useRef } from 'react';
import uuid from 'react-uuid';
import { Input, Card, Button, Typography, Layout, Divider, List, Result, Modal, Alert, Spin } from 'antd';
import { DownloadOutlined, LinkOutlined } from '@ant-design/icons';
import { db } from './firebase';
import { getDocs, collection, doc, setDoc, query, orderBy, limit, serverTimestamp } from "firebase/firestore"; 
import './App.css';
import logo from './onlyLink.svg';

const { Title, Link } = Typography;
const { Content } = Layout;


const Home = () => {
    const [url, setUrl] = useState("");
    const [suc, setSuc] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [urlUid, setUrlUid] = useState();
    const [copied, setCopied] = useState(false);
    const [linklist, setLinklist] = useState();
    const isFirstLoad = useRef(true);

    useEffect(
        () => {
          if (isFirstLoad.current) {
            getFirstTenUrl();
            isFirstLoad.current = false;
          }
        }
      )

    const checkUrl = (url) => {
        try {
          url = new URL(url);
        } catch(_) {
          return false;
        } 
        return true;
      }
    
      const getFirstTenUrl = async() => {
        const q = query(collection(db, "links"), orderBy('time', 'desc'), limit(20));
        const qd = await getDocs(q);
        let changeArr = new Array();
        for await(var d of qd.docs) {
          changeArr.push(d.data())
        }
        setLinklist(changeArr);
      }
    
      const errMsgbox = (msg) => {
        Modal.error({
          title: '錯誤',
          content: msg,
        });
      }
    
      const handleGeneratorShortURL = () => {
        const uid = uuid().split('-')[0];
        setProcessing(true);
        if (checkUrl(url)) {
          setDoc(doc(db, "links" ,uid), {
            uid: uid,
            url: url,
            time: serverTimestamp(),
          })
          .then(
            () => { 
              setSuc(true);
              setUrlUid(uid);
              setProcessing(false);
             }
          );
        } else {
          errMsgbox("請輸入正確的URL");
          setProcessing(false);
        }
      }
    
      const copyUrl = (url) => {
        navigator.clipboard.writeText(url)
        .then(() => {
          setCopied(true);
        }).catch(err => {
        console.log('Something went wrong', err);
        })
      }
      return(
        <>
            <Content className="App">
              <img alt='logo' src={logo} width="256" style={{ margin: "50px" }}/> 
              <Title style={{ color: 'white' }} level={5}>短網址產生的最佳幫手，而且完全免費！</Title>    
              <Card bordered={true} style={{ width: '80%', margin: "30px auto 50px auto",padding: "20px" }}>
              { !suc ?
              <>
                <Title style={{ color: 'rgb(155, 73, 223)' }} level={3}>縮短網址</Title>
                <Title level={5}>您可以任意輸入需要產生的網址，但請不要輸入危險或帶有惡意的網址，如經發現將會移除。</Title>
                <Divider />
                <Input 
                  placeholder="目標網址" 
                  size="large" 
                  style={ { height: "64px", fontSize: "24px" } } 
                  onChange={ (e)=> { setUrl(e.target.value) } }
                />
                <br/><br/>
                <Button 
                  style={{ background: "linear-gradient(to right, blue, #9B49DF, #9B49DF)", width: "100%", height:"48px" }} 
                  type="primary" 
                  icon={<DownloadOutlined />} 
                  size={'large'}
                  onClick={ handleGeneratorShortURL }
                  loading={ processing }
                >
                  產生短網址
                </Button>
              </>
              :
              <>
              <Result
                status="success"
                title="產生成功！"
                subTitle= {"您的短網址已經產生：https://ol.notes-hz.com/" + urlUid}
                extra={[
                  <Button type="primary" key="copy" onClick={()=>{ copyUrl("https://ol.notes-hz.com/" + urlUid) }}>
                    複製
                  </Button>,
                  <Button key="retry" onClick={ ()=>{ setSuc(false); setUrl(""); }}>再次產生</Button>,
                ]}
              />
              { copied &&
                <Alert
                message="您的網址已經複製"
                type="success"
                closable
                />
              }
              </>
              }
              </Card>
              <Card bordered={true} style={{ width: '80%', margin: "0px auto 50px auto",padding: "20px" }}>
                <Title style={{ color: 'rgb(155, 73, 223)' }} level={3}>最新產生的短網址</Title>
                <Title level={5}>如發現惡意連結，請盡快通報。</Title>
                <Divider />
                { linklist === undefined ?
                  <Spin size="large" />
                  :            
                  <List
                  size="large"
                  bordered
                  dataSource={linklist}
                  renderItem={
                    item => <List.Item actions={[<Link href={"https://ol.notes-hz.com/" + item.uid} target="_blank"><LinkOutlined /></Link>]}>{"https://ol.notes-hz.com/" + item.uid}</List.Item>
                  }
                />
                }
              </Card>
            </Content>
        </>
      )   
}

export default Home;