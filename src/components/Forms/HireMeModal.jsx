import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, AlertCircle, ChevronDown, Send } from 'lucide-react';
import { FormField } from './FormField';
import { useHireMeForm } from './useHireMeForm';

// ── Input class helper ────────────────────────────────────────────────────────
function inputCls(hasError) {
  return [
    'w-full bg-paper border-2 px-4 py-3 text-[15px] text-ink',
    'placeholder:text-ink/30 outline-none transition-all duration-150',
    hasError
      ? 'border-red-500 shadow-[3px_3px_0_#ef4444] focus:border-red-500 focus:shadow-[3px_3px_0_#ef4444]'
      : 'border-ink focus:border-orange focus:shadow-[3px_3px_0_var(--color-orange)]',
  ].join(' ');
}

// ── Success card ──────────────────────────────────────────────────────────────
function SuccessCard({ onReset, onClose }) {
  return (
    <motion.div
      key="success"
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="text-center py-14 px-6"
    >
      <span className="text-[68px] leading-none block select-none">🎉</span>
      <h3 className="font-display font-black uppercase text-[clamp(22px,3vw,30px)] mt-5 leading-tight">
        Message Sent!
      </h3>
      <p className="font-marker text-[19px] text-green mt-2 -rotate-1 inline-block">
        I'll be in your inbox soon. Promise.
      </p>
      <div className="flex justify-center gap-3 mt-8 flex-wrap">
        <button
          onClick={onReset}
          className="font-display uppercase border-3 border-ink transition-all duration-150 inline-flex items-center gap-2 cursor-pointer text-[13px] font-black bg-transparent text-ink px-6 py-3 hover:bg-yellow hover:rotate-1 hover:shadow-[4px_4px_0_var(--color-ink)]"
        >
          Send another
        </button>
        <button
          onClick={onClose}
          className="font-display uppercase border-3 border-ink transition-all duration-150 inline-flex items-center gap-2 cursor-pointer text-[13px] font-black bg-orange text-white px-6 py-3 hover:bg-green hover:shadow-[4px_4px_0_var(--color-ink)] hover:-translate-y-0.5"
        >
          Close ✓
        </button>
      </div>
    </motion.div>
  );
}

