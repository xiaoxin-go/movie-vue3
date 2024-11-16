import React from "react";
import {useRequestPagination} from "../../utils/http";
import {ApiUri} from "../../api";
import Loading from "../../components/Loading";
import {Link} from "react-router-dom";
import {formatDate} from "../../utils/date";
import styles from "./Actress.module.css"
import {Actress} from "./actress.types"
import Pagination from "../../components/Pagination";


const ActressItem: React.FC<{actress: Actress}> = ({actress}) => {
    return <div className={"actress-item"}>
        <Link to={`/actress/${actress.name}`} style={{textDecorationLine: "none", color: "black"}}>
            <div className={styles.logo}>
                <div className={"actress-item-logo"}>
                    <img src={`/images/actress/${actress.name}.jpg`} alt=""/>
                </div>
            </div>
        </Link>
            <div>
                <div className={"actress-item-desc"}>
                    <span>{actress.name}{ actress.birthday?"/"+formatDate(actress.birthday):""}</span>
                </div>
            </div>

    </div>
}

export const Actresses: React.FC = () => {
    const [rows, getRows, loading, page, pageSize, count, changePage, changePageSize] = useRequestPagination(ApiUri.actress.list)
    return (
        <>
            <Loading loading={loading}></Loading>
            <div>
                <div className={"film-body"}>
                    {
                        rows.map((item: Actress) => {
                                return <ActressItem actress={item}></ActressItem>
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

        </>)
}