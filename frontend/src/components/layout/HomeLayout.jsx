import React from 'react';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Loading from '../common/Loading';
import SideBarHomePage from '../common/SideBarHomePage';

const HomeLayout = () => {
    const { currentUser, isLoading, logout } = useAuthContext();
    return (
        <div>
            {isLoading ? (
                <Loading className="flex justify-center" />
            ) : (
                <div >
                    <SideBarHomePage currentUser={currentUser} logout={logout}/>
                    <main className="ml-64 p-6 h-full overflow-auto">
                        <Outlet />
                    </main>
                </div>
            )}
        </div>
    )
};

export default HomeLayout;