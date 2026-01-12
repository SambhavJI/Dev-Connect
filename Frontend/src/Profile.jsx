import UserCard from "./UserCard"
import { useSelector } from "react-redux"

export default function Profile() {
    const user = useSelector((state) => state.user);
    return (
        user &&
        <UserCard user={user} />
    )
}