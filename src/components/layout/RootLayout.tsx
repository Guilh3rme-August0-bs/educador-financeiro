import { Header } from "../shared/Header"
import { Outlet } from "react-router-dom" /*Substitui o conteúdo de Router.tsx 
(de forma similar ao children)*/

export function RootLayout() {
    return (
        <>
        <Header/>
        <Outlet/>
        </>
    )
}