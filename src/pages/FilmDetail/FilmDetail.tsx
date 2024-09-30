import React, {useEffect} from "react";
import {useParams} from "react-router-dom";
import styles from "./FilmDetail.module.css"
import {useRequest} from "../../utils/http";
import {ApiUri} from "../../api";
import {formatDate} from "../../utils/date";
import Loading from "../../components/Loading";
import {Links} from "./components/Links";
import {Images} from "./components/Images";


export const FilmDetail: React.FC = () => {
    const { sn } = useParams<{ sn: string }>();
    const [data, getData, loading] = useRequest(ApiUri.film.detail)
    useEffect(()=>{
        getData({name: sn})
    }, [])
    const imagePath = require(`f:/static/images/logo/${sn?.toUpperCase()}.jpg`)
    return (
        <div className={styles.container}>
            <Loading loading={loading}></Loading>
            <h3>{data.title}</h3>
            <div className={styles.head}>
                <div className={styles.logo}>
                    <img style={{height: "100%"}} src={imagePath} alt={sn}/>
                </div>
                <div className={styles.info}>
                    <p><span className={styles.label}>番号:</span> {sn}</p>
                    <p><span className={styles.label}>發行日期:</span> {formatDate(data.release_date)}</p>
                    <p><span className={styles.label}>長度:</span> {data.length}</p>
                    <p><span className={styles.label}>演员</span></p>
                    {data?.actresses?.length > 0 && data.actresses?.map((item: any) => <a href="">{item.name}</a>)}
                </div>
            </div>
            <div className={styles.link}>
                <p>磁力连接</p>
                <Links links={data.links}/>
            </div>
            <div className={styles.image}>
                <p>样品图片</p>
                <Images images={data.images}/>
            </div>
        </div>
    )
}