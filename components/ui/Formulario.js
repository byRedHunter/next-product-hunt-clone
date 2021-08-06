import styled from '@emotion/styled'

export const Formulario = styled.form`
	max-width: 600px;
	width: 90%;
	margin: 0 auto;

	h1 {
		margin-bottom: 4rem;
		text-align: center;
	}
`

export const Campo = styled.div`
	margin-bottom: ${(props) => (props.error ? '4rem' : '2rem')};
	display: flex;
	align-items: center;
	position: relative;
	flex-wrap: wrap;

	label {
		// si se encoge, si crece, with en flexbox
		flex: 100%;
		font-size: 1.8rem;
	}

	input {
		flex: 100%;
		padding: 1rem;
		outline: none;
	}

	p {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 15rem;
		color: red;
	}

	@media screen and (min-width: 600px) {
		label {
			// si se encoge, si crece, with en flexbox
			flex: 0 0 15rem;
		}
		input {
			flex: 1;
		}
	}
`

export const InputSubmit = styled.input`
	background-color: var(--naranja);
	width: 100%;
	padding: 1.5rem;
	text-align: center;
	color: #fff;
	font-size: 1.8rem;
	text-transform: uppercase;
	border: none;
	font-family: 'PT Sans', serif;
	font-weight: 700;
	cursor: pointer;
`
