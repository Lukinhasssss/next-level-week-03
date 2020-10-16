import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

import mapMarkerImg from '../images/map-marker.svg'
import mapIcon from '../utils/mapIcon';
import api from '../services/api';

import '../styles/pages/orphanages-map.css'


interface Orphanage {
    id: number
    latitude: number
    longitude: number
    name: string
}

function OrphanagesMap() {
    const [orphanages, setOrphanages] = useState<Orphanage[]>([]) // Vai começar com uma lista vazia que será preenchida com uma lista(Orphanage) de orfanatos

    useEffect(() => { // O 1º parâmetro dessa função é 'qual ação eu quero executar' e o 2º parâmetro é 'quando eu quero executar'
        api.get('orphanages').then(response => {
            setOrphanages(response.data) // Desta forma a const orphanages terá o valor setado em setOrphanages que é o response.data que retorna os orfanatos
        })
    }, []) // O 2º parâmetro indica que a função será chamada toda vez que alguma coisa mudar. OBS: O array vazio indica que a função será chamada apenas uma vez quando carregar o componente

    return (
        <div id="page-map">
            <aside>
                <header>
                    <img src={ mapMarkerImg } alt="Happy"/>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>
                    <strong>São Paulo</strong>
                    <span>Diadema</span>
                </footer>
            </aside>

            <Map
                center={[-23.6940723,-46.6199977]}
                zoom={ 15 }
                style={{ width: '100%', height: '100%' }} // A primeira chave serve para indicar que eu quero colocar um códifo javascript e a segunda indica que eu quero colocar um objeto
            >
                <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                {/* <TileLayer url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`} /> */}
                {/* <TileLayer url={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLEMAPS_TOKEN}&callback=initMap`} /> */}

                {orphanages.map(orphanage => { // Para cada orphanage de orphanages eu retorno o <Marker>
                    return(
                        <Marker
                            key={orphanage.id} // Sempre que for utilizado um map o 1º item que vem que no HTML dentro do map precisa receber a propriedade "key"
                            icon={ mapIcon }
                            position={[orphanage.latitude,orphanage.longitude]}
                        >
                            <Popup closeButton={ false } minWidth={ 240 } maxWidth={ 240 } className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={ 20 } color="#FFF" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to="/orphanages/create" className="create-orphanage">
                <FiPlus size={ 32 } color="#FFF" />
            </Link>
        </div>
    )
}

export default OrphanagesMap