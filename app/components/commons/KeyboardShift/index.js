import React, { Component } from 'react'
import { Animated, Dimensions, Keyboard, TextInput, UIManager, } from 'react-native'
import styles from './styles'

const { State: TextInputState } = TextInput

export default class KeyboardShift extends Component {

    state = {
        shift: new Animated.Value(0),
    }

    componentDidMount() {
        this.keyboardDidShowSub = Keyboard.addListener('keyboardDidShow', this.handleKeyboardDidShow)
        this.keyboardDidHideSub = Keyboard.addListener('keyboardDidHide', this.handleKeyboardDidHide)
    }

    componentWillUnmount() {
        this.keyboardDidShowSub.remove()
        this.keyboardDidHideSub.remove()
    }

    render() {
        const { children } = this.props
        const { shift } = this.state
        return (
            <Animated.View style={[styles.container, { transform: [{ translateY: shift }] }]}>
                {children}
            </Animated.View >
        )
    }

    handleKeyboardDidShow = (event) => {
        const { height: windowHeight } = Dimensions.get('window')
        const keyboardHeight = event.endCoordinates.height
        const currentlyFocusedField = TextInputState.currentlyFocusedField()
        UIManager.measure(currentlyFocusedField, (originX, originY, width, height, pageX, pageY) => {
            const fieldHeight = height
            const fieldTop = pageY
            const gap = (windowHeight - keyboardHeight) - (fieldTop + fieldHeight) - 50
            if (gap >= 0)
                return
            Animated.timing(
                this.state.shift,
                {
                    toValue: gap,
                    duration: 100,
                    useNativeDriver: true,
                }
            ).start()
        })
        if (this.props.keyboardDidShow)
            this.props.keyboardDidShow()
    }

    handleKeyboardDidHide = () => {
        Animated.timing(
            this.state.shift,
            {
                toValue: 0,
                duration: 100,
                useNativeDriver: true,
            }
        ).start()
        if (this.props.keyboardDidHide)
            this.props.keyboardDidHide()
    }
}