import React from "react";
import {useRequestPagination} from "../../utils/http";
import {ApiUri} from "../../api";
import Loading from "../../components/Loading";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/date";
import styles from "./Actress.module.css"
import {Actress} from "./actress.types"


const ActressItem: React.FC<{actress: Actress}> = ({actress}) => {
    return <div className={"actress-item"}>
        <Link to={`/actress/${actress.name}`} style={{textDecorationLine: "none", color: "black"}}>
            <div className={styles.actressLogo}>
                <div className={"actress-item-logo"}>
                    <img src={`/images/actress/${actress.name}.jpg`} alt=""/>
                </div>
            </div>
            <div>
                <div className={"actress-item-desc"}>
                    <span>{actress.name}</span>/<span>{formatDate(actress.birthday)}</span>
                </div>
            </div>
        </Link>
    </div>
}

export const Actresses: React.FC = () => {
    const [rows, getRows, loading, page, pageSize, count, changePage, changePageSize] = useRequestPagination(ApiUri.actress.list)
    return (
        <>
            <Loading loading={loading}></Loading>
            <div className={"film-body"}>
                {
                    rows.map((item: Actress) => {
                            return <ActressItem actress={item}></ActressItem>
                        }
                    )
                }
                <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
            </div>
        </>)
}