import { z } from "zod";

export const analyseStatusSchema = z.enum([
  "queued",
  "processing",
  "completed",
  "failed",
]);

export type AnalyseStatus = z.infer<typeof analyseStatusSchema>;

export const imageFileSchema = z
  .instanceof(File, { message: "Le champ doit être un fichier." })
  .refine((file) => file.size > 0, {
    message: "Le fichier image ne peut pas être vide.",
  })
  .refine((file) => file.type.startsWith("image/"), {
    message: "Le fichier doit être une image (image/*).",
  });

export const optionalImageFileSchema = z.union([imageFileSchema, z.null(), z.undefined()]);

export const analyseRequestSchema = z.object({
  photo_1: optionalImageFileSchema,
  photo_2: optionalImageFileSchema,
  photo_3: optionalImageFileSchema,
  photo_4: optionalImageFileSchema,
  timestamp: z.coerce.date(),
  userAgent: z.string().trim().min(1, {
    message: "Le userAgent est requis.",
  }),
  clientName: z.string().trim().min(2, { message: "Le nom du donneur d'ordre est requis." }),
  clientEmail: z.string().trim().email({ message: "Une adresse email valide est requise." }),
  clientPhone: z.string().trim().min(10, { message: "Un numéro de téléphone (min 10 chiffres) est requis." }),
  clientAddress: z.string().trim().min(5, { message: "L'adresse du bien est requise." }),
}).refine((payload) => {
  const photos = [payload.photo_1, payload.photo_2, payload.photo_3, payload.photo_4];
  return photos.filter(Boolean).length >= 1;
}, {
  message: "Au moins une image est requise.",
});

export interface AnalyseRequest {
  photo_1?: File | null;
  photo_2?: File | null;
  photo_3?: File | null;
  photo_4?: File | null;
  timestamp: Date;
  userAgent: string;
  clientName: string;
  clientEmail: string;
  clientPhone: string;
  clientAddress: string;
}

export const analyseResponseSchema = z.object({
  sessionId: z.string().uuid("Le sessionId doit être un UUID valide."),
  status: analyseStatusSchema,
});

export interface AnalyseResponse {
  sessionId: string;
  status: AnalyseStatus;
}

export const analyseStatusResponseSchema = z.object({
  sessionId: z.string().uuid("Le sessionId doit être un UUID valide."),
  status: analyseStatusSchema,
});

export interface AnalyseStatusResponse {
  sessionId: string;
  status: AnalyseStatus;
}

export const urgenceSchema = z.enum(["Faible", "Modérée", "Critique"]);
export type Urgence = z.infer<typeof urgenceSchema>;

export const annotationSchema = z.object({
  label: z.string().trim().min(1),
  couleur: z.enum(["ROUGE", "ORANGE", "BLEU"]),
  position_relative: z.object({
    x: z.coerce.number(),
    y: z.coerce.number(),
  }),
  width: z.coerce.number().optional(),
  height: z.coerce.number().optional(),
});

export const diagnosticAnalyseItemSchema = z.object({
  image_index: z.number().int().min(1).optional().default(1),
  zone: z.string().trim().min(1),
  pathologie: z.string().trim().min(1),
  confiance: z.string().regex(/^(100|[1-9]?\d)%$/, {
    message: "La confiance doit respecter le format 0-100%.",
  }),
  urgence: urgenceSchema,
  preuve: z.string().trim().min(1),
  annotations: z.array(annotationSchema).optional().default([]),
});

export const diagnosticReportSchema = z.object({
  diagnostic_global: z.string().trim().min(1),
  analyses: z.array(diagnosticAnalyseItemSchema).min(1),
  score_confiance_general: z.string().regex(/^(100|[1-9]?\d)%$/, {
    message: "Le score global doit respecter le format 0-100%.",
  }),
  preconisations_techniques: z.array(z.string().trim().min(1)).min(1),
  conclusion_juridique: z.string().trim().min(1),
});

export type DiagnosticReport = z.infer<typeof diagnosticReportSchema>;

export const analyseStatusWithResultResponseSchema = z.object({
  sessionId: z.string().uuid("Le sessionId doit être un UUID valide."),
  status: analyseStatusSchema,
  result: diagnosticReportSchema.nullable().optional(),
  error: z.string().nullable().optional(),
});

export type AnalyseStatusWithResultResponse = z.infer<
  typeof analyseStatusWithResultResponseSchema
>;

export const diagnosticErrorSchema = z.object({
  errorCode: z.string().trim().min(1, {
    message: "Le code d'erreur est requis.",
  }),
  message: z.string().trim().min(1, {
    message: "Le message d'erreur est requis.",
  }),
  details: z.unknown().optional(),
});

export interface DiagnosticError {
  errorCode: string;
  message: string;
  details?: unknown;
}

export function extractAnalyseRequestFromFormData(
  formData: FormData,
  userAgent: string,
  timestamp: Date = new Date(),
): AnalyseRequest {
  return {
    photo_1: formData.get("photo_1") as File | null,
    photo_2: formData.get("photo_2") as File | null,
    photo_3: formData.get("photo_3") as File | null,
    photo_4: formData.get("photo_4") as File | null,
    timestamp,
    userAgent,
    clientName: formData.get("clientName") as string | null,
    clientEmail: formData.get("clientEmail") as string | null,
    clientPhone: formData.get("clientPhone") as string | null,
    clientAddress: formData.get("clientAddress") as string | null,
  };
}

export interface ConsentTrace {
  termsAcceptedAt: Date | null;
  nonOpposableAcknowledgedAt: Date | null;
  ip: string | null;
  userAgent: string | null;
}

function parseConsentDate(raw: FormDataEntryValue | null): Date | null {
  if (typeof raw !== "string" || raw.length === 0) {
    return null;
  }
  const parsed = new Date(raw);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

export function extractConsentTraceFromFormData(
  formData: FormData,
  ip: string | null,
  userAgent: string | null,
): ConsentTrace {
  return {
    termsAcceptedAt: parseConsentDate(formData.get("consentAcceptedTermsAt")),
    nonOpposableAcknowledgedAt: parseConsentDate(
      formData.get("consentAcknowledgedNonOpposableAt"),
    ),
    ip,
    userAgent,
  };
}
