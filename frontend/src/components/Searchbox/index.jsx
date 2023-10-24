import React, { useEffect, useRef, useState } from 'react'
import './Searchbox.scss'
import { Dropdown, Input, Menu, Space } from 'antd'
import { SearchOutlined, SmileOutlined } from '@ant-design/icons'
import { debounce, set } from 'lodash';
import { postSearchByName } from '../../axios/ProductRequest';
import DataListSearch from '../DataListSearch';
import { Link } from 'react-router-dom'
import { listDataSearch } from '../../util/data';
const SearchBox = () => {

    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [open, setOpen] = useState(false)
    const inputRef = useRef()
    const [isCleared, setIsCleared] = useState(false);
    useEffect(() => {
        if (searchTerm !== '') {
            handleSearch(searchTerm);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, isCleared])

    const handleSearch = debounce((value) => {
        callApiSearch(value)
        setIsCleared(false);
    }, 1000);

    const handleFocus = () => {
        setOpen(!open)
    };

    const callApiSearch = async (name) => {
        setIsLoading(true);
        let r = await postSearchByName(name)
        if (r.status === 404) {
            setSearchResults(["Không có kết quả tìm kiếm"])
        }
        else {
            setSearchResults(r)
        }
        setIsLoading(false);
    }

    const handleChange = (event) => {
        const { value } = event.target;
        if (value) {
            setSearchTerm(value);
        }

    };
    const menu = (
        <Menu title={ searchResults ? "Kết quả" : "Tìm kiếm hot nhất" }>
            { searchResults?.length > 0 ? (
                searchResults?.map((result) => (
                    <Menu.Item key={ result.id }>
                        <Space>
                            <img src={ result.img } width={ 60 }></img>
                            <p>{ result.name }</p>
                        </Space>
                    </Menu.Item>
                ))
            ) : (
                <>
                    <Menu.Item key={ 0 } disabled>Tìm kiếm hot nhất</Menu.Item>
                    {
                        listDataSearch?.map((result) => (
                            <Menu.Item key={ result.id }>{ result.name }</Menu.Item>
                        ))
                    }

                </>

            ) }
        </Menu>
    );
    const handleClear = () => {
        setSearchTerm('');
        setIsCleared(true);
    };

    return (
        <>
            <div className="wrap">
                <Dropdown
                    trigger={ ['click'] }
                    open={ open }
                    overlay={ menu }
                >
                    <Input ref={ inputRef } onFocus={ handleFocus } onBlur={ () => setOpen(!open) } list="searchResults" value={ searchTerm } onChange={ handleChange } prefix={ <SearchOutlined /> } suffix={ searchTerm && <span style={ { cursor: "pointer" } } onClick={ handleClear }>X</span> } placeholder="What are you looking for?" />
                </Dropdown>
            </div>
        </>
    )
}

export default SearchBox