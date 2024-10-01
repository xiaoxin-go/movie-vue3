// import {Menu} from './menu'
import {Outlet, useNavigate} from "react-router-dom";
import Alert from '../Alert'
import {AppBar, Toolbar, Typography, Box, Button, Card} from '@mui/material';

import * as React from "react";
// import {useState} from "react";
import {MenuItem} from "./Nav.types";


const menus: MenuItem[] = [
    {key: "film", title: "Film", path: "/films"},
    {key: "actress", title: "Actress", path: "/actresses"},
]

export const Layout: React.FC = () => {
    // const [subMenus, setSubMenus] = useState<MenuItem[]>([] as MenuItem[])
    //   const [activeKey, setActiveKey] = useState<string>("")
    const navigate = useNavigate()
    const changePath = (key: string, path: string) => {
        navigate(path)
        // setActiveKey(key)
    }

    return (
        <div className={"layout"}>
            <AppBar component="nav">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{flexGrow: 1, display: {xs: 'none', sm: 'block'}}}
                    >
                        Movie
                    </Typography>
                    <Box sx={{display: {xs: 'none', sm: 'block'}}}>
                        {menus.map((item) => (
                            <Button key={item.key} sx={{color: '#fff'}} onClick={() => {
                                changePath(item.key, item.path)
                            }}>
                                {item.title}
                            </Button>
                        ))}
                    </Box>
                </Toolbar>
            </AppBar>
            <div className={"layout-container"}>
                <Outlet></Outlet>
            </div>
            <Alert/>
        </div>
    )
}