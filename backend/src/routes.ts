import { Router } from 'express'
import multer from 'multer'

import uploadConfig from './config/upload'
import OrphanagesController from './controllers/OrphanagesController'

const routes = Router()
const upload = multer(uploadConfig)

routes.get('/orphanages', OrphanagesController.index) // Rota para listar todos os orfanatos. Normalmente o index é utilizado para listagem
routes.get('/orphanages/:id', OrphanagesController.show) // Rota para buscar somente 1 orfanato. Pesquisa o orfanato pelo id
routes.post('/orphanages', upload.array('images'), OrphanagesController.create) // upload.array permite o upload de várias imagens ao mesmo tempo

export default routes