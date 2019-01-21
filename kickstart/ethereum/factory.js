import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xC2E65b770115Ce7228dFEA90DB12DE4764DD06f7'
);

export default instance;
