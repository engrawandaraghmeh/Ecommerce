import { roles } from "../../middleware/auth.js";

export const endpoint={
    create:[roles.User],
    delete:[roles.User],
    clear:[roles.User],
    get:[roles.User]
}