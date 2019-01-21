import React, {Component} from 'react';
import Layout from '../../../components/Layout';
import {Form, Message, Button, Input, Modal, Header, Progress} from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign.js';
import web3 from '../../../ethereum/web3';
import {Link, Router} from '../../../routes';

class RequestNew extends Component {

    state = {
        value: '',
        description: '',
        receipient: '',
        errorMessage: '',
        loading: false,
        timer: 1,
        successMessage: ''
    };
    static async getInitialProps(props) {
        const {address} = props.query;
        return {address};
    }
    myTimer= () => {
        const x = (this.state.timer+1)
        this.setState({timer: x});
        console.log(this.state.timer);
    };

    onSubmit = async (event) => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);

        const {value, description, receipient} = this.state; 

        this.setState({loading: true, errorMessage: '', successMessage: ''});

        this.interval = setInterval(this.myTimer.bind(this), 1000);  

        try {

            const accounts = await web3.eth.getAccounts();
            await campaign.methods
            .createRequest(
                description, 
                web3.utils.toWei(value, 'ether'), 
                receipient)
            .send({
                from: accounts[0]
            });

            this.setState({successMessage: 'Transection has been completed'})
            setTimeout(() =>{
                this.setState({successMessage: ''});
                Router.pushRoute(`/campaigns/${this.props.address}/requests`);
            }, 1500);

        }catch(err) {
            this.setState({errorMessage: err.message});
        }

        clearInterval(this.interval);
        this.setState({loading: false, value:'', timer: 1});
    };

    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>
                        Back
                    </a>
                </Link>
                <h3>Create a request </h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}
                        success={!!this.state.successMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input
                            value={this.state.description}
                            onChange={event => this.setState({description: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input
                            value={this.state.value}
                            onChange = {event => this.setState({value: event.target.value})}
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Receipient</label>
                        <Input
                            value={this.state.receipient}
                            onChange={event => this.setState({receipient: event.target.value})}
                        />
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMessage} />
                    <Message success header="Success!" content={this.state.successMessage}/>
                    <Button primary loading={this.state.loading}>
                        Create
                    </Button>
                </Form>
                <Modal open={this.state.loading} closeIcon>
                    <Header icon='archive' content='Your request is under processing' />
                    <Modal.Content>
                        <Progress percent={this.state.timer} active> Active</Progress>
                    </Modal.Content>
                </Modal>
            </Layout>
        );
    }
}

export default RequestNew;