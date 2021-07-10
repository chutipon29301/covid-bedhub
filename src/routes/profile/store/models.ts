export interface IProfile {
	id: string;
	dob: Date;
	firstName: string;
	lastName: string;
	sex: string;
	address: string;
	subDistrict: string;
	district: string;
	province: string;
	postcode: string;
	mobile: string;
}

export const initProfile: IProfile = {
	id: null,
	dob: null,
	firstName: null,
	lastName: null,
	sex: null,
	address: null,
	subDistrict: null,
	district: null,
	province: null,
	postcode: null,
	mobile: null
};
