'use client';
import Head from 'next/head';
import dynamic from 'next/dynamic';
import {
  useBlockNumber,
  useAccount,
  useBalance,
  useContractRead,
  useContract,
  useContractWrite,
  useExplorer,
  useWaitForTransaction,
} from "@starknet-react/core";
import { BlockNumber } from "starknet";
import contractAbi from "../abis/abi.json";
import contractAbiERC20 from "../abis/abi_erc20_capivaracoin.json";
import { useState, useMemo } from 'react';

const WalletBar = dynamic(() => import('../components/WalletBar'), { ssr: false })
const Page: React.FC = () => {

  // Step 1 --> Read the latest block -- Start
  const { data: blockNumberData, isLoading: blockNumberIsLoading, isError: blockNumberIsError } = useBlockNumber({
    blockIdentifier: 'latest' as BlockNumber
  });
  const workshopEnds = 305000;
  // Step 1 --> Read the latest block -- End

  // Step 2 --> Read your balance -- Start
  const { address: userAddress } = useAccount();
   const { isLoading: balanceIsLoading, isError: balanceIsError, error: balanceError, data: balanceData } = useBalance({
     address: userAddress,
     watch: true
   });
   // console.log("balanceData",balanceData);
  // Step 2 --> Read your balance -- End

  // Step 3 --> Read from a contract -- Start
  //const contractAddress = "0x1e599a44cb196b0fa8e6af83457301e89adfb32e158fa3044cc57c4a823e877";
  const contractAddress = "0x048380cf31ac6608a5039a4f45c50158f3375631afe6e3a7c536e3ac4cce0390";
  const { data: readData, refetch: dataRefetch, isError: readIsError, isLoading: readIsLoading, error: readError } = useContractRead({
    functionName: "balance_of",
    args: [userAddress ? userAddress : "0x0"],
    abi: contractAbiERC20,
    address: contractAddress,
    watch: true,
  });
  // Step 3 --> Read from a contract -- End

  // Step 4 --> Write to a contract -- Start
 const [amount, setAmount] = useState(0);
 const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
   event.preventDefault();
   console.log("Form submitted with amount ", amount);
   // TO DO: Implement Starknet logic here
   writeAsync();
 };
 const { contract } = useContract({
   abi: contractAbiERC20,
   address: contractAddress,
 });
 const calls = useMemo(() => {
   if (!userAddress || !contract) return [];
   return contract.populateTransaction["mint"]!(userAddress,{ low: (amount ? amount : 0), high: 0 });
 }, [contract, userAddress, amount]);
 const {
   writeAsync,
   data: writeData,
   isPending: writeIsPending,
 } = useContractWrite({
   calls,
 });
