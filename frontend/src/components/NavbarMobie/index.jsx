import React, { useState } from 'react';
import { Button, Drawer } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
const NavbarMobie = () => {
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };
    return (
        <>
            <Button style={{
                backgroundColor: "transparent", color: "black"
            }} onClick={showDrawer}>
                <MenuOutlined />
            </Button>
            <Drawer title="Basic Drawer" placement="right" onClose={onClose} open={open} className='drawer-narbar-mobie'>
                <p>Some contents...</p>
                <p>Some contents...</p>
                <p>Some contents...</p>
            </Drawer>
        </>
    );
};
export default NavbarMobie;