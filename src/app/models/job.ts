import { User } from "./user"

export class Job{
  key?:string
  name?:string
  desc?:string
  user?: User
  uid?:string
  category?: string
  subCategory?:string
  photoUrl?:string
}
