const { useState, useEffect } = require('react');
const { useNavigate, useOutletContext } = require('react-router-dom');

const OrdersLayout = () => {
  const navigate = useNavigate();
  const { currentUser, condominium } = useOutletContext();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState([]);
  const [pageNumber, setPageNumber] = useState([]);
  const [hasMore, setHasMore] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      setLoading(true);

      const data = await ordersService.getOrders({ pageNumber, pageSize: 3 });
      setLoading(false);

      if (!data || data?.error) {
        return;
      }

      setOrders((prev) => [...prev, ...data.data]);
      setHasMore(data.actualPage < data.pages);
    }

    fetchOrders();
  }, [pageNumber]);

  return (
    <div>
      {loading ? (
        <Loading className="flex justify-center" />
      ) : (
        <div>
          <ScrollableList
            items={orders}
            renderItem={(item) => <orderCard area={item} />}
            setPageNumber={setPageNumber}
            hasMore={hasMore}
          />
        </div>
      )}
    </div>
  );
};
