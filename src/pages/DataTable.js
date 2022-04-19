import {useState, useContext, useEffect} from "react"
import {Context} from "../store"
import {updateDatas} from "../store/actions"
import {SaveOutlined,DeleteOutlined,EditOutlined,ExpandOutlined} from '@ant-design/icons'
import {Table, Input, InputNumber, Button, Form, Typography} from 'antd'
import {useHistory} from "react-router-dom"
import axios from 'axios'

const OrderData = []
let i = 0

function ShowData(){

const [state, dispatch] = useContext(Context)
const [isLoading, setIsLoading] = useState(true)
const history = useHistory()

    function itemEditHandler(JSONObject){
       
        const itemSubmitted={
            orderNo: JSONObject.orderNo,
            date: JSONObject.date,
            customer: JSONObject.customer,
            trackingNo: JSONObject.trackingNo,
            status: JSONObject.status,
            consignee: JSONObject.consignee,
            __v: 0,
        }
        console.log(itemSubmitted)

    }

    function DetailedRedirectHandler(id){

        const handler = () => {
            history.push("/data/"+id) 
        }
        handler();
    }
  
    useEffect(() =>{

       axios.get('/shipments.json').then(res => {
            return res.data

        }).then(data => {
            for (i; i < data.length; i++) {
                OrderData.push({
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
    
    const EditableCell = ({
        editing,
        dataIndex,
        title,
        inputType,
        record,
        index,
        children,
        ...restProps

    }) => {

    const inputNode = inputType === 'number' ? <InputNumber/> : <Input/>

        return (

            <td {...restProps}>
            {editing ? (
                <Form.Item name={dataIndex} style={{margin: 0,}} 
                rules={[{required: true,
                message: `Please Input ${title}!`,},]}>
                {inputNode}
                </Form.Item>
            ) : (children)}
            </td>
        )
    }
    
    const EditData = () => {

        const [form] = Form.useForm()
        const [dataforTable, setData] = useState(OrderData)
        const [editingKey, setEditingKey] = useState('')
        
        const Edited = (record) => record.key === editingKey
        
            const edit = (record) => {
            form.setFieldsValue({
            orderNo: '',
            date: '',
            customer: '',
            trackingNo: '',
            status: '',
            consignee: '',
            ...record,
            })
            setEditingKey(record.key)
            }
        
            const cancel = () => {
                setEditingKey('')
            }
        
            const save = async (key) => {

            try {
                const row = await form.validateFields()
                const newData = [...dataforTable]
                const index = newData.findIndex((item) => key === item.key)
        
                if (index > - 1) {
                    const item = newData[index]
                    newData.splice(index, 1, { ...item, ...row })
                    setData(newData)
                    setEditingKey('')
                    itemEditHandler(row, key, {setData})

                } else {
                    newData.push(row)
                    setData(newData)
                    setEditingKey('')
                    itemEditHandler(row, key)

                }

            } catch (err) {
                console.log('Validation Failed:', err)
            }

        }

        const deleteline = (record) => {
            deletekey(record.key)
        }

        const details = (record) => {
            DetailedRedirectHandler(record.key)
        }

        const deletekey = async (key) => {
            try {

            const row = await form.validateFields()
            itemDeleteHandler(row, key, {setData})
        
            } catch (err) {

            console.log('Validation Failed:', err)
            }
        }

        const itemDeleteHandler = (item, ID) => {
            setData(OrderData => OrderData.filter(item => item.key !== ID));
        }
        
            const columns = [
            {
            title: 'Order number',
            dataIndex: 'orderNo',
            width: '10%',
            editable: true,
            },
            {
            title: 'Order date',
            dataIndex: 'date',
            width: '5%',
            editable: true,
            },
            {
            title: 'Customer',
            dataIndex: 'customer',
            width: '10%',
            editable: true,
            },
            {
            title: 'Tracking number',
            dataIndex: 'trackingNo',
            width: '10%',
            editable: true,
            },
            {
            title: 'Order status',
            dataIndex: 'status',
            width: '5%',
            editable: true,
            },
            {
            title: 'Consignee',
            dataIndex: 'consignee',
            width: '10%',
            editable: true,
            },

        ]  
            columns.push({
                title: 'Action',
                width: '8%',
                dataIndex: 'Action',
    
                render: (_,record) => {

                    const editable = Edited(record)

                    return editable ? (
                        <Button style={{backgroundColor: '#6CFF81'}}>
                        <a href="javascript:;" onClick={() => save(record.key)}><SaveOutlined/></a></Button>
                    ) : ( 
                        <div>   
                        <Button style={{backgroundColor: '#93D1E4'}}><Typography.Link disabled={editingKey !== ''} 
                        onClick={() => edit(record)}><EditOutlined/></Typography.Link></Button>

                        <Button style={{backgroundColor: '#FF736C'}}><Typography.Link disabled={editingKey !== ''} 
                        onClick={() => deleteline(record)}><DeleteOutlined/></Typography.Link></Button>

                        <Button style={{backgroundColor: '#F0E022'}}><Typography.Link disabled={editingKey !== ''} 
                        onClick={() => details(record)}><ExpandOutlined/></Typography.Link></Button>
                        </div>
                    )
                },
            })

        const mergedColumns = columns.map((col) => {
            if (!col.editable) {
            return col
            }
        
            return {

                ...col,
                onCell: (record) => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: Edited(record),
                }),
            }
        })

        return (

            <Form form={form} component={false}>

                <Table components={{
                    body: {cell: EditableCell,},}}
                    bordered
                    dataSource={dataforTable}
                    columns={mergedColumns}
                    rowClassName="editable-row"
                    pagination={{
                    onChange: cancel,
                }}/>
            </Form>
        )
        
    }
    
    return(
        
        <div>
            <EditData/>
        </div>
    )
}

export default ShowData