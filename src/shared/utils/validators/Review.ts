import * as yup from 'yup'

interface IReviewForm {
	rating: number
	comment: string | null
}

export const validateReview = (review: IReviewForm) =>
	yup
		.object()
		.shape({
			rating: yup
				.number()
				.min(1, 'Nota mínima é 1')
				.max(5, 'Nota máxima é 5')
				.required('A nota é obrigatória'),
			comment: yup.string().notRequired(),
		})
		.validate(review, { abortEarly: false, stripUnknown: true })
