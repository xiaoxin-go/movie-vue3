import React from "react";
import {useParams} from "react-router-dom";
import {useRequestPagination} from "../../utils/http";
import {ApiUri} from "../../api";
import styles from "./ActressDetail.module.css"
import Loading from "../../components/Loading";
import {Film} from "../Film/film.types";
import Pagination from "../../components/Pagination";
import {FilmItem} from "../Film/components/FilmItem";


export const ActressDetail: React.FC = () =>{
    const { name } = useParams<{ name: string }>();
    const [data, getRows, loading, page, pageSize, count, changePage, changePageSize] = useRequestPagination(ApiUri.actress.detail, {name: name})
    return (
        <div className={styles.container}>
            <Loading loading={loading}></Loading>
            <div>
                <div className={"film-body"}>
                    <div className={"actress-item"} style={{height: 'auto'}}>
                        <div className={styles.logo}>
                            <div className={"actress-item-logo"}>
                                <img src={`/images/actress/${data.name}.jpg`} alt=""/>
                            </div>
                        </div>
                        <div className={styles.info}>
                            <span>{data.name}</span>
                            {data.birthday && <p><span>生日: </span>{ data.birthday}</p>}
                            {data.cup && <p><span>罩杯: </span>{ data.cup}</p>}
                            {data.height && <p><span>身高:</span>{ data.height}</p>}
                        </div>
                    </div>
                    {
                        data.films?.map((item: Film, index: number) => {
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
        </div>
    )
}