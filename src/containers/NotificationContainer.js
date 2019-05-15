import { connect } from 'react-redux';
import {receiveComment, resetNotifComment, resetNotifRead, readChapterAdded} from "../actions/NotifAction";

import Notification from '../components/notifications/Notification';

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
        resetNotifRead: () => {
            dispatch(resetNotifRead())
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    notifications: state.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification);