import ScrollableList from "@common/ScrollableList";
import TitleWithAddButton from "@common/TitleWithAddButton";
import ResidentCard from "./ResidentCard";
import { useNavigate, useOutletContext } from "react-router-dom";
import { useEffect, useState } from "react";
import addressesService from "@services/addressesService";
import Loading from "@common/Loading";
import CreateResidentPopup from "./CreateResidentPopup";

const ResidentsLists = () => {
    const { currentUser, condominium, isAdmin } = useOutletContext();
    const [residents, setResidents] = useState([]);
    const [pageNumber, setPageNumber] = useState(1);
    const [hasMore, setHasMore] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const [openPopup, setPopup] = useState(false);

    useEffect(() => {
        async function fetchResidents() {
            if(openPopup === true) return;

            setIsLoading(true);
    
            const data = await addressesService.getAddressesByCondominium(condominium.id, {pageNumber, pageSize : 1});
            setIsLoading(false);
    
            if(!data || data?.error) {
                return;
            }
    
            setResidents(prev => [...prev, ...data.data]);
            setHasMore(data.actualPage < data.pages);        
        }
        
        fetchResidents();
    }, [condominium.id, pageNumber, openPopup]);

    const onResidentAdd = () => {
        setPopup(true);
    }

    return (
        <div>
            {isLoading && (!residents || residents.length === 0)
                ? <Loading />
                : <div>
                    <TitleWithAddButton title="Moradores" onAddClick={ isAdmin ? onResidentAdd : null} />
                    <CreateResidentPopup openPopup={openPopup} setPopup={setPopup}/>
                    
                    <ScrollableList
                        items={residents}
                        renderItem={(item) => <ResidentCard resident={item} />}
                        setPageNumber={setPageNumber}
                        hasMore={hasMore}
                    />
                  </div>
            }
        </div>
    )
}

export default ResidentsLists;