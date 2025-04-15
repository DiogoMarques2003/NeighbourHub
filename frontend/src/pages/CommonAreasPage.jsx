import { useOutletContext } from 'react-router-dom';
import CommonAreasLayout from '../components/layout/CommonAreasLayout';
import { useEffect, useState } from 'react';
import commonAreaService from '../services/commonAreaService';
import Loading from '../components/common/Loading';
import { useAuthContext } from '../hooks/useAuthContext';


export default function CommonAreasPage() {
    const { isLoading } = useAuthContext();
    const { currentUser, condominium } = useOutletContext();
    const [commonAreas, setCommonAreas] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCommonAreas() {
            if(isLoading) {
                return;
            }
    
            setLoading(true);
    
            const data = await commonAreaService.getCommonAreasByCondominiumId(condominium.id);
            setLoading(false);
    
            if(!data || data?.error) {
                return;
            }
    
            setCommonAreas(data);
        }
        
        fetchCommonAreas();
    }, [condominium.id, isLoading]);

    return (
        <div>
            {loading || isLoading ? (
                <Loading className="flex justify-center" />
            ) : (
                <CommonAreasLayout commonAreas={commonAreas.data} />
            )}
        </div>
    )
}