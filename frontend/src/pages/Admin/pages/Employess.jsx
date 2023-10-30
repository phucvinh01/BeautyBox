import { Space } from 'antd'
import React, { useEffect } from 'react'
import ModalCreateEmp from '../../../components/ModalCreateEmp'
import TableEmp from '../../../components/TableEmp'
import { useDispatch, useSelector } from 'react-redux'
import { getDataEmp } from '../../../redux/api'

const Employess = () => {

    const dispatch = useDispatch()

    useEffect(() => {
        getDataEmp(dispatch)
    }, [])

    return (
        <main >
            <div className='container'>
                <Space direction='vertical'>
                    <Space>
                        <ModalCreateEmp />
                    </Space>
                    <TableEmp />
                </Space>
            </div>

        </main>
    )
}

export default Employess