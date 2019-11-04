import React, { Component } from 'react';
import { View } from 'react-native';
import { Content, Card } from 'native-base';
import { connect } from 'react-redux';
import OmniBox from './OmniBox';
import SortableListView from 'react-native-sortable-listview';
import ListViewItem from './ListViewItem';
import Utils from './Utils';
import { setList, setListOrder } from '../redux/actions/todoActions';

function getOrder(list) {
    return Object.keys(list);
}

function moveOrderItem(listView, fromIndex, toIndex) {
    Utils.move(listView.props.dataListOrder, parseInt(fromIndex), parseInt(toIndex));
    if (listView.forceUpdate) listView.forceUpdate();
    listView.props.reduxSetList(listView.state.dataList);
    listView.props.reduxSetListOrder(listView.state.dataListOrder);
}

class ListView extends Component {
    constructor(props) {
        super(props);
        this.updateDataList = this.updateDataList.bind(this);
        this._onCompletedChange = this._onCompletedChange.bind(this);
        this.state = {
            dataList: this.props.dataList,
            dataListOrder: this.props.dataListOrder,
        }
    }

    updateDataList(dataList, persist = false) {
        this.setState({
            dataList: dataList,
            dataListOrder: getOrder(dataList),
        });
        if (persist) {
            this.props.reduxSetList(this.state.dataList);
            this.props.reduxSetListOrder(this.state.dataListOrder);
        }
    }

    _onCompletedChange(dataItem, index) {
        let fromIndex = this.state.dataListOrder.indexOf(index);
        let toIndex = dataItem.completed ? this.state.dataListOrder.length - 1 : 0;
        moveOrderItem(this, fromIndex, toIndex);
    }

    render() {
        let listView = (<View></View>);
        if (this.state.dataList.length) {
            listView = (
                <SortableListView
                    ref='listView'
                    style={{ flex: 1 }}
                    data={this.state.dataList}
                    order={this.state.dataListOrder}
                    onRowMoved={e => moveOrderItem(this, e.from, e.to)}
                    renderRow={(dataItem, section, index) => <ListViewItem data={dataItem} dataIndex={index} onCompletedChange={this._onCompletedChange} />}
                />
            );
        }

        return (
            <Content>
                <OmniBox
                    data={this.props.dataList}
                    updateDataList={this.updateDataList} />
                <Card>
                    {listView}
                </Card>
            </Content>
        );
    }
}

// Map State To Props (Redux Store Passes State To Component)
const mapStateToProps = (state) => {
    // Redux Store --> Component
    return {
        dataList: state.todoReducer.todoList,
        dataListOrder: state.todoReducer.todoListOrder,
    };
};
// Map Dispatch To Props (Dispatch Actions To Reducers. Reducers Then Modify The Data And Assign It To Your Props)
const mapDispatchToProps = (dispatch) => {
    // Action
    return {
        // Set List
        reduxSetList: (dataList) => dispatch(setList(dataList)),
        reduxSetListOrder: (dataListOrder) => dispatch(setListOrder(dataListOrder)),
    };
};
// Exports
module.exports = connect(mapStateToProps, mapDispatchToProps)(ListView);