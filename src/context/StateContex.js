import { atom } from "recoil";

export const showCartState = atom({
	key: "showCart",
	default: false,
});
export const QtyState = atom({
	key: "QTY",
	default: 1,
});
export const TotalPriceState = atom({
	key: "TotalPrice",
	default: 0,
});
export const TotalQuantitiesState = atom({
	key: "totalQuantities",
	default: 0,
});
export const CartItemsState = atom({
	key: "cartItem",
	default: [],
});
