import CommonAreaCard from "../features/commonAreas/commonAreaCard";
import { useCallback, useEffect, useRef, useState } from 'react';
import commonAreaService from "../../services/commonAreaService"
import Loading from '../common/Loading';
import { useOutletContext } from 'react-router-dom';
import ScrollableList from "../common/ScrollableList";
import TitleWithAddButton from "../common/TitleWithAddButton";

const CommonAreasLayout = () => {
    const { currentUser, condominium } = useOutletContext();
    const [commonAreas, setCommonAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    
    useEffect(() => {
        async function fetchCommonAreas() {
            setLoading(true);
    
            const data = await commonAreaService.getCommonAreasByCondominiumId(condominium.id, { pageNumber, pageSize: 3 });
            setLoading(false);
    
            if(!data || data?.error) {
                return;
            }
    
            setCommonAreas(prev => [...prev, ...data.data]);
            setHasMore(data.actualPage < data.pages);        }
        
        fetchCommonAreas();
    }, [condominium.id, pageNumber]);

    const onCreateCommonArea = () => {

    };
    
    return (
        <div>
            {loading ? (
                <Loading className="flex justify-center" />
            ) : (
                <div>
                    <TitleWithAddButton title="Teste" onAddClick={onCreateCommonArea}/>
                    <ScrollableList 
                        items={commonAreas}
                        renderItem={(item) => <CommonAreaCard area={item} />}
                        setPageNumber={setPageNumber}
                        hasMore={hasMore}
                    />
                </div>
            )}
        </div>
    )
}

export default CommonAreasLayout;