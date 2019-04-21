import {connect} from "react-redux";
import UserSignup from "../components/users/UserSignup";
import {addUser} from '../actions';

const mapStateToProps = state => ({

});

const mapDispatchToProps = dispatch => ({
    addTag: (tag, cb) => dispatch(addTag(tag, cb))
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TagAddScreen);