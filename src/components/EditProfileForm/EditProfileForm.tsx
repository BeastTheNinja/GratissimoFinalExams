import { useState, type SubmitEvent } from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import type { User } from "../../types/user";
import { UpdateUser } from "../../services/UpdateUser.service";
import Input from "../Input/Input";
import Button from "../Button/Button";
import styles from "./EditProfileForm.module.scss";
import { useNavigate } from "react-router";

import { Cookies } from "react-cookie";

const cookies = new Cookies();

type EditProfileFormProps = {
    user: User;
};

function EditProfileForm({ user }: EditProfileFormProps) {

    const navigate = useNavigate()

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");


    const [firstname, setFirstname] = useState(user.firstname);
    const [lastname, setLastname] = useState(user.lastname);
    const [email, setEmail] = useState(user.email);
    const [phone, setPhone] = useState(String(user.phone));

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        event.preventDefault();

        setError("");
        setSuccess("");

        try {
            const updatedUser = {
                ...user,
                firstname: firstname.trim(),
                lastname: lastname.trim(),
                email: email.trim(),
                phone: Number(phone),
            };

            await UpdateUser(updatedUser);

            cookies.set("user", updatedUser);

            setSuccess("Dine oplysninger er blevet gemt.");
            
            navigate("/mypage")
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Kunne ikke gemme dine oplysninger."
            );
        }
    }


    return (
        <form className={styles.form} onSubmit={handleSubmit}>

            {error && <ErrorMessage message={error} />}

            {success && (
                <p role="status" className={styles.success}>
                    {success}
                </p>
            )}

            <Input
                id="firstname"
                label="Fornavn"
                type="text"
                value={firstname}
                onChange={(event) => setFirstname(event.target.value)}
                required
            />

            <Input
                id="lastname"
                label="Efternavn"
                type="text"
                value={lastname}
                onChange={(event) => setLastname(event.target.value)}
                required
            />

            <Input
                id="email"
                label="Email"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
            />

            <Input
                id="phone"
                name="phone"
                label="Telefon"
                type="tel"
                value={phone}
                onChange={(event) => setPhone(event.target.value)}
                required
            />

            <Button type="submit">Gem ændringer</Button>
        </form>
    );
}
export default EditProfileForm