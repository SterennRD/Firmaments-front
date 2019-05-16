import { connect } from 'react-redux';
import {
    receiveComment,
    resetNotifComment,
    resetNotifRead,
    readChapterAdded,
    getAllNotifs,
    markAsRead
} from "../actions/NotifAction";

import NotificationList from '../components/notifications/NotificationList';

const mapDispatchToProps = (dispatch) => {
    return {
        receiveComment: (comment) => {
            dispatch(receiveComment(comment))
        },
        readChapterAdded: (notif) => {
            dispatch(readChapterAdded(notif))
        },
        resetMe: () => {
            dispatch(resetNotifComment())
        },
        getAllNotifs: (id, token) => {
            dispatch(getAllNotifs(id, token))
        },
        resetNotifRead: () => {
            dispatch(resetNotifRead())
        },
        markAsRead: (id, token) => {
            dispatch(markAsRead(id, token))
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    notifications: state.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);