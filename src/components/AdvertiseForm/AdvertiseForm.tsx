import {
    useState,
    type ChangeEvent,
    type SubmitEvent,
} from "react";

import Button from "../Button/Button";
import Input from "../Input/Input";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loading from "../Loading/Loading";
import { createAnnonce } from "../../services/annonce.service";
import styles from "./AdvertiseForm.module.scss";

function AdvertiseForm() {
    const [formData, setFormData] = useState({
        title: "",
        description: "",
        address: "",
        zipcode: "",
        city: "",
        organization: "",
        workHome: "",
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    function handleChange(
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) {
        const { name, value } = event.target;

        setFormData((currentData) => ({
            ...currentData,
            [name]: value,
        }));
    }

    async function handleSubmit(event: SubmitEvent<HTMLFormElement>) {
        // Forhindrer browseren i at genindlæse siden.
        event.preventDefault();

        setLoading(true);
        setError("");

        try {
            // Browserens inputværdier kommer altid ind som tekst men API'et
            // forventer et numerisk postnummer
            await createAnnonce({
                title: formData.title,
                description: formData.description,
                address: formData.address,
                zipcode: Number(formData.zipcode),
                city: formData.city,
                organization: formData.organization,
                workHome: formData.workHome,
            });

            // Rydder formularen efter annoncen er oprettet.
            setFormData({
                title: "",
                description: "",
                address: "",
                zipcode: "",
                city: "",
                organization: "",
                workHome: "",
            });
        } catch (error) {
            setError(
                error instanceof Error
                    ? error.message
                    : "Annoncen kunne ikke oprettes."
            );
        } finally {
            // finally sikrer at loading altid slås fra både efter succes og fejl
            setLoading(false);
        }
    }

    if (loading) {
        return <Loading message="Opretter annonce..." />;
    }

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h1>Opret annonce</h1>

            {error && <ErrorMessage message={error} />}

            <div className={styles.formLayout}>
                <div className={styles.inputColumn}>
                    <Input
                        id="title"
                        name="title"
                        label="Titel"
                        value={formData.title}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="address"
                        name="address"
                        label="Adresse"
                        value={formData.address}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="zipcode"
                        name="zipcode"
                        label="Postnummer"
                        type="number"
                        value={formData.zipcode}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="city"
                        name="city"
                        label="By"
                        value={formData.city}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="organization"
                        name="organization"
                        label="Organisation"
                        value={formData.organization}
                        onChange={handleChange}
                        required
                    />

                    <Input
                        id="workHome"
                        name="workHome"
                        label="Hjemmearbejde"
                        value={formData.workHome}
                        onChange={handleChange}
                        required
                    />
                </div>

                <div className={styles.descriptionColumn}>
                    <label htmlFor="description">Beskrivelse</label>

                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />

                    <Button
                        type="submit"
                        className={styles.submitButton}
                    >
                        Opret annonce
                    </Button>
                </div>
            </div>
        </form>
    );
}
export default AdvertiseForm;