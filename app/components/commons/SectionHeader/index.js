import React, { Component } from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
import { Feather } from '@expo/vector-icons'

class SectionHeader extends Component {

  constructor(props) {
    super(props)
  }

  render() {
    const { subtitle, title, style } = this.props
    return <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {
        subtitle ?
          <View style={styles.iconContainer}>
            <Text style={styles.subtitle}>{subtitle} </Text>
            <Feather name={'chevron-right'} size={22} color={'gray'} />
          </View>
          : null
      }
    </View >
  }
}

SectionHeader.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string,
}

export default SectionHeader