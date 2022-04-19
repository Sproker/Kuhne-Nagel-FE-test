import React, {Component} from 'react';
import './Design.css'
import {Menu} from 'antd';
class Navbar extends Component {
render() {
    return (
        <nav className="menuBar">
          <div className="menuCon">
            <Menu mode="horizontal">
            <Menu.Item key="home">
              <a href="/">Home page</a>
            </Menu.Item>
            <Menu.Item key="table">
              <a href="/data">Data table</a>
            </Menu.Item>
            </Menu>
          </div>
        </nav>
    );
  }
}
export default Navbar;