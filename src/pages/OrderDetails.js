import {useState, useContext, useEffect} from "react"
import {Context} from "../store"
import {updateDatas} from "../store/actions"
import 'antd/dist/antd.css';
import {RollbackOutlined} from '@ant-design/icons'
import {Button} from 'antd'
import {useHistory} from "react-router-dom"
import '../components/Design.css'
import {Row, Col} from 'antd'
import axios from 'axios'

const FilteredOrder = []
let i = 0

function OrderDetails(){

    const [state, dispatch] = useContext(Context)
    const [isLoading, setIsLoading] = useState(true)
    const history = useHistory()

    function ReturnHandler(id){
        const handler = () => {
            history.push("/data") 
        }
        handler();
    }
  
    useEffect(() =>{

        axios.get('/shipments.json').then(res => {
            return res.data
                
        }).then(data => {
            for (i; i < data.length; i++) {
                FilteredOrder.push({
                  key: i,
                  orderNo: data[i].orderNo,
                  date: data[i].date,
                  customer: data[i].customer,
                  trackingNo: data[i].trackingNo,
                  status: data[i].status,
                  consignee: data[i].consignee,
                })
                
            }
            dispatch(updateDatas(data))
            setIsLoading(false)
        })
    
    },[isLoading])

    if(isLoading === true){
        return(
        <div>
            <h1>Loading...</h1>
        </div>)
    }

    const OrderID = window.location.href.split("/data/")[1]

    return(
        
        <div>
            <br/>
            <h1>Shipment details</h1>
            {FilteredOrder.filter(item => item.key == OrderID).map(filteredOrder => (
                <div key="{OrderID}">
            <Row around="xs" style={{ alignItems: "center" }} justify="center">
                <Col xs={10}><b>Order Number</b><br/>{filteredOrder.orderNo}</Col>
                <Col xs={10}><b>Date</b><br/>{filteredOrder.date}</Col>
            </Row>
            <Row around="xs" style={{ alignItems: "center" }} justify="center">
                <Col xs={10}><b>Customer</b><br/>{filteredOrder.customer}</Col>
                <Col xs={10}><b>Tracking Number</b><br/>{filteredOrder.trackingNo}</Col>
            </Row>
            <Row around="xs" style={{ alignItems: "center" }} justify="center">
                <Col xs={10}><b>Consignee</b><br/>{filteredOrder.consignee}</Col>
                <Col xs={10}><b>Status</b><br/>{filteredOrder.status}</Col>
            </Row>
            <div class="returnButton"><Button style={{backgroundColor:'#D9D9D9'}} onClick={ReturnHandler}><RollbackOutlined /></Button></div>
            </div>
            ))}
      </div>
    )
}

export default OrderDetails