import React, { Component } from "react";
import Layout from "../../components/Layout";
import { Button, Form, Input, Message, Progress } from "semantic-ui-react";
import factory from '../../ethereum/factory';
import web3 from '../../ethereum/web3';
import {Router} from '../../routes';

class CampaignNew extends Component {
  state = {
    minimumContribution: '',
    errorMessage: '',
    loading: false,
    timer: 1
  };

  myTimer= () => {
    const x = (this.state.timer+1)
    this.setState({timer: x});
    console.log(this.state.timer);
};
  onSubmit = async (event) => {
    event.preventDefault();

    this.interval = setInterval(this.myTimer.bind(this), 1000);  
    this.setState({loading: true, errorMessage:''});
    try {
        const accounts = await web3.eth.getAccounts();
        const x = await factory.methods
        .createCampaign(this.state.minimumContribution)
        .send({
            from: accounts[0],
        });
        
        this.setState({successMessage: 'Campaign has been successfully created'})
        setTimeout(() =>{
              Router.pushRoute('/');
            }, 1500);
        

    } catch (err) {
        this.setState({error: true, errorMessage: err.message});
    }

    clearInterval(this.interval);
    this.setState({loading: false, value:'', timer: 1});
    

  }

  render() {
    return (
      <Layout>
        <h3>Create a Campaign</h3>
        <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}
            success={!!this.state.successMessage}>
          <Form.Field>
            <label>Minium Contribution</label>
            <Input
              value={this.state.minimumContribution}
              placeholder="Minimum contribution"
              label="Wei"
              labelPosition="right"
              onChange={event =>
                this.setState({ minimumContribution: event.target.value })
              }
            />
          </Form.Field>
          {!this.state.loading? null : (
              <Progress percent={this.state.timer} active> Active</Progress>
          )}
          <Message success header="Success!" content={this.state.successMessage}/>
          <Message error header="Oops!" content={this.state.errorMessage} />
          <Button type="submit" primary loading={this.state.loading}>
            Create
          </Button>
          
        </Form>
      </Layout>
    );
  }
}

export default CampaignNew;
