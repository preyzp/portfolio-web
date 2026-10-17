export const inquiryTypes = ["Job Opportunity", "Freelance Project", "Collaboration", "Other"] as const;
export type ContactValues = { name: string; email: string; inquiry: string; message: string };
export type ContactErrors = Partial<Record<keyof ContactValues, string>>;
export const isContactEmail = (value: string) => value.length <= 254 && /^[A-Za-z0-9.!#$%&'*+/=?^_`{|}~-]+@[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?(?:\.[A-Za-z0-9](?:[A-Za-z0-9-]*[A-Za-z0-9])?)+$/.test(value);

export function validateContact(input: unknown): { values: ContactValues; errors: ContactErrors } {
  const data = input && typeof input === "object" && !Array.isArray(input) ? input as Record<string, unknown> : {};
  const field = (key: string) => typeof data[key] === "string" ? data[key].trim().replace(/\r\n?/g, "\n") : "";
  const values = { name: field("name"), email: field("email"), inquiry: field("inquiry"), message: field("message") };
  const errors: ContactErrors = {};
  if (!values.name || values.name.length > 100 || /[\p{Cc}\p{Cf}]/u.test(values.name)) errors.name = "Enter your full name (up to 100 characters).";
  if (!isContactEmail(values.email)) errors.email = "Enter a valid email address.";
  if (!inquiryTypes.some(type => type === values.inquiry)) errors.inquiry = "Choose an inquiry type.";
  if ((data.message !== undefined && typeof data.message !== "string") || (values.message && (values.message.length < 10 || values.message.length > 2000 || /[\p{Cc}\p{Cf}]/u.test(values.message.replace(/[\n\t]/g, ""))))) errors.message = "Leave the message empty, or write 10–2000 characters without control characters.";
  return { values, errors };
}
