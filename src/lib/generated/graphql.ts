import client from '$lib/services/apolloClient';
import type {
	ApolloQueryResult,
	ObservableQuery,
	WatchQueryOptions,
	MutationOptions
} from '@apollo/client';
import { readable } from 'svelte/store';
import type { Readable } from 'svelte/store';
import gql from 'graphql-tag';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
	ID: string;
	String: string;
	Boolean: boolean;
	Int: number;
	Float: number;
	/** A date-time string at UTC, such as 2019-12-03T09:54:33Z, compliant with the date-time format. */
	DateTime: any;
};

export type AccessCode = {
	__typename?: 'AccessCode';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	accessCode: Scalars['String'];
	userType: Scalars['String'];
};

export type CreateHospitalDto = {
	name: Scalars['String'];
	subDistrict: Scalars['String'];
	district: Scalars['String'];
	province: Scalars['String'];
	zipCode: Scalars['String'];
	tel: Scalars['String'];
	lat: Scalars['Float'];
	lng: Scalars['Float'];
};

export type CreateOfficerDto = {
	username: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	employeeId?: Maybe<Scalars['String']>;
	accessCode: Scalars['String'];
};

export type CreatePatientDto = {
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	birthDate?: Maybe<Scalars['String']>;
	identification?: Maybe<Scalars['String']>;
	tel?: Maybe<Scalars['String']>;
	sex?: Maybe<Scalars['String']>;
	illnesses?: Maybe<Array<Illness>>;
};

export type CreateTicketDto = {
	patientId: Scalars['Float'];
	examReceiveDate: Scalars['String'];
	examDate: Scalars['String'];
	examLocation: Scalars['String'];
	symptoms: Array<Symptom>;
	vaccines?: Maybe<Array<CreateVaccine>>;
	lat: Scalars['Float'];
	lng: Scalars['Float'];
};

export type CreateVaccine = {
	vaccineReceiveDate: Scalars['String'];
	doseNumber: Scalars['Int'];
	vaccineName: VaccineName;
};

export type EditHospitalDto = {
	name?: Maybe<Scalars['String']>;
	subDistrict?: Maybe<Scalars['String']>;
	district?: Maybe<Scalars['String']>;
	province?: Maybe<Scalars['String']>;
	zipCode?: Maybe<Scalars['String']>;
	tel?: Maybe<Scalars['String']>;
	location?: Maybe<PointInput>;
};

export type EditSymptomDto = {
	symptoms: Array<Symptom>;
};

export type Hospital = {
	__typename?: 'Hospital';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	name: Scalars['String'];
	subDistrict: Scalars['String'];
	district: Scalars['String'];
	province: Scalars['String'];
	zipCode: Scalars['String'];
	tel: Scalars['String'];
	location: Point;
	accessCodes: Array<AccessCode>;
};

export enum Illness {
	NcDs = 'NCDs',
	Cardiovascular = 'CARDIOVASCULAR',
	Ckd = 'CKD',
	Stroke = 'STROKE',
	Obesity = 'OBESITY',
	Cancer = 'CANCER',
	Diabetes = 'DIABETES'
}

export type JwtTokenInfo = {
	__typename?: 'JwtTokenInfo';
	token: Scalars['String'];
	expireDate: Scalars['DateTime'];
};

export type LoginWithUsernameDto = {
	username: Scalars['String'];
	password: Scalars['String'];
};

export type Mutation = {
	__typename?: 'Mutation';
	createHospital: Hospital;
	updateAccessCode: Hospital;
	editHospital: Hospital;
	createPatient: Patient;
	updatePatient: Patient;
	deletePatient: Patient;
	createOfficer: Officer;
	updateMyOfficer: Officer;
	createTicket: Ticket;
	editSymptom: Ticket;
	cancelTicket: Ticket;
	acceptTicket: Ticket;
	cancelAppointment: Ticket;
	getJwtFromLineCode: JwtTokenInfo;
	officerLogin: JwtTokenInfo;
};

