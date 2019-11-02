import React, { Component } from 'react';
import { Input } from 'native-base';
import TodoModel from './TodoModel';
import Utils from './Utils';

class OmniBox extends Component {
    constructor(props) {
        super(props);
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillMount() {
        this.setState({
            newValue: ''
        });
    }

    onChange(event) {
        var title = event.nativeEvent.text;
        var dataList = this.props.data.filter((item) => item.title.match(new RegExp('.*' + title + '.*', 'gi')));

        this.setState({
            newValue: title
        });
        this.props.updateDataList(dataList);
    }

    onKeyPress(event) {
        if (event.nativeEvent.key == 'Enter' && this.state.newValue) {
            this.addNewValue();
        }
    }

    onSubmit() {
        if (this.state.newValue) {
            this.addNewValue();
        }
    }

    addNewValue() {
        var newDataItem = new TodoModel(this.state.newValue);
        var dataList = this.props.data;
        var dataItem = Utils.findTodo(newDataItem, dataList);
        if (dataItem) {
            Utils.move(dataList, (dataList.indexOf(dataItem)), 0);
            this.setState({
                newValue: ''
            });
            this.props.updateDataList(dataList);
            return;
        }

        dataList.unshift(newDataItem);

        this.setState({
            newValue: ''
        });
        this.props.updateDataList(dataList);
    }

    render() {
        return (
            <Input
                placeholder='Pesquise ou adicione uma tarefa'
                blurOnSubmit={false}
                value={this.state.newValue}
                onKeyPress={this.onKeyPress}
                onChange={this.onChange}
                onSubmitEditing={this.onSubmit} />
        );
    }
}

module.exports = OmniBox;