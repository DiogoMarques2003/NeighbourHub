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
        fetchResidents();
    }, [condominium.id, pageNumber]);

    async function fetchResidents() {
        setIsLoading(true);

        const data = await addressesService.getAddressesByCondominium(condominium.id, {pageNumber, pageSize : 10});
        setIsLoading(false);

        if(!data || data?.error) {
            return;
        }

        setResidents(prev => [...prev, ...data.data]);
        setHasMore(data.actualPage < data.pages);        
    }

    const onResidentAdd = () => {
        setPopup(true);
    }

    const onResidentCreated = () => {
        setResidents([]);
        if(pageNumber !== 1) setPageNumber(1);
        else fetchResidents();
    }

    return (
        <div>
            {isLoading && (!residents || residents.length === 0)
                ? <Loading />
                : <div>
                    <TitleWithAddButton onAddClick={ isAdmin ? onResidentAdd : null} />
                    <CreateResidentPopup openPopup={openPopup} setPopup={setPopup} onResidentCreated={onResidentCreated}/>
                    
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
