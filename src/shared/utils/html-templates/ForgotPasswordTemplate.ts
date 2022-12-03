export default class ForgotPasswordTemplate {
	static message(code: string) {
		return `<p> Redefina a sua senha utilizando esse código ${code} </p>`;
	}
}
