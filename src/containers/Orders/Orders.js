import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

class Orders extends Component {
  state = {
    orders: [],
    loading: true
  };

  async componentDidMount() {
    try {
      const orders = await axios.get('/orders.json');
      const fetchedOrders = [];

      for (let i in orders.data) {
        fetchedOrders.push({ ...orders.data[i], id: i });
        console.log(fetchedOrders);
      }

      console.log(orders.data);
      this.setState({ loading: false, orders: fetchedOrders });
      console.log(this.state.orders);
    } catch (error) {
      this.setState({ loading: false });
    }
  }

  render() {
    return (
      <div>
        {this.state.orders.map(order => (
          <Order key={order.id} ingredients={order.ingredients} price={order.price} />
        ))}
      </div>
    );
  }
}

export default withErrorHandler(Orders, axios);
