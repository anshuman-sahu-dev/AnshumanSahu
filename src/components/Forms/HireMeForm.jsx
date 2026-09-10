import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence, useAnimationControls } from 'framer-motion';
import { Loader2, AlertCircle, ChevronDown, Send } from 'lucide-react';
import { FormField } from './FormField';
import { useHireMeForm } from './useHireMeForm';

// ── Shared input/select/textarea class builder ───────────────────────────────
function inputCls(hasError) {
  return [
    'w-full bg-paper border-2 px-4 py-3 text-[15px] text-ink',
    'placeholder:text-ink/30 outline-none transition-all duration-150',
    hasError
      ? 'border-red-500 shadow-[3px_3px_0_#ef4444] focus:border-red-500 focus:shadow-[3px_3px_0_#ef4444]'
      : 'border-ink focus:border-orange focus:shadow-[3px_3px_0_var(--color-orange)]',
  ].join(' ');
}

// ── Success card ─────────────────────────────────────────────────────────────
function SuccessCard({ onReset }) {
  return (
    <motion.div
      key="success"
      initial={{ scale: 0.88, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.88, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 280, damping: 22 }}
      className="text-center py-12 px-4"
    >
      <span className="text-[72px] leading-none block select-none">🎉</span>
      <h3 className="font-display font-black uppercase text-[clamp(24px,3vw,32px)] mt-5 leading-tight">
        Message sent!
      </h3>
      <p className="font-marker text-[20px] text-green mt-2 -rotate-1 inline-block">
        I&apos;ll be in your inbox soon. Promise.
      </p>
      <div className="mt-8">
        <button
          onClick={onReset}
          className="font-display uppercase border-3 border-ink transition-all duration-150 inline-flex items-center gap-2 cursor-pointer text-[13px] font-black bg-transparent text-ink px-6 py-3 hover:bg-yellow hover:rotate-1 hover:shadow-[4px_4px_0_var(--color-ink)]"
        >
          Send another →
        </button>
      </div>
    </motion.div>
  );
}

