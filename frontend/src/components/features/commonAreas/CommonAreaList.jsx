import { useNavigate, useOutletContext } from "react-router-dom";
import CommonAreaCard from "./CommonAreaCard";
import { useEffect, useState } from 'react';
import commonAreaService from "@services/commonAreaService";
import Loading from "@common/Loading";
import ScrollableList from "@common/ScrollableList";
import TitleWithAddButton from "@common/TitleWithAddButton";

const CommonAreaList = () => {
    const navigate = useNavigate();
    const { currentUser, condominium, isAdmin } = useOutletContext();
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
            setHasMore(data.actualPage < data.pages);        
        }
        
        fetchCommonAreas();
    }, [condominium.id, pageNumber]);
    
    return (
        <div>
            {loading && (!commonAreas || commonAreas.length === 0) ? (
                <Loading className="flex justify-center" />
            ) : (
                <div>
                    <TitleWithAddButton 
                        onAddClick={
                            isAdmin ? () => navigate("./create") : null}
                    />
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
};

export default CommonAreaList;