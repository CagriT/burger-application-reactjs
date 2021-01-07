import React, { Component } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import Auxilliary from '../Auxilliary/Auxilliary';

const withErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptors = axios.interceptors.request.use(req => {
        this.setState({ error: null });
        return req;
      });
      this.resInterceptors = axios.interceptors.response.use(
        res => res,
        error => {
          this.setState({ error: error });
        }
      );
    }

    componentWillUnmount() {
      //console.log('Will UnMount', this.reqInterceptors, this.resInterceptors)
      axios.interceptors.request.eject(this.reqInterceptors);
      axios.interceptors.response.eject(this.resInterceptors);
    }

    errorConfirmedHandler = () => {
      this.setState({ error: null });
    };
    render() {
      return (
        <Auxilliary>
          <Modal modalClosed={this.errorConfirmedHandler} show={this.state.error}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />;
        </Auxilliary>
      );
    }
  };
};

export default withErrorHandler;
