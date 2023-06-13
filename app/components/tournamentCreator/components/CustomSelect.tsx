import {ErrorMessage, useField} from "formik";

interface Props {
    label: string;
    name: string;
    placeholder?: string;
    [x: string]: any;
}

export default function CustomSelect({
    label,
    ...props
}: Props): React.ReactElement {
    const [field] = useField(props);
    return (
        <>
            <label htmlFor={props.id || props.name}>{label}</label>
            <select {...field} {...props} />
            <ErrorMessage component="span" name={props.name} />
        </>
    );
}
