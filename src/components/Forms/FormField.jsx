import React from 'react';

/**
 * Reusable form field wrapper.
 * Provides: accessible label, optional/required tag, hint text, error message.
 * Children are rendered as-is — apply your own input styles in the consumer.
 */
export const FormField = ({ id, label, required = false, optional = false, error, hint, children }) => (
  <div className="flex flex-col gap-1.5">
    <label
      htmlFor={id}
      className="text-[11px] font-semibold uppercase tracking-[0.09em] text-ink flex items-center gap-1.5"
    >
      {label}
      {required && (
        <span className="text-orange text-[13px] leading-none" aria-hidden="true">✱</span>
      )}
      {optional && (
        <span className="font-marker text-[13px] text-ink/40 normal-case tracking-normal font-normal">
          optional
        </span>
      )}
    </label>

    {hint && (
      <p className="text-[11px] text-ink/45 -mt-0.5 leading-relaxed">{hint}</p>
    )}

    {children}

    {error && (
      <p
        id={`${id}-error`}
        role="alert"
        className="text-[11px] text-red-500 dark:text-red-400 font-medium flex items-center gap-1 mt-0.5"
      >
        <span aria-hidden="true">⚠</span> {error}
      </p>
    )}
  </div>
);
