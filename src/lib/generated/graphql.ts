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

export type AcceptTicketDto = {
	id: Scalars['ID'];
	appointedDate?: Maybe<Scalars['String']>;
	notes?: Maybe<Scalars['String']>;
};

export type AccessCode = {
	__typename?: 'AccessCode';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	accessCode: Scalars['String'];
	userType: UserType;
	hospital: AccessCodeHospital;
};

export type AccessCodeHospital = {
	__typename?: 'AccessCodeHospital';
	name: Scalars['String'];
	tel: Scalars['String'];
};

export type AppointmentInfoDto = {
	__typename?: 'AppointmentInfoDto';
	ticket?: Maybe<Ticket>;
	hospital?: Maybe<Hospital>;
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
	password: Scalars['String'];
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
	symptoms?: Maybe<Array<Symptom>>;
	vaccines?: Maybe<Array<CreateVaccine>>;
	lat: Scalars['Float'];
	lng: Scalars['Float'];
};

export type CreateVaccine = {
	vaccineReceiveDate: Scalars['String'];
	doseNumber: Scalars['Int'];
	vaccineName: VaccineName;
};

export type EditAppointmentDto = {
	id: Scalars['ID'];
	appointedDate?: Maybe<Scalars['String']>;
	notes?: Maybe<Scalars['String']>;
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
	symptoms?: Maybe<Array<Symptom>>;
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
	editAppointment: Ticket;
	cancelAppointment: Ticket;
	getJwtFromLineCode: JwtTokenInfo;
	officerLogin: JwtTokenInfo;
	updateAccessCode: AccessCode;
};

