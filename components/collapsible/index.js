import React from 'react'

export default class Collapsible extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      open: this.props.open || false
    }
  }

  render () {
    const {title} = this.props
    return (
      <div className='collapsible'>
        <style jsx>{`
          .content {
            display: ${this.state.open ? 'block' : 'none'};
          }

          .container {
            width: 100%;
          }

          @media (min-width: 48rem) {
            .container {
              width: 35rem;
            }
          }
        `}</style>
        <div className='container'>
          <div className='head' onClick={() => this.setState({open: !this.state.open})}>
            <span className='arrow'>{this.state.open ? String.fromCharCode(9660) : String.fromCharCode(9658)} {title}</span>
          </div>
          <div className='content'>
            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}