import ItemCard from '@common/ItemCard';
import { dateFormat } from '../../../utils/helperFunctions';

const VoteCard = ({ vote }) => {
  return (
    <ItemCard navigateTo={'voting'}>
      {/* Topo */}
      <div>
        <p className="font-medium text-gray-800">Votação</p>
        <p className="text-sm text-gray-600 mb-4">
          <b>Deadline: </b>
          {vote.deadline ? dateFormat(new Date(vote.deadline)) : 'N/A'}
        </p>
      </div>

      <div className="mt-auto space-y-1">
        <p className="text-sm text-gray-600">
          <b>Votos a favor: </b>
          {vote.upVote}
        </p>
        <p className="text-sm text-gray-600">
          <b>Votos contra: </b>
          {vote.downVote}
        </p>
      </div>
    </ItemCard>
  );
};

export default VoteCard;
