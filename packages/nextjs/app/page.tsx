"use client";
import "./page.css"; 
import { useState } from "react";
import {useEffect } from "react";

import {
  useScaffoldReadContract,
  useScaffoldWriteContract,
} from "~~/hooks/scaffold-eth";
import { useAccount, useBalance } from "wagmi";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { address, isConnected } = useAccount();

  const [notification, setNotification] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    if (notification) {
      const timer = setTimeout(() => {
        setNotification(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [notification]);

  const { data: balance } = useBalance({ address });

  const { data: votesFor } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "votesFor",
  });

  const { data: votesAgainst } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "votesAgainst",
  });

  const { writeContractAsync } = useScaffoldWriteContract("Voting");

  const handleVoteFor = async () => {
    if (!isConnected) {
      alert("Connect MetaMask first");
      return;
    }

    try {
      await writeContractAsync({ functionName: "voteFor" });
    } catch (e) {
      console.log(e);

      if (e.message?.includes("You already voted")) {
        setNotification({ message: "You have already voted!", type: 'error' });
      }
    }
  };

  const handleVoteAgainst = async () => {
    if (!isConnected) {
      alert("Connect MetaMask first");
      return;
    }

    try {
      await writeContractAsync({ functionName: "voteAgainst" });
    } catch (e) {
      console.log(e);
      if (e.message?.includes("You already voted")) {
        setNotification({ message: "You have already voted!", type: 'error' });
      }
    }
  };

  return (

    
    <div className="page">
      {notification && (
        <div className={`notification ${notification.type}`}>
          {notification.message}
        </div>
      )}
      <div className="card">
        <h1 className="title">Voting DApp</h1>

        <ConnectButton />

        {isConnected && (
          <div className="walletInfo">
            <div>
              <strong>Address:</strong> {address}
            </div>
            <div>
              <strong>Balance:</strong> {balance?.formatted} {balance?.symbol}
            </div>
          </div>
        )}

        <div className="stats">
          <div className="statBox">
            <div className="statLabel">Votes FOR</div>
            <div className="statValue">{votesFor?.toString() || "0"}</div>
          </div>
          <div className="statBox">
            <div className="statLabel">Votes AGAINST</div>
            <div className="statValue">{votesAgainst?.toString() || "0"}</div>
          </div>
        </div>

        <div className="buttons">
          <button
            className="voteForBtn"
            disabled={!isConnected}
            onClick={handleVoteFor}
          >
            Vote FOR
          </button>

          <button
            className="voteAgainstBtn"
            disabled={!isConnected}
            onClick={handleVoteAgainst}
          >
            Vote AGAINST
          </button>
        </div>
      </div>
    </div>
  );
}