import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../utils/utils'
import { Photo } from "../../models/index"
import { IPhoto } from "../../models/Photo"

dbConnect();

export default async function getPhotos(req: NextApiRequest, res: NextApiResponse) {
  switch (req.method) {
    case "GET":
        try {
          const photos = await Photo.find()
          return res.json(photos)
        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    case "POST":
        try {
          console.log(req.body)
          const body: IPhoto = JSON.parse(req.body)
          const newPhoto = new Photo(body)
          const saved = await newPhoto.save()
          res.send(saved)
        } catch (err) {
          console.log(err)
          res.status(500).send("error")
        }
    }
}