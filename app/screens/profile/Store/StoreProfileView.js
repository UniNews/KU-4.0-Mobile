import React from 'react'
import { Text, View, Image, ActivityIndicator, TouchableNativeFeedback } from 'react-native'
import { Feather } from '@expo/vector-icons'
import styles from './styles'
import { LinearGradient } from 'expo-linear-gradient'
import Hr from '../../../components/commons/Hr'
import Button from '../../../components/commons/Button'
import StatusBar from '../../../components/commons/StatusBar'
import userService from '../../../services/user'
import Vr from '../../../components/commons/Vr'
import { PRIMARY_COLOR, KU_SECONDARY_COLOR, KU_PRIMARY_COLOR } from '../../../assets/css/color'

class StoreProfileView extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            following: false,
            user: null,
            postNews: null,
            loading: true
        }
    }

    goBack = () => {
        const { navigation } = this.props
        navigation.goBack()
    }

    async componentDidMount() {
        const user = this.props.navigation.state.params.user
        const result = await userService.getUserById(user._id)
        this.setState(
            {
                user: result.data,
                postNews: result.news,
                loading: false
            }
        )
    }

    followingStore = () => {
        // const { following } = this.state
        // const myUser = this.props.user
        // //const updatedCommunity = { ...this.state.user.following }
        // const index = this.state.user.follower.map(data => data).indexOf(user._id)
        // if (index > -1)
        //     comment.like.splice(index, 1)
        // else
        //     comment.like.push(user)
        // // this.setState({ community: updatedCommunity })
        // // communityService.likeComment(comment._id)
        // this.setState({ following: !following })
        // console.log(this.state.user.follower)
        // console.log(myUser, 'ssss')
        // //userService.followUserById(id)
    }

    goPostedNews = () => {
        const { postNews } = this.state
        const { navigation } = this.props
        navigation.push('AnyNews', {
            title: 'โพสต์ทั้งหมด',
            news: postNews
        })
    }

    render() {
        const { following, user, loading } = this.state
        return (
            <View style={styles.containter}>
                <StatusBar />
                {
                    !loading ?
                        <View>
                            <LinearGradient start={{ x: 0, y: 0 }} end={{ x: 0, y: 1 }} colors={[KU_PRIMARY_COLOR, KU_SECONDARY_COLOR]} style={styles.profileInfoContainer}>
                                <View style={styles.backButton}>
                                    <Feather
                                        color='white'
                                        onPress={this.goBack}
                                        size={28}
                                        name={'chevron-left'}
                                    />
                                </View>
                                <Image
                                    source={user ? { uri: user.avatarURL } : require('../../../assets/imgs/avatar-default.png')}
                                    style={styles.avatar}
                                />
                                <Text numberOfLines={2} style={styles.nameText}>
                                    {user.displayName}
                                </Text>
                                <View style={styles.buttonContainer}>
                                    <Button style={following ? styles.followingButton : styles.notFollowingButton} rounded onPress={() => this.followingStore()}>
                                        <Text style={following ? styles.followingButtonText : styles.notFollowingButtonText}>{following ? 'ติดตามอยู่' : 'ติดตาม'}</Text>
                                    </Button>
                                </View>
                                <View style={styles.infoContainer}>
                                    <TouchableNativeFeedback onPress={this.goPostedNews}>
                                        <View style={styles.indicatorContainer}>
                                            <Text style={styles.numberText}>
                                                {this.state.postNews ? this.state.postNews.length : 0}
                                            </Text>
                                            <Text style={styles.indicatorText}>
                                                โพสต์
                                                </Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                    <Vr style={styles.verticalLine} />
                                    <TouchableNativeFeedback>
                                        <View style={styles.indicatorContainer}>
                                            <Text style={styles.numberText}>
                                                {this.state.user ? [...this.state.user.follower].length : 0}
                                            </Text>
                                            <Text style={styles.indicatorText}>
                                                ผู้ติดตาม
                                                </Text>
                                        </View>
                                    </TouchableNativeFeedback>
                                </View>
                            </LinearGradient>
                            <View style={styles.profileContainer}>
                                <View style={styles.profileSectionContainer}>
                                    <Text style={styles.profileTitleText}>ชื่อ</Text>
                                    <Text style={styles.profileValueText}>{this.state.user ? this.state.user.displayName : ''}</Text>
                                </View>
                                <Hr />
                                <View style={styles.profileSectionContainer}>
                                    <Text style={styles.profileTitleText}>คำอธิบาย</Text>
                                    <Text style={styles.profileValueText}>{this.state.user ? this.state.user.description : ''}</Text>
                                </View>
                                <Hr />
                                <View style={styles.profileSectionContainer}>
                                    <Text style={styles.profileTitleText}>หมวดหมู่</Text>
                                    <Text style={styles.profileValueText}>{this.state.user ? this.state.user.category : ''}</Text>
                                </View>
                                <Hr />
                            </View>
                        </View>
                        :
                        <View style={styles.loader}>
                            <ActivityIndicator color={PRIMARY_COLOR} size='large' />
                        </View>
                }
            </View>
        )
    }
}



export default StoreProfileView