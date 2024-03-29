export enum BRAZIL_STATES {
	acre = "AC",
	alagoas = "AL",
	amapa = "AP",
	amazonas = "AM",
	bahia = "BA",
	ceara = "CE",
	distrito_federal = "DF",
	espirito_santo = "ES",
	goiania = "GO",
	maranhao = "MA",
	mato_grosso = "MT",
	mato_grosso_sul = "MS",
	minas_gerais = "MG",
	para = "PA",
	paraiba = "PB",
	parana = "PR",
	pernanbuco = "PE",
	piaui = "PI",
	rio_de_janeiro = "RJ",
	rio_grande_do_norte = "RN",
	rio_grande_do_sul = "RS",
	rondonia = "RO",
	roraima = "RR",
	santa_catarina = "SC",
	sao_paulo = "SP",
	sergipe = "SE",
	tocantins = "TO",
}

export enum ROLE_TYPE {
	admin = "ADMIN",
	back_office = "BACK_OFFICE",
	customer = "CUSTOMER",
	psychologist = "PSYCHOLOGIST",
}

export enum GENDER {
	male = "MALE",
	female = "FEMALE",
	other = "OTHER",
}

export enum APPOINTMENT_STATUS {
	ongoing = "ONGOING",
	canceled = "CANCELED",
	completed = "COMPLETED",
}
export enum NOTIFICATION_MESSAGE {
	WELCOME = "Seja bem vindo a plataforma.",
	CUSTOMER_ADD_PSICO = "Você adicionou um novo psicólogo(a).",
	CUSTOMER_SELECT_PSICO = "Você foi selecionado como favorito por um novo paciente.",
	CREATE_APPOINTMENT = "Um novo agendamento foi criado.",
	UPDATE_APPOINTMENT = "Um agendamento foi atualizado.",
	CREATE_REVIEW = "Você recebeu uma avaliação.",
}

export enum HTTP_STATUS_CODE {
	CONTINUE = 100,
	SWITCHING_PROTOCOLS = 101,
	PROCESSING = 102,
	OK = 200,
	CREATED = 201,
	ACCEPTED = 202,
	NON_AUTHORITATIVE_INFORMATION = 203,
	NO_CONTENT = 204,
	RESET_CONTENT = 205,
	PARTIAL_CONTENT = 206,
	MULTI_STATUS = 207,
	ALREADY_REPORTED = 208,
	IM_USED = 226,
	MULTIPLE_CHOICES = 300,
	MOVED_PERMANENTLY = 301,
	FOUND = 302,
	SEE_OTHER = 303,
	NOT_MODIFIED = 304,
	USE_PROXY = 305,
	SWITCH_PROXY = 306,
	TEMPORARY_REDIRECT = 307,
	PERMANENT_REDIRECT = 308,
	BAD_REQUEST = 400,
	UNAUTHORIZED = 401,
	PAYMENT_REQUIRED = 402,
	FORBIDDEN = 403,
	NOT_FOUND = 404,
	METHOD_NOT_ALLOWED = 405,
	NOT_ACCEPTABLE = 406,
	PROXY_AUTHENTICATION_REQUIRED = 407,
	REQUEST_TIMEOUT = 408,
	CONFLICT = 409,
	GONE = 410,
	LENGTH_REQUIRED = 411,
	PRECONDITION_FAILED = 412,
	PAYLOAD_TOO_LARGE = 413,
	URI_TOO_LONG = 414,
	UNSUPPORTED_MEDIA_TYPE = 415,
	RANGE_NOT_SATISFIABLE = 416,
	EXPECTATION_FAILED = 417,
	I_AM_A_TEAPOT = 418,
	MISDIRECTED_REQUEST = 421,
	UNPROCESSABLE_ENTITY = 422,
	LOCKED = 423,
	FAILED_DEPENDENCY = 424,
	UPGRADE_REQUIRED = 426,
	PRECONDITION_REQUIRED = 428,
	TOO_MANY_REQUESTS = 429,
	REQUEST_HEADER_FIELDS_TOO_LARGE = 431,
	UNAVAILABLE_FOR_LEGAL_REASONS = 451,
	INTERNAL_SERVER_ERROR = 500,
	NOT_IMPLEMENTED = 501,
	BAD_GATEWAY = 502,
	SERVICE_UNAVAILABLE = 503,
	GATEWAY_TIMEOUT = 504,
	HTTP_VERSION_NOT_SUPPORTED = 505,
	VARIANT_ALSO_NEGOTIATES = 506,
	INSUFFICIENT_STORAGE = 507,
	LOOP_DETECTED = 508,
	NOT_EXTENDED = 510,
	NETWORK_AUTHENTICATION_REQUIRED = 511,
}

export enum RedisKeys {
	LIST_PSICO = "LIST-PSICO",
	PSICO_LIST_CUSTOMERS = "PS-LIST-CUSTOMERS",
	ME = "WHOIAM",
	LIST_APPOINTMENTS = "LIST-APPOINTMENTS",
	LIST_APPOINTMENTS_BY_CUSTOMER = "LIST-APPOINTMENTS-BY-CUSTOMER",
	LIST_APPOINTMENTS_BY_PSICO = "LIST-APPOINTMENTS-BY-PSICO",
	LIST_REVIEWS = "LIST-REVIEWS",
	LIST_NOTIFICATIONS = "LIST-NOTIFICATIONS",
}
