import { Request, Response, Router } from 'express'
import { createUser } from '../userModel'

const router: Router = Router()

router.post('/', (req: Request, res: Response) => {
  const postBody: IPostBody = req.body

  if (checkUsernameRegexp(postBody.username)) {
    createUser(postBody)
      .then(createdUser => {
        console.log(createdUser)
        res.json({ message: `Tack ${createdUser} för ditt deltagande, ta en kexchoklad och va som folk =)` })
      })
      .catch(err => res.send(err))
  } else {
    res.sendStatus(500)
  }
})

function checkUsernameRegexp(username: string) {
  const regexp = new RegExp('[A-Ö|a-ö]{2}[1-9]{3}[A-Ö|a-ö]{2}')

  return regexp.test(username)
}

export const userCredentials: Router = router
