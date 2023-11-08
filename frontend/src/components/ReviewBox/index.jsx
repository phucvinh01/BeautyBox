import { Empty, Rate, Space, Divider } from 'antd';
import React from 'react'
import { useSelector } from 'react-redux';
import moment from 'moment'

const ReviewBox = () => {
    const reivews = useSelector((state) => state.review.review.data);

    return (
        <>
            {
                reivews.length > 0 ? <>
                    {
                        reivews.map((item, index) => {
                            return (
                                <>
                                    <Space direction='vertical' size={ 'small' }>
                                        <p>{ item.username }</p>
                                        <div className='d-flex align-items-center gap-3'>
                                            <Rate style={ { color: "black" } } value={ item.rating } disabled />
                                            <small className='text-muted mt-2'>{ moment(item.createdAt).format("DD/MM/YYYY HH:mm") }</small>
                                        </div>
                                        <p>{ item.reviewText }</p>
                                    </Space>
                                    <Divider />
                                </>
                            )
                        })
                    }
                </>
                    : <Empty />
            }
        </>
    )
}

export default ReviewBox