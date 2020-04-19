import React from 'react'
import { View, TouchableWithoutFeedback, FlatList, ActivityIndicator } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import Header from '../../../components/commons/Header'
import ProfileThread from '../../../components/profile/ProfileThread'
import userService from '../../../services/user'
import Spinner from '../../../components/commons/Spinner'
import { PRIMARY_COLOR } from '../../../assets/css/color'

class FollowerView extends React.Component {

    constructor(props) {
        super(props)
        this.page = 1
        this.onEndReachedCalledDuringMomentum = false
        this.state = {
            followers: [],
            loading: true,
            error: false,
            fetching: false,
            refreshing: false,
        }
    }

    follow = (profile) => {
        profile.isFollowing = !profile.isFollowing
        this.setState({ followers: this.state.followers })
        if (profile.isFollowing)
            userService.followUserById(profile._id)
        else
            userService.unfollowUserById(profile._id)
    }

    goProfile = (id) => {
        const { navigation } = this.props
        navigation.push('ProfileDetail', {
            userId: id
        })
    }

    goBack = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    componentDidMount() {
        this.fetchFollowers()
    }

    async fetchFollowers() {
        try {
            const { userId } = this.props.navigation.state.params
            const res = await userService.getUserFollowers(userId, this.page)
            this.setState({
                followers: this.page === 1 ? res.data.followers : [...this.state.followers, ...res.data.followers],
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

    onEndReached = () => {
        if (!this.onEndReachedCalledDuringMomentum) {
            this.setState({ fetching: true })
            this.page += 1
            this.fetchFollowers()
            this.onEndReachedCalledDuringMomentum = true
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

    renderItem = ({ item }) => {
        return <View style={styles.profileThreadContainer} key={item._id}>
            <ProfileThread following={item.isFollowing} onFollowPressed={this.follow} onProfilePressed={this.goProfile} data={item} />
        </View>
    }

    onRefresh = () => {
        this.setState({ refreshing: true })
        this.page = 1
        this.fetchFollowers()
    }

    render() {
        const { followers, loading, refreshing } = this.state
        return (
            <View style={styles.containter}>
                <Header title={'ผู้ติดตาม'} leftIconComponent={
                    <TouchableWithoutFeedback onPress={this.goBack}>
                        <Feather color='white' size={28} name={'chevron-left'} />
                    </TouchableWithoutFeedback>}
                />
                {
                    !loading
                        ?
                        <FlatList
                            refreshing={refreshing}
                            onRefresh={this.onRefresh}
                            keyExtractor={(news) => news._id}
                            data={followers}
                            initialNumToRender={12}
                            renderItem={this.renderItem}
                            ListFooterComponent={this.renderFooter}
                            onEndReachedThreshold={0.5}
                            onEndReached={this.onEndReached}
                            onMomentumScrollBegin={() => {
                                this.onEndReachedCalledDuringMomentum = false
                            }}
                        />
                        :
                        <Spinner />
                }
            </View>
        )
    }
}

export default FollowerView