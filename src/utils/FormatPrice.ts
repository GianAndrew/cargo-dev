export const FormatAsPrice = (str: string) => {
	return (str + '').replace(/\b(\d+)((\.\d+)*)\b/g, function (_a, b, c) {
		return (b.charAt(0) > 0 && !(c || '.').lastIndexOf('.') ? b.replace(/(\d)(?=(\d{3})+$)/g, '$1,') : b) + c;
	});
};