// ── Main form component ───────────────────────────────────────────────────────
export const HireMeForm = ({ hireMeSignal = 0 }) => {
  const {
    values, errors, touched, status, meta,
    handleChange, handleBlur, handleSubmit, reset,
  } = useHireMeForm();

  const cardControls = useAnimationControls();
  const formControls = useAnimationControls();
  const prevSignal   = useRef(0);

  // Pulse + focus when HIRE ME is clicked
  useEffect(() => {
    if (hireMeSignal > 0 && hireMeSignal !== prevSignal.current) {
      prevSignal.current = hireMeSignal;
      // Card pulse
      cardControls.start({
        scale: [1, 1.018, 1],
        boxShadow: [
          '8px 8px 0 var(--color-ink)',
          '10px 10px 0 var(--color-orange)',
          '8px 8px 0 var(--color-ink)',
        ],
        transition: { duration: 0.5, ease: 'easeInOut' },
      });
      // Focus first field after scroll settles
      setTimeout(() => document.getElementById('inquiryType')?.focus(), 600);
    }
  }, [hireMeSignal, cardControls]);

  // Submit handler with shake on validation failure
  const onSubmit = async (e) => {
    const passed = await handleSubmit(e);
    if (passed === false) {
      formControls.start({
        x: [0, -9, 9, -6, 6, -2, 0],
        transition: { duration: 0.38, ease: 'easeInOut' },
      });
    }
  };

  const isLoading   = status === 'loading';
  const isError     = status === 'error' || status === 'rate-limited';

  return (
    <section aria-labelledby="hire-form-heading" className="mt-16 pt-12 border-t-2 border-dashed border-ink/20">
      {/* Section intro */}
      <div className="text-center mb-10">
        <h3
          id="hire-form-heading"
          className="font-display font-black uppercase text-[clamp(20px,2.8vw,32px)] inline"
        >
          Or fill in the details →
        </h3>
        <div className="mt-2">
          <span className="font-marker text-[18px] text-green -rotate-2 inline-block">
            i read every message personally
          </span>
        </div>
      </div>

      {/* Form card */}
      <motion.div
        animate={cardControls}
        style={{ boxShadow: '8px 8px 0 var(--color-ink)' }}
        className="max-w-[720px] mx-auto border-3 border-ink p-7 md:p-10 -rotate-[0.4deg] focus-within:rotate-0 focus-within:shadow-[10px_10px_0_var(--color-orange)] transition-transform duration-250"
      >
        <AnimatePresence mode="wait">
          {status === 'success' ? (
            <SuccessCard key="success" onReset={reset} />
          ) : (
            <motion.form
              key="form"
              animate={formControls}
              onSubmit={onSubmit}
              noValidate
              className="flex flex-col gap-5"
            >
              {/* Honeypot — invisible to users, catches bots */}
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
              {isError && (
                <motion.div
                  initial={{ opacity: 0, y: -8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="border-2 border-red-500 bg-red-50 dark:bg-red-950/30 p-4 flex items-start gap-3"
                >
                  <AlertCircle size={17} className="text-red-500 mt-0.5 shrink-0" />
                  <p className="text-[13px] text-red-600 dark:text-red-400 leading-relaxed">
                    {status === 'rate-limited'
                      ? 'Too many requests. Please wait a moment and try again.'
                      : <>Something went wrong. Please try again or email me at{' '}
                          <a href="mailto:toanshumansahu@gmail.com" className="underline">
                            toanshumansahu@gmail.com
                          </a>
                        </>
                    }
                  </p>
                </motion.div>
              )}

              {/* Inquiry Type — full width */}
              <FormField
                id="inquiryType"
                label="Inquiry Type"
                required
                error={touched.inquiryType ? errors.inquiryType : ''}
              >
                <div className="relative">
                  <select
                    id="inquiryType"
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
                  <ChevronDown
                    size={16}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/50 pointer-events-none"
                  />
                </div>
              </FormField>

              {/* Row: Name + Email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  id="name"
                  label="Contact Person Name"
                  required
                  error={touched.name ? errors.name : ''}
                >
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="Your full name"
                    autoComplete="name"
                    aria-required
                    aria-invalid={!!(touched.name && errors.name)}
                    aria-describedby={touched.name && errors.name ? 'name-error' : undefined}
                    className={inputCls(touched.name && errors.name)}
                  />
                </FormField>
                <FormField
                  id="email"
                  label="Work Email"
                  required
                  error={touched.email ? errors.email : ''}
                >
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={values.email}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="you@company.com"
                    autoComplete="email"
                    aria-required
                    aria-invalid={!!(touched.email && errors.email)}
                    aria-describedby={touched.email && errors.email ? 'email-error' : undefined}
                    className={inputCls(touched.email && errors.email)}
                  />
                </FormField>
              </div>

              {/* Row: Company (dynamic label) + Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <FormField
                  id="company"
                  label={meta.companyLabel}
                  required
                  error={touched.company ? errors.company : ''}
                >
                  <input
                    id="company"
                    type="text"
                    name="company"
                    value={values.company}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={meta.companyPlaceholder}
                    autoComplete="organization"
                    aria-required
                    aria-invalid={!!(touched.company && errors.company)}
                    aria-describedby={touched.company && errors.company ? 'company-error' : undefined}
                    className={inputCls(touched.company && errors.company)}
                  />
                </FormField>
                <FormField
                  id="phone"
                  label="Phone Number"
                  optional
                  error={touched.phone ? errors.phone : ''}
                >
                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={values.phone}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder="+91 98765 43210"
                    autoComplete="tel"
                    aria-invalid={!!(touched.phone && errors.phone)}
                    aria-describedby={touched.phone && errors.phone ? 'phone-error' : undefined}
                    className={inputCls(touched.phone && errors.phone)}
                  />
                </FormField>
              </div>

              {/* Website — full width */}
              <FormField
                id="website"
                label="Company Website / LinkedIn"
                optional
                error={touched.website ? errors.website : ''}
                hint="https:// will be added automatically if missing"
              >
                <input
                  id="website"
                  type="url"
                  name="website"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder="https://yourcompany.com  or  linkedin.com/in/yourprofile"
                  autoComplete="url"
                  aria-invalid={!!(touched.website && errors.website)}
                  aria-describedby={touched.website && errors.website ? 'website-error' : undefined}
                  className={inputCls(touched.website && errors.website)}
                />
              </FormField>

              {/* Description — full width with char count */}
              <FormField
                id="description"
                label="Job / Project Description"
                required
                error={touched.description ? errors.description : ''}
              >
                <div className="relative">
                  <textarea
                    id="description"
                    name="description"
                    rows={5}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    placeholder={meta.descriptionPlaceholder}
                    maxLength={1000}
                    aria-required
                    aria-invalid={!!(touched.description && errors.description)}
                    aria-describedby={touched.description && errors.description ? 'description-error' : undefined}
                    className={`resize-y ${inputCls(touched.description && errors.description)}`}
                  />
                  <span
                    className={`absolute bottom-3 right-3 font-marker text-[13px] pointer-events-none select-none transition-colors ${
                      values.description.length >= 950 ? 'text-red-500' : 'text-ink/30'
                    }`}
                  >
                    {values.description.length} / 1000
                  </span>
                </div>
              </FormField>

              {/* Required fields note + Submit */}
              <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-4 pt-2">
                <p className="text-[11px] text-ink/40 font-medium">
                  <span className="text-orange">✱</span> Required fields
                </p>
                <button
                  type="submit"
                  disabled={isLoading}
                  aria-label={isLoading ? 'Sending your message, please wait' : 'Send your inquiry'}
                  className="font-display text-[16px] uppercase bg-orange text-white px-[40px] py-[16px] border-3 border-ink shadow-[6px_6px_0_var(--color-ink)] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center
                    hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-[10px_10px_0_var(--color-ink)] hover:bg-green
                    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[6px_6px_0_var(--color-ink)] disabled:hover:bg-orange"
                >
                  {isLoading ? (
                    <><Loader2 size={18} className="animate-spin" /> Sending...</>
                  ) : (
                    <><Send size={16} /> SEND IT</>
                  )}
                </button>
              </div>
            </motion.form>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};
