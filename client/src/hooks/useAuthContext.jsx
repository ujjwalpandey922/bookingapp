import  { useContext } from 'react'
import { AuthContext } from '../context/authContext'

const useAuthContext = () =>  useContext(AuthContext)

export default useAuthContext
