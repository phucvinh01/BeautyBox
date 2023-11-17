import { DownloadOutlined, PlusCircleOutlined } from '@ant-design/icons'
import { Button, Divider, Space } from 'antd'
import React, { useEffect } from 'react'
import ModalCreateDistributor from '../../../components/ModalCreateDistributor'
import { useDispatch } from 'react-redux'
import TableDistributor from '../../../components/TableDistributor'
import { getDataListDistributor } from '../../../redux/api'
import TableProduct from '../../../components/TableProduct'

const Distributor = () => {


    const dispatch = useDispatch()

    useEffect(() => {
        getDataListDistributor(dispatch)
    }, [])


    return (
        <main style={ { marginLeft: 10 } }>
            <Space>
                <ModalCreateDistributor />
                <Button icon={ <DownloadOutlined /> }>Download</Button>
            </Space>
            <section className='mt-3'>
                <TableDistributor />
            </section>

        </main>
    )
}

export default Distributor