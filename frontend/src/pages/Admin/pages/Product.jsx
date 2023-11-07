import React, { useEffect, useState } from 'react';
import PopupCreate from '../PopupCreate';
import Products from '../../../components/Products';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Space, Spin, Upload, message } from 'antd';
import TableProduct from '../../../components/TableProduct';
import { CSVLink } from 'react-csv'
import { ExportOutlined, DownloadOutlined, FileAddFilled, UploadOutlined, ImportOutlined, SelectOutlined } from '@ant-design/icons';
import Axios from '../../../axios/Axios'
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { getProductList } from '../../../redux/api';
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

    const dispatch = useDispatch()
    const [uploadedFile, setUploadedFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleFileUpload = async (file) => {

    };

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: 'application/json',
        onDrop: (acceptedFiles) => {
            if (acceptedFiles.length > 0) {
                const file = acceptedFiles[0];
                setUploadedFile(file);
            }
        },
    });

    const handleChange = (event) => {
        const file = event.target.files[0];
        setUploadedFile(file);
    };

    const handleUpload = async (file) => {
        setIsLoading(true)
        const formData = new FormData();
        console.log(formData);
        formData.append('file', file);
        console.log(file);
        console.log(formData);
        try {
            const response = await Axios.post('/v1/product/insertMany', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            if (response.success) {
                message.success("Thêm thành công")
                setUploadedFile(null)
                getProductList(dispatch);
                setIsLoading(false)
            }
        } catch (error) {
            message.error('Lỗi khi thêm dữ liệu:', error);
            setIsLoading(false)
        }
    };
    return (
        <>
            <main >
                <div className="container pt-4">
                    <Space direction='vertical'>
                        <Space>
                            <PopupCreate />
                            <Button size='middle' icon={ <DownloadOutlined /> } >
                                <CSVLink filename='Danh sách sản phẩm'
                                    data={ dataExport }
                                    asyncOnClick={ true }
                                    onClick={ getDataExport }
                                >Download</CSVLink>
                            </Button>
                            <div { ...getRootProps() }>
                                <input { ...getInputProps() } type='file' className='form-control' accept="application/json" onChange={ handleChange } />
                                <Button icon={ <SelectOutlined /> } type='text'>
                                    { uploadedFile ? uploadedFile.name : 'Kéo và thả tệp JSON vào đây...' }
                                </Button>
                            </div>
                            <Button disabled={ !uploadedFile ? true : false } onClick={ () => handleUpload(uploadedFile) }>
                                <UploadOutlined /> { isLoading ? <Spin /> : "Tải lên" }
                            </Button>

                            {/* <Space>
                                <input type='file' onChange={ (event) => setUploadedFile(event.target.files[0]) } />
                                {
                                    uploadedFile && <Button onClick={ handleUpload } icon={ <ImportOutlined /> }>Tải lên</Button>
                                }
                            </Space> */}
                        </Space>
                        <TableProduct />
                    </Space>
                </div>
            </main>
        </>
    );
};

export default ProductAdmin;
