import { Global, css } from '@emotion/react'
import React from 'react'
import Header from './Header'
import Head from 'next/head'

const Layout = (props) => {
	return (
		<>
			<Head>
				<title>Next || Product Hunt</title>
			</Head>

			<Header />

			<main>{props.children}</main>
		</>
	)
}

export default Layout
