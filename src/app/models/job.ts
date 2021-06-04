import { User } from "./user"

export class Job{
  key?:string
  name?:string
  desc?:string
  user?: User
  uid?:string
  date?:string
  category?: string
  subCategory?:string
  photoUrl?:string
}
