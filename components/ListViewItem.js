import React, { Component } from 'react';
import { TouchableHighlight } from 'react-native';
import { Left, CardItem, Text } from 'native-base';
import MyCheckBox from './MyCheckBox';

class ListViewItem extends Component {
    constructor(props) {
        super(props);
        this._onCheckBoxPressed = this._onCheckBoxPressed.bind(this);
        this.state = {
            data: this.props.data
        }
    }

    componentWillReceiveProps(props) {
        this.setState({
            data: props.data
        })
    }

    _onCheckBoxPressed() {
        var data = this.state.data;
        data.completed = !data.completed;
        this.setState({
            data: data
        });

        this.props.onCompletedChange(data, this.props.dataIndex);
    }

    render() {
        let data = this.state.data;
        let color = data.completed ? '#C5C8C9' : '#000';
        let textDecorationLine = data.completed ? 'line-through' : 'none';
        return (
            <TouchableHighlight {...this.props.sortHandlers}>
                <CardItem>
                    <Left>
                        <MyCheckBox data={data} color={color} onCheckBoxPressed={this._onCheckBoxPressed} checked={data.completed} />
                        <Text style={{ textDecorationLine: textDecorationLine, color: color }}>{data.title}</Text>
                    </Left>
                </CardItem>
            </TouchableHighlight>
        )
    }
}

module.exports = ListViewItem;