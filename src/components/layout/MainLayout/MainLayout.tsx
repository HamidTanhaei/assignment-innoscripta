import React from 'react';
import {Footer} from "./Footer";
import {Header} from "./Header";

export const MainLayout = ({children}  : Readonly<{
    children: React.ReactNode;
}>)=> {
    return (
        <>
            <Header />
            <div className="2xl:container 2xl:mx-auto py-5 px-2">
                {children}
            </div>
            <Footer />
        </>
    );
}