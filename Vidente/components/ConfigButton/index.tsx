import { TouchableOpacity } from 'react-native'
import { AntDesign } from '@expo/vector-icons'

type Props = {
  onPress: () => void
}

const ConfigButton = ({ onPress }: Props) => {
  return (
    <TouchableOpacity onPress={() => onPress()}>
      <AntDesign name='setting' size={24} color='black' />
    </TouchableOpacity>
  )
}

export default ConfigButton
