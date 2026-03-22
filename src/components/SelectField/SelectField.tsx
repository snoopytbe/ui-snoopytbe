/**
 * @fileoverview Composant Select basé sur Radix UI pour une expérience unifiée
 */

import React from "react";
import { selectStyles, validationStyles } from '../../styles';
import * as Select from '@radix-ui/react-select';
import type { SelectFieldProps } from "./types";

export const SelectField: React.FC<SelectFieldProps> = ({
    id,
    label,
    value,
    options,
    onChange,
    error,
    required = false,
    placeholder = "Sélectionner une option",
    disabled = false,
    className = "",
    "data-testid": dataTestId
}) => {
    let classNameTrigger = error ? selectStyles.triggerError : selectStyles.trigger;
    classNameTrigger += disabled ? ' ' + selectStyles.triggerDisabled : '';
    classNameTrigger += ' ' + className;


    return (
        <div className={selectStyles.container}>
            <label
                htmlFor={id}
                className={selectStyles.label}
            >
                {label}
                {required && <span className={validationStyles.required}>*</span>}
            </label>
            <Select.Root
                value={value}
                onValueChange={onChange}
                disabled={disabled}
                required={required}
            >
                <Select.Trigger
                    className={classNameTrigger}
                    aria-label={label}
                    data-testid={dataTestId}
                    disabled={disabled}
                >
                    <Select.Value placeholder={placeholder} />
                    <Select.Icon className="shrink-0">
                        <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M3.13523 6.15803C3.3241 5.95657 3.64052 5.94637 3.84197 6.13523L7.5 9.56464L11.158 6.13523C11.3595 5.94637 11.6759 5.95657 11.8648 6.15803C12.0536 6.35949 12.0434 6.67591 11.842 6.86477L7.84197 10.6148C7.64964 10.7951 7.35036 10.7951 7.15803 10.6148L3.15803 6.86477C2.95657 6.67591 2.94637 6.35949 3.13523 6.15803Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
                        </svg>
                    </Select.Icon>
                </Select.Trigger>
                <Select.Portal>
                    <Select.Content className={selectStyles.content}>
                        <Select.Viewport className={selectStyles.viewport}>
                            {/* Option vide pour placeholder si nécessaire */}
                            {!value && (
                                <Select.Item value="" disabled className={selectStyles.item}>
                                    <Select.ItemText className={selectStyles.itemText}>
                                        {placeholder}
                                    </Select.ItemText>
                                </Select.Item>
                            )}
                            {options.map((option) => (
                                <Select.Item
                                    key={option.value}
                                    value={option.value}
                                    disabled={option.disabled}
                                    className={selectStyles.item}
                                >
                                    <Select.ItemText className={selectStyles.itemText}>
                                        {option.label}
                                    </Select.ItemText>
                                </Select.Item>
                            ))}
                        </Select.Viewport>
                    </Select.Content>
                </Select.Portal>
            </Select.Root>
            {error && (
                <p className={selectStyles.error} role="alert">
                    {error}
                </p>
            )}
        </div>
    );
};
