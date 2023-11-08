import { Button, Space, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { CSVLink } from 'react-csv'
import { ExportOutlined } from '@ant-design/icons';
import { getAllOrder } from '../../../axios/OrderRequest';
import TableOrder from '../../../components/TableOrder';
import { useDispatch } from 'react-redux'
import { getOrder } from '../../../redux/api';
const Order = () => {
    const [dataExport, setdataExport] = useState([])
    const dispatch = useDispatch()

    useEffect(() => {
        getOrder(dispatch)
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
                        <CSVLink filename='Danh sách sản phẩm'
                            data={ dataExport }
                            asyncOnClick={ true }
                            onClick={ getDataExport }
                        >Xuất danh sách</CSVLink>
                    </Button>
                </Space>
                <section className='mt-3'>
                    <TableOrder />
                </section>
            </div>

        </main>
    )
}

export default Order