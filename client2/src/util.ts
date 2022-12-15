export const classNameSeparator = (...args: any[]): string => {
	let s = "";
	for (let i = 0; i < args.length; i++) {
		s += " " + args[i];
	}
	return s;
};
