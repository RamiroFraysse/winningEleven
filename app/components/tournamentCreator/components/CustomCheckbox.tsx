import {ErrorMessage, useField} from "formik";

interface Props {
    label: string;
    name: string;
    [x: string]: any;
}

export default function CustomCheckbox({
    label,
    ...props
}: Props): React.ReactElement {
    const [field] = useField({...props, type: "checkbox"});
    return (
        <>
            <label className="block text-gray-700 font-bold mb-2">
                <input
                    type="checkbox"
                    {...field}
                    {...props}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                {label}
            </label>
            <ErrorMessage component="span" name={props.name} />
        </>
    );
}
