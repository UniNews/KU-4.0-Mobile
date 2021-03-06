import { connect } from 'react-redux'
import NotificationView from './NotificationTabBarIconView'

const mapStateToProps = state => {
    return {
        notifications: state.notificationsReducer.notifications,
    }
}

const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationView)