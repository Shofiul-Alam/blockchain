import React, {Component} from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';
import {Card, Grid, Button, Header, Icon, Modal, Progress} from 'semantic-ui-react';
import web3 from '../../ethereum/web3.js';
import ContributeForm from '../../components/ContributeForm';
import {Link} from '../../routes';


class CampaignShow extends Component {

    static async getInitialProps(props) {

        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();

        console.log(summary);

        return {
            address: props.query.address,
            miniumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    };

    renderCampaignDetails() {

        const {
            balance,
            manager,
            miniumContribution,
            requestsCount,
            approversCount
        } = this.props;
        const items = [
            {
                header: manager,
                meta: 'Address of Manager',
                description: 'The manager created this campaign and can create requests to withdraw money',
                style: {overflowWrap: 'break-word'}
            },
            {
                header: miniumContribution,
                meta: 'Minium Contribution (wei)',
                description: 'You must contribute at lease this minimum amount to become an approver',
            },
            {
                header: requestsCount,
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Request must be approved'
            },
            {
                header: approversCount,
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign'
            },
            {
                header: web3.utils.fromWei(balance, 'ether'),
                meta: 'Campaign Balance (Ether)',
                description: 'The balance is how much money this campaign has left'
            }
        ]

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <h3>I am campaign details page </h3>
                <Grid>
                    <Grid.Row>
                        <Grid.Column width={10}>
                            {this.renderCampaignDetails()}
                        </Grid.Column>

                        <Grid.Column width={6}>
                            <ContributeForm address={this.props.address}/>
                        </Grid.Column>
                    </Grid.Row>
                    <Grid.Row>
                        <Grid.Column>
                            <Link route={`/campaigns/${this.props.address}/requests`}>
                                <a>
                                    <Button primary style={{marginTop: '10px'}}> View Requests</Button>
                                </a>
                            </Link>
                        </Grid.Column>
                    </Grid.Row>
                </Grid>
            </Layout>
        );
    }
}

export default CampaignShow;