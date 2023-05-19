import React from 'react';
import classes from './TextArea.module.css';


interface TextAreaProps {
    value: string;
    rows?: number;
    placeholder?: string;
    disableStyle?: boolean;
    maxLength?: number;

    password?: boolean;
    disabled?: boolean;
    inputError?: boolean;
    onBlur?: { (event: React.FocusEvent<HTMLTextAreaElement>): void };
    onFocus?: { (event: React.FocusEvent<HTMLTextAreaElement>): any };
    onKeyDown?: { (event: React.KeyboardEvent<HTMLTextAreaElement>): any };
    onChange: { (event: React.ChangeEvent<HTMLTextAreaElement>): void };
}

const TextArea = React.forwardRef((props: TextAreaProps, ref: React.Ref<HTMLTextAreaElement>) => {
    return (
        <div className={classes.TextAreaContainer}>
             <textarea
                 ref={ref}
                 value={props.value}
                 onBlur={props.onBlur}
                 rows={props.rows ?? 1}
                 onFocus={props.onFocus}
                 disabled={props.disabled}
                 maxLength={props.maxLength}
                 onKeyDown={props.onKeyDown}
                 placeholder={props.placeholder}
                 onChange={props.onChange}
                 className={classes.TextArea}
                 onInput={event => {
                     const textarea = event.currentTarget;
                     textarea.style.height = 'auto';
                     textarea.style.height = (textarea.scrollHeight) + 'px';
                 }}
             />
            <p className={classes.LetterCounter}>
                {`${props.value ? props.value.length : 0} / ${props.maxLength ?? 'infinity'}`}
            </p>
        </div>
    );
});


export default TextArea;