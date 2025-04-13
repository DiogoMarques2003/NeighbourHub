import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import condominiumService from '../../../services/condominiumService';
import Card from '../../common/Card';
import Pagination from '../../common/Pagination';
import Loading from '../../common/Loading';
import { Phone, Mail } from 'lucide-react';

const ChooseCondominiumForm = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [isAdmin, setIsAdmin] = useState(false);
  const [pageNumber, setPageNumber] = useState(1);
  const [condData, setCondData] = useState([]);
  const [totalPage, setTotalPage] = useState(0);

  useEffect(() => {
    const getData = async () => {
      setIsLoading(true);
      const result = await condominiumService.getConduminiumByUser({ isAdmin, pageNumber, pageSize: 2 });

      console.log(result);

      if (result?.error || !result) {
        setError(result?.error || 'Não foi possivel encontrar condominios');
        setIsLoading(false);
        setCondData([]);
        setTotalPage(0);
        return;
      }

      setCondData(result.data);
      setTotalPage(result.pages);
      setIsLoading(false);
    };

    getData();
  }, [isAdmin, pageNumber]);

  return (
    <>
      {isLoading ? (
        <Loading className="flex justify-center" />
      ) : (
        condData.map((cond) => (
          <Card className="border border-gray-200 hover:bg-gray-100 mb-5" onClick={() => navigate(`${cond.id}`)}>
            <h5 class="mb-2 text-2xl"> {cond.name} </h5>
            <span class="text-gray-600"> {`${cond.postalCode} ${cond.city}, ${cond.country}`} </span>
            <hr class="h-px my-4 bg-gray-300 border-0"></hr>
            <div className="flex justify-between">
              <div className="flex items-center mb-6 text-gray-600">
                <Phone size={20} />
                <span className="ml-1"> {cond.phoneNumber} </span>
              </div>

              <div className="flex items-center mb-6 text-gray-600">
                <Mail size={20} />
                <span className="ml-1"> {cond.email} </span>
              </div>
            </div>
          </Card>
        ))
      )}
      <Pagination
        className={'justify-center'}
        currentPage={pageNumber}
        maxPage={totalPage}
        setCurrentPage={setPageNumber}
      />
    </>
  );
};

export default ChooseCondominiumForm;
