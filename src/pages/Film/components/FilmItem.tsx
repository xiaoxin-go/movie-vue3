import React from "react";
import {Film} from "../film.types";
import {Link} from "react-router-dom";
import styles from "../Film.module.css";
import {formatDate} from "../../../utils/date";

export const FilmItem: React.FC<{film: Film}> = ({film})=>{
    return (
        <>
            <Link to={`/film/${film.name}`} style={{textDecorationLine: "none", color: "black"}}>
                <div className={styles.logo}>
                    <div className={"film-item-logo"}>
                        <img src={`/images/logo/${film.name}-right.jpg`} alt=""/>
                    </div>
                </div>
            </Link>
                <div style={{cursor:"auto"}}>
                    <div className={"film-item-title"}>
                        {film.title}
                    </div>
                    <div className={"film-item-sn"}>
                        <span>{film.name}</span>{film.release_date && <span>/{formatDate(film.release_date)}</span>}
                    </div>
                </div>
        </>
        )

}