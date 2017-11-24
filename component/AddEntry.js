import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { getMetricaMetaInfo, timeToString } from '../utils/helpers';
import { removeEntry, submitEntry } from '../utils/api';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import TextButton from './TextButton';

function SubmitBtn( { onPress} ){
    return (
        <TouchableOpacity onPress={onPress}>
            <Text>Submit</Text>
        </TouchableOpacity>
    )
}

export default class AddEntry extends React.Component {
    state = {
        run: 0,
        bike: 0,
        swim: 0,
        sleep: 0,
        eat: 0
    }

    increment = (metric) => {
        const { max, step } = getMetricaMetaInfo(metric);

        this.setState((state) => {
            const count = state[metric] + step;
            return {
                ...state,
                [metric]: (count > max) ? max : count
            }
        });
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricaMetaInfo(metric).step;

            return {
                ...state,
                [metric]: (count < 0) ? 0 : count
            }
        });
    }

    slider = (metric, value) => {
        this.setState({
            [metric]: value
        });
    }

    submit = () => {
        const key = timeToString();
        const entry = this.state;

        this.setState({
            run: 0,
            bike: 0,
            swim: 0,
            sleep: 0,
            eat: 0
        });
        
        submitEntry( { key, entry});
    }

    reset = () => {
        const key = timeToString();

        removeEntry(key);
    }

    render() {
        const metaInfo = getMetricaMetaInfo();

        if (!this.props.alreadyLogged){
            return (
                <View>
                    <FontAwesome 
                        name='calendar'
                        color='black'
                        size={100}
                    />
                    <Text>You already logged your information for today</Text>
                    <TextButton onPress={this.reset}>
                        Reset
                    </TextButton>
                </View>
            );
        }

        return (
            <View style={style.container}>
                <DateHeader date={(new Date().toLocaleDateString())} />
                {
                    Object.keys(metaInfo).map(key => {
                        const { getIcon, type, ...rest } = metaInfo[key];
                        const value = this.state[key];

                        return (
                            <View key={key}>
                                {getIcon()}

                                {type === 'slider' ?
                                    <UdaciSlider
                                        value={value}
                                        onChange={(value) => this.slider(key, value)}
                                        { ...rest }
                                    />
                                    :
                                    <UdaciStepper
                                        value={value}
                                        onIncrement={(value) => this.increment(key)}
                                        onDecrement={(value) => this.decrement(key)}
                                        { ...rest }
                                    />}
                            </View>
                        );
                    })
                }
                <SubmitBtn onPress={this.submit} />
            </View>
        )
    }
}

const style = StyleSheet.create({
    container: {
        //  flex: 1,
        marginLeft: 10,
        marginRight: 10,
        //   alignItems: 'center',
        //   justifyContent: 'center'
    },
    btn: {
        backgroundColor: '#E53224',
        padding: 10,
        paddingLeft: 50,
        paddingRight: 50,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 5
    },
    btnText: {
        color: '#fff'
    }
});