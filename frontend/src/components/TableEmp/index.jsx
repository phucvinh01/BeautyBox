import React, { useRef, useState } from 'react';
import { Button, Input, Space, Table, Tag } from 'antd';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { ClearOutlined, EditFilled, HistoryOutlined, SearchOutlined } from '@ant-design/icons';


const TableEmp = () => {
    const emps = useSelector((state) => state.emp.emp.data);

    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };
    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <Space
                className='mx-auto'
                style={ {
                    padding: 8,
                } }
                onKeyDown={ (e) => e.stopPropagation() }
            >
                <Input
                    ref={ searchInput }
                    placeholder={ `Search ${dataIndex}` }
                    value={ selectedKeys[0] }
                    onChange={ (e) => setSelectedKeys(e.target.value ? [e.target.value] : []) }
                    onPressEnter={ () => handleSearch(selectedKeys, confirm, dataIndex) }

                />
                <Space>
                    <Button
                        type="primary"
                        onClick={ () => handleSearch(selectedKeys, confirm, dataIndex) }
                        icon={ <SearchOutlined /> }
                    >
                    </Button>
                    <Button
                        icon={ <ClearOutlined /> }
                        onClick={ () => clearFilters && handleReset(clearFilters) }
                    >
                    </Button>
                </Space>
            </Space>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={ {
                    color: filtered ? '#1677ff' : undefined,
                } }
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={ {
                        backgroundColor: '#ffc069',
                        padding: 0,
                    } }
                    searchWords={ [searchText] }
                    autoEscape
                    textToHighlight={ text ? text.toString() : '' }
                />
            ) : (
                text
            ),
    });

    const shouldRenderRow = (record) => {
        return +record.account.role < 2;
    };

    const columns = [
        {
            title: 'Họ tên',
            dataIndex: 'name',
            key: 'name',
            ...getColumnSearchProps('name'),
            render: (name) => <a>{ name }</a>,
        },
        {
            title: 'Ngày sinh',
            dataIndex: 'dateOfBirth',
            key: 'dateOfBirth',
            render: (dateOfBirth) => <p>{ moment(dateOfBirth).format("DD/MM/YYYY") }</p>,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Ngày vào làm',
            dataIndex: 'hireDay',
            key: 'hireDay',
            render: (hireDay) => <p>{ moment(hireDay).format("DD/MM/YYYY") }</p>,

        },
        {
            title: 'Chức vụ',
            dataIndex: 'account',
            key: 'account',
            render: (account) => <p>{ account.role >= 2 ? "Admin" : "Nhân viên" }</p>,

        },
        {
            title: 'Trạng thái tài khoản',
            dataIndex: 'account',
            key: 'account',
            render: (account) => <p>{ account.isActive ? "Còn hoạt động" : "Khóa" }</p>,

        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Space>
                    <Button icon={ <EditFilled /> } />
                    <Button icon={ <HistoryOutlined /> }></Button>
                </Space>
            ),
        },
    ];


    return (
        <Table renderCell={ shouldRenderRow } className='table-emp' style={ { width: "100%" } } columns={ columns } dataSource={ emps } />
    )
};
export default TableEmp;