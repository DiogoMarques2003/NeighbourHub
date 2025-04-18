import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Outlet } from 'react-router-dom';
import { useAuthContext } from '../../hooks/useAuthContext';
import Loading from '../common/Loading';
import SideBarHomePage from '../common/SideBarHomePage';
import condominiumService from '../../services/condominiumService';

const HomeLayout = () => {
    const { condominiumId } = useParams();
    const { currentUser, logout } = useAuthContext();
    const [loading, setLoading] = useState(true);
    const [condominium, setCondominium] = useState(null);

    useEffect(() => {
        async function fetchCondominium() {
            const data = await condominiumService.getConduminiumByID(condominiumId);
            setLoading(false);

            if(!data || data?.error) {
                return;
            }

            setCondominium(data.condominium);
        }

        if (condominiumId) {
            fetchCondominium();
        }
    }, [condominiumId]);
    
    return (
        <div>
            {loading ? (
                <Loading className="flex justify-center" />
            ) : (
                <div >
                    <SideBarHomePage currentUser={currentUser} condominium={condominium} logout={logout}/>
                    <main className="ml-68 p-6 h-full overflow-auto">
                        <Outlet context={{ currentUser, condominium }}/>
                    </main>
                </div>
            )}
        </div>
    )
};

export default HomeLayout;