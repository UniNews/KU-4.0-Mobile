import React from 'react'
import { FlatList, View, ActivityIndicator, Text } from 'react-native'
import styles from './styles'
import NewsCard from '../../../../components/news/NewsThread'
import searchService from '../../../../services/search'
import { PRIMARY_COLOR } from '../../../../assets/css/color'

class NewsSearchView extends React.Component {

    constructor(props) {
        super(props)
        this.page = 1
        this.onEndReachedCalledDuringMomentum = false
        this.state = {
            news: [],
            error: false,
            fetching: false,
            refreshing: false,
            loading: false
        }
    }

    componentDidUpdate(prevProps) {
        const { query } = this.props
        if (query && prevProps.query != query) {
            this.page = 1
            this.setState({
                loading: true
            })
            this.fetchNews()
        }
    }

    renderItem = ({ item }) => {
        return <View key={item._id} style={styles.newsContainer}>
            <NewsCard onNewsPressed={this.goNews} data={item} />
        </View>
    }

    async fetchNews() {
        try {
            const { query } = this.props
            const res = await searchService.getNewsByTitle(query, this.page)
            this.setState({
                news: this.page === 1 ? res.data.articles : [
                    ...this.state.news,
                    ...res.data.articles.filter(n => !this.state.news.some(p => p._id === n._id))
                ],
                error: false,
                loading: false,
                fetching: false,
                refreshing: false
            })
        }
        catch (err) {
            this.setState({
                error: true,
                loading: false,
                fetching: false,
                refreshing: false
            })
            const { showModal } = this.props
            showModal()
        }
    }

    renderFooter = () => {
        if (!this.state.fetching)
            return null
        return (
            <ActivityIndicator
                color={PRIMARY_COLOR}
            />
        )
    }

    onRefresh = () => {
        this.setState({ refreshing: true, news: [] })
        this.page = 1
        this.fetchNews()
    }

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState({ fetching: true })
            this.page += 1
            this.fetchNews()
            this.onEndReachedCalledDuringMomentum = true
        }
    }

    goNews = (newsId) => {
        this.props.navigation.push('NewsDetail', { newsId })
    }

    goBack = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    renderEmpty = () => {
        const { query } = this.props
        return (
            query !== '' ?
                <View style={styles.textContainer}>
                    <Text style={styles.indicatorText}>
                        ไม่พบข่าวสำหรับ
                </Text>
                    <Text style={styles.queryText}>
                        {` ${query}`}
                    </Text>
                </View>
                :
                null
        )
    }

    render() {
        const { news, loading, refreshing } = this.state
        return (
            <View style={styles.containter}>
                {
                    loading
                        ?
                        <View style={styles.textContainer}>
                            <Text style={styles.indicatorText}>
                                {`กำลังค้นหาข่าว... `}
                            </Text>
                            <View>
                                <ActivityIndicator color={PRIMARY_COLOR} />
                            </View>
                        </View>
                        :
                        <FlatList
                            ListEmptyComponent={this.renderEmpty}
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            keyExtractor={(news) => news._id}
                            data={news}
                            initialNumToRender={10}
                            renderItem={this.renderItem}
                            ListFooterComponent={this.renderFooter}
                            onEndReachedThreshold={0.5}
                            onEndReached={this.onEndReached}
                            onMomentumScrollBegin={() => {
                                this.onEndReachedCalledDuringMomentum = false
                            }}
                        />
                }
            </View>
        )
    }
}

export default NewsSearchView