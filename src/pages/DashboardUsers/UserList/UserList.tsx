import { observer } from "mobx-react-lite";
import { UserData } from "./UserData";
import { IUser } from "types";

interface UserListProps {
   data: IUser[];
}

export const UserList = observer(({ data }: UserListProps) => {
   return data.map((user) => <UserData key={user.id} user={user} />);
});
