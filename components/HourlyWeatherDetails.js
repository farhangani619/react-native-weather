import React from 'react';
import { Button, ScrollView, StyleSheet, Text, View, FlatList, Image } from 'react-native';
import { hourlyForecast } from '../Api/API';
import { images } from '../helper/ImageHelper';

const getTime = () => {
    var date = new Date(1670929200 * 1000);
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    console.log(strTime)
    return strTime;
}

export const HourlyWeatherDetails = ({ weatherDetials }) => {
    const renderItem = ({ item }) => (
        <View style={styles.hourlyContainer}>
            <Text style={styles.hourlyText}>{getTime(item.EpochDateTime)}</Text>
            <Image style={{ width: 30, height: 30 , alignSelf: 'center'}} source={images.icons[item.WeatherIcon]} />
            <Text style={styles.hourlyText}>{item.Temperature.Value}{item.Temperature.Unit}</Text>
        </View>
    );

    return (
        <View style={styles.HourlydataMainContainer}>
            <View style={styles.mainTextContainer}>
                <Text style={styles.mainText}>dolor sit ametLorem Ipsum dolor sit ametLorem Ipsum dolor sit amet </Text>
            </View>
            <View >
                <FlatList
                    horizontal
                    data={weatherDetials.hourlyForecast}
                    renderItem={renderItem}
                    keyExtractor={item => item.EpochDateTime}
                    contentContainerStyle={styles.HourlydataContainer}
                    showsHorizontalScrollIndicator={false}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    HourlydataContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        columnGap: 30,
        margin: 10
    },
    HourlydataMainContainer: {
        margin: 20,
        borderRadius: 5,
        padding: 10,
        backgroundColor: '#e6f6ff',
        opacity: 0.7
    },
    mainTextContainer: {
        borderBottomColor: '#8fa8b5',
        borderBottomWidth: 1,
        padding: 5

    },
    mainText: {
        color: '#333',
        marginBottom: 10
    },
    hourlyContainer: {
        marginTop: 10
    },
    hourlyText: {
        color: '#333',
        alignSelf: 'center',
        fontSize: 15
    }
});