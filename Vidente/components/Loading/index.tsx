import React from 'react'
import { ActivityIndicator } from 'react-native'

import { LoadingArea } from './styles'

const Loading = () => {
  return (
    <LoadingArea>
      <ActivityIndicator size='large' color='#8c14fc' />
    </LoadingArea>
  )
}

export default Loading
