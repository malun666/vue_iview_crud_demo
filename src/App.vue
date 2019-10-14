<template>
  <Layout class="home layout" style="height: 100vh">
    <Header>
      <Menu mode="horizontal" theme="dark" active-name="1">
        <div class="layout-logo"></div>
        <div class="layout-nav">
          <MenuItem name="1">
            <Icon type="ios-navigate"></Icon>
            Item 1
          </MenuItem>
          <MenuItem name="2">
            <Icon type="ios-keypad"></Icon>
            Item 2
          </MenuItem>
          <MenuItem name="3">
            <Icon type="ios-analytics"></Icon>
            Item 3
          </MenuItem>
          <MenuItem name="4">
            <Icon type="ios-paper"></Icon>
            Item 4
          </MenuItem>
        </div>
      </Menu>
    </Header>
    <Layout>
      <Sider>侧边栏</Sider>
      <Content>
        <div id="app">
          <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
          </div>
          <router-view />
        </div>
      </Content>
    </Layout>
    <Footer>底部</Footer>
  </Layout>
</template>

<style lang="scss"></style>
