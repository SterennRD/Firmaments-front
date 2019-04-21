import React, {Component} from 'react';
import {addUser} from "../../redux/actions";
import {connect} from "react-redux";

const initialState = {
    username: '',
    email: '',
    birth_date: '',
    date_day: '',
    date_mth: '',
    date_year: '',
    password: '',
    users: []
};

class UserSignup extends Component {
    constructor(props) {
        super(props);
        /*this.state =    {
            username: '',
            email: '',
            birth_date: '',
            date_day: '',
            date_mth: '',
            date_year: '',
            password: '',
            users: []
        };*/
        this.state = initialState;
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        /*fetch('http://localhost:3000/users')
            .then(res => res.json())
            .then(data => this.setState({ users: data }))
            .catch(err => console.log(err))
        ;*/
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.username && this.state.email && this.state.password && this.state.birth_date) {
            fetch('http://localhost:3000/users/signup', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify(this.state)
            })
                .then(res => res.json())
                .catch(err => console.log(err))
            ;
            const data = new FormData();
            data.append('username', this.state.username);
            data.append('password', this.state.password);
            data.append('email', this.state.email);
            data.append('birth_date', this.state.birth_date);
            const action = { type: "ADD_USER", value: data };
            this.props.dispatch(action)
            console.log(data);
            console.log(this.props);
        }

    }

    mergeDate(type, value)
    {
        function postUpdate() {
            if (this.state.date_year !== '' && this.state.date_mth !== '' && this.state.date_year !== '') {
                let newDate = new Date(this.state.date_year, this.state.date_mth, this.state.date_day);
                this.setState({ birth_date : newDate });
                console.log(this.state.birth_date)
            }
        }
        if (type === 'year')  { this.setState({ date_year: value }, postUpdate) }
        if (type === 'month') { this.setState({ date_mth: value  }, postUpdate) }
        if (type === 'day')   { this.setState({ date_day: value  }, postUpdate) }
    }

    render() {
        var annees = [];
        for (let i = new Date().getFullYear(); i > 1930; --i) {
            annees = [...annees, i]
        }
        const annees_opt = annees.map( an => <option value={an} key={an}>{an}</option>);

        const users = this.state.users.map( user => <div key={user._id}>{user.username}</div>);

        console.log(this.props);
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Nom d'utilisateur</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={this.state.username}
                            onChange={this.handleChange}
                        />
                        {this.state.username}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Mot de passe</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={this.state.password}
                            onChange={this.handleChange}
                        />
                        Mot de passe : {this.state.password}
                    </div>
                    <div className="form-group">
                        <label htmlFor="title">Date de naissance</label>
                        <select onChange={(event) => this.mergeDate('day', event.target.value)}>
                            <option value="1">1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                            <option value="9">9</option>
                            <option value="10">10</option>
                            <option value="11">11</option>
                            <option value="12">12</option>
                            <option value="13">13</option>
                            <option value="14">14</option>
                            <option value="15">15</option>
                            <option value="16">16</option>
                            <option value="17">17</option>
                            <option value="18">18</option>
                            <option value="19">19</option>
                            <option value="20">20</option>
                            <option value="21">21</option>
                            <option value="22">22</option>
                            <option value="23">23</option>
                            <option value="24">24</option>
                            <option value="25">25</option>
                            <option value="26">26</option>
                            <option value="27">27</option>
                            <option value="28">28</option>
                            <option value="29">29</option>
                            <option value="30">30</option>
                            <option value="31">31</option>
                        </select>

                        <select onChange={(event) => this.mergeDate('month', event.target.value)}>
                            <option value="01">Janvier</option>
                            <option value="02">Février</option>
                            <option value="03">Mars</option>
                            <option value="04">Avril</option>
                            <option value="05">Mai</option>
                            <option value="06">June</option>
                            <option value="07">July</option>
                            <option value="08">August</option>
                            <option value="09">September</option>
                            <option value="10">October</option>
                            <option value="11">November</option>
                            <option value="12">December</option>
                        </select>

                        <select onChange={(event) => this.mergeDate('year', event.target.value)}>
                            {annees_opt}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-success btn-lg">
                        SAVE
                    </button>
                </form>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(UserSignup);