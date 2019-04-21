import React, {Component} from 'react';

class UserLogin extends Component {
    constructor(props) {
        super(props);
        this.state =    {
            username: '',
            email: '',
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }
    handleSubmit(event) {
        event.preventDefault();
        if (this.state.email && this.state.password) {
            fetch('http://localhost:3000/users/login', {
                method: 'POST',
                headers: {
                    'Content-type' : 'application/json',
                },
                body: JSON.stringify(this.state)
            })
                .then(res => console.log(res.json()))
                .catch(err => console.log(err))
            ;
        }
    }

    render() {
        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="title">Nom d'utilisateur</label>
                        <input
                            type="text"
                            className="form-control"
                            id="email"
                            value={this.state.email}
                            onChange={this.handleChange}
                        />
                        {this.state.email}
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

                    <button type="submit" className="btn btn-success btn-lg">
                        Connexion
                    </button>
                </form>
            </div>
        );
    }
}

export default UserLogin;