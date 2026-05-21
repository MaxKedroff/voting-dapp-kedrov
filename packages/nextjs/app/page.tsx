"use client";

import { useScaffoldReadContract, useScaffoldWriteContract } from "~~/hooks/scaffold-eth";

export default function Home() {
  const { data: votesFor } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "votesFor",
  });

  const { data: votesAgainst } = useScaffoldReadContract({
    contractName: "Voting",
    functionName: "votesAgainst",
  });

  const { writeContractAsync } = useScaffoldWriteContract("Voting");

  return (
    <div className="flex flex-col items-center mt-10 gap-5">
      <h1 className="text-4xl font-bold">Voting DApp</h1>

      <div className="text-2xl">Votes FOR: {votesFor?.toString()}</div>

      <div className="text-2xl">Votes AGAINST: {votesAgainst?.toString()}</div>

      <button
        className="btn btn-primary"
        onClick={async () => {
          try {
            await writeContractAsync({
              functionName: "voteFor",
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Vote FOR
      </button>

      <button
        className="btn btn-secondary"
        onClick={async () => {
          try {
            await writeContractAsync({
              functionName: "voteAgainst",
            });
          } catch (e) {
            console.log(e);
          }
        }}
      >
        Vote AGAINST
      </button>
    </div>
  );
}
