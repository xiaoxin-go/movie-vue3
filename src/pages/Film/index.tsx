import {FilmList} from "./Film";
import React from "react";
import {useRequestPagination} from "../../utils/http";
import {ApiUri} from "../../api";
import Loading from "../../components/Loading";


export const Film: React.FC = () => {
    const [rows, getRows, loading, page, pageSize, count, changePage, changePageSize] = useRequestPagination(ApiUri.film.list)
    return <>
        <Loading loading={loading}></Loading>
        <FilmList films={rows}></FilmList>
    </>
}