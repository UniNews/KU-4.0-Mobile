import React from 'react'
import { createAppContainer, createSwitchNavigator } from 'react-navigation'
import { createBottomTabNavigator, createMaterialTopTabNavigator } from 'react-navigation-tabs'
import { createStackNavigator } from 'react-navigation-stack'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import SearchTabScreen from '../screens/search/SearchTab'
import NotificationScreen from '../screens/notification/Notification'
import MyProfileScreen from '../screens/profile/MyProfile'
import UserProfileScreen from '../screens/profile/UserProfile'
import ClubScreen from '../screens/news/Club'
import UniversityScreen from '../screens/news/University'
import RecommendationScreen from '../screens/news/Recommendation'
import PromotionScreen from '../screens/news/Promotion'
import LoginScreen from '../screens/auth/Login/'
import RegisterScreen from '../screens/auth/Register/'
import NewsDetailScreen from '../screens/news/Detail'
import CommunityDetailScreen from '../screens/community/Detail'
import { PRIMARY_COLOR, SECONDARY_COLOR } from '../assets/css/color'
import { BOLD_FONT } from '../assets/css/typography'
import ProfileSetting from '../screens/settings/Profile'
import FollowingScreen from '../screens/profile/Following'
import FollowerScreen from '../screens/profile/Follower'
import CommentScreen from '../screens/news/Comment'
import CommunityTab from '../screens/community/CommunityTab'
import NewsTagSearchScreen from '../screens/search/NewsTagSearch'
import CommunityTagSearchScreen from '../screens/search/CommunityTagSearch'
import AnyNewsScreen from '../screens/news/AnyNews'
import AuthLoadingScreen from '../screens/auth/Loading'
import TabBar from '../components/commons/TabBar'
import PostCommunityScreen from '../screens/community/PostCommunity'
import PostReportScreen from '../screens/report/PostReport'
import NotificationTabBarIcon from '../components/notification/NotificationTabBarIcon'
import MyPostsScreen from '../screens/profile/MyPosts'

const newsTab = createMaterialTopTabNavigator({
  'สำหรับคุณ': RecommendationScreen,
  'มหาลัย': UniversityScreen,
  'โปรโมชั่น': PromotionScreen,
  'ชมรม': ClubScreen
}, {
  tabBarComponent: TabBar,
})

const newsStack = createStackNavigator({
  NewsHome: newsTab,
  AnyNews: AnyNewsScreen,
  /* news */
  NewsDetail: NewsDetailScreen,
  Comment: CommentScreen,
  /* profile */
  Following: FollowingScreen,
  Follower: FollowerScreen,
  ProfileDetail: UserProfileScreen,
  /* community */
  CommunityDetail: CommunityDetailScreen,
  /* tag */
  NewsTagSearch: NewsTagSearchScreen,
  CommunityTagSearch: CommunityTagSearchScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    },

  },
)

newsStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName
  if (currentRoute == 'CommunityDetail')
    tabBarVisible = false
  if (currentRoute == 'Comment')
    tabBarVisible = false
  return {
    tabBarVisible
  }
}

