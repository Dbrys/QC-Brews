'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { Button, Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;

const Overview: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedKey, setSelectedKey] = useState('1');
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();

  const handleMenuClick = (key: string) => {
    setSelectedKey(key);
  };

  const renderContent = () => {
    switch (selectedKey) {
      case '1':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                  Breweries
                </h1>
                <p className="text-sm text-gray-500">
                  Find quality craft beer in the QC area
                </p>
              </div>
            </div>
          </div>
        );
      case '2':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                  Events
                </h1>
                <p className="text-sm text-gray-500">
                  Upcoming beer events and tastings
                </p>
              </div>
            </div>
          </div>
        );
      case '3':
        return (
          <div className="flex flex-col gap-4">
            <div className="flex flex-row gap-4">
              <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold">
                  Beers
                </h1>
                <p className="text-sm text-gray-500">
                  Browse local craft beers
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return <div>Select a menu item</div>;
    }
  };

  return (
    <Layout className="h-screen">
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="demo-logo-vertical" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          selectedKeys={[selectedKey]}
          onClick={({ key }) => handleMenuClick(key)}
          items={[
            {
              key: '1',
              icon: <HomeOutlined />,
              label: 'Breweries',
            },
            {
              key: '2',
              icon: <CalendarOutlined />,
              label: 'Events',
            },
            {
              key: '3',
              icon: <Image src="/beer.svg" alt="Beer" width={24} height={24} className="brightness-0 invert opacity-70 pr-2" />,
              label: 'Beers',
            },
          ]}
        />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: colorBgContainer }}>
          <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: '16px',
              width: 64,
              height: 64,
            }}
          />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
            borderRadius: borderRadiusLG,
          }}
        >
          {renderContent()}
        </Content>
      </Layout>
    </Layout>
  );
};

export default Overview;