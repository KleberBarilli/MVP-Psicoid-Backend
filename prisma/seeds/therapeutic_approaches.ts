import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const approachesSeeder = () => {
	return prisma.therapeuticApproache.createMany({
		data: [
			{
				name: "Analítica de Jung",
				description:
					"A psicologia analítica utiliza uma abordagem que propõe o entendimento do inconsciente. Dessa forma, possui como método a compreensão de símbolos e arquétipos presentes na vida das pessoas, além da análise de sonhos dos pacientes.",
			},
			{
				name: "Centrada na Pessoa",
				description:
					"Nessa abordagem, os clientes conduzem a discussão, então, cabe ao psicólogo interpretar as experiências do indivíduo de acordo com a perspectiva do paciente, e não do profissional. Cria-se um ambiente de não julgamento e empatia durante as sessões.",
			},
			{
				name: "Cognitiva Comportamental",
				description:
					"A terapia cognitiva comportamental procura identificar e modificar padrões de pensamentos e comportamentos disfuncionais. Sendo assim, o psicólogo compreende as emoções envolvidas em tais cenários e trabalha na alteração de significado de situações problemáticas.",
			},
			{
				name: "Corporal Reichiana",
				description:
					"A Terapia Corporal Reichiana apresenta como principal fundamento a própria consciência do corpo. Sendo assim, o psicólogo irá analisar o comportamento do paciente através de um trabalho verbal associado a utilização e percepção das sensações do corpo.",
			},
			{
				name: "Fenomenológica Existencial",
				description:
					"A Terapia Fenomenológica Existencial preocupa-se com a percepção da estrutura do ser humano. Então, é realizado um trabalho de compreensão do cliente a partir dele mesmo e também da forma como vive. Na psicoterapia, o indivíduo entende o papel que possui, valorizando a sua existência.",
			},
			{
				name: "Gestalt",
				description:
					"A terapia Gestalt concentra os esforços em compreender o presente dos pacientes. Então, ao invés de tratar sobre situações passadas, essa abordagem procura entender o que está acontecendo no agora das pessoas.",
			},
			{
				name: "Humanista",
				description:
					"Nessa abordagem, o psicólogo valoriza a autonomia do paciente e entende que este possui um papel fundamental no próprio desenvolvimento. A psicologia humanista foca no potencial da pessoa e ressalta a importância do crescimento e auto realização.",
			},
			{
				name: "Positiva",
				description:
					"A Psicologia Positiva visa compreender o que torna a vida mais digna de ser vivida. Dessa forma, traz uma abordagem que foca nos pontos fortes das pessoas ao invés das fraquezas. Trata-se de uma visão que busca observar os potenciais e motivações das capacidades humanas.",
			},
			{
				name: "Psicanalítica",
				description:
					"A abordagem psicanalítica procura compreender os pensamentos inconscientes das pessoas através da livre associação. O profissional adota uma postura mais silenciosa e dá abertura ao paciente conduzir o ritmo da sessão. Além disso, o indivíduo realiza a projeção de situações na figura do psicólogo.",
			},
			{
				name: "Psicodrama",
				description:
					"O Psicodrama utiliza da simulação e do jogo teatral, como forma de reviver determinadas situações, para entender as disposições mentais do paciente. Dessa forma, conta com várias técnicas para ajudar na dramatização e incorporação do paciente na cena.",
			},
			{
				name: "Sistêmica",
				description:
					"A terapia sistêmica realiza uma análise que vai além do indivíduo, pois ela examina as relações interpessoais para compreender o sujeito. Sendo assim, o profissional irá dar atenção aos padrões que aparecem na dinâmica familiar e nos diversos relacionamentos da pessoa. Ou seja, procura entender o paciente dentro de um sistema de relacionamentos.",
			},
			{
				name: "Transpessoal",
				description:
					"Nessa abordagem, a terapia irá trabalhar também os aspectos espirituais da pessoa. Então, além de focar no aspecto mental, o psicólogo irá utilizar de técnicas para ajudar o paciente a compreender a sua dimensão pessoal e encontrar a plenitude de seu potencial.",
			},
		],
	});
};
