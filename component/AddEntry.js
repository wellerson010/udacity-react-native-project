import React from 'react';
import { View, Text } from 'react-native';
import { getMetricaMetaInfo } from '../utils/helpers';
import UdaciSlider from './UdaciSlider';
import UdaciStepper from './UdaciStepper';
import DateHeader from './DateHeader';

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
                [metric]: ( count > max ) ? max: count
            }
        });
    }

    decrement = (metric) => {
        this.setState((state) => {
            const count = state[metric] - getMetricaMetaInfo(metric);

            return {
                ...state,
                [metric]: ( count < 0 ) ? 0: count
            }
        });
    }

    slider = (metric, value) => {
        this.setState({
            [metric]: value
        });
    }

    render(){
        const metaInfo = getMetricaMetaInfo();

        return (
            <View>
                <DateHeader date={(new Date().toLocaleDateString())}/>
                { 
                    Object.keys(metaInfo).map(key => {
                        const { getIcon, type, ...rest } = metaInfo[key];
                        const value = this.state[key];

                        return (
                            <View key={key}>
                             {getIcon()}

                             { type === 'slider' ?
                             <UdaciSlider 
                                value={value}
                                onChange={(value) => this.slider(key, value)}
                                { ...rest }
                             />
                             : 
                             <UdaciStepper 
                                value={value}
                                onIcrement={(value) => this.increment(key)}
                                onDecrement={(value) => this.decrement(key)}
                                { ...rest }
                             />} 
                            </View>
                        );
                    })
                }
            </View>
        )
    }
}