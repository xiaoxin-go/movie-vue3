import React from "react";
import {Link} from "../FilmDetail.types";
import styles from "../FilmDetail.module.css";
import {formatDate} from "../../../utils/date";
import Table from "../../../components/Table";
import {TableColumn} from "../../../components/Table/Table.types";


const Download = (row: Link) =>{
    return <a href={row.magnet} style={{textDecoration:"none"}}>下载</a>
}

export const Links: React.FC<{ links: Link[] }> = ({links}) => {
    const columns:TableColumn[]  = [
        {title: "名称", field: "name", width: 250},
        {title: "大小", field: "size", width: 150},
        {title: "分享时间", field: "share_date", width: 80,
            valueGetter: (row)=>formatDate(row.share_date)
        },
        {title: "操作", field: "action", width: 80}
    ]
    return <div className={styles.links}>
        <Table columns={columns} rows={links} action={(row: Link) => Download(row)}></Table>
    </div>
}