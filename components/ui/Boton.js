import styled from '@emotion/styled'

const Boton = styled.a`
	font-weight: 700;
	text-transform: uppercase;
	border: 0.1rem solid #d1d1d1;
	padding: 0.8rem 2rem;
	margin-right: 1rem;
	background-color: ${(props) => (props.bgColor ? '#da552f' : 'white')};
	color: ${(props) => (props.bgColor ? 'white' : '#da552f')};
	cursor: pointer;

	&:last-of-type {
		margin-right: 0;
	}
`

export default Boton
