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

export type CreatePatientDto = {
	reporterId?: Maybe<Scalars['Int']>;
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	birthDate?: Maybe<Scalars['String']>;
	identification?: Maybe<Scalars['String']>;
	subDistrict?: Maybe<Scalars['String']>;
	district?: Maybe<Scalars['String']>;
	province?: Maybe<Scalars['String']>;
	zipCode?: Maybe<Scalars['String']>;
	tel?: Maybe<Scalars['String']>;
	sex?: Maybe<Scalars['String']>;
	illnesses?: Maybe<Array<Illness>>;
};

export type CreateTicketDto = {
	patientId: Scalars['Float'];
	examReceiveDate: Scalars['String'];
	examDate: Scalars['String'];
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

export type Mutation = {
	__typename?: 'Mutation';
	updateAccessCode: Hospital;
	editHospital: Hospital;
	createPatient: Patient;
	updatePatient: Patient;
	deletePatient: Patient;
	updateOfficer: Officer;
	createTicket: Ticket;
	editSymptom: Ticket;
	cancelTicket: Ticket;
	acceptTicket: Ticket;
	cancelAppointment: Ticket;
	getJwtFromLineCode: JwtTokenInfo;
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

export type MutationUpdateOfficerArgs = {
	data: UpdateOfficerDto;
	id: Scalars['ID'];
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

export type Officer = {
	__typename?: 'Officer';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	username: Scalars['String'];
	password: Scalars['String'];
	role: Scalars['String'];
	employeeCode: Scalars['String'];
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
	subDistrict: Scalars['String'];
	district: Scalars['String'];
	province: Scalars['String'];
	zipCode: Scalars['String'];
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
	officer: Officer;
	tickets: Array<Ticket>;
	ticket?: Maybe<Ticket>;
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

export type QueryOfficerArgs = {
	id: Scalars['ID'];
};

export type QueryTicketArgs = {
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
	symptoms: Array<Symptom>;
	status: TicketStatus;
	appointedDate: Scalars['String'];
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
	password: Scalars['String'];
	employeeCode: Scalars['String'];
};

export type UpdatePatientDto = {
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	birthDate?: Maybe<Scalars['String']>;
	subDistrict?: Maybe<Scalars['String']>;
	district?: Maybe<Scalars['String']>;
	province?: Maybe<Scalars['String']>;
	zipCode?: Maybe<Scalars['String']>;
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

export type GetJwtFromLineCodeMutationVariables = Exact<{
	code: Scalars['String'];
}>;

export type GetJwtFromLineCodeMutation = { __typename?: 'Mutation' } & {
	getJwtFromLineCode: { __typename?: 'JwtTokenInfo' } & Pick<JwtTokenInfo, 'token' | 'expireDate'>;
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

export const GetJwtFromLineCodeDoc = gql`
	mutation GetJwtFromLineCode($code: String!) {
		getJwtFromLineCode(code: $code) {
			token
			expireDate
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
export const GetJwtFromLineCode = (
	options: Omit<MutationOptions<any, GetJwtFromLineCodeMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<GetJwtFromLineCodeMutation, GetJwtFromLineCodeMutationVariables>({
		mutation: GetJwtFromLineCodeDoc,
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
