import Bankcoin from "./contracts/Bankcoin.json";
import Helpers from "./contracts/Helpers.json";
const options = {
  web3: {
    block: false,
    fallback: {
      type: "ws",
      url: "ws://127.0.0.1:9545",
    },
  },
  contracts: [Bankcoin, Helpers],
};

export default options;
