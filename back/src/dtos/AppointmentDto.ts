import { User } from "../entities/User"

interface Appointment {
    date : Date
    time : string
    userId : User
    status : string
}

export default Appointment