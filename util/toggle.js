import React from 'react'

export default (cb, bool) => {
  class Toggle extends React.Component {
    constructor (props) {
      super (props)

      this.state = {
        toggle: !!bool || false
      }
    }

    render () {
      return cb(this.state.toggle, (newState) => this.setState({toggle: !!newState}))
    }
  }

  return <React.Fragment>
    <Toggle />
  </React.Fragment>
}