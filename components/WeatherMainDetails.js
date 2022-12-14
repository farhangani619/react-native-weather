import React from "react"
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

export const WeatherMainDetials = ({ weatherDetials }) => {
    return (
        <View style={styles.weatherDetials}>
            <Text style={{ ...styles.weatherTextDetails, ...styles.city }}>{weatherDetials.loacation}</Text>
            <Text style={{ ...styles.weatherTextDetails, ...styles.Temp }}>{weatherDetials.currentForecast.Temperature.Metric.Value} {weatherDetials.currentForecast.Temperature.Metric.Unit} </Text>
            <Text style={{ ...styles.weatherTextDetails, ...styles.desc }}>{weatherDetials.currentForecast.WeatherText}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    weatherDetials: {
        justifyContent: 'center',
        alignSelf: 'center',
        marginTop: 40
    },
    weatherTextDetails: {
        color: '#fff',
        alignSelf: 'center'
    },
    city: {
        fontSize: 30
    },
    Temp: {
        fontSize: 40
    },
    desc: {
        fontSize: 15
    }
});