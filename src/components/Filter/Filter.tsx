import { type FilterData } from "../../types/Filter";
import styles from "./Filter.module.scss";

type FilterProps = {
    values: FilterData;
    regions: string[];
    categories: string[];
    workTypes: string[];
    onChange: (values: FilterData) => void;
    onReset: () => void;
};

function Filter({
    values,
    regions,
    categories,
    workTypes,
    onChange,
    onReset,
}: FilterProps) {

    // keyof sikrer, at vi kun ændrer felter, der findes i FilterData
    function changeFilter(name: keyof FilterData, value: string) {
        onChange({
            ...values,
            [name]: value,
        });
    }

    return (
        <div className={styles.filterContainer}>
            <select
                value={values.region}
                onChange={(event) =>
                    changeFilter("region", event.target.value)
                }
            >
                <option value="">Vælg region</option>
                {regions.map((region) => (
                    <option key={region} value={region}>
                        {region}
                    </option>
                ))}
            </select>

            <select
                value={values.category}
                onChange={(event) =>
                    changeFilter("category", event.target.value)
                }
            >
                <option value="">Vælg kategori</option>
                {categories.map((category) => (
                    <option key={category} value={category}>
                        {category}
                    </option>
                ))}
            </select>

            <select
                value={values.workType}
                onChange={(event) =>
                    changeFilter("workType", event.target.value)
                }
            >
                <option value="">Vælg arbejdstid</option>
                {workTypes.map((workType) => (
                    <option key={workType} value={workType}>
                        {workType}
                    </option>
                ))}
            </select>

            <select
                value={values.workHome}
                onChange={(event) =>
                    changeFilter("workHome", event.target.value)
                }
            >
                <option value="">Hjemmearbejde</option>
                <option value="ja">Ja</option>
                <option value="nej">Nej</option>
            </select>

            <select
                value={values.period}
                onChange={(event) =>
                    changeFilter("period", event.target.value)
                }
            >
                <option value="">Alle perioder</option>
                <option value="week">Seneste uge</option>
                <option value="month">Seneste måned</option>
                <option value="year">Seneste år</option>
            </select>

            <button type="button" onClick={onReset}>
                Nulstil
            </button>
        </div>
    );
}

export default Filter;