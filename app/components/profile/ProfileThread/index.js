import React, { Component } from 'react'
import { View, Image, Text } from 'react-native'
import styles from './styles'
import PropTypes from 'prop-types'
import Button from '../../commons/Button'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'

class ProfileThread extends Component {

    constructor(props) {
        super(props)
    }

    onButtonPressedHandler = () => {
        const { onFollowPressed, data } = this.props
        if (onFollowPressed)
            onFollowPressed(data.id)
    }

    onProfilePressedHandler = () => {
        const { onProfilePressed, data } = this.props
        if (onProfilePressed)
            onProfilePressed(data.id)
    }

    render() {
        const { data, following } = this.props
        return (
            <View>
                <View style={styles.container}>
                    <View style={styles.leftContainer}>
                        <TouchableWithoutFeedback onPress={this.onProfilePressedHandler}>
                            <Image
                                source={{ uri: data.avatarURL }}
                                style={styles.avatar}
                            />
                        </TouchableWithoutFeedback>
                        <TouchableWithoutFeedback onPress={this.onProfilePressedHandler}>
                            <Text numberOfLines={1} style={styles.nameText}>
                                {data.displayName}
                            </Text>
                        </TouchableWithoutFeedback>
                    </View>
                    <View style={styles.rightContainer}>
                        {
                            following
                                ?
                                <Button style={styles.followingButton} rounded onPress={this.onButtonPressedHandler}>
                                    <Text style={styles.followingText}>
                                        กำลังติดตาม
                                    </Text>
                                </Button>
                                :
                                <Button style={styles.followButton} rounded onPress={this.onButtonPressedHandler}>
                                    <Text style={styles.followText}>
                                        ติดตาม
                                    </Text>
                                </Button>

                        }

                    </View>
                </View>
            </View>
        )
    }
}

ProfileThread.propTypes = {
    data: PropTypes.shape({
        id: PropTypes.number.isRequired,
        displayName: PropTypes.string.isRequired,
        avatarURL: PropTypes.string.isRequired,
    }).isRequired,
    following: PropTypes.bool,
    onProfilePressed: PropTypes.func,
    onFollowPressed: PropTypes.func
}

ProfileThread.defaultProps = {
    data: {
        id: null,
        displayName: '',
        avatarURL: '',
    },
}

export default ProfileThread