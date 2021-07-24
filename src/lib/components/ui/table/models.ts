export interface TableHeader {
	field: string;
	label?: string;
	direction?: 'ASC' | 'DESC';
}

export interface TableData {
	[key: string]: string | string[];
}