export type MutationCreateHospitalArgs = {
	data: CreateHospitalDto;
};

export type MutationUpdateAccessCodeArgs = {
	data: UpdateAccessCodeDto;
};

export type MutationEditHospitalArgs = {
	data: EditHospitalDto;
	id: Scalars['ID'];
};

export type MutationCreatePatientArgs = {
	data: CreatePatientDto;
};

export type MutationUpdatePatientArgs = {
	data: UpdatePatientDto;
	id: Scalars['ID'];
};

export type MutationDeletePatientArgs = {
	id: Scalars['ID'];
};

export type MutationCreateOfficerArgs = {
	data: CreateOfficerDto;
};

export type MutationUpdateMyOfficerArgs = {
	data: UpdateOfficerDto;
};

export type MutationCreateTicketArgs = {
	data: CreateTicketDto;
};

export type MutationEditSymptomArgs = {
	data: EditSymptomDto;
	id: Scalars['ID'];
};

export type MutationCancelTicketArgs = {
	id: Scalars['ID'];
};

export type MutationCancelAppointmentArgs = {
	id: Scalars['ID'];
};

export type MutationGetJwtFromLineCodeArgs = {
	code: Scalars['String'];
};

export type MutationOfficerLoginArgs = {
	data: LoginWithUsernameDto;
};

