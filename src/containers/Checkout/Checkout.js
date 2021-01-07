import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component {
  state = {
    ingredients: null,
    totalPrice: 0
  };

  componentWillMount() {
    const query = new URLSearchParams(this.props.location.search);

    const ingredients = {};
    let price = 0;
    for (let param of query.entries()) {
      //['salad', '1']
      if (param[0] === 'price') {
        price = param[1];
      } else {
        ingredients[param[0]] = +param[1];
      }
    }

    this.setState({ ingredients: ingredients, totalPrice: price });
  }

  cancelOrderHandler = () => {
    this.props.history.goBack();
  };

  continueOrderHandler = () => {
    //console.log(this.props);
    this.props.history.push('/checkout/contact-data');
  };

  render() {
    return (
      <div>
        <CheckoutSummary
          checkoutCancelled={this.cancelOrderHandler}
          checkoutContinued={this.continueOrderHandler}
          ingredients={this.state.ingredients}
        />
        <Route
          path={this.props.match.path + '/contact-data'}
          render={props => (
            <ContactData
              ingredients={this.state.ingredients}
              price={this.state.totalPrice}
              {...props}
            />
          )}
        />
        {/* normally we used component attribute in Route Component, hovewer we do need state of Checkout component, so pass it via using
        not component attribute, but render. So we could pass ingredients into ContactData component */}
      </div>
    );
  }
}

export default Checkout;
