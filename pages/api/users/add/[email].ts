import type { NextApiRequest, NextApiResponse } from 'next'
import { dbConnect } from '../../../../utils/utils'
import { User } from "../../../../models/index"

dbConnect();

export default async function addUser(req: NextApiRequest, res: NextApiResponse) {
    const {
      method,
      query: { email },
      body,
    } = req;
  
    switch (req.method) {
          case "PUT":
            try {
                const user = await User.findOne({"email":email})
                await User.findOneAndUpdate({"email":email}, {votes: user.votes-1}, {
                new: true,
                runValidators: true,
                });
                if (!user) return res.status(404).json({ msg: "Task does not exists" });
                return res.status(200).json(user);
            } catch (err) {
                return res.status(400).json({ msg: err });
            }
      }
  }