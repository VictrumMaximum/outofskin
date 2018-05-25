import Quote from "../../../../schemas/QuoteSchema";

export const setQuotes = (left: Quote[], right: Quote[]) => {
	return {
		type: "SET_QUOTES",
		left,
		right
	};
};
