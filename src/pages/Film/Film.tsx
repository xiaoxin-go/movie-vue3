import {Film} from "./film.types";
import React, {ChangeEvent, useState } from "react";
import http, {useRequestPagination} from "../../utils/http";
import {ApiUri} from "../../api";
import Loading from "../../components/Loading";
import Pagination from "../../components/Pagination";
import {FilmItem} from "./components/FilmItem";
import Button from "@mui/material/Button";
import styles from "./Film.module.css";
import Popover from "@mui/material/Popover";
import TextField from "@mui/material/TextField";
import {useAlertContext} from "context/AlertContext";

export const Films: React.FC = () => {
    const {showMessage} = useAlertContext()
    const [name, setName] = useState<string>("");
    const [rows, getRows, loading, page, pageSize, count, changePage, changePageSize] = useRequestPagination(ApiUri.film.list)
    const addFilm = async() =>{
        if(name.trim() === ""){
            showMessage('error', "电影名不能为空" as string, 5)
            return
        }
        let res = await http.post(ApiUri.film.create, {name: name})
        if(res.code === 0){
            showMessage('success', res.msg as string, 10)
        }else{
            showMessage('error', res.msg as string, 10)
        }
    }
    const [open, setOpen] = useState<boolean>(false)
    const clickAdd = ()=>{
        setOpen(true)
    }
    const handleClose = () =>{
        setOpen(false)
    }
    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.type)
        const { name, value } = event.target;
        setName(value)
      };
    return (
        <>
            <Loading loading={loading}></Loading>
            <div>
                <Button className={styles.add} variant="text" onClick={clickAdd}>添加</Button>
                <div className={"film-body"}>
                    {
                        rows.map((item: Film, index: number) => {
                                return <div key={index} className={"film-item"}>
                                    <FilmItem film={item}></FilmItem>
                                </div>
                            }
                        )
                    }
                    <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
                </div>
                <div style={{}}>
                    <Pagination page={page} pageSize={pageSize} count={count} changePage={changePage}
                                changePageSize={changePageSize}/>
                </div>
            </div>
            <Popover
                open={open}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
              >
                  <TextField id="standard-basic"
                             label="name"
                             variant="standard"
                             value={name}
                             onChange={handleChange} />
                  <Button variant="contained" style={{height:"48px"}} onClick={addFilm}>确定</Button>
              </Popover>
        </>
    )
}