import { useState, useCallback } from 'react';

// ── Dynamic copy per inquiry type ───────────────────────────────────────────
export const INQUIRY_META = {
  job: {
    companyLabel: 'Company Name',
    companyPlaceholder: 'e.g. Google, Infosys, Startup Inc.',
    descriptionPlaceholder:
      "Tell me about the role, team culture, tech stack, and what you're looking for in a candidate...",
  },
  freelance: {
    companyLabel: 'Organization / Client Name',
    companyPlaceholder: 'e.g. Acme Corp or your name',
    descriptionPlaceholder:
      'Describe the project scope, timeline, key deliverables, and budget range...',
  },
  collab: {
    companyLabel: 'Project / Initiative Name',
    companyPlaceholder: 'e.g. Open-source project, startup idea',
    descriptionPlaceholder:
      'What are you building? What kind of collaboration do you have in mind?...',
  },
  other: {
    companyLabel: 'Organization (if any)',
    companyPlaceholder: 'e.g. University, community group',
    descriptionPlaceholder: "What's on your mind? Feel free to share anything...",
  },
};

const DEFAULT_META = {
  companyLabel: 'Company / Organization',
  companyPlaceholder: 'Your company or organization',
  descriptionPlaceholder: 'Tell me about your project, idea, or opportunity...',
};

// ── Validation ───────────────────────────────────────────────────────────────
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^\+?[\d\s\-().]{7,20}$/;
const URL_RE   = /^https?:\/\//i;

const FIELD_ORDER = ['inquiryType', 'name', 'email', 'company', 'phone', 'website', 'description'];

function validate(values) {
  const e = {};

  if (!values.inquiryType)
    e.inquiryType = 'Please select an inquiry type';

  const name = values.name.trim();
  if (!name)                  e.name = 'Your name is required';
  else if (name.length < 2)   e.name = 'Name must be at least 2 characters';
  else if (name.length > 80)  e.name = 'Name must be under 80 characters';

  const email = values.email.trim();
  if (!email)                     e.email = 'Your work email is required';
  else if (!EMAIL_RE.test(email)) e.email = 'Please enter a valid email address';

  const company = values.company.trim();
  if (!company)                  e.company = 'This field is required';
  else if (company.length < 2)   e.company = 'Must be at least 2 characters';
  else if (company.length > 100) e.company = 'Must be under 100 characters';

  if (values.phone && !PHONE_RE.test(values.phone))
    e.phone = 'Please enter a valid phone number';

  if (values.website && !URL_RE.test(values.website))
    e.website = 'Please enter a valid URL (starts with https://)';

  const desc = values.description.trim();
  if (!desc)                   e.description = 'Please describe your inquiry';
  else if (desc.length < 30)   e.description = 'Please provide at least 30 characters';
  else if (desc.length > 1000) e.description = 'Maximum 1000 characters allowed';

  return e;
}

function validateOne(name, value, allValues) {
  return validate({ ...allValues, [name]: value })[name] || '';
}

// ── Initial state ────────────────────────────────────────────────────────────
const INITIAL = {
  inquiryType: '',
  name: '',
  email: '',
  company: '',
  phone: '',
  website: '',
  description: '',
  _gotcha: '',
};

// ── Formspree endpoint ───────────────────────────────────────────────────────
// Sign up at https://formspree.io, create a form, and replace YOUR_FORM_ID
// Or set VITE_FORMSPREE_ENDPOINT in your .env file
const ENDPOINT =
  import.meta.env.VITE_FORMSPREE_ENDPOINT ?? 'https://formspree.io/f/YOUR_FORM_ID';

// ── Hook ─────────────────────────────────────────────────────────────────────
export function useHireMeForm() {
  const [values, setValues]   = useState(INITIAL);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});
  const [status, setStatus]   = useState('idle');

  const meta = INQUIRY_META[values.inquiryType] ?? DEFAULT_META;

  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const err = validateOne(name, value, { ...values, [name]: value });
      return { ...prev, [name]: err };
    });
  }, [values]);

  const handleBlur = useCallback((e) => {
    let { name, value } = e.target;
    if (name === 'website' && value && !URL_RE.test(value)) {
      value = 'https://' + value;
      setValues((prev) => ({ ...prev, website: value }));
    }
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validateOne(name, value, { ...values, [name]: value }),
    }));
  }, [values]);

  const validateAll = useCallback(() => {
    const allErrors = validate(values);
    setErrors(allErrors);
    const touchAll = FIELD_ORDER.reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(touchAll);
    if (Object.keys(allErrors).length > 0) {
      const firstKey = FIELD_ORDER.find((k) => allErrors[k]);
      if (firstKey) setTimeout(() => document.getElementById(firstKey)?.focus(), 50);
      return false;
    }
    return true;
  }, [values]);

  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    if (values._gotcha) return false;
    if (!validateAll()) return false;

    setStatus('loading');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 10_000);

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          'Inquiry Type':      values.inquiryType,
          'Name':              values.name,
          'Email':             values.email,
          'Company / Org':     values.company,
          'Phone':             values.phone    || '(not provided)',
          'Website/LinkedIn':  values.website  || '(not provided)',
          'Description':       values.description,
        }),
        signal: controller.signal,
      });
      clearTimeout(timeout);
      if (res.ok)                  setStatus('success');
      else if (res.status === 429) setStatus('rate-limited');
      else                         setStatus('error');
    } catch {
      clearTimeout(timeout);
      setStatus('error');
    }
    return true;
  }, [values, validateAll]);

  const reset = useCallback(() => {
    setValues(INITIAL);
    setErrors({});
    setTouched({});
    setStatus('idle');
  }, []);

  return { values, errors, touched, status, meta, handleChange, handleBlur, handleSubmit, reset };
}
