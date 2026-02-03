import { z } from "zod";

export const LABEL_MAX = 50;
export const LOGIN_MAX = 100;
export const PASSWORD_MAX = 100;

export const labelSchema = z
  .string()
  .max(LABEL_MAX, `Макс. ${LABEL_MAX} символов`);

export const loginSchema = z
  .string()
  .min(1, "Обязательное поле")
  .max(LOGIN_MAX, `Макс. ${LOGIN_MAX} символов`);

export const passwordSchema = z
  .string()
  .min(1, "Обязательное поле")
  .max(PASSWORD_MAX, `Макс. ${PASSWORD_MAX} символов`);

export function parseLabel(value: string) {
  return labelSchema.safeParse(value);
}

export function parseLogin(value: string) {
  return loginSchema.safeParse(value.trim());
}

export function parsePassword(value: string) {
  return passwordSchema.safeParse(value);
}

export function getFirstError(
  result: z.SafeParseReturnType<unknown, unknown>
): string | null {
  if (result.success) return null;
  const issue = result.error.issues[0];
  return issue ? issue.message : null;
}
