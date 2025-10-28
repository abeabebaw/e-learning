import { clerkClient } from '@clerk/express'

export const updateRoleToEducator = async (req, res) => {
  try {
    const userId = req.auth.userId
    await clerkClient.users.updateUser(userId, {
      publicMetadata: {
        role: 'educator',
      }
    })
    res.json({ success: true, message: "You can publish course now" })
  } catch (error) {
    res.json({ success: false, message: "Error updating role", error: error.message })
  }
}
