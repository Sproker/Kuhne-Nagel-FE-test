import { BrowserRouter, Route, Switch } from "react-router-dom"
import { Layout } from 'antd'
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import DataTable from "./pages/DataTable"
import OrderDetailedView from "./pages/OrderDetails"
import './components/Design.css'
const { Header, Content } = Layout

function App() {

  return (
    <BrowserRouter>
      <Layout>
        <Header>
          <Route path="/" component={Navbar}/>
        </Header>
        
        <Content>
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route exact path="/data" component={DataTable}/>
          <Route exact path="/data/:orderId/" component={OrderDetailedView}/>
        </Switch>
        </Content>
        
      </Layout>
    </BrowserRouter>
  )
}

export default App