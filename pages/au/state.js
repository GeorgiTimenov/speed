import React, { Component } from 'react'
import Head from 'next/head'


export default class extends Component {
  static getInitialProps ({ query}) {
    return {state: query.state, country: query.country }
  }
  render () {
    return (
      <div>
        <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
        <link rel="shortcut icon" href="//cdn.shopify.com/s/files/1/1665/4771/files/favicon_flayr_mobile_makeupartists_and_hair_stylists_32x32.png?v=1536803770" type="image/png" />
        <title>FLAYR | Mobile Makeup Artists & Hair Stylists</title>
        </Head>
        page for {this.props.state} {this.props.country}
      </div>
    )
    
  }
}