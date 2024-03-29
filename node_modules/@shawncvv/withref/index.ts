import React from 'react'

export const withRef = (WrappedComponent: any): any => {
  const { name, displayName } = WrappedComponent

  return class WithRef extends React.Component {
    static displayName = `withRef(${displayName || name || 'Component'})`

    render() {
      const props: any = { ...this.props }
      const { getInstance } = props
      if (typeof getInstance === 'function') {
        props.ref = getInstance
      }
      return <WrappedComponent {...props} />
    }
  }
}
