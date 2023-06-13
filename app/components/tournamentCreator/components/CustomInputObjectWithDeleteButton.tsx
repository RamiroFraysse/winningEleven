import {ErrorMessage, useField} from "formik";

interface Props {
    label: string;
    name: string;
    id: string;
    type?: "text" | "email" | "password" | "number";
    placeholder?: string;
    onDelete: () => void;
    className: string;
    [x: string]: any;
}

export default function CustomInputObjectWithDeleteButton({
    label,
    id,
    onDelete,
    className,
    ...props
}: Props): React.ReactElement {
    const [field] = useField(props);
    return (
        <div>
            <label className="text-main" htmlFor={id}>
                {label}
            </label>
            <div className="relative">
                <input
                    type="text"
                    {...field}
                    {...props}
                    className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline placeholder-gray-100 ${className}`}
                />

                <button
                    className="absolute right-0 top-0 mt-2 mr-2 text-gray-600 hover:text-cyan-500"
                    type="button"
                    onClick={onDelete}
                >
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            d="M6 18L18 6M6 6l12 12"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                        />
                    </svg>
                </button>
            </div>
            <ErrorMessage
                className="text-red-200"
                component="span"
                name={props.name}
            />
        </div>
    );
}
