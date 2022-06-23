import { BigInt, log, Bytes } from "@graphprotocol/graph-ts";
import { OrderFilled, OrderFilledNFT } from "../generated/AugustusRFQ/AugustusRFQ";
import { FilledOrder, FilledOrderNFT } from "../generated/schema";

export function handleOrderFilled(event: OrderFilled): void {
  let filledOrder = new FilledOrder(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  filledOrder.augustusRFQ = event.address;
  filledOrder.augustusRFQVersion = "1.0.0";
  filledOrder.orderHash = event.params.orderHash;
  filledOrder.makerAddress = event.params.maker;
  filledOrder.makerAsset = event.params.makerAsset;
  filledOrder.makerAmount = event.params.makerAmount;
  filledOrder.takerAddress = event.params.taker;
  filledOrder.takerAsset = event.params.takerAsset;
  filledOrder.takerAmount = event.params.takerAmount;
  filledOrder.txHash = event.transaction.hash;
  filledOrder.txOrigin = event.transaction.from;
  filledOrder.txTarget = event.transaction.to;
  filledOrder.txGasLimit = event.transaction.gasLimit;
  filledOrder.txGasPrice = event.transaction.gasPrice;
  filledOrder.blockHash = event.block.hash;
  filledOrder.blockNumber = event.block.number;
  filledOrder.timestamp = event.block.timestamp;
  filledOrder.save();
}

export function handleOrderFilledNFT(event: OrderFilledNFT): void {
  let filledOrder = new FilledOrderNFT(event.transaction.hash.toHex() + '-' + event.logIndex.toString());
  filledOrder.augustusRFQ = event.address;
  filledOrder.augustusRFQVersion = "1.0.0";
  filledOrder.orderHash = event.params.orderHash;
  filledOrder.makerAddress = event.params.maker;
  filledOrder.makerAsset = _getAssetAddress(event.params.makerAsset);
  filledOrder.makerAssetType = _getAssetType(event.params.makerAsset);
  filledOrder.makerAssetId = event.params.makerAssetId;
  filledOrder.makerAmount = event.params.makerAmount;
  filledOrder.takerAddress = event.params.taker;
  filledOrder.takerAsset = _getAssetAddress(event.params.takerAsset);
  filledOrder.takerAssetType = _getAssetType(event.params.takerAsset);
  filledOrder.takerAssetId = event.params.takerAssetId;
  filledOrder.takerAmount = event.params.takerAmount;
  filledOrder.txHash = event.transaction.hash;
  filledOrder.txOrigin = event.transaction.from;
  filledOrder.txTarget = event.transaction.to;
  filledOrder.txGasLimit = event.transaction.gasLimit;
  filledOrder.txGasPrice = event.transaction.gasPrice;
  filledOrder.blockHash = event.block.hash;
  filledOrder.blockNumber = event.block.number;
  filledOrder.timestamp = event.block.timestamp;
  filledOrder.save();
}

export function _getAssetType(asset: BigInt): BigInt {
  let assetType = asset.rightShift(160);
  if (assetType == BigInt.fromI32(0)) {
    return BigInt.fromI32(20);
  }
  else if (assetType == BigInt.fromI32(1)) {
    return BigInt.fromI32(1155);
  }
  else if (assetType == BigInt.fromI32(2)) {
    return BigInt.fromI32(721);
  }
  else {
    log.error("Unable to find asset type for asset {}", [asset.toHex()])
    return BigInt.fromI32(0);
  }
}

export function _getAssetAddress(asset: BigInt): Bytes {
  return Bytes.fromHexString(asset.toHex().slice(0, 42)) as Bytes;
}
