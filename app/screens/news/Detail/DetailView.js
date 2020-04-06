import React from 'react'
import { Text, View, ImageBackground, Image, Linking, ScrollView, TouchableOpacity, TouchableWithoutFeedback } from 'react-native'
import styles from './styles'
import Hyperlink from 'react-native-hyperlink'
import { FontAwesome, Feather } from '@expo/vector-icons'
import Hr from '../../../components/commons/Hr'
import Header from '../../../components/commons/Header'
import StatusBar from '../../../components/commons/StatusBar'
import newsService from '../../../services/news'
import { convertTimestamptoDate } from '../../../assets/javascripts/date'
import Spinner from '../../../components/commons/Spinner'

class DetailView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            news: {},
            isLoading: true,
        }
    }

    async componentDidMount() {
        const newsId = this.props.navigation.state.params.newsId
        try {
            const result = await newsService.getNewsById(newsId)
            this.setState({
                news: result.data,
                isLoading: false
            })
        }
        catch (err) {
            this.setState({
                news: {},
                isLoading: false
            })
        }

    }

    goBack = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    goProfile = () => {
        const { navigation } = this.props
        const { news } = this.state
        navigation.push('ProfileDetail', {
            userId: news.author._id
        })
    }

    goComments = () => {
        const newsId = this.props.navigation.state.params.newsId
        this.props.navigation.push('Comment', { newsId: newsId })
    }

    render() {
        const { news, isLoading } = this.state
        return (
            <View style={styles.container}>
                <StatusBar />
                <Header title={'ข่าวมหาลัย'} leftIconComponent={
                    <Feather color='white' onPress={this.goBack} size={28} name={'chevron-left'} />
                } />
                {
                    !isLoading ?
                        <ScrollView >
                            <ImageBackground style={styles.newsImage}
                                source={{ uri: news.imageURL }} >
                            </ImageBackground>
                            <View style={styles.topContainer}>
                                <View style={styles.titleContainer}>
                                    <TouchableWithoutFeedback onPress={this.goProfile}>
                                        <Image
                                            style={styles.imageAvatar}
                                            source={{ uri: news.author.avatarURL }}
                                        />
                                    </TouchableWithoutFeedback>
                                    <View style={styles.innerTitleContainer}>
                                        <Text style={styles.posterText}>
                                            {news.author.displayName}
                                        </Text>
                                        <Text style={styles.titleText}>
                                            {news.title}
                                        </Text>
                                        <View style={styles.iconContainer}>
                                            <View style={styles.textIconContainer}>
                                                <FontAwesome name='calendar' size={15} color='grey' />
                                                <Text style={styles.iconText}>
                                                    {convertTimestamptoDate(news.createdAt)}
                                                </Text>
                                            </View>
                                            {
                                                <TouchableOpacity
                                                    onPress={this.goComments}
                                                    style={styles.textIconContainer}>
                                                    <FontAwesome name='commenting-o' size={18} color='grey' />
                                                    <Text style={styles.iconText}>
                                                        {this.state.news.comments.length} ความเห็น
                                                        </Text>
                                                </TouchableOpacity>
                                            }
                                        </View>
                                    </View>
                                </View>
                                <Hr style={styles.hr} />
                                <View>
                                    <Text style={styles.descriptionHeaderText}>
                                        รายละเอียด
                                    </Text>
                                    <Hyperlink style={{ paddingBottom: 100 }} linkStyle={{ textDecorationLine: 'underline', color: 'green', fontFamily: 'Kanit-Regular' }} onPress={(url, text) => Linking.openURL(url)}>
                                        <Text style={styles.newsInfoText}>
                                            {news.description}
                                        </Text>
                                    </Hyperlink>
                                </View>
                            </View>
                        </ScrollView>
                        :
                        <Spinner />
                }
            </View>
        );
    }
}

export default DetailView;