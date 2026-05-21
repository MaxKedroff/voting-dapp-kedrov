import { expect } from "chai";
import { ethers } from "hardhat";

describe("Voting", function () {
  async function deployVoting() {
    const Voting = await ethers.getContractFactory("Voting");
    const voting = await Voting.deploy();

    return voting;
  }

  it("Should allow voting FOR", async function () {
    const voting = await deployVoting();

    await voting.voteFor();

    expect(await voting.votesFor()).to.equal(1);
  });

  it("Should emit Voted event", async function () {
    const voting = await deployVoting();

    await expect(voting.voteFor())
      .to.emit(voting, "Voted")
      .withArgs(await voting.runner?.getAddress(), true);
  });

  it("Should prevent double voting", async function () {
    const voting = await deployVoting();

    await voting.voteFor();

    await expect(voting.voteFor()).to.be.revertedWith("You already voted");
  });
});