export type Officer = {
	__typename?: 'Officer';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	username: Scalars['String'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	employeeId?: Maybe<Scalars['String']>;
	role: Scalars['String'];
	employeeCode: Scalars['String'];
	hospital: Hospital;
};

export type Patient = {
	__typename?: 'Patient';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	reporterId: Scalars['Int'];
	firstName: Scalars['String'];
	lastName: Scalars['String'];
	birthDate: Scalars['String'];
	identification: Scalars['String'];
	tel: Scalars['String'];
	sex: Scalars['String'];
	illnesses: Array<Illness>;
};

export type PingResponseDto = {
	__typename?: 'PingResponseDto';
	msg: Scalars['String'];
};

export type Point = {
	__typename?: 'Point';
	x: Scalars['Float'];
	y: Scalars['Float'];
};

export type PointInput = {
	x: Scalars['Float'];
	y: Scalars['Float'];
};

export type Query = {
	__typename?: 'Query';
	hospitals: Array<Hospital>;
	hospital?: Maybe<Hospital>;
	myHospital: Hospital;
	checkAccessCode: Hospital;
	patient: Patient;
	myOfficer: Officer;
	myTicket?: Maybe<Ticket>;
	requestedTicket: Array<Ticket>;
	ticketByNationalId: Ticket;
	pingAllowUnauthenticated: PingResponseDto;
	pingAllowAnyPermission: PingResponseDto;
	pingReporter: PingResponseDto;
	pingStaff: PingResponseDto;
	pingQueueManager: PingResponseDto;
	pingCodeGenerator: PingResponseDto;
	me: Reporter;
};

export type QueryHospitalArgs = {
	id: Scalars['ID'];
};

export type QueryCheckAccessCodeArgs = {
	access_code: Scalars['String'];
};

export type QueryPatientArgs = {
	id: Scalars['ID'];
};

export type QueryMyTicketArgs = {
	id: Scalars['ID'];
};

export type QueryTicketByNationalIdArgs = {
	nid: Scalars['String'];
};

export type Reporter = {
	__typename?: 'Reporter';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	patients: Array<Patient>;
	tickets: Array<Ticket>;
};

export enum Symptom {
	Fever = 'FEVER',
	Cough = 'COUGH',
	SmellessRash = 'SMELLESS_RASH',
	Diarrhea = 'DIARRHEA',
	TiredHeadache = 'TIRED_HEADACHE',
	DifficultBreathing = 'DIFFICULT_BREATHING',
	Angina = 'ANGINA',
	Exhausted = 'EXHAUSTED',
	ChestPain = 'CHEST_PAIN',
	Unconcious = 'UNCONCIOUS'
}

export type Ticket = {
	__typename?: 'Ticket';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	patientId: Scalars['Float'];
	examReceiveDate: Scalars['String'];
	examDate: Scalars['String'];
	examLocation: Scalars['String'];
	symptoms: Array<Symptom>;
	status: TicketStatus;
	appointedDate?: Maybe<Scalars['String']>;
	notes: Scalars['String'];
	riskLevel: Scalars['Int'];
	location: Point;
	hospitalId: Scalars['Float'];
	updatedById: Scalars['Float'];
	patient: Patient;
	hospital?: Maybe<Hospital>;
	vaccines: Array<Vaccine>;
};

export enum TicketStatus {
	Request = 'REQUEST',
	Match = 'MATCH',
	HospitalCancel = 'HOSPITAL_CANCEL',
	PatientCancel = 'PATIENT_CANCEL'
}

export type UpdateAccessCodeDto = {
	accessCode: Scalars['String'];
	userType: Scalars['String'];
};

export type UpdateOfficerDto = {
	username: Scalars['String'];
	employeeCode: Scalars['String'];
};

export type UpdatePatientDto = {
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	birthDate?: Maybe<Scalars['String']>;
	tel?: Maybe<Scalars['String']>;
	sex?: Maybe<Scalars['String']>;
	illnesses?: Maybe<Array<Illness>>;
};

export type Vaccine = {
	__typename?: 'Vaccine';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	vaccineReceiveDate: Scalars['String'];
	doseNumber: Scalars['Int'];
	vaccineName: VaccineName;
};

export enum VaccineName {
	Astrazeneca = 'ASTRAZENECA',
	Sinovac = 'SINOVAC',
	Sinopharm = 'SINOPHARM',
	Pfizer = 'PFIZER',
	Moderna = 'MODERNA'
}

export type CreatePatientMutationVariables = Exact<{
	data: CreatePatientDto;
}>;

export type CreatePatientMutation = { __typename?: 'Mutation' } & {
	createPatient: { __typename?: 'Patient' } & Pick<Patient, 'id'>;
};

export type CreateTicketMutationVariables = Exact<{
	data: CreateTicketDto;
}>;

export type CreateTicketMutation = { __typename?: 'Mutation' } & {
	createTicket: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
};

export type GetJwtFromLineCodeMutationVariables = Exact<{
	code: Scalars['String'];
}>;

export type GetJwtFromLineCodeMutation = { __typename?: 'Mutation' } & {
	getJwtFromLineCode: { __typename?: 'JwtTokenInfo' } & Pick<JwtTokenInfo, 'token' | 'expireDate'>;
};

export type UpdatePatientMutationVariables = Exact<{
	data: UpdatePatientDto;
	id: Scalars['ID'];
}>;

export type UpdatePatientMutation = { __typename?: 'Mutation' } & {
	updatePatient: { __typename?: 'Patient' } & Pick<Patient, 'id' | 'updatedAt'>;
};

export type MyPatientsQueryVariables = Exact<{ [key: string]: never }>;

export type MyPatientsQuery = { __typename?: 'Query' } & {
	me: { __typename?: 'Reporter' } & Pick<Reporter, 'id'> & {
			patients: Array<
				{ __typename?: 'Patient' } & Pick<
					Patient,
					| 'id'
					| 'reporterId'
					| 'firstName'
					| 'lastName'
					| 'birthDate'
					| 'sex'
					| 'identification'
					| 'tel'
				>
			>;
		};
};

export type MyTicketsQueryVariables = Exact<{ [key: string]: never }>;

export type MyTicketsQuery = { __typename?: 'Query' } & {
	me: { __typename?: 'Reporter' } & Pick<Reporter, 'id'> & {
			tickets: Array<
				{ __typename?: 'Ticket' } & Pick<Ticket, 'id' | 'status' | 'appointedDate'> & {
						patient: { __typename?: 'Patient' } & Pick<
							Patient,
							'id' | 'firstName' | 'lastName' | 'identification'
						>;
						hospital?: Maybe<{ __typename?: 'Hospital' } & Pick<Hospital, 'id' | 'name'>>;
					}
			>;
		};
};

export type PatientQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type PatientQuery = { __typename?: 'Query' } & {
	patient: { __typename?: 'Patient' } & Pick<
		Patient,
		'firstName' | 'lastName' | 'birthDate' | 'sex' | 'identification' | 'tel' | 'illnesses'
	>;
};

export const CreatePatientDoc = gql`
	mutation CreatePatient($data: CreatePatientDto!) {
		createPatient(data: $data) {
			id
		}
	}
`;
export const CreateTicketDoc = gql`
	mutation CreateTicket($data: CreateTicketDto!) {
		createTicket(data: $data) {
			id
		}
	}
`;
export const GetJwtFromLineCodeDoc = gql`
	mutation GetJwtFromLineCode($code: String!) {
		getJwtFromLineCode(code: $code) {
			token
			expireDate
		}
	}
`;
export const UpdatePatientDoc = gql`
	mutation UpdatePatient($data: UpdatePatientDto!, $id: ID!) {
		updatePatient(data: $data, id: $id) {
			id
			updatedAt
		}
	}
`;
export const MyPatientsDoc = gql`
	query MyPatients {
		me {
			id
			patients {
				id
				reporterId
				firstName
				lastName
				birthDate
				sex
				identification
				tel
			}
		}
	}
`;
export const MyTicketsDoc = gql`
	query MyTickets {
		me {
			id
			tickets {
				id
				status
				appointedDate
				patient {
					id
					firstName
					lastName
					identification
				}
				hospital {
					id
					name
				}
			}
		}
	}
`;
export const PatientDoc = gql`
	query Patient($id: ID!) {
		patient(id: $id) {
			firstName
			lastName
			birthDate
			sex
			identification
			tel
			illnesses
		}
	}
`;
export const CreatePatient = (
	options: Omit<MutationOptions<any, CreatePatientMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreatePatientMutation, CreatePatientMutationVariables>({
		mutation: CreatePatientDoc,
		...options
	});
	return m;
};
export const CreateTicket = (
	options: Omit<MutationOptions<any, CreateTicketMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreateTicketMutation, CreateTicketMutationVariables>({
		mutation: CreateTicketDoc,
		...options
	});
	return m;
};
export const GetJwtFromLineCode = (
	options: Omit<MutationOptions<any, GetJwtFromLineCodeMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<GetJwtFromLineCodeMutation, GetJwtFromLineCodeMutationVariables>({
		mutation: GetJwtFromLineCodeDoc,
		...options
	});
	return m;
};
export const UpdatePatient = (
	options: Omit<MutationOptions<any, UpdatePatientMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<UpdatePatientMutation, UpdatePatientMutationVariables>({
		mutation: UpdatePatientDoc,
		...options
	});
	return m;
};
export const MyPatients = (
	options: Omit<WatchQueryOptions<MyPatientsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<MyPatientsQuery> & {
		query: ObservableQuery<MyPatientsQuery, MyPatientsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: MyPatientsDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<MyPatientsQuery> & {
			query: ObservableQuery<MyPatientsQuery, MyPatientsQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const MyTickets = (
	options: Omit<WatchQueryOptions<MyTicketsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<MyTicketsQuery> & {
		query: ObservableQuery<MyTicketsQuery, MyTicketsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: MyTicketsDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<MyTicketsQuery> & {
			query: ObservableQuery<MyTicketsQuery, MyTicketsQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const Patient = (
	options: Omit<WatchQueryOptions<PatientQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<PatientQuery> & {
		query: ObservableQuery<PatientQuery, PatientQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: PatientDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<PatientQuery> & {
			query: ObservableQuery<PatientQuery, PatientQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};
