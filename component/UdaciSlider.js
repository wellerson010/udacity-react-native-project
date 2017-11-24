import React from 'react';
import { View, Text, Slider } from 'react-native';

export default function UdaciSlider ( { max, unit , step, value, onChange}) {
    return (
        <View>
            <Slider 
                step={step}
                maximumValue={max}
                value={value}
                minimumValue={0}
                onValueChange={onChange}
            />
            <View>
                <Text>{value}</Text>
                <Text>{unit}</Text>
            </View>
        </View>
    )
}