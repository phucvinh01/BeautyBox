import React, { useEffect, useState } from 'react';
import PopupCreate from '../PopupCreate';
import Products from '../../../components/Products';
import { useSelector } from 'react-redux';
import { Button, Space } from 'antd';
import TableProduct from '../../../components/TableProduct';
import { CSVLink } from 'react-csv'
import { ExportOutlined } from '@ant-design/icons';


const ProductAdmin = () => {
    const products = useSelector((state) => state.product.products.data);
    //console.log(products);
    const [dataExport, setdataExport] = useState([])
    const getDataExport = (event, done) => {
        let r = []
        if (products && products.length > 0) {
            r.push(["SKU", "Tên", "Giá Nhập", "Giá bán", "Nhà phân phối", "Số lượng", "Trạng thái"])
            products.map((item, index) => {
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
        <>
            <main >
                <div className="container pt-4">
                    <Space direction='vertical'>
                        <Space>
                            <PopupCreate />
                            <Button type='primary' size='middle' icon={ <ExportOutlined /> } >
                                <CSVLink filename='Danh sách sản phẩm'
                                    data={ dataExport }
                                    asyncOnClick={ true }
                                    onClick={ getDataExport }
                                >Xuất danh sách nhân viên</CSVLink>
                            </Button>
                        </Space>
                        <TableProduct />
                    </Space>
                </div>
            </main>
        </>
    );
};

export default ProductAdmin;
