import { StyleSheet } from 'react-native';
import { PRIMARY_COLOR } from '../../assets/css/color'
import { wp, viewportWidth } from '../../assets/javascripts/spacing'
import { REGULAR_FONT } from '../../assets/css/typography'

const textInputContainerHorizontalMargin = viewportWidth - wp(20);
export default StyleSheet.create({
    container: {
        // flex: 1
    },
    newsImage: {
        height: 250,
        width: null,
        resizeMode: 'cover'
    },
    topIconContainer: {
        alignItems: 'center',
        flexDirection: 'row-reverse',
        padding: 10
    },
    heartIcon: {
        paddingHorizontal: 16
    },
    posterText: {
        fontSize: 15,
        fontFamily: 'Kanit-Light'
    },
    titleText: {
        fontSize: 25,
        fontFamily: 'Kanit-Regular'
    },
    innerTitleContainer: {
        paddingHorizontal: 10
    },
    titleContainer: {
        borderLeftColor: PRIMARY_COLOR,
        borderLeftWidth: 4,
    },
    dateIconContainer: {
        paddingTop: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    dateText: {
        paddingLeft: 5,
        fontSize: 13,
        fontFamily: 'Kanit-Light',
    },
    newsInfoText: {
        fontFamily: 'Kanit-Light',
        fontSize: 15
    },
    commentHeaderRow: {
        flexDirection: 'row',
        alignItems: 'center'
    },
    gapButton: {
        marginLeft: 10
    },
    hr: {
        marginVertical: 20
    },
    textInputContainer: {
        marginVertical: 5,
        flexDirection: 'row',
        backgroundColor: 'white',
        borderRadius: 10,
        height: 50,
        width: textInputContainerHorizontalMargin
    },
    inputContainer: {
        alignItems: 'center',
    },
    textInputs: {
        fontSize: 16,
        fontFamily: REGULAR_FONT,
        color: 'white'
    }
});