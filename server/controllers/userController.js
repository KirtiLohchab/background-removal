import { Webhook } from "svix";
import userModel from "./../models/userModel.js";
// http://background-removal-kl.vercel.app/api/user/webhooks
const clerkWebHook = async (req, res) => {
  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = req.body;
    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          firstName: data.firstName,
          lastName: data.lastName,
          email: data.email_addresses[0].email_address,
          photo: data.image_url,
        };
        await userModel.create(userData);
        res.json({});

        break;
      }
      case "user.updated": {
        const userData = {
          firstName: data.firstName,
          lastName: data.lastName,

          email: data.email_addresses[0].email_address,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        res.json({});
        break;
      }
      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        res.json({});
        break;
      }
      default:
        break;
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.massage });
  }
};

export { clerkWebHook };