export type MutationCreateHospitalArgs = {
	data: CreateHospitalDto;
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

export type MutationAcceptTicketArgs = {
	data: AcceptTicketDto;
};

export type MutationEditAppointmentArgs = {
	data: EditAppointmentDto;
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

export type MutationUpdateAccessCodeArgs = {
	data: UpdateAccessCodeDto;
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
	age: Scalars['Int'];
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
	patient: Patient;
	myOfficer: Officer;
	requestedTicket?: Maybe<Ticket>;
	acceptedTicket?: Maybe<Ticket>;
	myTicket?: Maybe<Ticket>;
	requestedTicketByRiskLevelCount: Array<TicketByRiskLevelCountDto>;
	acceptedTicketByRiskLevelCount: Array<TicketByRiskLevelCountDto>;
	requestedAndAcceptedTicketsCount: RequestedAndAcceptedTicketCountDto;
	requestedTickets: TicketPaginationDto;
	acceptedTickets: TicketPaginationDto;
	ticketByNationalId: AppointmentInfoDto;
	pingAllowUnauthenticated: PingResponseDto;
	pingAllowAnyPermission: PingResponseDto;
	pingReporter: PingResponseDto;
	pingStaff: PingResponseDto;
	pingQueueManager: PingResponseDto;
	pingCodeGenerator: PingResponseDto;
	me: Reporter;
	checkAccessCode?: Maybe<AccessCode>;
};

export type QueryHospitalArgs = {
	id: Scalars['ID'];
};

export type QueryPatientArgs = {
	id: Scalars['ID'];
};

export type QueryRequestedTicketArgs = {
	id: Scalars['ID'];
};

export type QueryAcceptedTicketArgs = {
	id: Scalars['ID'];
};

export type QueryMyTicketArgs = {
	id: Scalars['ID'];
};

export type QueryRequestedTicketsArgs = {
	sortOptions?: Maybe<TicketSortOption>;
	data?: Maybe<RequestTicketQueryDto>;
};

export type QueryAcceptedTicketsArgs = {
	sortOptions?: Maybe<TicketSortOption>;
	data?: Maybe<RequestTicketQueryDto>;
};

export type QueryTicketByNationalIdArgs = {
	nid: Scalars['String'];
};

export type QueryCheckAccessCodeArgs = {
	access_code: Scalars['String'];
};

export type Reporter = {
	__typename?: 'Reporter';
	id: Scalars['ID'];
	createdAt: Scalars['DateTime'];
	updatedAt: Scalars['DateTime'];
	patients: Array<Patient>;
	tickets: Array<Ticket>;
};

export type RequestTicketQueryDto = {
	take?: Maybe<Scalars['Float']>;
	skip?: Maybe<Scalars['Float']>;
	riskLevel?: Maybe<Scalars['Float']>;
};

export type RequestedAndAcceptedTicketCountDto = {
	__typename?: 'RequestedAndAcceptedTicketCountDto';
	requestedCount: Scalars['Float'];
	acceptedCount: Scalars['Float'];
};

export enum SortOption {
	Asc = 'ASC',
	Desc = 'DESC'
}

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
	symptoms?: Maybe<Array<Symptom>>;
	status: TicketStatus;
	appointedDate?: Maybe<Scalars['String']>;
	notes?: Maybe<Scalars['String']>;
	riskLevel: Scalars['Int'];
	location: Point;
	hospitalId?: Maybe<Scalars['Float']>;
	updatedById?: Maybe<Scalars['Float']>;
	patient: Patient;
	hospital?: Maybe<Hospital>;
	vaccines: Array<Vaccine>;
};

export type TicketByRiskLevelCountDto = {
	__typename?: 'TicketByRiskLevelCountDto';
	riskLevel: Scalars['Float'];
	count: Scalars['Float'];
};

export type TicketPaginationDto = {
	__typename?: 'TicketPaginationDto';
	tickets: Array<Ticket>;
	count: Scalars['Float'];
};

export type TicketSortOption = {
	sortBy: TicketSortableColumn;
	sortOption: SortOption;
};

export enum TicketSortableColumn {
	CreatedAt = 'CREATED_AT',
	BirthDate = 'BIRTH_DATE',
	RiskLevel = 'RISK_LEVEL'
}

export enum TicketStatus {
	Request = 'REQUEST',
	Match = 'MATCH',
	HospitalCancel = 'HOSPITAL_CANCEL',
	PatientCancel = 'PATIENT_CANCEL'
}

export type UpdateAccessCodeDto = {
	accessCode: Scalars['String'];
	userType: UserType;
};

export type UpdateOfficerDto = {
	username: Scalars['String'];
	employeeCode: Scalars['String'];
	password: Scalars['String'];
};

export type UpdatePatientDto = {
	firstName?: Maybe<Scalars['String']>;
	lastName?: Maybe<Scalars['String']>;
	birthDate?: Maybe<Scalars['String']>;
	tel?: Maybe<Scalars['String']>;
	sex?: Maybe<Scalars['String']>;
	illnesses?: Maybe<Array<Illness>>;
};

export enum UserType {
	Staff = 'STAFF',
	QueueManager = 'QUEUE_MANAGER'
}

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

export type AcceptTicketMutationVariables = Exact<{
	data: AcceptTicketDto;
}>;

export type AcceptTicketMutation = { __typename?: 'Mutation' } & {
	acceptTicket: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
};

export type CancelAppointmentMutationVariables = Exact<{
	id: Scalars['ID'];
}>;

export type CancelAppointmentMutation = { __typename?: 'Mutation' } & {
	cancelAppointment: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
};

export type CancelTicketMutationVariables = Exact<{
	id: Scalars['ID'];
}>;

export type CancelTicketMutation = { __typename?: 'Mutation' } & {
	cancelTicket: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
};

export type CreateOfficerMutationVariables = Exact<{
	data: CreateOfficerDto;
}>;

export type CreateOfficerMutation = { __typename?: 'Mutation' } & {
	createOfficer: { __typename?: 'Officer' } & Pick<Officer, 'id'>;
};

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

export type EditAppointmentMutationVariables = Exact<{
	data: EditAppointmentDto;
}>;

export type EditAppointmentMutation = { __typename?: 'Mutation' } & {
	editAppointment: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
};

export type EditSymptomMutationVariables = Exact<{
	id: Scalars['ID'];
	data: EditSymptomDto;
}>;

export type EditSymptomMutation = { __typename?: 'Mutation' } & {
	editSymptom: { __typename?: 'Ticket' } & Pick<Ticket, 'id'>;
};

export type GetJwtFromLineCodeMutationVariables = Exact<{
	code: Scalars['String'];
}>;

export type GetJwtFromLineCodeMutation = { __typename?: 'Mutation' } & {
	getJwtFromLineCode: { __typename?: 'JwtTokenInfo' } & Pick<JwtTokenInfo, 'token' | 'expireDate'>;
};

export type OfficerLoginMutationVariables = Exact<{
	data: LoginWithUsernameDto;
}>;

export type OfficerLoginMutation = { __typename?: 'Mutation' } & {
	officerLogin: { __typename?: 'JwtTokenInfo' } & Pick<JwtTokenInfo, 'token' | 'expireDate'>;
};

export type UpdateAccessCodeMutationVariables = Exact<{
	data: UpdateAccessCodeDto;
}>;

export type UpdateAccessCodeMutation = { __typename?: 'Mutation' } & {
	updateAccessCode: { __typename?: 'AccessCode' } & Pick<AccessCode, 'accessCode'>;
};

export type UpdatePatientMutationVariables = Exact<{
	data: UpdatePatientDto;
	id: Scalars['ID'];
}>;

export type UpdatePatientMutation = { __typename?: 'Mutation' } & {
	updatePatient: { __typename?: 'Patient' } & Pick<Patient, 'id' | 'updatedAt'>;
};

export type AcceptedRiskCountQueryVariables = Exact<{ [key: string]: never }>;

export type AcceptedRiskCountQuery = { __typename?: 'Query' } & {
	acceptedTicketByRiskLevelCount: Array<
		{ __typename?: 'TicketByRiskLevelCountDto' } & Pick<
			TicketByRiskLevelCountDto,
			'riskLevel' | 'count'
		>
	>;
};

export type AcceptedTicketQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type AcceptedTicketQuery = { __typename?: 'Query' } & {
	acceptedTicket?: Maybe<
		{ __typename?: 'Ticket' } & Pick<
			Ticket,
			| 'id'
			| 'createdAt'
			| 'riskLevel'
			| 'appointedDate'
			| 'symptoms'
			| 'examDate'
			| 'examLocation'
			| 'examReceiveDate'
			| 'notes'
		> & {
				patient: { __typename?: 'Patient' } & Pick<
					Patient,
					'firstName' | 'lastName' | 'sex' | 'age' | 'identification' | 'tel' | 'illnesses'
				>;
				vaccines: Array<
					{ __typename?: 'Vaccine' } & Pick<
						Vaccine,
						'vaccineName' | 'doseNumber' | 'vaccineReceiveDate'
					>
				>;
			}
	>;
};

export type AcceptedTicketsQueryVariables = Exact<{
	data?: Maybe<RequestTicketQueryDto>;
}>;

export type AcceptedTicketsQuery = { __typename?: 'Query' } & {
	acceptedTickets: { __typename?: 'TicketPaginationDto' } & Pick<TicketPaginationDto, 'count'> & {
			tickets: Array<
				{ __typename?: 'Ticket' } & Pick<
					Ticket,
					'id' | 'createdAt' | 'riskLevel' | 'status' | 'appointedDate'
				> & {
						patient: { __typename?: 'Patient' } & Pick<
							Patient,
							'firstName' | 'lastName' | 'sex' | 'age'
						>;
					}
			>;
		};
};

export type CheckAccessCodeQueryVariables = Exact<{
	access_code: Scalars['String'];
}>;

export type CheckAccessCodeQuery = { __typename?: 'Query' } & {
	checkAccessCode?: Maybe<
		{ __typename?: 'AccessCode' } & Pick<AccessCode, 'accessCode' | 'userType'> & {
				hospital: { __typename?: 'AccessCodeHospital' } & Pick<AccessCodeHospital, 'name'>;
			}
	>;
};

export type CheckHospitalQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type CheckHospitalQuery = { __typename?: 'Query' } & {
	myTicket?: Maybe<
		{ __typename?: 'Ticket' } & Pick<Ticket, 'status'> & {
				patient: { __typename?: 'Patient' } & Pick<
					Patient,
					'firstName' | 'lastName' | 'identification' | 'tel'
				>;
				hospital?: Maybe<
					{ __typename?: 'Hospital' } & Pick<
						Hospital,
						'name' | 'subDistrict' | 'district' | 'province' | 'zipCode' | 'tel'
					>
				>;
			}
	>;
};

export type GetAccessCodeQueryVariables = Exact<{ [key: string]: never }>;

export type GetAccessCodeQuery = { __typename?: 'Query' } & {
	myHospital: { __typename?: 'Hospital' } & {
		accessCodes: Array<{ __typename?: 'AccessCode' } & Pick<AccessCode, 'accessCode' | 'userType'>>;
	};
};

export type GetTicketsCountQueryVariables = Exact<{ [key: string]: never }>;

export type GetTicketsCountQuery = { __typename?: 'Query' } & {
	requestedAndAcceptedTicketsCount: { __typename?: 'RequestedAndAcceptedTicketCountDto' } & Pick<
		RequestedAndAcceptedTicketCountDto,
		'requestedCount' | 'acceptedCount'
	>;
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

export type MyTicketSymptomsQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type MyTicketSymptomsQuery = { __typename?: 'Query' } & {
	myTicket?: Maybe<
		{ __typename?: 'Ticket' } & Pick<Ticket, 'status' | 'symptoms'> & {
				patient: { __typename?: 'Patient' } & Pick<
					Patient,
					'firstName' | 'lastName' | 'identification' | 'tel'
				>;
			}
	>;
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

export type RequestedRiskCountQueryVariables = Exact<{ [key: string]: never }>;

export type RequestedRiskCountQuery = { __typename?: 'Query' } & {
	requestedTicketByRiskLevelCount: Array<
		{ __typename?: 'TicketByRiskLevelCountDto' } & Pick<
			TicketByRiskLevelCountDto,
			'riskLevel' | 'count'
		>
	>;
};

export type RequestedTicketQueryVariables = Exact<{
	id: Scalars['ID'];
}>;

export type RequestedTicketQuery = { __typename?: 'Query' } & {
	requestedTicket?: Maybe<
		{ __typename?: 'Ticket' } & Pick<
			Ticket,
			| 'id'
			| 'createdAt'
			| 'riskLevel'
			| 'symptoms'
			| 'examDate'
			| 'examLocation'
			| 'examReceiveDate'
		> & {
				patient: { __typename?: 'Patient' } & Pick<
					Patient,
					'firstName' | 'lastName' | 'sex' | 'age' | 'identification' | 'tel' | 'illnesses'
				>;
				vaccines: Array<
					{ __typename?: 'Vaccine' } & Pick<
						Vaccine,
						'vaccineName' | 'doseNumber' | 'vaccineReceiveDate'
					>
				>;
			}
	>;
};

export type RequestedTicketsQueryVariables = Exact<{
	data?: Maybe<RequestTicketQueryDto>;
}>;

export type RequestedTicketsQuery = { __typename?: 'Query' } & {
	requestedTickets: { __typename?: 'TicketPaginationDto' } & Pick<TicketPaginationDto, 'count'> & {
			tickets: Array<
				{ __typename?: 'Ticket' } & Pick<Ticket, 'id' | 'createdAt' | 'riskLevel' | 'status'> & {
						patient: { __typename?: 'Patient' } & Pick<
							Patient,
							'firstName' | 'lastName' | 'sex' | 'age'
						>;
					}
			>;
		};
};

export type TestQueryVariables = Exact<{ [key: string]: never }>;

export type TestQuery = { __typename?: 'Query' } & {
	pingAllowUnauthenticated: { __typename?: 'PingResponseDto' } & Pick<PingResponseDto, 'msg'>;
};

export type TicketByNationalIdQueryVariables = Exact<{
	nid: Scalars['String'];
}>;

export type TicketByNationalIdQuery = { __typename?: 'Query' } & {
	ticketByNationalId: { __typename?: 'AppointmentInfoDto' } & {
		ticket?: Maybe<
			{ __typename?: 'Ticket' } & Pick<Ticket, 'appointedDate'> & {
					patient: { __typename?: 'Patient' } & Pick<Patient, 'firstName' | 'lastName'>;
				}
		>;
		hospital?: Maybe<{ __typename?: 'Hospital' } & Pick<Hospital, 'name'>>;
	};
};

export const AcceptTicketDoc = gql`
	mutation AcceptTicket($data: AcceptTicketDto!) {
		acceptTicket(data: $data) {
			id
		}
	}
`;
export const CancelAppointmentDoc = gql`
	mutation CancelAppointment($id: ID!) {
		cancelAppointment(id: $id) {
			id
		}
	}
`;
export const CancelTicketDoc = gql`
	mutation CancelTicket($id: ID!) {
		cancelTicket(id: $id) {
			id
		}
	}
`;
export const CreateOfficerDoc = gql`
	mutation CreateOfficer($data: CreateOfficerDto!) {
		createOfficer(data: $data) {
			id
		}
	}
`;
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
export const EditAppointmentDoc = gql`
	mutation EditAppointment($data: EditAppointmentDto!) {
		editAppointment(data: $data) {
			id
		}
	}
`;
export const EditSymptomDoc = gql`
	mutation EditSymptom($id: ID!, $data: EditSymptomDto!) {
		editSymptom(id: $id, data: $data) {
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
export const OfficerLoginDoc = gql`
	mutation OfficerLogin($data: LoginWithUsernameDto!) {
		officerLogin(data: $data) {
			token
			expireDate
		}
	}
`;
export const UpdateAccessCodeDoc = gql`
	mutation UpdateAccessCode($data: UpdateAccessCodeDto!) {
		updateAccessCode(data: $data) {
			accessCode
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
export const AcceptedRiskCountDoc = gql`
	query acceptedRiskCount {
		acceptedTicketByRiskLevelCount {
			riskLevel
			count
		}
	}
`;
export const AcceptedTicketDoc = gql`
	query AcceptedTicket($id: ID!) {
		acceptedTicket(id: $id) {
			id
			patient {
				firstName
				lastName
				sex
				age
				identification
				tel
				illnesses
			}
			createdAt
			riskLevel
			appointedDate
			symptoms
			vaccines {
				vaccineName
				doseNumber
				vaccineReceiveDate
			}
			examDate
			examLocation
			examReceiveDate
			notes
		}
	}
`;
export const AcceptedTicketsDoc = gql`
	query AcceptedTickets($data: RequestTicketQueryDto) {
		acceptedTickets(data: $data) {
			tickets {
				id
				patient {
					firstName
					lastName
					sex
					age
				}
				createdAt
				riskLevel
				status
				appointedDate
			}
			count
		}
	}
`;
export const CheckAccessCodeDoc = gql`
	query CheckAccessCode($access_code: String!) {
		checkAccessCode(access_code: $access_code) {
			accessCode
			userType
			hospital {
				name
			}
		}
	}
`;
export const CheckHospitalDoc = gql`
	query CheckHospital($id: ID!) {
		myTicket(id: $id) {
			patient {
				firstName
				lastName
				identification
				tel
			}
			status
			hospital {
				name
				subDistrict
				district
				province
				zipCode
				tel
			}
		}
	}
`;
export const GetAccessCodeDoc = gql`
	query GetAccessCode {
		myHospital {
			accessCodes {
				accessCode
				userType
			}
		}
	}
`;
export const GetTicketsCountDoc = gql`
	query GetTicketsCount {
		requestedAndAcceptedTicketsCount {
			requestedCount
			acceptedCount
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
export const MyTicketSymptomsDoc = gql`
	query MyTicketSymptoms($id: ID!) {
		myTicket(id: $id) {
			patient {
				firstName
				lastName
				identification
				tel
			}
			status
			symptoms
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
export const RequestedRiskCountDoc = gql`
	query requestedRiskCount {
		requestedTicketByRiskLevelCount {
			riskLevel
			count
		}
	}
`;
export const RequestedTicketDoc = gql`
	query RequestedTicket($id: ID!) {
		requestedTicket(id: $id) {
			id
			patient {
				firstName
				lastName
				sex
				age
				identification
				tel
				illnesses
			}
			createdAt
			riskLevel
			symptoms
			vaccines {
				vaccineName
				doseNumber
				vaccineReceiveDate
			}
			examDate
			examLocation
			examReceiveDate
		}
	}
`;
export const RequestedTicketsDoc = gql`
	query RequestedTickets($data: RequestTicketQueryDto) {
		requestedTickets(data: $data) {
			tickets {
				id
				patient {
					firstName
					lastName
					sex
					age
				}
				createdAt
				riskLevel
				status
			}
			count
		}
	}
`;
export const TestDoc = gql`
	query Test {
		pingAllowUnauthenticated {
			msg
		}
	}
`;
export const TicketByNationalIdDoc = gql`
	query TicketByNationalId($nid: String!) {
		ticketByNationalId(nid: $nid) {
			ticket {
				patient {
					firstName
					lastName
				}
				appointedDate
			}
			hospital {
				name
			}
		}
	}
`;
export const AcceptTicket = (
	options: Omit<MutationOptions<any, AcceptTicketMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<AcceptTicketMutation, AcceptTicketMutationVariables>({
		mutation: AcceptTicketDoc,
		...options
	});
	return m;
};
export const CancelAppointment = (
	options: Omit<MutationOptions<any, CancelAppointmentMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CancelAppointmentMutation, CancelAppointmentMutationVariables>({
		mutation: CancelAppointmentDoc,
		...options
	});
	return m;
};
export const CancelTicket = (
	options: Omit<MutationOptions<any, CancelTicketMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CancelTicketMutation, CancelTicketMutationVariables>({
		mutation: CancelTicketDoc,
		...options
	});
	return m;
};
export const CreateOfficer = (
	options: Omit<MutationOptions<any, CreateOfficerMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<CreateOfficerMutation, CreateOfficerMutationVariables>({
		mutation: CreateOfficerDoc,
		...options
	});
	return m;
};
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
export const EditAppointment = (
	options: Omit<MutationOptions<any, EditAppointmentMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<EditAppointmentMutation, EditAppointmentMutationVariables>({
		mutation: EditAppointmentDoc,
		...options
	});
	return m;
};
export const EditSymptom = (
	options: Omit<MutationOptions<any, EditSymptomMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<EditSymptomMutation, EditSymptomMutationVariables>({
		mutation: EditSymptomDoc,
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
export const OfficerLogin = (
	options: Omit<MutationOptions<any, OfficerLoginMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<OfficerLoginMutation, OfficerLoginMutationVariables>({
		mutation: OfficerLoginDoc,
		...options
	});
	return m;
};
export const UpdateAccessCode = (
	options: Omit<MutationOptions<any, UpdateAccessCodeMutationVariables>, 'mutation'>
) => {
	const m = client.mutate<UpdateAccessCodeMutation, UpdateAccessCodeMutationVariables>({
		mutation: UpdateAccessCodeDoc,
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
export const acceptedRiskCount = (
	options: Omit<WatchQueryOptions<AcceptedRiskCountQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<AcceptedRiskCountQuery> & {
		query: ObservableQuery<AcceptedRiskCountQuery, AcceptedRiskCountQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: AcceptedRiskCountDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<AcceptedRiskCountQuery> & {
			query: ObservableQuery<AcceptedRiskCountQuery, AcceptedRiskCountQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const AcceptedTicket = (
	options: Omit<WatchQueryOptions<AcceptedTicketQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<AcceptedTicketQuery> & {
		query: ObservableQuery<AcceptedTicketQuery, AcceptedTicketQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: AcceptedTicketDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<AcceptedTicketQuery> & {
			query: ObservableQuery<AcceptedTicketQuery, AcceptedTicketQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const AcceptedTickets = (
	options: Omit<WatchQueryOptions<AcceptedTicketsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<AcceptedTicketsQuery> & {
		query: ObservableQuery<AcceptedTicketsQuery, AcceptedTicketsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: AcceptedTicketsDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<AcceptedTicketsQuery> & {
			query: ObservableQuery<AcceptedTicketsQuery, AcceptedTicketsQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const CheckAccessCode = (
	options: Omit<WatchQueryOptions<CheckAccessCodeQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<CheckAccessCodeQuery> & {
		query: ObservableQuery<CheckAccessCodeQuery, CheckAccessCodeQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: CheckAccessCodeDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<CheckAccessCodeQuery> & {
			query: ObservableQuery<CheckAccessCodeQuery, CheckAccessCodeQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const CheckHospital = (
	options: Omit<WatchQueryOptions<CheckHospitalQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<CheckHospitalQuery> & {
		query: ObservableQuery<CheckHospitalQuery, CheckHospitalQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: CheckHospitalDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<CheckHospitalQuery> & {
			query: ObservableQuery<CheckHospitalQuery, CheckHospitalQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const GetAccessCode = (
	options: Omit<WatchQueryOptions<GetAccessCodeQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<GetAccessCodeQuery> & {
		query: ObservableQuery<GetAccessCodeQuery, GetAccessCodeQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: GetAccessCodeDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<GetAccessCodeQuery> & {
			query: ObservableQuery<GetAccessCodeQuery, GetAccessCodeQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const GetTicketsCount = (
	options: Omit<WatchQueryOptions<GetTicketsCountQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<GetTicketsCountQuery> & {
		query: ObservableQuery<GetTicketsCountQuery, GetTicketsCountQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: GetTicketsCountDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<GetTicketsCountQuery> & {
			query: ObservableQuery<GetTicketsCountQuery, GetTicketsCountQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
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

export const MyTicketSymptoms = (
	options: Omit<WatchQueryOptions<MyTicketSymptomsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<MyTicketSymptomsQuery> & {
		query: ObservableQuery<MyTicketSymptomsQuery, MyTicketSymptomsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: MyTicketSymptomsDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<MyTicketSymptomsQuery> & {
			query: ObservableQuery<MyTicketSymptomsQuery, MyTicketSymptomsQueryVariables>;
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

export const requestedRiskCount = (
	options: Omit<WatchQueryOptions<RequestedRiskCountQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<RequestedRiskCountQuery> & {
		query: ObservableQuery<RequestedRiskCountQuery, RequestedRiskCountQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: RequestedRiskCountDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<RequestedRiskCountQuery> & {
			query: ObservableQuery<RequestedRiskCountQuery, RequestedRiskCountQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const RequestedTicket = (
	options: Omit<WatchQueryOptions<RequestedTicketQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<RequestedTicketQuery> & {
		query: ObservableQuery<RequestedTicketQuery, RequestedTicketQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: RequestedTicketDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<RequestedTicketQuery> & {
			query: ObservableQuery<RequestedTicketQuery, RequestedTicketQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const RequestedTickets = (
	options: Omit<WatchQueryOptions<RequestedTicketsQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<RequestedTicketsQuery> & {
		query: ObservableQuery<RequestedTicketsQuery, RequestedTicketsQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: RequestedTicketsDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<RequestedTicketsQuery> & {
			query: ObservableQuery<RequestedTicketsQuery, RequestedTicketsQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const Test = (
	options: Omit<WatchQueryOptions<TestQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<TestQuery> & {
		query: ObservableQuery<TestQuery, TestQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: TestDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<TestQuery> & {
			query: ObservableQuery<TestQuery, TestQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};

export const TicketByNationalId = (
	options: Omit<WatchQueryOptions<TicketByNationalIdQueryVariables>, 'query'>
): Readable<
	ApolloQueryResult<TicketByNationalIdQuery> & {
		query: ObservableQuery<TicketByNationalIdQuery, TicketByNationalIdQueryVariables>;
	}
> => {
	const q = client.watchQuery({
		query: TicketByNationalIdDoc,
		...options
	});
	const result = readable<
		ApolloQueryResult<TicketByNationalIdQuery> & {
			query: ObservableQuery<TicketByNationalIdQuery, TicketByNationalIdQueryVariables>;
		}
	>({ data: null, loading: true, error: null, networkStatus: 1, query: null }, (set) => {
		q.subscribe((v) => {
			set({ ...v, query: q });
		});
	});
	return result;
};
