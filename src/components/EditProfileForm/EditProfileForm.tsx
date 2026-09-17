import { useState, type SubmitEvent } from "react";
import type { User } from "../../types/user";
import { UpdateUser } from "../../services/UpdateUser.service";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./EditProfileForm.module.scss";

type EditProfileFormProps = {
    user: User;
};

function EditProfileForm({ user }: EditProfileFormProps) {
    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(String(user.phone));

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        await UpdateUser({
            firstname,
            lastname,
            email,
            phone: Number(phone),
        });
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <Input
                id="firstname"
                label="Fornavn"
                type="text"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
            />

            <Input
                id="lastname"
                label="Efternavn"
                type="text"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
            />

            <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
            />

            <Input
                id="phone"
                label="Telefon"
                type="number"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
            />

            <Button type="submit">Gem ændringer</Button>
        </form>
    );
}
export default EditProfileForm