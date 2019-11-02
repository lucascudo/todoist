import React, { Component } from 'react';
import { CheckBox } from 'native-base';

class MyCheckBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.data
        };
    }

    render() {
        let iconName = this.state.data.completed ? 'check-box' : 'check-box-outline-blank';
        let color = this.props.color || 'green';

        return (
            <CheckBox
                color={ color }
                activeOpacity={ 0.5 }
                data={this.state.data}
                name={iconName}
                onPress={this.props.onCheckBoxPressed}
                style={{ marginLeft: -20, marginRight: 10 }}
                checked={this.props.checked} />
        );
    }
}

module.exports = MyCheckBox;