import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../utils/utils'
import { Photo } from "../../../models/index"

dbConnect();

export default async function getPhotos(req: NextApiRequest, res: NextApiResponse) {
    const {
      method,
      query: { id },
      body,
    } = req;
  
    switch (req.method) {
          case "PUT":
            try {
              const vote = await Photo.findOneAndUpdate({"id":id}, body, {
                new: true,
                runValidators: true,
              });
              if (!vote) return res.status(404).json({ msg: "Task does not exists" });
              return res.status(200).json(vote);
            } catch (err) {
              return res.status(400).json({ msg: err });
            }
      }
  }