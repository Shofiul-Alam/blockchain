import React, {Component} from 'react';
import {Table, Button, Modal, Header, Message} from 'semantic-ui-react';
import web3 from '../ethereum/web3';
import Campaing from '../ethereum/campaign';
import {Router} from '../routes';


class RequestRow extends Component {

    state = {
        loadingApprove: false,
        loadingFinalize: false,
        successMessage: ''
    };

    onApprove = async () => {
        this.setState({loadingApprove: true});
        const campaign = Campaing(this.props.address);
        const accounst = await web3.eth.getAccounts();
        await campaign.methods.approveRequest(this.props.id).send({
            from: accounst[0]
        });
        this.setState({successMessage: "Approval completed"});
        setTimeout(() => {
            this.setState({loadingApprove: false});
            this.setState({successMessage: ''});
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        }, 1000); 
    };

    onFinalize = async() => {
        this.setState({loadingFinalize: true});
        const campaign = Campaing(this.props.address);
        const accounst = await web3.eth.getAccounts();
        await campaign.methods.finalizeRequest(this.props.id).send({
            from: accounst[0]
        });
        this.setState({successMessage: "Payment finalization completed"});
        setTimeout(() => {
            this.setState({loadingFinalize: false});
            this.setState({successMessage: ''});
            Router.replaceRoute(`/campaigns/${this.props.address}/requests`);
        }, 1000); 
    };

    render() {
        const {Row, Cell} = Table;
        const {id, request, approversCount} = this.props;
        const readyToFinalize = request.approvalCount > approversCount/2;
        const fullApproval = request.approvalCount == approversCount;
        console.log(readyToFinalize);

        return(
                <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                    <Cell>{id}</Cell>
                    <Cell>{request.description}</Cell>
                    <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                    <Cell>{request.recipient}</Cell>
                    <Cell>{request.approvalCount}/{approversCount}</Cell>
                    <Cell>
                        { request.complete ? null : (
                            <a>
                                <Button disabled={fullApproval} color="green" 
                                        basic onClick={this.onApprove}
                                        loading={this.state.loadingApprove}>Approve</Button>
                            </a>
                        )}
                    </Cell>
                    <Cell>
                    { request.complete ? null : (
                        <a>
                            <Button disabled={!readyToFinalize} color="green" 
                                    basic onClick={this.onFinalize} 
                                    loading={this.state.loadingFinalize}>Finalize</Button>
                        </a>
                    )}
                    </Cell>
                    <Modal open={!!this.state.successMessage} closeIcon>
                        <Header icon='archive' content='Process Result' />
                        <Modal.Content>
                            <Message success header= "Success!" content={this.state.successMessage} /> 
                        </Modal.Content>
                    </Modal>
                </Row>
        );
    }
}

export default RequestRow;