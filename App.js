import { StatusBar } from 'expo-status-bar';
import { useEffect, useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View, ImageBackground } from 'react-native';
import { TextInput } from 'react-native-web';
import { hourlyForecast, searchLocation, searchWeather } from './Api/API';
import { HourlyWeatherDetails } from './components/HourlyWeatherDetails';
import { WeatherMainDetials } from './components/WeatherMainDetails';

export default function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [weatherDetials, setWeatherDetials] = useState();

  const watchId = null

  useEffect(()=>{
    navigator.geolocation.getCurrentPosition((position) => {
      const  lat = parseFloat(position.coords.latitude);
      const lon = parseFloat(position.coords.longitude);
      console.log(lat,lon, "coords")

    })
  },[])

  const onChangeText = (searchTerm) => {
    setSearchTerm(searchTerm);
  }

  const handlePress = () => {
    localStorage.clear();
    return searchLocation(searchTerm)
      .then((response) => response.json())
      .then(
        (data) => {
          setWeatherDetials(data[0].EnglishName)
          handleSearchWeather(data[0].Key)
        }
      ).catch(
        (error) => {
          return console.log(error, 'error')
        }
      );
  };

  const handleSearchWeather = (loactionKey) => {
    return searchWeather(loactionKey)
      .then((response) => response.json())
      .then(
        (data) => {
           setWeatherDetials((prevData) => {
            return { loacation: prevData, currentForecast: { ...data[0] } }
          })
          handleHourlyForeacast(loactionKey)
        }
      )
      .catch(
        (error) => {
          return console.log(error, 'error')
        }
      );
  }


  const handleHourlyForeacast = (loactionKey) => {
    return hourlyForecast(loactionKey)
      .then((response) => response.json())
      .then(
        (data) => {
          console.log(data, "data====>")
           setWeatherDetials((prevData) => {
            return { ...prevData, hourlyForecast: data }
          })
          const weatherDetials = JSON.stringify(weatherDetials)
          localStorage.setItem('weatherDetials', weatherDetials)
        }
      )
      .catch(
        (error) => {
          return console.log(error, 'error')
        }
      );
  }

  console.log(weatherDetials, "weather details")

  return (
    <View style={styles.container}>
      {/* <ImageBackground source={require('./assets/background.jpg')} resizeMode="cover" style={styles.image}> */}
        <Text style={styles.weatherText}>Weather</Text>
        <View style={styles.search}>
          <TextInput
            placeholder='Enter city to search'
            onChangeText={text => onChangeText(text)}
            value={searchTerm}
            style={styles.searchInput} />
          <Button title='Submit' onPress={handlePress} />
        </View>
        {weatherDetials && weatherDetials.currentForecast && weatherDetials.hourlyForecast &&
          <View>
            <WeatherMainDetials weatherDetials={weatherDetials}/>
            <ScrollView>
              <HourlyWeatherDetails weatherDetials={weatherDetials}/>
            </ScrollView>
          </View>

        }
      {/* </ImageBackground> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#292929',
  },
  weatherText: {
    fontSize: 30,
    fontStyle: 'bold',
    color: '#fff',
    alignSelf: 'left',
    marginLeft: 10,
    marginTop: 20
  },
  search: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 20
  },
  searchInput: {
    padding: 10,
    borderRadius: 10,
    border: '2px solid #fff',
    color: '#fff',
    width: 280
  },
  image: {
    flex: 1,
    justifyContent: "center"
  }
});
