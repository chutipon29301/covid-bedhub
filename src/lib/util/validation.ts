export function requiredValidation(str: string | number): boolean {
	if (str === undefined) return true;
	return !!str;
}

export function nationalIdValidation(id: string): boolean {
	if (id == null || id.length !== 13 || !/^[0-9]\d+$/.test(id)) {
		return false;
	}
	let i;
	let sum = 0;
	for (i = 0, sum = 0; i < 12; i++) {
		sum += parseInt(id.charAt(i)) * (13 - i);
	}
	const check = (11 - (sum % 11)) % 10;
	if (check === parseInt(id.charAt(12))) {
		return true;
	}
	return false;
}

export function passportValidation(id: string): boolean {
	return /^(?!^0+$)[a-zA-Z0-9]{6,9}$/.test(id);
}

export function identificationValidation(id: string): boolean {
	return nationalIdValidation(id) || passportValidation(id);
}

export function nameValidation(name: string): boolean {
	return /^[a-zA-Z\u0E00-\u0E7F]+$/.test(name);
}

export function mobileNumberValidation(mobile: string): boolean {
	if (mobile === undefined) return true;
	return /^(\+66|0)[\d]{8,9}$/.test(mobile);
}

export function noFutureValidation(dob: Date): boolean {
	if (dob === undefined) return true;
	return new Date() > dob;
}

export function usernameValidation(username: string): boolean {
	return /^[a-zA-Z0-9]{4,10}$/.test(username);
}

export function passwordValidation(password: string): boolean {
	if (password === undefined) return true;
	return password?.length > 5;
}

export function dependantFieldsValidation(f1: unknown, f2: unknown): boolean {
	if (f1 === undefined && f2 === undefined) return true;
	return (!!f1 && !f2) || (!!f1 && !!f2);
}
