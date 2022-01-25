import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../utils/utils'
import { Photo } from "../../models/index"
import { IPhoto } from "../../models/Photo"

dbConnect();

export default async function getPhotos(req: NextApiRequest, res: NextApiResponse) {
  const {
    method,
    query: { id },
    body,
  } = req;

  switch (req.method) {
    case "GET":
        try {
          const photos = await Photo.find()
          return res.json(photos)
        } catch (err) {
            console.log(err)
            res.status(500).send("error")
        }
    }
}