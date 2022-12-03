export class NewsletterEmailTemplate {
	static message(name: string) {
		return `
		<!DOCTYPE html>
		<html lang="en">
		<head>
				<meta charset="UTF-8">
				<meta http-equiv="X-UA-Compatible" content="IE=edge">
				<meta name="viewport" content="width=device-width, initial-scale=1.0">
				<title>PsicoID</title>
		</head>
		<style>

				@media screen and (max-width: 620px) {
						table.body h1 {
							font-size: 26px;
							margin-bottom: 10px !important;
						}
						table.body p,
						table.body ul,
						table.body ol,
						table.body td,
						table.body span,
						table.body a {
							font-size: 16px !important;
						}
						.title {
								padding-bottom: 4rem;
						}
						table.body .wrapper,
						table.body .article {
							padding: 20px !important;
						}
						table.body .content {
							padding: 0 !important;
						}
						table.body .container {
							padding: 0 !important;
							width: 100% !important;
						}
						table.body .main {
							border-left-width: 0 !important;
							border-radius: 0 !important;
							border-right-width: 0 !important;
						}
						table.body .btn table {
							width: 100% !important;
						}
						table.body .btn a {
							width: 100% !important;
						}
						table.body .img-responsive {
							height: auto !important;
							max-width: 100% !important;
							width: auto !important;
						}

						.sobreNos {
								margin-top: 3rem;
								margin-bottom: 1rem;
								border-top-color: #fff;
								border-top-width: 0.8px;
								border-top-style: solid;
						}

						.sobreNos > h1 {
								font-size: 1rem !important;
								color: #fff;
								margin-top: 2rem;
						}

						.sobreNos > h2 {
								font-size: 0.7rem;
								color: #fff;
								font-weight: normal;
						}
					}



					/* -------------------------------------
							PRESERVE THESE STYLES IN THE HEAD
					------------------------------------- */
					@media all {
						.ExternalClass {
							width: 100%;
						}
						.ExternalClass,
						.ExternalClass p,
						.ExternalClass span,
						.ExternalClass font,
						.ExternalClass td,
						.ExternalClass div {
							line-height: 100%;
						}
					}

		</style>
		<body style="background-color:#000;font-family:sans-serif;-webkit-font-smoothing:antialiased;line-height:1.4;margin:0;padding:0;-ms-text-size-adjust: 100%;-webkit-text-size-adjust: 100%;">
				<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;border-collapse:separate;mso-table-lspace:0pt;mso-table-rspace:0pt;width:100%;">
						<tr>
								<td style="font-family:sans-serif; vertical-align:top; display:block; margin: 0 auto !important; max-width: 580px; padding: 10px; width: 580px;">
										<div style="box-sizing: border-box;display: block;margin: 0 auto;max-width: 580px;padding: 10px;">
												<table style="border-radius:3px;width:100%;" role="presentation">
														<tr>
																<td style="box-sizing: border-box;padding: 1.3px;background-color: #000;">
																		<table role="presentation" border="0" cellpadding="0" cellspacing="0">
																				<tr>
																						<td>
																								<div style="width: 100%; display: flex;align-items: center;justify-content: center;">
																										<img style="width: 16rem;height: 15rem;" src="https://digital-inspires-public.s3.amazonaws.com/images/Logo+fundo+transparente.png" />
																								</div>
																								<h1 style="font-size: 2.5rem;font-weight: bold;color: #fff;margin-bottom: 4rem;margin-top: -5px">Você está<br> conectado conosco!</h1>
																								<p style="font-size: 1rem;color: #fff;margin-bottom: 1.2rem;">Olá ${name},</p>
																								<p style="font-size: 1rem;color: #fff;margin-bottom: 1.2rem;">Você acabou de se conectar com o melhor aplicativo de agendamento e busca de psicólogos, o PsicoID!</p>
																								<p style="font-size: 1rem;color: #fff;margin-bottom: 1.2rem;">Estamos enviando informações sobre o avanço do aplicativo para você através do seu e-mail. Queremos te deixar atualizado ao máximo sobre todas as novidades, que serão lançadas em breve através desse super APP, que irá conectar o mundo dos psicólogos e de seus clientes de um jeito simples, fácil e muito mais profissional!</p>
																								<p style="font-size: 1rem;color: #fff;margin-bottom: 1.2rem;">Vale informar que sua assinatura é meramente informativa e totalemente gratuita. Queremos você atento sobre essas novidades apenas :)</p>

																								<div style="margin-top: 3rem;">
																										<h3 style="font-size: 0.8rem;color: #757575">
																												Quer entender de perto nosso aplicativo ou fazer uma parceria?
																										</h3>
																										<h3 style="font-size: 0.8rem;color: #757575">
																												Entre em contato com nossos desenvolvedores e líderes através do contato a abaixo, certamente seremos muito atenciosos com você!
																										</h3>
																								</div>
																								<div class="sobreNos" style="width: 100%;margin-top: 3rem; margin-bottom: 1rem;border-top-color: #fff;border-top-width: 1px;border-top-style: solid;">
																										<h1 style="font-size: 1rem;color: #fff;margin-top: 2rem;">Equipe PsicoID</h1>
																										<h2 style="font-size: 0.7rem;color: #fff;font-weight: normal;margin-top: 1rem;">contato@psicoid.com.br</h2>
																								</div>
																						</td>
																				</tr>
																		</table>
																</td>
															</tr>
												</table>
										</div>
								</td>
							</tr>
				</table>
		</body>
		</html>`;
	}
}
