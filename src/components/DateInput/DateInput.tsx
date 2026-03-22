import React from "react";
import { validationStyles, formStyles } from '../../styles';
import type { DateInputProps } from "./types";

export const DateInput: React.FC<DateInputProps> = ({
    id,
    label,
    value,
    onChange,
    error,
    required = false,
    min,
    max,
    disabled = false,
    helpText,
    className = ""
}) => {
    const inputClassName = `${formStyles.input} ${error
        ? formStyles.inputError
        : formStyles.inputNormal
        } ${disabled ? formStyles.inputDisabled : ""} ${className}`;

    return (
        <div>
            <label
                htmlFor={id}
                className={formStyles.label}
            >
                {label}
                {required && <span className={validationStyles.required}>*</span>}
            </label>
            <input
                id={id}
                type="date"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className={inputClassName}
                required={required}
                min={min}
                max={max}
                disabled={disabled}
                aria-describedby={helpText ? `${id}-help` : undefined}
                aria-invalid={error ? "true" : "false"}
            />
            {helpText && (
                <p id={`${id}-help`} className={formStyles.helpText}>
                    {helpText}
                </p>
            )}
            {error && (
                <p className={validationStyles.errorText} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