// ── Modal ─────────────────────────────────────────────────────────────────────
export const HireMeModal = ({ isOpen, onClose }) => {
  const {
    values, errors, touched, status, meta,
    handleChange, handleBlur, handleSubmit, reset,
  } = useHireMeForm();

  const firstFieldRef = useRef(null);

  // Lock body scroll + auto-focus first field when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const t = setTimeout(() => firstFieldRef.current?.focus(), 120);
      return () => clearTimeout(t);
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Close on Escape key
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    if (isOpen) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [isOpen, onClose]);

  const isLoading = status === 'loading';
  const isErr     = status === 'error' || status === 'rate-limited';

  const onSubmit = async (e) => { await handleSubmit(e); };

  const handleReset = () => reset();
  const handleCloseAndReset = () => { onClose(); setTimeout(reset, 300); };

  return (
    <AnimatePresence>
      {isOpen && (
        /* ── Backdrop ── */
        <motion.div
          key="hire-modal"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-4 md:p-6"
          onClick={handleCloseAndReset}
          aria-modal="true"
          role="dialog"
          aria-labelledby="hire-modal-title"
        >
          {/* Dark overlay */}
          <div className="absolute inset-0 bg-black/75 backdrop-blur-[3px]" />

          {/* ── Modal card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 320, damping: 28 }}
            className="relative z-10 w-full max-w-[660px] max-h-[92vh] flex flex-col border-3 border-ink shadow-[14px_14px_0_var(--color-orange)]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* ── Header (sticky) ── */}
            <div className="shrink-0 bg-paper border-b-3 border-ink px-6 md:px-8 pt-6 pb-5 flex items-start justify-between gap-4">
              <div>
                <h2
                  id="hire-modal-title"
                  className="font-display font-black uppercase text-[clamp(19px,3vw,27px)] leading-[1.05]"
                >
                  Let&apos;s Work{' '}
                  <span className="text-orange">Together.</span>
                </h2>
                <span className="font-marker text-[16px] text-green inline-block mt-1.5 -rotate-1">
                  i read every message personally
                </span>
              </div>
              <button
                onClick={handleCloseAndReset}
                aria-label="Close inquiry form"
                className="shrink-0 w-9 h-9 border-2 border-ink bg-paper flex items-center justify-center shadow-[2px_2px_0_var(--color-ink)] hover:bg-orange hover:text-white hover:border-orange hover:shadow-[3px_3px_0_var(--color-ink)] hover:-translate-x-0.5 hover:-translate-y-0.5 transition-all cursor-pointer text-ink"
              >
                <X size={17} strokeWidth={2.5} />
              </button>
            </div>

            {/* ── Scrollable form body ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-paper px-6 md:px-8 py-6">
              <AnimatePresence mode="wait">
                {status === 'success' ? (
                  <SuccessCard
                    key="success"
                    onReset={handleReset}
                    onClose={handleCloseAndReset}
                  />
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onSubmit={onSubmit}
                    noValidate
                    className="flex flex-col gap-5"
                  >
                    {/* Honeypot */}
                    <input
                      type="text"
                      name="_gotcha"
                      style={{ display: 'none' }}
                      tabIndex={-1}
                      aria-hidden="true"
                      value={values._gotcha}
                      onChange={handleChange}
                    />

                    {/* Error banner */}
                    {isErr && (
                      <motion.div
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-2 border-red-500 bg-red-50 dark:bg-red-950/30 p-4 flex items-start gap-3"
                      >
                        <AlertCircle size={16} className="text-red-500 mt-0.5 shrink-0" />
                        <p className="text-[13px] text-red-600 dark:text-red-400 leading-relaxed">
                          {status === 'rate-limited'
                            ? 'Too many requests. Please wait a moment and try again.'
                            : <>Something went wrong. Email me at{' '}
                                <a href="mailto:toanshumansahu@gmail.com" className="underline">
                                  toanshumansahu@gmail.com
                                </a>
                              </>
                          }
                        </p>
                      </motion.div>
                    )}

                    {/* Inquiry Type */}
                    <FormField
                      id="inquiryType"
                      label="Inquiry Type"
                      required
                      error={touched.inquiryType ? errors.inquiryType : ''}
                    >
                      <div className="relative">
                        <select
                          id="inquiryType"
                          ref={firstFieldRef}
                          name="inquiryType"
                          value={values.inquiryType}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          aria-required
                          aria-invalid={!!(touched.inquiryType && errors.inquiryType)}
                          aria-describedby={touched.inquiryType && errors.inquiryType ? 'inquiryType-error' : undefined}
                          className={`appearance-none cursor-pointer ${inputCls(touched.inquiryType && errors.inquiryType)}`}
                        >
                          <option value="" disabled>Select the nature of your inquiry...</option>
                          <option value="job">💼  Job Opportunity</option>
                          <option value="freelance">🚀  Freelance Project</option>
                          <option value="collab">🤝  Collaboration</option>
                          <option value="other">💬  Other</option>
                        </select>
                        <ChevronDown size={15} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none" />
                      </div>
                    </FormField>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField id="name" label="Contact Person Name" required error={touched.name ? errors.name : ''}>
                        <input
                          id="name" type="text" name="name"
                          value={values.name} onChange={handleChange} onBlur={handleBlur}
                          placeholder="Your full name" autoComplete="name"
                          aria-required aria-invalid={!!(touched.name && errors.name)}
                          aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                          className={inputCls(touched.name && errors.name)}
                        />
                      </FormField>
                      <FormField id="email" label="Work Email" required error={touched.email ? errors.email : ''}>
                        <input
                          id="email" type="email" name="email"
                          value={values.email} onChange={handleChange} onBlur={handleBlur}
                          placeholder="you@company.com" autoComplete="email"
                          aria-required aria-invalid={!!(touched.email && errors.email)}
                          aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                          className={inputCls(touched.email && errors.email)}
                        />
                      </FormField>
                    </div>

                    {/* Company + Phone */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                      <FormField id="company" label={meta.companyLabel} required error={touched.company ? errors.company : ''}>
                        <input
                          id="company" type="text" name="company"
                          value={values.company} onChange={handleChange} onBlur={handleBlur}
                          placeholder={meta.companyPlaceholder} autoComplete="organization"
                          aria-required aria-invalid={!!(touched.company && errors.company)}
                          aria-describedby={touched.company && errors.company ? 'company-error' : undefined}
                          className={inputCls(touched.company && errors.company)}
                        />
                      </FormField>
                      <FormField id="phone" label="Phone Number" optional error={touched.phone ? errors.phone : ''}>
                        <input
                          id="phone" type="tel" name="phone"
                          value={values.phone} onChange={handleChange} onBlur={handleBlur}
                          placeholder="+91 98765 43210" autoComplete="tel"
                          aria-invalid={!!(touched.phone && errors.phone)}
                          aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                          className={inputCls(touched.phone && errors.phone)}
                        />
                      </FormField>
                    </div>

                    {/* Website */}
                    <FormField
                      id="website"
                      label="Company Website / LinkedIn"
                      optional
                      error={touched.website ? errors.website : ''}
                      hint="https:// will be added automatically if missing"
                    >
                      <input
                        id="website" type="url" name="website"
                        value={values.website} onChange={handleChange} onBlur={handleBlur}
                        placeholder="https://yourcompany.com  or  linkedin.com/in/yourprofile"
                        autoComplete="url"
                        aria-invalid={!!(touched.website && errors.website)}
                        aria-describedby={touched.website && errors.website ? 'website-error' : undefined}
                        className={inputCls(touched.website && errors.website)}
                      />
                    </FormField>

                    {/* Description */}
                    <FormField
                      id="description"
                      label="Job / Project Description"
                      required
                      error={touched.description ? errors.description : ''}
                    >
                      <div className="relative">
                        <textarea
                          id="description" name="description"
                          rows={4}
                          value={values.description}
                          onChange={handleChange} onBlur={handleBlur}
                          placeholder={meta.descriptionPlaceholder}
                          maxLength={1000}
                          aria-required aria-invalid={!!(touched.description && errors.description)}
                          aria-describedby={touched.description && errors.description ? 'description-error' : undefined}
                          className={`resize-y ${inputCls(touched.description && errors.description)}`}
                        />
                        <span className={`absolute bottom-3 right-3 font-marker text-[12px] pointer-events-none select-none transition-colors ${values.description.length >= 950 ? 'text-red-500' : 'text-ink/30'}`}>
                          {values.description.length} / 1000
                        </span>
                      </div>
                    </FormField>

                    {/* Submit row */}
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3 pt-1">
                      <p className="text-[11px] text-ink/40">
                        <span className="text-orange">✱</span> Required fields
                      </p>
                      <button
                        type="submit"
                        disabled={isLoading}
                        aria-label={isLoading ? 'Sending your message, please wait' : 'Send your inquiry'}
                        className="font-display text-[15px] uppercase bg-orange text-white px-[38px] py-[15px] border-3 border-ink shadow-[6px_6px_0_var(--color-ink)] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center
                          hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[10px_10px_0_var(--color-ink)] hover:bg-green
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_var(--color-ink)] disabled:hover:bg-orange"
                      >
                        {isLoading
                          ? <><Loader2 size={17} className="animate-spin" /> Sending...</>
                          : <><Send size={15} /> SEND IT</>
                        }
                      </button>
                    </div>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
