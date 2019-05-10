import { connect } from 'react-redux';
import {receiveComment} from "../actions/NotifAction";

import Notification from '../components/notifications/Notification';

const mapDispatchToProps = (dispatch) => {
    return {
        receiveComment: (comment) => {
            dispatch(receiveComment(comment))
        }
    }
}

const mapStateToProps = (state) => ({
    auth: state.auth,
    notifications: state.notifications
})

export default connect(mapStateToProps, mapDispatchToProps)(Notification);