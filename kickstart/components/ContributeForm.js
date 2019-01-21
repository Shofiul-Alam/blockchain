import React, {Component} from 'react';
import {Form, Input, Message, Button, Header, Icon, Modal, Progress} from 'semantic-ui-react';
import Campaign from '../ethereum/campaign';
import web3 from '../ethereum/web3';
import {Router } from '../routes';

class ContributeForm extends Component {

    state = {
        value: '',
        errorMessage: '',
        loading: false,
        timer: 1,
        successMessage: ''
    };
    myTimer= () => {
        const x = (this.state.timer+1)
        this.setState({timer: x});
        console.log(this.state.timer);
    };

    onSubmit = async (event) => {
        event.preventDefault();
    
        const campaign = Campaign(this.props.address);
        this.setState({loading: true, errorMessage: '', successMessage: ''});

        this.interval = setInterval(this.myTimer.bind(this), 1000);  
        
        try{
            const accounts = await web3.eth.getAccounts();

            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            this.setState({successMessage: 'Transection has been completed'})
            setTimeout(() =>{
                this.setState({successMessage: ''});
                Router.replaceRoute(`/campaigns/${this.props.address}`);
            }, 3000);
            
        }catch(err) {
            this.setState({errorMessage: err.message});
        }
        clearInterval(this.interval);
        this.setState({loading: false, value:'', timer: 1});

    };

    render() {
        return (
            <section>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage} success={!!this.state.successMessage}>
                    <Form.Field>
                        <label>Amount to Contribute</label>

                        <Input
                            value={this.state.value}
                            label="ether"
                            labelPosition="right"
                            onChange={event => this.setState({value: event.target.value})}
                        />
                        <Message error header="Oops!" content={this.state.errorMessage} />
                        <Message success header="Success!" content={this.state.successMessage}/>
                        <Button primary 
                            style={{ marginTop: '10px' }}
                            loading={this.state.loading}>
                            Contribute
                        </Button>
                    </Form.Field>
                </Form>
                <Modal open={this.state.loading} closeIcon>
                    <Header icon='archive' content='Your request is under processing' />
                    <Modal.Content>
                        <Progress percent={this.state.timer} active> Active</Progress>
                    </Modal.Content>
                </Modal>
            </section>
            
        );
    }
}

export default ContributeForm;