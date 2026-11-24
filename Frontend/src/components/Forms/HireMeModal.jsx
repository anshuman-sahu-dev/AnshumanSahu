import React, { useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Loader2, AlertCircle, ChevronDown, Send, CheckCircle2, Sparkles, Zap, MessageSquare } from 'lucide-react';
import { FormField } from './FormField';
import { useHireMeForm } from './useHireMeForm';
import profileImg from '../../assets/Profile/Anshuman Sahu.png';

// ── Floating Decorative Particle Component ──────────────────────────────────
function AmbientParticles() {
  const particles = [
    { top: '8%', left: '4%', size: 'w-3 h-3', color: 'bg-orange', delay: 0, duration: 4 },
    { top: '15%', right: '6%', size: 'w-2 h-2', color: 'bg-green', delay: 1, duration: 5 },
    { top: '75%', left: '3%', size: 'w-2.5 h-2.5', color: 'bg-yellow', delay: 0.5, duration: 4.5 },
    { top: '82%', right: '5%', size: 'w-3 h-3', color: 'bg-orange/80', delay: 1.5, duration: 3.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
      {particles.map((p, idx) => (
        <motion.div
          key={idx}
          style={{ top: p.top, left: p.left, right: p.right }}
          animate={{
            y: [0, -10, 0],
            rotate: [0, 45, -45, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: p.delay,
          }}
          className={`absolute rounded-full border border-ink/40 ${p.size} ${p.color} opacity-70 shadow-sm`}
        />
      ))}
      {/* Decorative Neo-Brutalist Cross / Plus */}
      <motion.span
        animate={{ rotate: [0, 180], scale: [1, 1.1, 1] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
        className="absolute top-6 left-12 text-ink/15 text-lg font-black select-none"
      >
        ✦
      </motion.span>
      <motion.span
        animate={{ rotate: [0, -180], scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
        className="absolute bottom-10 right-14 text-orange/20 text-xl font-black select-none"
      >
        ★
      </motion.span>
    </div>
  );
}

// ── Input class helper ────────────────────────────────────────────────────────
function inputCls(hasError) {
  return [
    'w-full bg-paper border-2 px-4 py-3 text-[15px] text-ink font-sans',
    'placeholder:text-ink/35 outline-none transition-all duration-200',
    'focus:ring-2 focus:ring-orange/30',
    hasError
      ? 'border-red-500 shadow-[3px_3px_0_#ef4444] focus:border-red-500 focus:shadow-[4px_4px_0_#ef4444]'
      : 'border-ink focus:border-orange focus:shadow-[4px_4px_0_var(--color-orange)] hover:border-ink/80',
  ].join(' ');
}

// ── Party Paper Blast Animation (Confetti Explosion behind text) ───────────
function PartyPaperBlast() {
  const pieces = React.useMemo(() => {
    const colors = [
      '#FF6B1A', '#00E599', '#FACC15', '#FF4500', 
      '#EC4899', '#3B82F6', '#A855F7', '#10B981', '#F43F5E'
    ];
    const shapes = ['rect', 'circle', 'ribbon', 'star'];

    return Array.from({ length: 65 }, (_, i) => {
      const angle = (i / 65) * 360 + (Math.random() * 20 - 10);
      const rad = (angle * Math.PI) / 180;
      const distance = 100 + Math.random() * 240;
      const xEnd = Math.cos(rad) * distance;
      const yEnd = Math.sin(rad) * distance + 50;
      const shape = shapes[i % shapes.length];
      const color = colors[i % colors.length];
      const size = 6 + Math.random() * 10;
      const duration = 1.8 + Math.random() * 1.2;
      const delay = Math.random() * 0.4;
      const rotateEnd = (Math.random() - 0.5) * 720;

      return {
        id: i,
        xEnd,
        yEnd,
        color,
        shape,
        size,
        duration,
        delay,
        rotateEnd,
      };
    });
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none z-0 overflow-visible flex items-center justify-center">
      {pieces.map((p) => (
        <motion.div
          key={p.id}
          initial={{
            x: 0,
            y: 0,
            scale: 0,
            rotate: 0,
            opacity: 1,
          }}
          animate={{
            x: p.xEnd,
            y: [0, p.yEnd * 0.4, p.yEnd],
            scale: [0, 1.5, 1, 0.4],
            rotate: p.rotateEnd,
            rotateX: [0, 360],
            rotateY: [0, 360],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration,
            ease: [0.15, 0.85, 0.35, 1],
            delay: p.delay,
          }}
          style={{
            position: 'absolute',
            width: p.shape === 'ribbon' ? p.size * 0.4 : p.size,
            height: p.shape === 'ribbon' ? p.size * 2.4 : p.size,
            backgroundColor: p.shape === 'star' ? 'transparent' : p.color,
            borderRadius: p.shape === 'circle' ? '9999px' : p.shape === 'rect' ? '2px' : '1px',
          }}
        >
          {p.shape === 'star' && (
            <span style={{ color: p.color, fontSize: `${p.size * 1.3}px`, lineHeight: 1 }} className="block font-black">
              ★
            </span>
          )}
        </motion.div>
      ))}
    </div>
  );
}

// ── Animated Success card ─────────────────────────────────────────────────────
function SuccessCard({ onReset, onClose }) {
  return (
    <motion.div
      key="success"
      initial={{ scale: 0.85, opacity: 0, y: 15 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.85, opacity: 0, y: -15 }}
      transition={{ type: 'spring', stiffness: 300, damping: 24 }}
      className="text-center py-10 px-4 md:px-8 relative z-10 flex flex-col items-center overflow-visible"
    >
      {/* Party Paper Blast explosion behind avatar and text */}
      <PartyPaperBlast />

      {/* Animated Avatar Circle with Checkmark Badge */}
      <div className="relative mb-6 z-10">
        <motion.div
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="relative w-24 h-24 rounded-full border-3 border-ink shadow-[5px_5px_0_var(--color-green)] overflow-hidden bg-yellow p-1"
        >
          <img
            src={profileImg}
            alt="Anshuman Sahu"
            className="w-full h-full object-cover rounded-full"
          />
        </motion.div>
        <motion.div
          initial={{ scale: 0, rotate: -45 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.2 }}
          className="absolute -bottom-1 -right-1 bg-green text-white p-1.5 rounded-full border-2 border-ink shadow-[2px_2px_0_var(--color-ink)]"
        >
          <CheckCircle2 size={22} className="stroke-[2.5]" />
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="relative z-10"
      >
        <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-green/15 text-green border border-green/30 rounded-full font-marker text-[14px] font-bold mb-2">
          <Sparkles size={14} /> Received Loud & Clear!
        </span>
        <h3 className="font-display font-black uppercase text-[clamp(24px,3.5vw,34px)] leading-tight text-ink">
          Message Sent!
        </h3>
        <p className="font-marker text-[18px] text-green mt-2 -rotate-1 inline-block">
          I&apos;ll be in your inbox real soon. Promise. 🚀
        </p>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex justify-center gap-4 mt-8 flex-wrap w-full max-w-xs"
      >
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReset}
          className="flex-1 font-display uppercase border-3 border-ink transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer text-[13px] font-black bg-paper text-ink px-5 py-3 hover:bg-yellow hover:shadow-[4px_4px_0_var(--color-ink)]"
        >
          Send another
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.03, y: -2 }}
          whileTap={{ scale: 0.97 }}
          onClick={onClose}
          className="flex-1 font-display uppercase border-3 border-ink transition-all duration-150 inline-flex items-center justify-center gap-2 cursor-pointer text-[13px] font-black bg-orange text-white px-5 py-3 hover:bg-green hover:shadow-[4px_4px_0_var(--color-ink)]"
        >
          Done ✓
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

// ── Main Modal Component ──────────────────────────────────────────────────────
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
      const t = setTimeout(() => firstFieldRef.current?.focus(), 150);
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
          transition={{ duration: 0.22 }}
          className="fixed inset-0 z-[300] flex items-center justify-center p-3 sm:p-4 md:p-6"
          onClick={handleCloseAndReset}
          aria-modal="true"
          role="dialog"
          aria-labelledby="hire-modal-title"
        >
          {/* Dark blurred overlay */}
          <div className="absolute inset-0 bg-black/80 backdrop-blur-md transition-all" />

          {/* ── Modal Card ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 28 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', stiffness: 340, damping: 28 }}
            className="relative z-10 w-full max-w-[680px] max-h-[92vh] flex flex-col border-3 border-ink bg-paper shadow-[12px_12px_0_var(--color-orange)] md:shadow-[16px_16px_0_var(--color-orange)] transition-all overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <AmbientParticles />

            {/* ── Header with Animated Avatar ── */}
            <div className="shrink-0 bg-paper border-b-3 border-ink px-5 sm:px-7 pt-5 pb-4.5 relative z-10 flex items-center justify-between gap-4">
              <div className="flex items-center gap-3 sm:gap-4">
                {/* Profile Avatar Badge */}
                <motion.div
                  animate={{ y: [0, -3, 0] }}
                  transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                  className="relative shrink-0"
                >
                  <div className="w-13 h-13 sm:w-15 sm:h-15 rounded-full border-2 sm:border-3 border-ink bg-yellow p-0.5 shadow-[3px_3px_0_var(--color-ink)] overflow-hidden">
                    <img
                      src={profileImg}
                      alt="Anshuman Sahu Avatar"
                      className="w-full h-full object-cover rounded-full"
                    />
                  </div>
                  {/* Status Indicator Dot */}
                  <span className="absolute bottom-0 right-0 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-green border-2 border-ink"></span>
                  </span>
                </motion.div>

                <div>
                  <h2
                    id="hire-modal-title"
                    className="font-display font-black uppercase text-[clamp(18px,3vw,26px)] leading-[1.08] text-ink"
                  >
                    Let&apos;s Work <span className="text-orange">Together.</span>
                  </h2>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="inline-flex items-center gap-1 font-marker text-[14px] sm:text-[15px] text-green font-bold -rotate-1">
                      <Zap size={13} className="fill-green text-green" /> available for new opportunities
                    </span>
                  </div>
                </div>
              </div>

              {/* Close Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={handleCloseAndReset}
                aria-label="Close inquiry form"
                className="shrink-0 w-9 h-9 sm:w-10 sm:h-10 border-2 border-ink bg-paper flex items-center justify-center shadow-[3px_3px_0_var(--color-ink)] hover:bg-orange hover:text-white hover:border-orange hover:shadow-[4px_4px_0_var(--color-ink)] transition-colors cursor-pointer text-ink"
              >
                <X size={18} strokeWidth={2.8} />
              </motion.button>
            </div>

            {/* ── Scrollable Form Body ── */}
            <div className="flex-1 overflow-y-auto no-scrollbar bg-paper px-5 sm:px-7 py-5 sm:py-6 relative z-10">
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
                    className="flex flex-col gap-4 sm:gap-5"
                  >
                    {/* Honeypot field */}
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
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="border-2 border-red-500 bg-red-50 dark:bg-red-950/30 p-3.5 flex items-start gap-3 shadow-[3px_3px_0_#ef4444]"
                      >
                        <AlertCircle size={18} className="text-red-500 mt-0.5 shrink-0" />
                        <p className="text-[13px] text-red-600 dark:text-red-400 leading-relaxed font-medium">
                          {status === 'rate-limited'
                            ? 'Too many requests. Please wait a moment and try again.'
                            : <>Something went wrong. Feel free to email me directly at{' '}
                                <a href="mailto:toanshumansahu@gmail.com" className="underline font-bold hover:text-orange">
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
                          <option value="job">💼 Job Opportunity</option>
                          <option value="freelance">🚀 Freelance Project</option>
                          <option value="collab">🤝 Collaboration</option>
                          <option value="other">💬 Other</option>
                        </select>
                        <ChevronDown size={17} className="absolute right-4 top-1/2 -translate-y-1/2 text-ink/60 pointer-events-none" />
                      </div>
                    </FormField>

                    {/* Name + Email */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
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
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-5">
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
                        <span className={`absolute bottom-3 right-3 font-marker text-[12px] pointer-events-none select-none transition-colors ${values.description.length >= 950 ? 'text-red-500 font-bold' : 'text-ink/35'}`}>
                          {values.description.length} / 1000
                        </span>
                      </div>
                    </FormField>

                    {/* Submit Row */}
                    <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-3 pt-2">
                      <p className="text-[12px] text-ink/50 font-medium">
                        <span className="text-orange font-bold">✱</span> Required fields
                      </p>
                      <motion.button
                        whileHover={{ scale: isLoading ? 1 : 1.02, x: isLoading ? 0 : -2, y: isLoading ? 0 : -2 }}
                        whileTap={{ scale: isLoading ? 1 : 0.98 }}
                        type="submit"
                        disabled={isLoading}
                        aria-label={isLoading ? 'Sending your message, please wait' : 'Send your inquiry'}
                        className="font-display text-[15px] uppercase bg-orange text-white px-8 py-3.5 border-3 border-ink shadow-[5px_5px_0_var(--color-ink)] transition-all duration-150 inline-flex items-center gap-2 cursor-pointer w-full md:w-auto justify-center
                          hover:bg-green hover:shadow-[7px_7px_0_var(--color-ink)]
                          disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-[5px_5px_0_var(--color-ink)] disabled:hover:bg-orange"
                      >
                        {isLoading ? (
                          <><Loader2 size={18} className="animate-spin" /> Sending...</>
                        ) : (
                          <><Send size={16} /> SEND IT</>
                        )}
                      </motion.button>
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

