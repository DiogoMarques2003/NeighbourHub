import CommonAreaCard from "../features/commonAreas/commonAreaCard";
import { useCallback, useEffect, useRef, useState } from 'react';
import commonAreaService from "../../services/commonAreaService"
import Loading from '../common/Loading';
import { useOutletContext } from 'react-router-dom';

const CommonAreasLayout = () => {
    const { currentUser, condominium } = useOutletContext();
    const [commonAreas, setCommonAreas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const observer = useRef();

    const lastCommonAreaElementRef = useCallback((commonArea) => {
        if(loading) return;

        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && hasMore) {
                setPageNumber(prev => prev + 1);
            }
        });

        if(commonArea) observer.current.observe(commonArea);
    }, [loading, hasMore]);

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
            {loading ? (
                <Loading className="flex justify-center" />
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-4">
                    {commonAreas.map((area, index) => {
                        if(commonAreas.length === index + 1) {
                            <div key={area.id} ref={lastCommonAreaElementRef}>
                                <CommonAreaCard area={area} />
                            </div>
                        } else {
                            return (
                                <div key={area.id}>
                                    <CommonAreaCard area={area} />
                                </div>
                            );
                        }
                    })}
                </div>
            )}
        </div>
    )
}

export default CommonAreasLayout;