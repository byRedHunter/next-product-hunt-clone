import styled from '@emotion/styled'

export const Formulario = styled.form`
	max-width: 600px;
	width: 90%;
	margin: 0 auto;

	h1 {
		margin-bottom: 4rem;
		text-align: center;
	}

	fieldset {
		margin: 2rem 0;
		border: 0.1rem solid var(--naranja);
		padding: 2rem;
		legend {
			text-transform: uppercase;
			font-weight: 800;
		}
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
		font-family: 'PT Sans', serif;
		&[type='file'] {
			padding-left: 0;
		}
	}

	p {
		position: absolute;
		top: calc(100% + 0.5rem);
		left: 15rem;
		color: red;
	}

	textarea {
		height: 20rem;
		flex: 100%;
		font-family: 'PT Sans', serif;
		font-size: 1.6rem;
		padding: 1rem;
		outline: none;
	}

	@media screen and (min-width: 600px) {
		label {
			// si se encoge, si crece, with en flexbox
			flex: 0 0 15rem;
		}
		input,
		textarea {
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