const explorer = useExplorer();
// const { isLoading: waitIsLoading, isError: waitIsError, error: waitError, data: waitData } = useWaitForTransaction({ hash: writeData?.transaction_hash, watch: true })
  const LoadingState = ({ message }: { message: string }) => (
    <div className="flex items-center space-x-2">
      <div className="animate-spin">
        <svg className="h-5 w-5 text-gray-800" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
      </div>
      <span>{message}</span>
    </div>
  );
 // const buttonContent = () => {
 //   if (writeIsPending) {
 //     return <LoadingState message="Send..." />;
 //   }

 //   if (waitIsLoading) {
 //     return <LoadingState message="Waiting for confirmation..." />;
 //   }

 //   if (waitData && waitData.status === "REJECTED") {
 //     return <LoadingState message="Transaction rejected..." />;
 //   }

 //   if (waitData) {
 //     return "Transaction confirmed";
 //   }

 //   return "Send";
 // };
  // Step 4 --> Write to a contract -- End

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-white">
      <Head>
        <title className="text-orange">Frontend Workshop</title>
      </Head>
      <div className="flex flex-row mb-4 bg-black">
        <WalletBar />
          <div className="text-white">Hello World</div>
      </div>

      {/* Step 1 --> Read the latest block -- Start */}
      {!blockNumberIsLoading && !blockNumberIsError && (
        <div
          className={`p-4 w-full max-w-md m-4 border-black border ${blockNumberData! < workshopEnds ? "bg-green-500" : "bg-red-500"}`}
        >
          <h3 className="text-2xl font-bold mb-2">Read the Blockchain</h3>
          <p>Current Block Number: {blockNumberData}</p>
          {blockNumberData! < workshopEnds ? "We're live on Workshop" : "Workshop has ended"}
        </div>
      )}
      {/* Step 1 --> Read the latest block -- End */}

      {/* Step 2 --> Read your balance -- Start */}
      {!balanceIsLoading && !balanceIsError && (
        <div
          className={`p-4 w-full max-w-md m-4 bg-black border-black border`}
        >
          <h3 className="text-2xl text-white font-bold mb-2">Read your Balance</h3>
          <p className="text-white">Symbol: {balanceData?.symbol}</p>
          <p className="text-white">Balance: {Number(balanceData?.formatted).toFixed(4)}</p>
        </div>
      )}
      {/* <div
        className={`p-4 w-full max-w-md m-4 bg-white border-black border`}
      >
        <h3 className="text-2xl font-bold mb-2">Read your Balance</h3>
        <p>Symbol: Ticker</p>
        <p>Balance: xyz</p>
      </div> */}
      {/* Step 2 --> Read your balance -- End */}

      {/* Step 3 --> Read from a contract -- Start */}
      <div
        className={`p-4 w-full max-w-md m-4 bg-black border-black border`}
      >
        <h3 className="text-2xl text-white font-bold mb-2">Read your Contract</h3>
        <p className="text-white">Balance: {readData?.toString()}</p>
        <div className="flex justify-center pt-4">
          <button
            onClick={() => dataRefetch()}
            className={`border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500`}
          >
            Refresh
          </button>
        </div>
      </div>
      {/* <div
        className={`p-4 w-full max-w-md m-4 bg-white border-black border`}
      >
        <h3 className="text-2xl font-bold mb-2">Read your Contract</h3>
        <p>Balance: xyz</p>
        <div className="flex justify-center pt-4">
          <button
            onClick={() => console.log("Refresh")}
            className={`border border-black text-black font-regular py-2 px-4 bg-yellow-300 hover:bg-yellow-500`}
          >
            Refresh
          </button>
        </div>
      </div> */}
      {/* Step 3 --> Read from a contract -- End */}

      {/* Step 4 --> Write to a contract -- Start */}
      <form onSubmit={handleSubmit} className="bg-black p-4 w-full max-w-md m-4 border-black border">
        <h3 className="text-2xl text-white font-bold mb-2 black">Mint ERC20</h3>
        <label
          htmlFor="amount"
          className="block text-white font-medium leading-6 text-gray-900"
        >
          Amount:
        </label>
        <input
          type="number"
          id="amount"
          value={amount}
          onChange={(event) => setAmount(event.target.valueAsNumber)}
          className="block w-full px-3 py-2 text-white leading-6 border-black focus:outline-none focus:border-yellow-300 black-border-p bg-black"
        />
        {writeData?.transaction_hash && (
          <a
            href={explorer.transaction(writeData?.transaction_hash)}
            target="_blank"
            className="text-blue-500 hover:text-blue-700 underline"
            rel="noreferrer"
            >
            Check TX on {explorer.name} 
            </a> 
        )}
        <div className="flex justify-center pt-4">
          <button
            type="submit"
            className={`border border-black text-black font-regular py-2 px-4 ${userAddress ? "bg-yellow-300 hover:bg-yellow-500" : "bg-white"} `}
            disabled={!userAddress}
          >
            {/*{buttonContent()} */}
            Send
          </button>
        </div>
      </form>
      
      {/* Step 4 --> Write to a contract -- End */}

    </div>
  );
};

export default Page;
