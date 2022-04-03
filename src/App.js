import React from 'react';
import { useEffect, useRef} from 'react';
import { Typography, Layout, Divider, } from 'antd';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import './App.css';
import Home from './Home';
import NotFound from './NotFound';
import ReDirectAction from './ReDirectAction';

const { Text, Link } = Typography;
const { Footer } = Layout;
const App = () => {
  const firstLoad = useRef(true);
  useEffect(
    () => {
      if (firstLoad.current) {
        (window.adsbygoogle = window.adsbygoogle || []).push({})
      }
    }
  )
  return(
    <div className="App">
      <Layout>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/:uid" element={<ReDirectAction />} />
            <Route path="/404" element={<NotFound/>}/>
          </Routes>
        </BrowserRouter>
        <Footer>
          <a href="https://lab.notes-hz.com/">
          <span style={ { fontSize: "24px", color: "#028ff3", fontWeight: "bold" } }>Lab</span>
          <span style={ { fontSize: "24px", color: "#FD3E49", fontWeight: "bold" } }>H</span>
          <span style={ { fontSize: "24px", color: "#FF8738", fontWeight: "bold" } }>a</span>
          <span style={ { fontSize: "24px", color: "#FFA900", fontWeight: "bold" } }>z</span>
          <span style={ { fontSize: "24px", color: "#00A752", fontWeight: "bold" } }>u</span>
          <span style={ { fontSize: "24px", color: "#007BEE", fontWeight: "bold" } }>y</span>
          <span style={ { fontSize: "24px", color: "#9B49DF", fontWeight: "bold" } }>a</span>                            
          </a>
          <Divider />
          <Link href="https://www.notes-hz.com/page/serviceRules" target="_blank">服務條款</Link>
          <Text>・</Text>
          <Link href="https://www.notes-hz.com/page/privacypolicy" target="_blank">隱私政策</Link>  
          <Divider/>
          <ins class="adsbygoogle"
            style={ {display: "block"} }
            data-ad-format="fluid"
            data-ad-layout-key="-fb+5w+4e-db+86"
            data-ad-client="ca-pub-3826338280068687"
            data-ad-slot="1234752516"></ins> 
        </Footer>
      </Layout>
  </div>
  )
}

export default App;