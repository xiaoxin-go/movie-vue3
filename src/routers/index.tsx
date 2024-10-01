import * as React from "react";
import {createBrowserRouter} from "react-router-dom";
import Film from "../pages/Film"
import FilmDetail from "../pages/FilmDetail"
// import {lazy} from "react";
import {Layout} from "components/nav/layout"
import Actress from "../pages/Actress";

// const Home = lazy(()=> import('pages/Home'))
// const Film = lazy(()=> import('pages/deployment/resource_template/ResourceTemplate'))

const router = createBrowserRouter([
        {
            path: "/",
            element: <Layout/>,
            children: [
                {path: 'films', element: <Film/>},
                {path: 'film/:sn', element: <FilmDetail/>},
                {path: 'actresses', element: <Actress/>},
            ]
        },
    ]
);
export default router