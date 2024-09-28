import {Link, useNavigate} from "react-router-dom";
import {Film} from "./film.types";
import React from "react";


export const FilmList: React.FC<{ films: Film[] }> = ({films}) => {
    const navigate = useNavigate()
    const toDetail = (name: string) => {
        navigate(`/film/${name}`)
    }
    return (
        <div className={"film-body"}>
            {
                films.map((item, index) => {
                        const imagePath = require(`f:/static/images/logo/${item.name.toUpperCase()}.jpg`)
                        return <div key={index} className={"film-item"}
                                    onClick={() => toDetail(item.name)}>
                            <Link to={`/film/${item.name}`}>
                                <div className={"film-item-logo"}>
                                    <img src={imagePath} alt=""/>
                                </div>
                                <div className={"film-item-title"}>
                                    {item.title}
                                </div>
                                <div className={"film-item-sn"}>
                                    <span>{item.name}</span>/<span>{item.date}</span>
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