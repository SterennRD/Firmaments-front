import {connect} from "react-redux";
import UserList from "../components/UserList";

const mapStateToProps = state => ({
    users: state.users
});

const mapDispatchToProps = dispatch => ({

});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(UserList);