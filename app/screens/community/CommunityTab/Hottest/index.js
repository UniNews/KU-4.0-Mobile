import React from 'react'
import { View, ActivityIndicator, FlatList } from 'react-native'
import styles from './styles'
import Thread from '../../../../components/community/Thread'
import communityService from '../../../../services/news'
import Spinner from '../../../../components/commons/Spinner'
import { PRIMARY_COLOR } from '../../../../assets/css/color'
import { connect } from 'react-redux'
import { showModal } from '../../../../reducers/ErrorModalReducer/actions'

class HottestView extends React.Component {

    constructor(props) {
        super(props)
        this.page = 1
        this.onEndReachedCalledDuringMomentum = false
        this.state = {
            communities: [],
            error: false,
            loading: true,
            fetching: false,
            refreshing: false
        }
    }

    async fetchCommunities() {
        try {
            const res = await communityService.getHottestCommunities(this.page)
            this.setState({
                communities: this.page === 1 ? res.data.articles
                    : [
                        ...this.state.communities,
                        ...res.data.articles.filter(n => !this.state.communities.some(p => p._id === n._id))
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
            this.props.showModal()
        }
    }

    componentDidMount() {
        this.fetchCommunities()
    }

    renderItem = ({ item }) => {
        return <Thread style={styles.threadContainer} key={item._id} data={item} navigation={this.props.navigation} />
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
        this.setState({ refreshing: true, communities: [] })
        this.page = 1
        this.fetchCommunities()
    }

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState({ fetching: true })
            this.page += 1
            this.fetchCommunities()
            this.onEndReachedCalledDuringMomentum = true
        }
    }

    render() {
        const { communities, refreshing, loading } = this.state
        return (
            <View style={styles.containter}>
                {
                    loading
                        ?
                        <Spinner />
                        :
                        <View>
                            <FlatList
                                contentContainerStyle={styles.contentContainer}
                                refreshing={refreshing}
                                onRefresh={this.onRefresh}
                                keyExtractor={(community) => community._id}
                                data={communities}
                                initialNumToRender={10}
                                renderItem={this.renderItem}
                                ListFooterComponent={this.renderFooter}
                                onEndReachedThreshold={0.5}
                                onEndReached={this.onEndReached}
                                onMomentumScrollBegin={() => {
                                    this.onEndReachedCalledDuringMomentum = false
                                }}
                            />
                        </View>
                }
            </View>
        )
    }
}

const mapStateToProps = (state) => {
    return {
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        showModal
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(HottestView)