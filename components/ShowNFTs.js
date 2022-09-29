import styles from "../styles/Home.module.css";
import { useMetaplex } from "./useMetaplex";
import { useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import Image from "next/image";

export const ShowNFTs = (props) => {
  const { metaplex } = useMetaplex();
  const wallet = useWallet();

  const [nft, setNft] = useState(null);

  useEffect(() => {
    console.log(wallet.connected)
  }, []);

  const onClick = async () => {
    // console.log(metaplex.nfts().findAllByOwner({ owner: metaplex.identity().publicKey }));
    // console.log(metaplex.nfts().find)
    let myNfts = await metaplex
      .nfts()
      .findAllByOwner(metaplex.identity().publicKey);
    console.log(myNfts);
    // if(!myNfts.length) {
    //   setNft(null);
    //   return;
    // }
    // let randIdx = Math.floor(Math.random() * myNfts.length);
    // await myNfts[randIdx].metadataTask.run();
    // setNft(myNfts[randIdx]);
  };

  const onMint = async () => {
    console.log("here");
    // let { nft } = await metaplex
    //   .nfts()
    //   .create({
    //     uri: "/fallbackImage.jpg",
    //     name: "New NFT",
    //     sellerFeeBasisPoints: 500
    //   })
    // console.log(nft)
    // const { uri } = await metaplex
    //   .nfts()
    //   .uploadMetadata({
    //     name: "My NFT",
    //     description: "My description",
    //     image: "/fallbackImage.jpg",
    //   });
    // console.log(uri); // https://arweave.net/789
  };

  return (
    wallet.connected && (
      <div>
        <select onChange={props.onClusterChange} className={styles.dropdown}>
          <option value="devnet">Devnet</option>
          <option value="mainnet">Mainnet</option>
          <option value="testnet">Testnet</option>
        </select>
        <div>
          <div className={styles.container}>
            <h1 className={styles.title}>NFT Mint Address</h1>
            <div className={styles.nftForm}>
              <input
                type="text"
                value={nft ? nft.mint.toBase58() : ""}
                readOnly
              />
              <button onClick={onClick}>Pick Random NFT</button>
            </div>
            {nft && (
              <div className={styles.nftPreview}>
                <h1>{nft.name}</h1>
                <Image
                  src={nft.metadata.image || "/fallbackImage.jpg"}
                  alt="The downloaded illustration of the provided NFT address."
                />
              </div>
            )}
          </div>
          {/* <div>
            <button onClick={onMint}>Mint</button>
          </div> */}
        </div>
      </div>
    )
  );
};
