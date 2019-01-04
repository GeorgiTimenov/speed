import React from 'react'
import Router from 'next/router'

export default class extends React.Component {
  static async getInitialProps({ res }) {
    if (res) {
      res.writeHead(302, {
        Location: 'https://au.flayr.io/pages/jobs-for-makeup-artists'
      })
      res.end()
    } else {
      Router.push('https://au.flayr.io/pages/jobs-for-makeup-artists')
    }
    return {}
  }
}