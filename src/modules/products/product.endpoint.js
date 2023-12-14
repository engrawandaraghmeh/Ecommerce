import { roles } from "../../middleware/auth.js"



export const endpoint={
    create:[roles.Admin],
    getAll:[roles.Admin],
    getActive:[roles.User],
    update:[roles.Admin],
    specifi:[roles.Admin,roles.Admin]
}