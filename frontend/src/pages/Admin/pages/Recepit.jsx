import React, { useEffect, useState } from 'react'
import TableRecepit from '../../../components/TableRecepit'
import axios from '../../../axios/Axios'
import { Button, Space, message } from 'antd'
import { ExportOutlined } from '@ant-design/icons'
import { CSVLink } from 'react-csv'

const Recepit = () => {
    const [dataExport, setdataExport] = useState([])
    const [data, setData] = useState([])

    const getData = async () => {
        try {
            const r = await axios.get('/v1/receipt/receipt-create')
            if (r.success) {
                setData(r.data)
            } else {
                message.error(r.message)
            }
        } catch (error) {
            message.error(r.error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    const getDataExport = (event, done) => {
        let r = []
        if (data && data.length > 0) {
            r.push(["SKU", "Tên", "Giá Nhập", "Giá bán", "Nhà phân phối", "Số lượng", "Trạng thái"])
            data.map((item, index) => {
                let arr = [];
                arr[0] = item._id.match(/[0-9]+/g).join(""),
                    arr[1] = item.name,
                    arr[2] = item.priceIn,
                    arr[3] = item.priceSale,
                    arr[4] = item.distributor,
                    arr[5] = item.in_stock,
                    arr[6] = item.status ? "Đang đăng bán" : "Ngưng đăng bán"
                r.push(arr)
            })
            setdataExport(r)
            done()
        }
    }

    return (
        <main>
            <div className='container'>
                <Space>
                    <Button size='middle' icon={ <ExportOutlined /> } >
                        <CSVLink filename='Lịch sử nhập hàng'
                            data={ dataExport }
                            asyncOnClick={ true }
                            onClick={ getDataExport }
                        ></CSVLink>
                    </Button>
                </Space>
                <section className='mt-3'>
                    <TableRecepit data={ data } />
                </section>
            </div>
        </main>
    )
}

export default Recepit