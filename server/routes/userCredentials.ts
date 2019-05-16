import {Request, Response, Router} from 'express'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  res.status(200)
})

export const userCredentials: Router = router
