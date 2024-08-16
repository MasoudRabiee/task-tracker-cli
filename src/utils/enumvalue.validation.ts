export function isValidEnumValue<T extends string>(
	enumObj: { [key: string]: T },
	value: string
): boolean {
	return Object.values(enumObj).includes(value as T);
}
