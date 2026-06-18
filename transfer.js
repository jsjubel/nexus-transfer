const { Web3 } = require('web3');

const PRIVATE_KEY = '0x29380174ddcf9f375404467801eaef96b490ca59e31b73f6c188ede7c4257e57';
const TO_ADDRESS = '0x555f5F46D04A27dB17D242aFedaAe268110b2880';
const AMOUNT = '0.001';
const INTERVAL_SECONDS = 15; // ১৫ সেকেন্ড পর পর

const RPC_URL = 'https://mainnet.rpc.nexus.xyz';
const web3 = new Web3(RPC_URL);
const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
web3.eth.accounts.wallet.add(account);

console.log(`Wallet: ${account.address}`);
console.log(`Target: ${TO_ADDRESS}`);
console.log(`Amount: ${AMOUNT} NEX`);
console.log(`Interval: ${INTERVAL_SECONDS} seconds`);
console.log('Starting transfers...\n');

async function transferNEX() {
    try {
        const amountInWei = web3.utils.toWei(AMOUNT, 'ether');
        const gasPrice = await web3.eth.getGasPrice();
        const tx = {
            from: account.address,
            to: TO_ADDRESS,
            value: amountInWei,
            gas: 21000,
            gasPrice: gasPrice,
        };
        const receipt = await web3.eth.sendTransaction(tx);
        const currentTime = new Date().toLocaleTimeString();
        console.log(`[${currentTime}] SUCCESS: ${receipt.transactionHash}`);
        console.log(`Explorer: https://explorer.nexus.xyz/tx/${receipt.transactionHash}\n`);
    } catch (error) {
        console.error(`[${new Date().toLocaleTimeString()}] ERROR: ${error.message}\n`);
    }
}

// প্রথমবার সাথে সাথে চালু করুন
transferNEX();

// প্রতি INTERVAL_SECONDS সেকেন্ড পর পর চালান
setInterval(transferNEX, INTERVAL_SECONDS * 1000);
