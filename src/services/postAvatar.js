import axios from "axios"
import { endpoint } from "./endpoint"

export const postAvatar = async (data, userId, token) => {
  
    try{
      const response = await endpoint.put(`https://home-quest-app.onrender.com/api/v1/users/${userId}`, {
        body: {
          profilePicture: data
        }
        ,
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('Respuesta: ', response)
      // return response
    } catch (error) {
      console.log('error: ', error.response)
    }
}