import ordersService from '@services/orders';
import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import ErrorBar from '@common/ErrorBar';
import Button from '../../common/Button.jsx';
import InputWithIcon from '@common/InputWithIcon.jsx';
import { handleFormDataChange } from '@utils/helperFunctions.js';

const OrderVoteForm = () => {
  const [formData, setFormData] = useState({
    deadline: '',
    budgets: [],
  });

  const [newBudget, setNewBudget] = useState({ description: '', amount: '' });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { condominiumId, orderId } = useParams();

  const validateForm = () => {
    if (!formData.deadline.trim()) {
      setError('Deadline é obrigatório');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;
    setIsLoading(true);

    const response = await ordersService.createOrderVote(condominiumId, orderId, formData);
    if (!response || response?.error) {
      setError(response?.error || 'Falha ao criar votação');
      setIsLoading(false);
      return;
    }

    navigate(-1);
    toast.success(response?.message || 'Votação criada com sucesso');
    setIsLoading(false);
  };

  const handleAddBudget = () => {
    if (!newBudget.description || !newBudget.amount) {
      setError('Descrição e Custo são obrigatórios');
      return;
    }

    if (formData.budgets.length >= 3) {
      setError('Você pode adicionar no máximo 3 orçamentos');
      return;
    }

    // Garantir que o custo seja convertido para número
    const parsedCost = Number(newBudget.amount);

    if (isNaN(parsedCost)) {
      setError('O Custo deve ser um número válido');
      return;
    }

    setFormData({
      ...formData,
      budgets: [...formData.budgets, { ...newBudget, amount: parsedCost }],
    });

    setNewBudget({ description: '', amount: '' });
    setError('');
  };

  const handleRemoveBudget = (index) => {
    const updatedBudgets = formData.budgets.filter((_, i) => i !== index);
    setFormData({
      ...formData,
      budgets: updatedBudgets,
    });
  };

  return (
    <form className="space-y-4 flex flex-col lg:flex-row" onSubmit={handleSubmit}>
      <div className="flex-1">
        <ErrorBar error={error} />

        <div className="flex flex-col mb-4">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Data limite
          </h2>
          <InputWithIcon
            type="datetime-local"
            name="deadline"
            className="w-full sm:w-64 md:w-80 lg:w-96"
            value={formData.deadline}
            onChange={(e) => handleFormDataChange(e, setFormData)}
          />
        </div>

        <div className="flex flex-col mb-8">
          <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
            Adicionar Orçamento
          </h2>
          <div className="flex flex-col mb-2">
            <label htmlFor="description" className="text-sm font-medium mb-1">
              Descrição
            </label>
            <InputWithIcon
              type="text"
              name="description"
              value={newBudget.description}
              onChange={(e) => setNewBudget({ ...newBudget, description: e.target.value })}
              className="w-full sm:w-64 md:w-80 lg:w-96"
            />
          </div>
          <div className="flex flex-col mb-2">
            <label htmlFor="amount" className="text-sm font-medium mb-1">
              Custo
            </label>
            <InputWithIcon
              type="number"
              name="amount"
              value={newBudget.amount}
              onChange={(e) => setNewBudget({ ...newBudget, amount: e.target.value })}
              className="w-full sm:w-64 md:w-80 lg:w-96"
            />
          </div>
          <button
            type="button"
            onClick={handleAddBudget}
            className="text-white bg-blue-500 hover:bg-blue-600 px-4 py-2 rounded-md w-auto max-w-xs text-sm"
          >
            Adicionar Orçamento
          </button>
        </div>
      </div>

      <div className="flex-1 ml-auto mt-4 lg:mt-0">
        <h2 className="text-xl font-semibold mb-4" style={{ color: '#3e94bf' }}>
          Orçamentos Adicionados
        </h2>
        <ul className="list-decimal pl-6 space-y-2">
          {formData.budgets.map((budget, index) => (
            <li key={index} className="flex items-center space-x-2">
              <span className="w-6 h-6 flex items-center justify-center bg-blue-500 text-white rounded-full">
                {index + 1}
              </span>
              <span className="ml-2">
                <strong>
                  Orçamento {index + 1}: {budget.description} -{' '}
                </strong>
                €{parseFloat(budget.amount).toFixed(2)}
              </span>
              <button
                type="button"
                onClick={() => handleRemoveBudget(index)}
                className="text-red-500 hover:text-red-700 ml-4 cursor-pointer"
              >
                X
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="fixed bottom-8 right-10">
        <Button type="submit" isLoading={isLoading} fullWidth>
          Criar Votação
        </Button>
      </div>
    </form>
  );
};

export default OrderVoteForm;
