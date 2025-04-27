import OrderVoteForm from '@features/orders/orderVoteForm';

export default function OrderVotePage() {
  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-8" style={{ color: '#3e94bf' }}>
        Criar Votação
      </h1>
      <OrderVoteForm />
    </div>
  );
}
