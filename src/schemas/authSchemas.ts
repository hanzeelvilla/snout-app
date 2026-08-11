import { z } from 'zod';

export const loginSchema = z.object({
  email: z.email({ message: 'El correo debe estar en un formato válido' }),
  password: z.string().min(1, { message: 'Este campo es requerido' }),
});

export type LoginFormData = z.infer<typeof loginSchema>;

export const signUpSchema = z
  .object({
    firstName: z
      .string()
      .trim()
      .min(1, { message: 'El nombre es obligatorio.' }),
    lastNamePaternal: z
      .string()
      .trim()
      .min(1, { message: 'El apellido paterno es obligatorio.' }),
    lastNameMaternal: z.string().optional(),
    gender: z.string().min(1, { message: 'Debes seleccionar una opción.' }),
    birthDate: z
      .string()
      .min(1, { message: 'La fecha de nacimiento es obligatoria.' })
      .refine(
        (val) => /^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/.test(val.trim()),
        { message: 'Ingresa la fecha en formato DD/MM/AAAA.' }
      )
      .refine(
        (val) => {
          const match = val.trim().match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
          if (!match) return false;
          const day = parseInt(match[1], 10);
          const month = parseInt(match[2], 10) - 1;
          const year = parseInt(match[3], 10);
          const birth = new Date(year, month, day);
          return (
            birth.getFullYear() === year &&
            birth.getMonth() === month &&
            birth.getDate() === day
          );
        },
        { message: 'Ingresa una fecha válida.' }
      )
      .refine(
        (val) => {
          const match = val.trim().match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
          if (!match) return false;
          const day = parseInt(match[1], 10);
          const month = parseInt(match[2], 10) - 1;
          const year = parseInt(match[3], 10);
          const birth = new Date(year, month, day);
          const today = new Date();
          today.setHours(23, 59, 59, 999);
          return birth <= today;
        },
        { message: 'La fecha de nacimiento no puede ser futura.' }
      )
      .refine(
        (val) => {
          const match = val.trim().match(/^(\d{1,2})[\/\-](\d{1,2})[\/\-](\d{4})$/);
          if (!match) return false;
          const day = parseInt(match[1], 10);
          const month = parseInt(match[2], 10) - 1;
          const year = parseInt(match[3], 10);
          const birth = new Date(year, month, day);
          const today = new Date();
          let age = today.getFullYear() - birth.getFullYear();
          const monthDiff = today.getMonth() - birth.getMonth();
          if (
            monthDiff < 0 ||
            (monthDiff === 0 && today.getDate() < birth.getDate())
          ) {
            age--;
          }
          return age >= 18;
        },
        { message: 'Debes tener al menos 18 años para registrarte.' }
      ),
    phone: z
      .string()
      .min(1, { message: 'El celular es obligatorio.' })
      .refine((val) => val.replace(/\D/g, '').length >= 10, {
        message: 'El teléfono debe tener al menos 10 dígitos.',
      }),
    email: z.email({ message: 'El correo debe estar en un formato válido.' }),
    password: z
      .string()
      .min(1, { message: 'La contraseña es obligatoria.' })
      .min(8, { message: 'La contraseña debe tener al menos 8 caracteres.' })
      .regex(/[A-Z]/, {
        message: 'La contraseña debe incluir al menos una letra mayúscula.',
      })
      .regex(/[a-z]/, {
        message: 'La contraseña debe incluir al menos una letra minúscula.',
      })
      .regex(/[0-9]/, {
        message: 'La contraseña debe incluir al menos un número.',
      })
      .regex(/[^A-Za-z0-9]/, {
        message: 'La contraseña debe incluir al menos un símbolo (!@#$%^&*).',
      }),
    confirmPassword: z
      .string()
      .min(1, { message: 'Por favor confirma tu contraseña.' }),
    acceptedTerms: z.boolean().refine((val) => val === true, {
      message: 'Debes aceptar los Términos y Condiciones para continuar.',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Las contraseñas no coinciden.',
    path: ['confirmPassword'],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
