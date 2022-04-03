import React from 'react';
import { Result, Layout, Button } from 'antd';
const { Content } = Layout;

const NotFound = () => {
    return(
        <Content className="App" style={ { background: "white" } }>
            <Result
            status="404"
            title="404"
            subTitle="抱歉，找不到這個網址"
            extra={<Button type="primary" href='/'>回到首頁</Button>}
            />
        </Content>
    )
}

export default NotFound;