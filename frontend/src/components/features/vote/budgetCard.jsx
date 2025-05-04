import ItemCard from '@common/ItemCard';

const BudgetCard = ({ budget, selected }) => {
  return (
    <ItemCard
      navigateTo=""
      className={`border-2 transition-all duration-200 ${selected ? 'border-green-500' : 'border-gray-300'}`}
    >
      <div>
        <p className="font-medium text-gray-800">Orçamento</p>
        <p className="text-sm text-gray-600 mb-4">{budget.description}</p>
      </div>

      <div className="mt-auto space-y-1">
        <p className="text-sm text-gray-600">
          <b>Custo: </b>
          {budget.amount}
        </p>
        <p className="text-sm text-gray-600">
          <b>Votos: </b>
          {budget.votes}
        </p>
      </div>
    </ItemCard>
  );
};

export default BudgetCard;
