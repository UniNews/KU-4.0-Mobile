import { StyleSheet } from 'react-native'
import { viewportWidth, wp } from '../../../assets/javascripts/spacing'
import { BOLD_FONT, REGULAR_FONT } from '../../../assets/css/typography'

const circleWidth = viewportWidth + wp(50)
export default StyleSheet.create({
    containter: {
        flex: 1,
    },
    linearGradient: {
        width: circleWidth,
        borderBottomWidth: 3,
        borderEndWidth: 3,
        borderStartWidth: 3,
        borderColor: 'white',
        borderBottomLeftRadius: circleWidth / 2,
        borderBottomRightRadius: circleWidth / 2,
        shadowRadius: 2,
        shadowOffset: {
            width: 0,
            height: -3,
        },
        shadowColor: 'black',
        elevation: 5,
    },
    innerHeadContainer: {
        alignItems: 'center',
        paddingTop: 30,
        paddingBottom: 40
    },
    avatar: {
        width: 150,
        height: 150,
        borderRadius: 150 / 2,
        borderWidth: 2,
        borderColor: 'white',
        marginBottom: 10
    },
    headContainer: {
        alignItems: 'center',
    },
    name: {
        fontFamily: BOLD_FONT,
        fontSize: 30,
        color: 'white',
    },
    faculty: {
        fontFamily: REGULAR_FONT,
        fontSize: 20,
        color: 'white',
    },
    settingText: {
        fontFamily: REGULAR_FONT,
        fontSize: 15,
    },
    settingContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 20,
        borderBottomWidth: 0.5,
        borderColor: 'grey'
    },
    flagContainer: {
        flexDirection: 'row'
    },
    flagImage: {
        width: 30,
        height: 20,
        borderRadius: 2,
        marginHorizontal: 5
    },
    isFocused: {
        opacity: 0.2
    }
})