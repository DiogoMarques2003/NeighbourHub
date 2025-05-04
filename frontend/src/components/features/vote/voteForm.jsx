import ErrorBar from '@common/ErrorBar';
import ordersService from '@services/orders';
import votesService from '@services/votes';
import { dateFormat } from '@utils/helperFunctions';
import { useEffect, useState } from 'react';
import { useNavigate, useOutletContext, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import BudgetCard from './budgetCard';
import Button from '../../common/Button.jsx';
import { ThumbsUp, ThumbsDown } from 'lucide-react';

const CreateVoteForm = () => {
  const { condominiumId, orderId } = useParams();
  const { condominium } = useOutletContext();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [hasBudets, setHasBudgets] = useState(false);
  const [decision, setDecision] = useState(false);
  const [selectedVote, setSelectedVote] = useState(null);
  const [orderData, setOrder] = useState([]);
  const [votingData, setVoting] = useState([]);
  const [budgetsData, setBudgets] = useState([]);
  const [budgetID, setSelectedBudgetId] = useState(null);
  const [hideOrçaments, setVoteNo] = useState(null);

  const isVotingClosed = orderData.votingDeadline && new Date(orderData.votingDeadline) < new Date();

  const validateForm = () => {
    if (decision === null) {
      setError('Obrigatória uma decisão (a favor ou contra)');
      return false;
    }

    if (hasBudets.length && decision) {
      if (!budgetID?.trim()) {
        setError('Tem de escolher pelo menos um budget!');
        return false;
      }
    }

    if (!condominium.isResident) {
      setError('Apenas residentes podem votar');
      return false;
    }

    setError('');
    return true;
  };

  const handleDecision = (dec) => {
    setDecision(dec);
    setSelectedVote(dec ? 'up' : 'down');

    if (!dec) {
      setSelectedBudgetId(null);
      setIsVoteNo(true);
    } else {
      setIsVoteNo(false);
    }
  };

  useEffect(() => {
    async function fetchData() {
      setIsLoading(true);
      const voting = await votesService.getVote(condominiumId, orderId);
      const order = await ordersService.getOrderById(condominiumId, orderId);

      if (voting.userVote) {
        setDecision(voting.userVote.decision);
        setSelectedVote(voting.userVote.decision ? 'up' : 'down');
        setSelectedBudgetId(voting.userVote.budgetId);
        if (!voting.userVote.decision) {
          setVoteNo(true);
        }
      }

      if (!voting || voting?.error) {
        return;
      }

      if (!order || order?.error) {
        return;
      }

      if (voting.budgets) {
        setHasBudgets(true);
      }

      setOrder(order);
      setVoting(voting);
      setBudgets(voting.budgets);

      setIsLoading(false);
    }

    fetchData();
  }, [condominiumId, orderId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    const response = await votesService.createVote(condominiumId, orderId, { decision, budgetID });
    if (!response || response?.error) {
      setError(response?.error || 'Falha a criar voto');
      setIsLoading(false);
      return;
    }

    navigate(-1);
    toast.success(response?.message || 'Voto criado com sucesso');
    setIsLoading(false);
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <ErrorBar error={error} />
      {isVotingClosed && <p className="text-red-600 font-semibold">A votação já foi encerrada, não é possível votar</p>}
      <div className="flex flex-col md:flex-row justify-between items-start gap-6">
        <h1 className="text-3xl font-bold text-gray-800" style={{ color: '#3e94bf' }}>
          Votação
        </h1>
        <div className="flex flex-col text-sm text-gray-700 md:text-base">
          <p>
            <b>Votos a favor:</b> {votingData.upVotes}
          </p>
          <p>
            <b>Votos contra:</b> {votingData.downVotes}
          </p>
        </div>
      </div>
      <div className="w-1/2 p-6">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
          Motivo da votação
        </h2>
        <div className="text-gray-700 mb-2">{orderData.description}</div>

        <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
          Orçamentos
        </h2>
        {!budgetsData.length ? (
          <p className="text-gray-700 mb-2">Não existem orçamentos para esta votação</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto pb-2">
            {budgetsData.map((budget) => {
              const isSelected = budgetID === budget.id;

              return (
                <div
                  key={budget.id}
                  className={`w-50 flex-shrink-0 transition-opacity duration-200 cursor-pointer
                    ${!decision || isVotingClosed ? 'pointer-events-none opacity-50' : !isSelected && budgetID ? 'opacity-50' : 'opacity-100' }
                  `}
                  onClick={() => {
                    if (!isVotingClosed && decision) setSelectedBudgetId(budget.id);
                  }}
                >
                  <BudgetCard budget={budget} selected={isSelected} />
                </div>
              );
            })}
          </div>
        )}
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
          Data fim de votação
        </h2>
        <div className="text-gray-700 mb-2">
          {orderData.votingDeadline ? dateFormat(new Date(orderData.votingDeadline)) : 'N/A'}
        </div>
      </div>
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-4">
          <div
            className={`flex items-center ${selectedVote === 'up' ? 'text-green-500' : 'text-gray-400'} ${
              isVotingClosed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => !isVotingClosed && handleDecision(true)}
          >
            <ThumbsUp size={30} />
          </div>

          <div
            className={`flex items-center ${selectedVote === 'down' ? 'text-red-500' : 'text-gray-400'} ${
              isVotingClosed ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'
            }`}
            onClick={() => !isVotingClosed && handleDecision(false)}
          >
            <ThumbsDown size={30} />
          </div>
        </div>
      </div>
      <div className="fixed bottom-8 right-10">
        <Button type="submit" isLoading={isLoading} disabled={isVotingClosed} fullWidth>
          Votar
        </Button>
      </div>
    </form>
  );
};

export default CreateVoteForm;
