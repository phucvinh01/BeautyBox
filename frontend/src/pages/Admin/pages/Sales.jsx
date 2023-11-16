import { ArrowUpOutlined, DownCircleFilled, EyeInvisibleOutlined, SearchOutlined, UpCircleFilled } from '@ant-design/icons'
import { Button, Card, Space, Statistic, message } from 'antd'
import React, { useEffect, useState } from 'react'
import { getSale, getrevenueData } from '../../../axios/SaleRequest'
import TableStatitisProduct from '../../../components/TableStatitisProduct'
import moment from 'moment'
import Axios from '../../../axios/Axios'
import ChartComponent from '../../../components/ChartSale'
const Sales = () => {
    const currentDate = moment();
    const currentMonth = currentDate.format('M')
    const currentYear = currentDate.format('YYYY')

    const [revenueData, setRevenueData] = useState([]);
    const [salesData, setSalesData] = useState([])
    const [month, setMonth] = useState(0)
    const [year, setYear] = useState(0)
    const [hidden, setHidden] = useState(false)
    const [hiddenChart, setHiddenChart] = useState(false)

    const getDataSale = async (currentMonth, currentYear) => {
        const r = await Axios.get('/v1/product/sale/dailyMonth/', {
            params: {
                month: +currentMonth,
                year: +currentYear
            }
        });
        if (r.success) {
            setSalesData(r.data)
        }
        else {
            setSalesData("")
        }
    }

    const handleChange = (e) => {
        const inputValue = e;
        setMonth(inputValue.split('-')[1])
        setYear(inputValue.split('-')[0])
    }

    const handleSearch = () => {
        getDataSale(month, year)
    }

    const getRevenueData = async () => {
        const r = await getrevenueData()
        if (r.success) {
            setRevenueData(r.data)
        }
        else {
            message.error('Lấy revennuedata thất bại')
        }
    }

    useEffect(() => {
        getDataSale(currentMonth, currentYear)
        getRevenueData()
    }, [])

    return (
        <main>
            <div className='container'>
                {
                    hiddenChart ? <Button icon={ <DownCircleFilled /> } onClick={ () => setHiddenChart(!hiddenChart) }>Hiện biểu đồ thống kê doanh thu năm nay</Button> :
                        <Button icon={ <UpCircleFilled /> } onClick={ () => setHiddenChart(!hiddenChart) } >Ẩn biểu đồ</Button>
                }
                <div hidden={ hiddenChart }>
                    <ChartComponent revenueData={ revenueData && revenueData } />
                </div>
                <div className='d-flex justify-content-between gap-3 mt-5'>

                    <Space className=''>
                        <p>Tìm thống kê theo tháng và năm</p>
                        <input onChange={ (e) => handleChange(e.target.value) } className='form-control' type='month' />
                        <Button onClick={ handleSearch } icon={ <SearchOutlined /> }></Button>
                    </Space>
                    <Space>
                        <Card bordered={ false }>
                            <Statistic
                                title="Doanh thu tháng này"
                                value={ salesData.totalRevenue }
                                valueStyle={ {
                                    color: '#3f8600',
                                } }
                                prefix={ <ArrowUpOutlined /> }
                                suffix="VND"
                            />
                        </Card>
                        <Card bordered={ false }>
                            <Statistic
                                title="Tổng sản phẩm bán được"
                                value={ salesData.totalQuantity }
                                valueStyle={ {
                                    color: '#3f8600',
                                } }
                            />
                        </Card>
                        <Card bordered={ false }>
                            <Statistic
                                title="Lợi nhuận"
                                value={ salesData.sumProfit[0]?.totalProfit }
                                valueStyle={ {
                                    color: '#3f8600',
                                } }
                                suffix="VND"
                            />
                        </Card>
                    </Space>
                </div>


                {
                    hidden ? <Button icon={ <DownCircleFilled /> } onClick={ () => setHidden(!hidden) }>Hiện danh sách thông kê sản phẩm</Button> :
                        <Button icon={ <UpCircleFilled /> } onClick={ () => setHidden(!hidden) } >Ẩn danh sách</Button>
                }
                <section className='mt-3' hidden={ hidden }>
                    <TableStatitisProduct data={ salesData.productStats } />
                </section>
            </div>
        </main>
    )
}

export default Sales