const communityStack = createStackNavigator({
  CommunityHome: CommunityTab,
  CommunityDetail: CommunityDetailScreen,
  PostCommunity: PostCommunityScreen,
  /* profile */
  Following: FollowingScreen,
  Follower: FollowerScreen,
  ProfileDetail: UserProfileScreen,
  /* news */
  NewsDetail: NewsDetailScreen,
  Comment: CommentScreen,
  /* tag */
  NewsTagSearch: NewsTagSearchScreen,
  CommunityTagSearch: CommunityTagSearchScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

communityStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName
  if (currentRoute == 'CommunityDetail')
    tabBarVisible = false
  if (currentRoute == 'PostCommunity')
    tabBarVisible = false
  if (currentRoute == 'Comment')
    tabBarVisible = false
  return {
    tabBarVisible
  }
}

const profileStack = createStackNavigator({
  MyProfile: MyProfileScreen,
  ProfileSetting: ProfileSetting,
  MyPosts: MyPostsScreen,
  /* profile */
  ProfileDetail: UserProfileScreen,
  Following: FollowingScreen,
  Follower: FollowerScreen,
  /* news */
  NewsDetail: NewsDetailScreen,
  Comment: CommentScreen,
  /* community */
  CommunityDetail: CommunityDetailScreen,
  /* tag */
  NewsTagSearch: NewsTagSearchScreen,
  CommunityTagSearch: CommunityTagSearchScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

profileStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName
  if (currentRoute == 'CommunityDetail')
    tabBarVisible = false
  if (currentRoute == 'ProfileSetting')
    tabBarVisible = false
  if (currentRoute == 'Comment')
    tabBarVisible = false
  return {
    tabBarVisible
  }
}

const notificationStack = createStackNavigator({
  Notification: NotificationScreen,
  /* profile */
  Following: FollowingScreen,
  Follower: FollowerScreen,
  ProfileDetail: UserProfileScreen,
  /* news */
  NewsDetail: NewsDetailScreen,
  Comment: CommentScreen,
  /* community */
  CommunityDetail: CommunityDetailScreen,
  /* tag */
  NewsTagSearch: NewsTagSearchScreen,
  CommunityTagSearch: CommunityTagSearchScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

notificationStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName
  if (currentRoute == 'CommunityDetail')
    tabBarVisible = false
  if (currentRoute == 'Comment')
    tabBarVisible = false
  return {
    tabBarVisible
  }
}

const searchStack = createStackNavigator({
  SearchTab: SearchTabScreen,
  /* profile */
  Following: FollowingScreen,
  Follower: FollowerScreen,
  ProfileDetail: UserProfileScreen,
  /* community */
  CommunityDetail: CommunityDetailScreen,
  /* news */
  NewsDetail: NewsDetailScreen,
  Comment: CommentScreen,
  /* tag */
  NewsTagSearch: NewsTagSearchScreen,
  CommunityTagSearch: CommunityTagSearchScreen,
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

searchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible = true
  let currentRoute = navigation.state.routes[navigation.state.routes.length - 1].routeName
  if (currentRoute == 'CommunityDetail')
    tabBarVisible = false
  if (currentRoute == 'Comment')
    tabBarVisible = false
  return {
    tabBarVisible
  }
}

const tabNavigator = createBottomTabNavigator({
  'หน้าหลัก': newsStack,
  'พูดคุย': communityStack,
  'แจ้งเตือน': notificationStack,
  'โปรไฟล์': profileStack,
},
  {
    initialRouteName: 'หน้าหลัก',
    defaultNavigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state
        let IconComponent = MaterialCommunityIcons
        let iconName, size
        size = 28
        if (routeName === 'หน้าหลัก') {
          iconName = `${focused ? 'home' : 'home-outline'}`
        } else if (routeName === 'พูดคุย') {
          iconName = `${focused ? 'comment-processing' : 'comment-processing-outline'}`
        }
        else if (routeName === 'แจ้งเตือน') {
          iconName = `${focused ? 'bell' : 'bell-outline'}`
          IconComponent = NotificationTabBarIcon
        }
        else if (routeName === 'โปรไฟล์') {
          iconName = `${focused ? 'account' : 'account-outline'}`
        }
        return <IconComponent name={iconName} size={size} color={tintColor} />
      },
    }),
    sceneContainerStyle: {
      // paddingTop: 200
    },
    tabBarOptions: {
      activeTintColor: PRIMARY_COLOR,
      inactiveTintColor: SECONDARY_COLOR,
      labelStyle: {
        fontFamily: BOLD_FONT
      },
      style: {
        height: 52,
        elevation: 10,
        backgroundColor: 'white',
        // borderTopRightRadius: 20,
        // borderTopLeftRadius: 20,
        // position: 'absolute',
        // bottom: 0,
      }
    },
  }
)

const tabStack = createStackNavigator({
  Tabs: tabNavigator,
  PostReport: PostReportScreen,
  Search: searchStack
},
  {
    headerMode: 'none',
    navigationOptions: {
      headerVisible: false,
    }
  }
)

const authStack = createStackNavigator({
  Login: {
    screen: LoginScreen
  },
  Register: {
    screen: RegisterScreen
  }
}, {
  initialRouteName: 'Login',
  headerMode: 'none',
}
)

export default createAppContainer(createSwitchNavigator(
  {
    AuthLoading: AuthLoadingScreen,
    Auth: {
      screen: authStack
    },
    Main: {
      screen: tabStack
    },
  }
))