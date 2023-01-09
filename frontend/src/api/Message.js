// Message class

export class Message {
  tokenId;
  timestamp;
  tokenURI;
  sender;

  constructor(tokenId, timeStamp, tokenURI, from) {
    // tokenId, timeStamp are BigNumber
    this.tokenId = tokenId.toNumber();
    this.timestamp = timeStamp.toNumber();
    this.tokenURI = tokenURI;
    this.sender = from;
  }

  get createdAt() {
    return new Date(this.timestamp);
  }

  get content() {
    return this.tokenURI;
  }
}
