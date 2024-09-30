import {Link, useNavigate} from "react-router-dom";
import {Film} from "./film.types";
import React from "react";
import {formatDate} from "../../utils/date";


export const FilmList: React.FC<{ films: Film[] }> = ({films}) => {
    const navigate = useNavigate()
    const toDetail = (name: string) => {
        navigate(`/film/${name}`)
    }
    return (
        <div className={"film-body"}>
            {
                films.map((item, index) => {
                    console.log("imagePath---->", item.name)
                        const imagePath = require(`f:/static/images/logo/${item.name.toUpperCase()}.jpg`)
                        // const imagePath = require(`f:/static/images/logo/ABF-073.jpg`)
                    console.log("imagePath---->", imagePath)
                        return <div key={index} className={"film-item"}
                                    onClick={() => toDetail(item.name)}>
                            <Link to={`/film/${item.name}`} style={{textDecorationLine: "none", color: "black"}}>
                                <div className={"film-item-logo"}>
                                    <img src={imagePath} alt=""/>
                                </div>
                                <div>
                                    <div className={"film-item-title"}>
                                        {item.title}
                                    </div>
                                    <div className={"film-item-sn"}>
                                        <span>{item.name}</span>/<span>{formatDate(item.release_date)}</span>
                                    </div>
                                </div>
                            </Link>

                        </div>
                    }
                )
            }
            <i></i><i></i><i></i><i></i><i></i><i></i><i></i><i></i>
        </div>
    )
}