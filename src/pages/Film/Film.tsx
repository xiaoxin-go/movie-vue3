import {Link} from "react-router-dom";
import {Film} from "./film.types";
import React from "react";
import {formatDate} from "../../utils/date";
import {useRequestPagination} from "../../utils/http";
import {ApiUri} from "../../api";
import Loading from "../../components/Loading";


const FilmItem: React.FC<{film: Film}> = ({film})=>{
    return <Link to={`/film/${film.name}`} style={{textDecorationLine: "none", color: "black"}}>
        <div className={"film-item-logo"}>
            <img src={`/images/logo/${film.name}.jpg`} alt=""/>
        </div>
        <div>
            <div className={"film-item-title"}>
                {film.title}
            </div>
            <div className={"film-item-sn"}>
                <span>{film.name}</span>/<span>{formatDate(film.release_date)}</span>
            </div>
        </div>
    </Link>
}

export const Films: React.FC = () => {
    const [rows, getRows, loading, page, pageSize, count, changePage, changePageSize] = useRequestPagination(ApiUri.film.list)
    return (
        <>
            <Loading loading={loading}></Loading>
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
        </>
    )
}