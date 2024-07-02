const { z } = require("zod");

const loginSchema = z.object({
    email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least of 3 characters" })
    .max(255, { message: "Email must not be more than 255 characters" }),
    .refine(value => value.endsWith('@nitc.ac.in'), {
        message: "Email must be from the nitc.ac.in domain"
      }),
    password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least of 6 characters" })
    .max(1024, "Password can't be greater than 1024 characters"),
});

// Creating an object schema
const signupSchema = loginSchema.extend({
  rollno: z
    .string({ required_error: "Roll is required" })
    .trim()
    .min(9, { message: "roll must be at least of 9 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  firstname: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(3, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  lastname: z
    .string()
    .trim()
    .min(1, { message: "Name must be at least of 3 characters" })
    .max(255, { message: "Name must not be more than 255 characters" }),
  batch: z
    .string()
    .trim()
    .min(1, { message: "batch must be at least of 3 characters" })
    .max(255, { message: "batch must not be more than 255 characters" }),
  course: z
    .string()
    .trim()
    .min(1, { message: "course must be at least of 3 characters" })
    .max(255, { message: "course must not be more than 255 characters" }),
  department: z
    .string()
    .trim()
    .min(1, { message: "Department must be at least of 3 characters" })
    .max(255, { message: "Department must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
});


// Creating an object schema
const facultySignupSchema = loginSchema.extend({
  facID: z
    .string({ required_error: "Faculty ID is required" })
    .trim()
    .min(9, { message: "Faculty ID must be at least of 9 characters" })
    .max(255, { message: "Faculty ID must not be more than 255 characters" }),
  firstname: z
    .string({ required_error: "First Name is required" })
    .trim()
    .min(3, { message: "First Name must be at least of 3 characters" })
    .max(255, { message: "First Name must not be more than 255 characters" }),
  lastname: z
    .string()
    .trim()
    .min(1, { message: "Last Name must be at least of 3 characters" })
    .max(255, { message: "Last Name must not be more than 255 characters" }),
  office: z
    .string()
    .trim()
    .min(1, { message: "Office Location must be at least of 3 characters" })
    .max(255, { message: "Office Location must not be more than 255 characters" }),
  permanent: z
    .string()
    .trim()
    .min(1, { message: "Employment-type must be at least of 3 characters" })
    .max(255, { message: "Employment-type must not be more than 255 characters" }),
  department: z
    .string()
    .trim()
    .min(1, { message: "Department must be at least of 3 characters" })
    .max(255, { message: "Department must not be more than 255 characters" }),
  phone: z
    .string({ required_error: "Phone is required" })
    .trim()
    .min(10, { message: "Phone must be at least of 10 characters" })
    .max(20, { message: "Phone must not be more than 20 characters" }),
});


module.exports = {signupSchema, loginSchema, facultySignupSchema}; 