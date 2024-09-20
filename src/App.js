import React, { useState } from 'react';

const App = () => {
  const [walletAddress, setWalletAddress] = useState(null);
  const [signature, setSignature] = useState('');

  const isPhantomInstalled = () => {
    return window.solana && window.solana.isPhantom;
  };

  const connectWallet = async () => {
    if (isPhantomInstalled()) {
      try {
        const response = await window.solana.connect();
        setWalletAddress(response.publicKey.toString());
      } catch (error) {
        console.error('Wallet connection error:', error);
      }
    } else {
      alert('Please install Phantom wallet');
    }
  };

  // Sign a message
  const signMessage = async () => {
    if (!walletAddress) {
      alert('Connect your wallet first');
      return;
    }

    try {
      const message = new TextEncoder().encode('Hello from Phantom!');
      const signature = await window.solana.signMessage(message);
      setSignature(signature);
    } catch (error) {
      console.error('Message signing error:', error);
    }
  };

  return (
    <div>
      <h1>Phantom Wallet Demo</h1>
      <button onClick={connectWallet}>
        {walletAddress ? 'Connected' : 'Connect Phantom Wallet'}
      </button>
      <button onClick={signMessage} disabled={!walletAddress}>
        Sign Message
      </button>
      {walletAddress && <p>Wallet Address: {walletAddress}</p>}
      {walletAddress && signature && <p>{JSON.stringify(signature)}</p>}
    </div>
  );
};

export default App;
