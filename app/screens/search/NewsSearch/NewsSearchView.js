import React from 'react'
import { Text, View, ActivityIndicator, ScrollView, Keyboard } from 'react-native'
import styles from './styles'
import { PRIMARY_COLOR } from '../../../assets/css/color'
import NewsCard from '../../../components/news/NewsThread'
import Hr from '../../../components/commons/Hr'

class NewsSearchNews extends React.Component {

    constructor(props) {
        super(props)
    }

    goNews = (newsId) => {
        this.props.navigation.push('NewsDetail', { newsId })
    }

    render() {
        const { loading, news, error, query } = this.props
        return (
            <View style={styles.container}>
                <ScrollView onScroll={() => Keyboard.dismiss()}>
                    {
                        loading ?
                            <View style={styles.indicatorContainer}>
                                <Text style={styles.indicatorText}>
                                    กำลังค้นหา...
                            </Text>
                                <View style={styles.spinner}>
                                    <ActivityIndicator color={PRIMARY_COLOR} size={17} />

                                </View>
                            </View>
                            :
                            news?.length > 0 ?
                                news.map((news) => {
                                    return (
                                        <View key={news._id} style={styles.newsContainer}>
                                            <Hr />
                                            <NewsCard onNewsPressed={this.goNews} data={news} />
                                        </View>
                                    )
                                })
                                :
                                <View style={styles.indicatorContainer}>
                                    <Text style={styles.indicatorText}>
                                        {'ไม่พบผลลัพธ์สำหรับ '}
                                    </Text>
                                    <Text style={styles.queryText}>
                                        {query}
                                    </Text>
                                </View>
                    }
                </ScrollView>
            </View >
        )
    }
}

export default NewsSearchNews