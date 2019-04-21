import React, { Component } from 'react';

class Home extends Component {
    constructor(props) {
        super(props);
    }

    calcAge(dateString) {
        var birthday = +new Date(dateString);
        return ((Date.now() - birthday) / (31557600000));
    }

    render() {
        const {user} = this.props.auth;
        console.log("les props de home")
        console.log(this.props)
        let hello;
        let birthday;
        const getAge = birthDate => Math.floor((new Date() - new Date(birthDate).getTime()) / 3.15576e+10)

        if (user) {
            hello = <div>Hello {user.username}, vous avez {getAge(user.birth_date)}<br/>{user.birth_date}</div>
        } else {
            hello = <div>Connectez-vous</div>
        }
        return (
            <div>
                Home Component :D
                {hello}
            </div>
        );
    }
}


export default Home;