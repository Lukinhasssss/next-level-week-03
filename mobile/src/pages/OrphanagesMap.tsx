import React, { useState } from 'react'
import { StyleSheet, Text, View, Dimensions } from 'react-native'; // No lugar do RectButton tinha um TouchableOpacity
import MapView, { Marker, Callout, PROVIDER_GOOGLE } from 'react-native-maps';
import { Feather } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { RectButton } from 'react-native-gesture-handler'; // É um botão customizado de acordo com o sistema operacional (android/ios)

import mapMarker from '../images/map-marker.png'

import api from '../services/api';

interface Orphanage {
    id: number
    name: string
    latitude: number
    longitude: number
}

export default function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([])
    const navigation = useNavigation()

    useFocusEffect(() => { // Será utilizado para fazer uma chamada api assim que o componente for renderizado em tela
        api.get('/orphanages').then(response => {
            setOrphanages(response.data)
        })
    })

    function handleNavigateToOrphanageDetails(id: number) {
        navigation.navigate('OrphanageDetails', { id })
    }

    function handleNavigateToCreateOrphanage() {
        navigation.navigate('SelectMapPosition')
    }

    return (
        <View style={styles.container} >
        <MapView
            provider={PROVIDER_GOOGLE} // O MapView utiliza por padrão o mapa do dispositivo. O PROVIDER_GOOGLE serve para o dispositivo utilizar o Google Maps
            style={styles.map}
            initialRegion={{
            latitude: -23.6735004,
            longitude: -46.5836981,
            latitudeDelta: 0.008,
            longitudeDelta: 0.008
            }}
        >
            {orphanages.map(orphanage => {
                return (
                    <Marker
                        key={ orphanage.id }
                        icon={ mapMarker }
                        calloutAnchor={{
                            x: 2.7,
                            y: 0.88
                        }}
                        coordinate={{ // É a posição que ele vai estar no mapa
                            latitude: orphanage.latitude,
                            longitude: orphanage.longitude
                        }}
                    >
                        <Callout tooltip={true} onPress={ () => handleNavigateToOrphanageDetails(orphanage.id) }>
                            <View style={styles.calloutContainer}>
                            <Text style={styles.calloutText}>{ orphanage.name }</Text>
                            </View>
                        </Callout>
                    </Marker>
                )
            })}
        </MapView>

        <View style={styles.footer}>
            <Text style={styles.footerText}>{ orphanages.length } orfanatos encontrados</Text>

            <RectButton style={styles.createOrphanageButton} onPress={ handleNavigateToCreateOrphanage }>
                <Feather name="plus" size={20} color="#FFF" />
            </RectButton>
        </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    map: {
        width: Dimensions.get('window').width, // Para pegar 100% da largura do dispositivo
        height: Dimensions.get('window').height, // Para pegar 100% da altura do dispositivo
    },

    calloutContainer: {
        width: 160,
        height: 46,
        paddingHorizontal: 16,
        backgroundColor: 'rgba(255, 255, 255, 0.8)',
        borderRadius: 16,
        justifyContent: 'center'
    },

    calloutText: {
        fontFamily: 'nunito700',
        color: '#0089A5',
        fontSize: 14
    },

    footer: {
        position: 'absolute',
        left: 24,
        right: 24,
        bottom: 32,

        backgroundColor: '#FFF',
        borderRadius: 20,
        height: 56,
        paddingLeft: 24,

        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',

        elevation: 3
    },

    footerText: {
        fontFamily: 'nunito700',
        color: '#8FA7B3'
    },

    createOrphanageButton: {
        width: 56,
        height: 56,
        backgroundColor: '#15C3D6',
        borderRadius: 20,

        justifyContent: 'center',
        alignItems: 'center'
    },
});