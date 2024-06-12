interface Window {
  ethereum: any;
}

interface INftMetadata {
  name: string;
  description: string;
  image: string;
}

interface IStsNftMetadata extends INftMetadata {
  tokenId: number;
  amount: number;
}
