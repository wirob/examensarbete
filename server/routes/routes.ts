import { Router } from 'express'
import { userCredentials } from './userCredentials'

const router: Router = Router()

router.use('/userCredentials', userCredentials)

export const routes: Router = router
