import {ErrorMessage, useField} from "formik";

interface Props {
    label: string;
    name: string;
    id: string;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    className?: string;
    [x: string]: any;
}

export default function CustomInputText({
    label,
    id,
    className = "",
    ...props
}: Props): React.ReactElement {
    // console.log({label});
    // console.log({props});
    const [field] = useField(props);
    // console.log({field});
    return (
        <div>
            <label className="text-main" htmlFor={id}>
                {label}
            </label>
            <input
                type="text"
                {...field}
                {...props}
                className={`shadow appearance-none border rounded w-full py-2 px-3 mb-1 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-200 ${className}`}
            />
            <ErrorMessage
                className="text-red-200"
                component="span"
                name={props.name}
            />
        </div>
    );
}
